import React, { useState, useEffect } from 'react';
import { 
  FileText, 
  FileSpreadsheet, 
  Target, 
  BookMarked, 
  Calendar, 
  Scissors, 
  AlertTriangle, 
  BookOpen,
  Clock
} from 'lucide-react';
import { TOTAL_SEMANAS_ESTUDO, TOTAL_HORAS_ESTUDO } from '../data/scheduleData';

export interface NavTabItem {
  id: string;
  label: string;
  icon: React.ElementType;
  badge?: string;
}

export const NAV_TABS: NavTabItem[] = [
  { id: 'edital', label: 'Resumo do Edital', icon: FileText, badge: 'Oficial' },
  { id: 'verticalizado', label: 'Edital Verticalizado', icon: FileSpreadsheet, badge: 'Prioridades' },
  { id: 'pareto', label: 'Pareto Recursivo', icon: Target, badge: '3 Camadas' },
  { id: 'material', label: 'Material de Estudos', icon: BookMarked, badge: 'Síntese' },
  { id: 'cronograma', label: `Cronograma ${TOTAL_SEMANAS_ESTUDO} Semanas`, icon: Calendar, badge: `${TOTAL_HORAS_ESTUDO}h` },
  { id: 'cortes', label: 'Regras de Corte', icon: Scissors, badge: 'Trade-offs' },
  { id: 'banca', label: 'Raio-X Cesgranrio', icon: AlertTriangle, badge: 'Pares' },
  { id: 'caderno', label: 'Caderno de Erros', icon: BookOpen, badge: 'Registro' }
];

interface NavigationTabsProps {
  activeTab: string;
  setActiveTab: (tabId: string) => void;
}

export const NavigationTabs: React.FC<NavigationTabsProps> = ({ activeTab, setActiveTab }) => {
  const [timeLeft, setTimeLeft] = useState<{ days: number; hours: number }>({ days: 0, hours: 0 });

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

  return (
    <div className="sticky top-0 z-30 pt-2 pb-3.5 bg-slate-100/90 backdrop-blur-md transition-all">
      <div className="w-full bg-white/95 backdrop-blur-md border border-slate-200/90 rounded-2xl p-2 sm:p-2.5 shadow-md hover:shadow-lg transition-shadow">
        {/* Contador Regressivo Discreto: Dia e Hora apenas (06/12/26) */}
        <div className="flex flex-wrap items-center justify-between gap-2 px-3 py-1.5 mb-2 bg-slate-50/90 border border-slate-200/80 rounded-xl text-xs">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse shrink-0"></span>
            <span className="font-bold text-slate-800 text-xs">Prova Transpetro:</span>
            <span className="text-slate-600 font-medium text-xs">06/12/2026 (Cesgranrio)</span>
          </div>

          <div className="flex items-center gap-1.5 font-mono text-xs font-semibold text-emerald-800 bg-emerald-100/80 border border-emerald-300/70 px-2.5 py-0.5 rounded-lg shadow-2xs">
            <Clock className="w-3.5 h-3.5 text-emerald-600" />
            <span>Faltam: <strong className="font-bold text-emerald-950">{timeLeft.days} dias</strong> e <strong className="font-bold text-emerald-950">{timeLeft.hours}h</strong></span>
          </div>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-1.5 sm:gap-2">
          {NAV_TABS.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;

            return (
              <button
                key={tab.id}
                id={`body-tab-nav-${tab.id}`}
                onClick={() => setActiveTab(tab.id)}
                className={`flex flex-col items-center justify-center p-2 sm:py-2.5 sm:px-2 rounded-xl text-center transition-all cursor-pointer relative group ${
                  isActive
                    ? 'bg-slate-900 text-white shadow-xs font-semibold ring-2 ring-emerald-500/50'
                    : 'bg-slate-50/90 hover:bg-slate-100 text-slate-700 hover:text-slate-900 border border-slate-200/80 hover:border-slate-300'
                }`}
              >
                <div className="flex items-center justify-center gap-1.5 mb-1">
                  <Icon className={`w-4 h-4 shrink-0 ${isActive ? 'text-emerald-400' : 'text-slate-500 group-hover:text-slate-800'}`} />
                  {tab.badge && (
                    <span className={`text-[10px] px-1.5 py-0.2 rounded-md font-mono font-bold leading-tight ${
                      isActive 
                        ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30' 
                        : 'bg-slate-200/80 text-slate-600'
                    }`}>
                      {tab.badge}
                    </span>
                  )}
                </div>

                <span className={`text-xs leading-tight tracking-tight font-medium ${
                  isActive ? 'text-white font-bold' : 'text-slate-700'
                }`}>
                  {tab.label}
                </span>

                {/* Active bottom line indicator */}
                {isActive && (
                  <div className="w-6 h-0.5 bg-emerald-400 rounded-full mt-1.5"></div>
                )}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};
