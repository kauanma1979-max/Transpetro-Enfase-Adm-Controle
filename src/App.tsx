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
import { ScheduleDay, CRONOGRAMA_15_SEMANAS, DATA_INICIO_ESTUDOS } from './data/scheduleData';
import { EDITAL_INFO } from './data/editalData';

export default function App() {
  const [activeTab, setActiveTab] = useState<string>('edital');
  const [completedDays, setCompletedDays] = useState<string[]>(() => {
    const saved = localStorage.getItem('transpetro_completed_days_v2');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        return [];
      }
    }
    return [];
  });

  const [activeSessionDay, setActiveSessionDay] = useState<ScheduleDay | null>(null);
  const [isCalculatorOpen, setIsCalculatorOpen] = useState<boolean>(false);
  const [calculatorFormula, setCalculatorFormula] = useState<string | undefined>(undefined);
  const [isBackupModalOpen, setIsBackupModalOpen] = useState<boolean>(false);

  const handleOpenCalculator = (formulaNome?: string) => {
    setCalculatorFormula(formulaNome);
    setIsCalculatorOpen(true);
  };

  useEffect(() => {
    localStorage.setItem('transpetro_completed_days_v2', JSON.stringify(completedDays));
  }, [completedDays]);

  const handleToggleDay = (dayId: string) => {
    setCompletedDays(prev => 
      prev.includes(dayId) ? prev.filter(id => id !== dayId) : [...prev, dayId]
    );
  };

  const handleCompleteDay = (dayId: string) => {
    if (!completedDays.includes(dayId)) {
      setCompletedDays(prev => [...prev, dayId]);
    }
  };

  const handleResetProgress = () => {
    if (window.confirm('Deseja realmente zerar o seu progresso de dias estudados? Esta ação não afetará o Caderno de Erros nem o Edital Verticalizado.')) {
      setCompletedDays([]);
    }
  };

  const handleDataRestored = () => {
    try {
      const rawDays = localStorage.getItem('transpetro_completed_days_v2');
      if (rawDays) {
        setCompletedDays(JSON.parse(rawDays));
      }
    } catch (e) { /* ignore */ }
  };

  // 15 semanas × 7 dias = 105 dias. 105 dias × 3 horas = 315 horas totais.
  const totalHours = 315;
  const completedHours = completedDays.length * 3;

  const handleExportReport = () => {
    const progressPct = Math.round((completedHours / totalHours) * 100);

    const report = `# RELATÓRIO DE ESTUDOS ESTRATÉGICO — TRANSPETRO 2026.3
Ênfase 1: Administração e Controle (Nível Médio)
Banca: Fundação Cesgranrio | Data da Prova: 29/11/2026 (13h00)
Início do Plano: 20 de Agosto de 2026

## 📊 Status do Candidato (Rotina 3h/dia · 7 dias/semana):
- Horas Cumpridas: ${completedHours}h de ${totalHours}h totais (${progressPct}%)
- Dias Estudados: ${completedDays.length} de 105 dias planejados
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
    link.setAttribute('download', `relatorio_estudos_transpetro_315h_${new Date().toISOString().slice(0, 10)}.md`);
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
        onOpenBackupModal={() => setIsBackupModalOpen(true)}
      />

      {/* Main Views Container */}
      <main className="flex-1 pb-16 px-4 max-w-7xl mx-auto w-full pt-6">
        {/* In-body Segmented Navigation Tabs */}
        <NavigationTabs activeTab={activeTab} setActiveTab={setActiveTab} />

        {activeTab === 'edital' && <EditalSummary />}
        {activeTab === 'verticalizado' && <EditalVerticalizado />}
        {activeTab === 'pareto' && <ParetoMatrix />}
        {activeTab === 'material' && <TabMaterialEstudo onOpenCalculator={handleOpenCalculator} />}
        {activeTab === 'cronograma' && (
          <StudySchedule
            completedDays={completedDays}
            onToggleDay={handleToggleDay}
            onOpenSessionTimer={(day) => setActiveSessionDay(day)}
            onNavigateToVerticalizado={() => setActiveTab('verticalizado')}
          />
        )}
        {activeTab === 'cortes' && <CutRules />}
        {activeTab === 'banca' && <BancaCesgranrio />}
        {activeTab === 'caderno' && <ErrorNotebook />}
      </main>

      {/* Backup and Restore Modal */}
      <BackupRestoreModal
        isOpen={isBackupModalOpen}
        onClose={() => setIsBackupModalOpen(false)}
        onDataRestored={handleDataRestored}
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
            3h/dia · 7 dias/sem (21h/sem · 315h Totais) · Início em 20 de Agosto de 2026
          </div>
        </div>
      </footer>
    </div>
  );
}
