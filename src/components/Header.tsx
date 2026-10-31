import React, { useState, useEffect } from 'react';
import { 
  Target, 
  Clock, 
  Download, 
  RotateCcw,
  Database,
  Calendar,
  Sparkles,
  Cloud
} from 'lucide-react';
import { DATA_INICIO_ESTUDOS, DATA_ENCERRAMENTO_ESTUDOS } from '../data/scheduleData';

interface HeaderProps {
  completedHours: number;
  totalHours: number;
  onResetProgress: () => void;
  onExportReport: () => void;
  onOpenBackupModal: () => void;
  onOpenDriveSync?: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  completedHours,
  totalHours,
  onResetProgress,
  onExportReport,
  onOpenBackupModal,
  onOpenDriveSync
}) => {
  const [timeLeft, setTimeLeft] = useState<{
    days: number;
    hours: number;
  }>({ days: 0, hours: 0 });

  useEffect(() => {
    // Prova: 06 de Dezembro de 2026 às 13h00 (Brasília)
    const examDate = new Date('2026-12-06T13:00:00-03:00').getTime();

    const updateTimer = () => {
      const now = new Date().getTime();
      const difference = examDate - now;

      if (difference > 0) {
        const days = Math.floor(difference / (1000 * 60 * 60 * 24));
        const hours = Math.floor((difference / (1000 * 60 * 60)) % 24);
        setTimeLeft({ days, hours });
      } else {
        setTimeLeft({ days: 0, hours: 0 });
      }
    };

    updateTimer();
    const interval = setInterval(updateTimer, 60000);
    return () => clearInterval(interval);
  }, []);

  const progressPercentage = Math.min(100, Math.round((completedHours / totalHours) * 100));

  return (
    <header className="bg-slate-900 text-white border-b border-slate-800 relative z-20 shadow-sm transition-all">
      {/* Top Banner with Key Highlights */}
      <div className="bg-gradient-to-r from-emerald-950/90 via-slate-900 to-slate-950 px-4 py-2 border-b border-emerald-500/20 text-xs">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-2.5">
            <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-emerald-500/15 text-emerald-300 border border-emerald-500/30 tracking-tight">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
              TRANSPETRO 2026.3
            </span>
            <span className="text-slate-300 font-medium hidden sm:inline text-xs">
              Edital nº 03/2026 · Nível Médio · <strong className="text-white font-semibold">Ênfase 1: Administração e Controle</strong>
            </span>
            <span className="text-slate-500 hidden md:inline">·</span>
            <span className="inline-flex items-center gap-1 text-[11px] text-amber-300 font-semibold bg-amber-500/10 px-2 py-0.5 rounded-md border border-amber-500/20">
              <Calendar className="w-3 h-3 text-amber-400" />
              Cronograma: {DATA_INICIO_ESTUDOS} a {DATA_ENCERRAMENTO_ESTUDOS}
            </span>
          </div>

          <div className="flex items-center gap-2.5 text-slate-300">
            {/* Contador Regressivo Discreto: Dia e Hora apenas */}
            <div className="flex items-center gap-1.5 font-mono text-emerald-300 font-medium bg-slate-950/80 px-2.5 py-1 rounded-md border border-slate-800 text-xs shadow-2xs">
              <Clock className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
              <span>
                Prova (06/12/26): <strong className="text-white font-bold">{timeLeft.days} dias</strong> e <strong className="text-emerald-400 font-bold">{timeLeft.hours}h</strong>
              </span>
            </div>
            <span className="text-slate-700 hidden md:inline">|</span>
            <span className="hidden md:inline text-amber-300/90 text-xs font-medium">
              Cesgranrio (06/12/2026)
            </span>
          </div>
        </div>
      </div>

      {/* Main Bar */}
      <div className="max-w-7xl mx-auto px-4 py-3 sm:py-3.5">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          {/* Logo & Title */}
          <div>
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-700 flex items-center justify-center font-bold text-white shadow-md shadow-emerald-950/40 shrink-0">
                <Target className="w-5 h-5 text-white" />
              </div>
              <div>
                <h1 className="text-base sm:text-lg font-bold tracking-tight text-white flex items-center gap-2">
                  Plano Pareto Recursivo
                  <span className="text-[11px] bg-amber-500/15 text-amber-300 border border-amber-500/30 px-2 py-0.5 rounded-full font-medium tracking-tight">
                    3h/dia · 7d/sem (21h/sem)
                  </span>
                </h1>
                <p className="text-xs text-slate-400 leading-none mt-1">
                  Transpetro Nível Médio · {totalHours}h Totais · Início em {DATA_INICIO_ESTUDOS} · Término em {DATA_ENCERRAMENTO_ESTUDOS}
                </p>
              </div>
            </div>
          </div>

          {/* Progress Widget & Actions */}
          <div className="flex flex-wrap items-center gap-3 sm:gap-4 bg-slate-800/60 p-2 sm:p-2.5 rounded-xl border border-slate-700/60">
            <div className="flex items-center gap-3">
              <div className="text-right">
                <div className="text-[11px] text-slate-400">Progresso de Estudos</div>
                <div className="text-xs sm:text-sm font-bold text-emerald-400 font-mono">
                  {completedHours}h <span className="text-slate-400 font-normal">/ {totalHours}h ({progressPercentage}%)</span>
                </div>
              </div>
              <div className="w-24 sm:w-32 bg-slate-950 h-2.5 rounded-full overflow-hidden border border-slate-700/60 p-0.5">
                <div 
                  className="bg-gradient-to-r from-emerald-500 to-teal-400 h-full rounded-full transition-all duration-500"
                  style={{ width: `${progressPercentage}%` }}
                />
              </div>
            </div>

            <div className="flex items-center gap-1.5 border-l border-slate-700/70 pl-3">
              {/* Google Drive Cloud Sync Quick Button */}
              <button
                id="btn-open-drive-sync"
                onClick={onOpenDriveSync || onOpenBackupModal}
                title="Sincronizar dados com o Google Drive (Nuvem)"
                className="px-2.5 py-1.5 rounded-lg bg-blue-600/30 hover:bg-blue-600 text-blue-300 hover:text-white transition-all text-xs flex items-center gap-1.5 font-bold border border-blue-500/40 shadow-xs cursor-pointer"
              >
                <Cloud className="w-3.5 h-3.5 text-blue-400 group-hover:text-white" />
                <span className="hidden sm:inline">Drive Nuvem</span>
              </button>

              {/* Backup & Restore Button */}
              <button
                id="btn-open-backup-modal"
                onClick={onOpenBackupModal}
                title="Fazer Backup ou Restaurar Dados do Aplicativo"
                className="px-3 py-1.5 rounded-lg bg-emerald-600/30 hover:bg-emerald-600 text-emerald-300 hover:text-white transition-all text-xs flex items-center gap-1.5 font-bold border border-emerald-500/40 shadow-xs cursor-pointer"
              >
                <Database className="w-3.5 h-3.5 text-emerald-400 group-hover:text-white" />
                <span className="hidden md:inline">Backup / Restaurar</span>
                <span className="md:hidden">Backup</span>
              </button>

              <button
                id="btn-export-report"
                onClick={onExportReport}
                title="Exportar Resumo de Estudos em Markdown"
                className="px-2.5 py-1.5 rounded-lg bg-slate-700/60 hover:bg-slate-700 text-slate-300 hover:text-white transition-all text-xs flex items-center gap-1.5 font-medium border border-slate-600/40 cursor-pointer"
              >
                <Download className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Relatório</span>
              </button>

              <button
                id="btn-reset-progress"
                onClick={onResetProgress}
                title="Reiniciar Progresso de Dias Estudados"
                className="p-1.5 rounded-lg bg-slate-700/40 hover:bg-slate-700/80 text-slate-400 hover:text-amber-300 transition-all text-xs border border-slate-700/40 cursor-pointer"
              >
                <RotateCcw className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};
