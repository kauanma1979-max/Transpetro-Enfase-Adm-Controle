import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { EditalSummary } from './components/EditalSummary';
import { EditalVerticalizado } from './components/EditalVerticalizado';
import { ParetoMatrix } from './components/ParetoMatrix';
import { StudySchedule } from './components/StudySchedule';
import { CutRules } from './components/CutRules';
import { BancaCesgranrio } from './components/BancaCesgranrio';
import { ErrorNotebook } from './components/ErrorNotebook';
import { DailySessionModal } from './components/DailySessionModal';
import { TabMaterialEstudo } from './components/TabMaterialEstudo';
import { FormulaCalculatorModal } from './components/FormulaCalculatorModal';
import { BackupRestoreModal } from './components/BackupRestoreModal';
import { NavigationTabs } from './components/NavigationTabs';
import { 
  ScheduleDay, 
  CRONOGRAMA_15_SEMANAS, 
  DATA_INICIO_ESTUDOS,
  DATA_ENCERRAMENTO_ESTUDOS,
  TOTAL_SEMANAS_ESTUDO,
  TOTAL_DIAS_ESTUDO,
  TOTAL_HORAS_ESTUDO 
} from './data/scheduleData';
import { EDITAL_INFO } from './data/editalData';
import { 
  getDriveEndpoint, 
  getDriveAutoSync, 
  getDriveSyncValidated, 
  fetchGoogleDriveDataViaJsonp, 
  mergeTranspetroBackupData, 
  savePreSyncSafetyBackup, 
  setDriveSyncValidated, 
  setLastDriveSyncDate 
} from './utils/driveSync';
import { generateBackupPayload, restoreFromRawData } from './utils/backupStorage';

export default function App() {
  const [activeTab, setActiveTab] = useState<string>(() => {
    return localStorage.getItem('transpetro_active_tab_v1') || 'edital';
  });

  const scrollPositionsRef = React.useRef<Record<string, number>>({});

  const handleTabChange = (newTab: string) => {
    if (newTab === activeTab) return;

    // 1. Save scroll position of current tab
    scrollPositionsRef.current[activeTab] = window.scrollY;

    // 2. Set new active tab
    setActiveTab(newTab);
    try {
      localStorage.setItem('transpetro_active_tab_v1', newTab);
    } catch {
      // ignore
    }

    // 3. Restore scroll position of destination tab
    requestAnimationFrame(() => {
      const targetScroll = scrollPositionsRef.current[newTab] ?? 0;
      window.scrollTo({
        top: targetScroll,
        behavior: 'instant' as ScrollBehavior
      });
    });
  };

  const parseCompletedDays = (raw: string | null): string[] => {
    if (!raw) return [];
    try {
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed)) {
        return parsed.filter(item => typeof item === 'string' && item.trim().length > 0);
      }
      if (parsed && typeof parsed === 'object') {
        return Object.keys(parsed).filter(k => Boolean(parsed[k]));
      }
    } catch {
      // ignore
    }
    return [];
  };

  const [completedDays, setCompletedDays] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('transpetro_completed_days_v2') || 
                    localStorage.getItem('transpetro_completed_days');
      return parseCompletedDays(saved);
    } catch {
      return [];
    }
  });

  const [activeSessionDay, setActiveSessionDay] = useState<ScheduleDay | null>(null);
  const [isCalculatorOpen, setIsCalculatorOpen] = useState<boolean>(false);
  const [calculatorFormula, setCalculatorFormula] = useState<string | undefined>(undefined);
  const [isBackupModalOpen, setIsBackupModalOpen] = useState<boolean>(false);
  const [backupModalTab, setBackupModalTab] = useState<'drive' | 'file' | 'code'>('drive');

  const handleOpenCalculator = (formulaNome?: string) => {
    setCalculatorFormula(formulaNome);
    setIsCalculatorOpen(true);
  };

  const handleOpenBackupModal = (tab: 'drive' | 'file' | 'code' = 'file') => {
    setBackupModalTab(tab);
    setIsBackupModalOpen(true);
  };

  const handleOpenDriveSync = () => {
    setBackupModalTab('drive');
    setIsBackupModalOpen(true);
  };

  useEffect(() => {
    try {
      localStorage.setItem('transpetro_completed_days_v2', JSON.stringify(completedDays));
    } catch (e) {
      console.error('Error writing completed days to storage:', e);
    }
  }, [completedDays]);

  const handleDataRestored = () => {
    try {
      const rawDays = localStorage.getItem('transpetro_completed_days_v2') || 
                      localStorage.getItem('transpetro_completed_days');
      setCompletedDays(parseCompletedDays(rawDays));
    } catch (e) { /* ignore */ }
  };

  // Event listener to auto-sync when backup is imported or drive data is received
  useEffect(() => {
    window.addEventListener('transpetro_data_restored', handleDataRestored);
    return () => {
      window.removeEventListener('transpetro_data_restored', handleDataRestored);
    };
  }, []);

  // Listen to drive-json-loaded event and setup window.sincronizarGoogleDrive
  useEffect(() => {
    const handleDriveJsonLoaded = (e: any) => {
      try {
        const incomingData = e?.detail;
        if (!incomingData || typeof incomingData !== 'object') return;

        // 1. Save safety backup before merging
        savePreSyncSafetyBackup();

        // 2. Generate current local backup payload
        const currentLocal = generateBackupPayload();

        // 3. Perform safe intelligent merge
        const merged = mergeTranspetroBackupData(currentLocal, incomingData);

        // 4. Save merged data to localStorage
        restoreFromRawData(merged);

        // 5. Update state
        setDriveSyncValidated(true);
        setLastDriveSyncDate(new Date().toLocaleString('pt-BR'));
        handleDataRestored();
      } catch (err) {
        console.error('Error integrating Google Drive data:', err);
      }
    };

    (window as any).sincronizarGoogleDrive = () => {
      const endpoint = getDriveEndpoint();
      if (endpoint) {
        return fetchGoogleDriveDataViaJsonp(endpoint);
      }
      return Promise.reject(new Error('Endpoint do Google Apps Script não configurado.'));
    };

    window.addEventListener('drive-json-loaded', handleDriveJsonLoaded);
    return () => {
      window.removeEventListener('drive-json-loaded', handleDriveJsonLoaded);
    };
  }, []);

  // Auto-sync on open ONLY AFTER validation and if enabled
  useEffect(() => {
    const isAutoSync = getDriveAutoSync();
    const isValidated = getDriveSyncValidated();
    const endpoint = getDriveEndpoint();

    if (isAutoSync && isValidated && endpoint && endpoint.startsWith('https://script.google.com/')) {
      const timer = setTimeout(() => {
        fetchGoogleDriveDataViaJsonp(endpoint).catch((err) => {
          console.warn('Auto-sync notice:', err?.message);
        });
      }, 1200);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleToggleDay = (dayId: string) => {
    setCompletedDays(prev => {
      const arr = Array.isArray(prev) ? prev : [];
      const isCompleted = arr.includes(dayId);
      const next = isCompleted ? arr.filter(id => id !== dayId) : [...arr, dayId];
      try {
        localStorage.setItem('transpetro_completed_days_v2', JSON.stringify(next));
      } catch (e) {
        console.error('Error saving completed days', e);
      }
      return next;
    });
  };

  const handleCompleteDay = (dayId: string) => {
    setCompletedDays(prev => {
      const arr = Array.isArray(prev) ? prev : [];
      if (!arr.includes(dayId)) {
        const next = [...arr, dayId];
        try {
          localStorage.setItem('transpetro_completed_days_v2', JSON.stringify(next));
        } catch (e) {
          console.error(e);
        }
        return next;
      }
      return arr;
    });
  };

  const handleResetProgress = () => {
    if (window.confirm('Deseja realmente zerar o seu progresso de dias estudados? Esta ação não afetará o Caderno de Erros nem o Edital Verticalizado.')) {
      try {
        localStorage.setItem('transpetro_completed_days_v2', JSON.stringify([]));
      } catch (e) {}
      setCompletedDays([]);
    }
  };

  // Cálculo dinâmico: 14 semanas (98 dias a 3h/dia = 294h totais)
  const totalDays = TOTAL_DIAS_ESTUDO;
  const totalHours = TOTAL_HORAS_ESTUDO;
  const completedHours = completedDays.length * 3;

  const handleExportReport = () => {
    const progressPct = Math.round((completedHours / totalHours) * 100);

    const report = `# RELATÓRIO DE ESTUDOS ESTRATÉGICO — TRANSPETRO 2026.3
Ênfase 1: Administração e Controle (Nível Médio)
Banca: Fundação Cesgranrio | Data da Prova: 06/12/2026 (13h00)
Início do Plano: ${DATA_INICIO_ESTUDOS} | Encerramento: ${DATA_ENCERRAMENTO_ESTUDOS}

## 📊 Status do Candidato (Rotina 3h/dia · 7 dias/semana):
- Horas Cumpridas: ${completedHours}h de ${totalHours}h totais (${progressPct}%)
- Dias Estudados: ${completedDays.length} de ${totalDays} dias planejados (${TOTAL_SEMANAS_ESTUDO} semanas)
- Período: ${DATA_INICIO_ESTUDOS} até ${DATA_ENCERRAMENTO_ESTUDOS}
- Formato Diário: 3 horas por dia (2 matérias de 1h30 intercaladas)
- Metodologia: Pareto Recursivo (100% focado nas 40 questões decisivas de Conhecimentos Específicos)

## 🎯 Top Prioridades por Incidência Cesgranrio (4 Macro Divisões):
1. 🔥 Gestão de Compras: Lei das Estatais (Lei 13.303/2016 arts. 28-91) e Lei 14.133/2021
2. 🔥 Gestão de Contratos: Fiscalização Técnica x Administrativa, Aditivos (25%/50%) e Apostilamento
3. 🔥 Gestão de Estoques: Curva ABC (80/20), Ponto de Pedido (PP), LEC e Métodos PEPS/Custo Médio
4. 🔥 Finanças e Contabilidade: Balanço Patrimonial, DRE, DFC (Método Direto x Indireto) e Juros Simples/Compostos
5. 🔥 Recursos Humanos: Modelo CHA, Recrutamento Interno/Externo, Avaliação 360º e T&D&E
6. 🔥 SGI e ESG: Normas ISO 9001/14001/45001, Auditoria de 1ª/2ª/3ª Parte, PDCA e Pilares ESG
7. 🔥 Noções de Informática: LGPD (Lei 13.709/2018), Segurança CID e Microsoft Excel 2024 (PROCV, PROCX, SE, SOMASE)

Gerado em: ${new Date().toLocaleString('pt-BR')}
`;

    const blob = new Blob([report], { type: 'text/markdown;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', `relatorio_estudos_transpetro_${totalHours}h_${new Date().toISOString().slice(0, 10)}.md`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="min-h-screen bg-slate-100/70 flex flex-col selection:bg-emerald-500 selection:text-white font-sans antialiased">
      {/* Top Header */}
      <Header
        completedHours={completedHours}
        totalHours={totalHours}
        onResetProgress={handleResetProgress}
        onExportReport={handleExportReport}
        onOpenBackupModal={() => handleOpenBackupModal('file')}
        onOpenDriveSync={handleOpenDriveSync}
      />

      {/* Main Views Container */}
      <main className="flex-1 pb-16 px-4 max-w-7xl mx-auto w-full pt-4 sm:pt-6">
        {/* In-body Segmented Navigation Tabs */}
        <NavigationTabs activeTab={activeTab} setActiveTab={handleTabChange} />

        {/* Persistent Tab Views - State & Scroll preserved */}
        <div style={{ display: activeTab === 'edital' ? 'block' : 'none' }}>
          <EditalSummary />
        </div>

        <div style={{ display: activeTab === 'verticalizado' ? 'block' : 'none' }}>
          <EditalVerticalizado />
        </div>

        <div style={{ display: activeTab === 'pareto' ? 'block' : 'none' }}>
          <ParetoMatrix />
        </div>

        <div style={{ display: activeTab === 'material' ? 'block' : 'none' }}>
          <TabMaterialEstudo onOpenCalculator={handleOpenCalculator} />
        </div>

        <div style={{ display: activeTab === 'cronograma' ? 'block' : 'none' }}>
          <StudySchedule
            completedDays={completedDays}
            onToggleDay={handleToggleDay}
            onOpenSessionTimer={(day) => setActiveSessionDay(day)}
            onNavigateToVerticalizado={() => handleTabChange('verticalizado')}
          />
        </div>

        <div style={{ display: activeTab === 'cortes' ? 'block' : 'none' }}>
          <CutRules />
        </div>

        <div style={{ display: activeTab === 'banca' ? 'block' : 'none' }}>
          <BancaCesgranrio />
        </div>

        <div style={{ display: activeTab === 'caderno' ? 'block' : 'none' }}>
          <ErrorNotebook />
        </div>
      </main>

      {/* Backup and Restore Modal */}
      <BackupRestoreModal
        isOpen={isBackupModalOpen}
        onClose={() => setIsBackupModalOpen(false)}
        onDataRestored={handleDataRestored}
        initialTab={backupModalTab}
      />

      {/* Formula Calculator Modal */}
      {isCalculatorOpen && (
        <FormulaCalculatorModal
          initialFormulaNome={calculatorFormula}
          onClose={() => {
            setIsCalculatorOpen(false);
            setCalculatorFormula(undefined);
          }}
        />
      )}

      {/* Daily Session Interactive Timer Modal */}
      {activeSessionDay && (
        <DailySessionModal
          day={activeSessionDay}
          onClose={() => setActiveSessionDay(null)}
          onCompleteDay={handleCompleteDay}
        />
      )}

      {/* Modern Footer */}
      <footer className="bg-slate-900 text-slate-400 py-6 px-4 border-t border-slate-800 text-xs text-center space-y-1.5 mt-auto">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <span className="font-bold text-white tracking-tight">TRANSPETRO 2026.3</span>
            <span>·</span>
            <span>Edital nº 03/2026 (Ênfase 1: Administração e Controle)</span>
          </div>
          <div className="text-slate-500 font-medium">
            3h/dia · 7 dias/sem (21h/sem · {totalHours}h Totais · {TOTAL_SEMANAS_ESTUDO} Semanas) · {DATA_INICIO_ESTUDOS} a {DATA_ENCERRAMENTO_ESTUDOS}
          </div>
        </div>
      </footer>
    </div>
  );
}
