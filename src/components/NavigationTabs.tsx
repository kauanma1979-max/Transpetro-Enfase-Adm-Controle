import React from 'react';
import { 
  FileText, 
  FileSpreadsheet, 
  Target, 
  BookMarked, 
  Calendar, 
  Scissors, 
  AlertTriangle, 
  BookOpen 
} from 'lucide-react';

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
  { id: 'cronograma', label: 'Cronograma 15 Semanas', icon: Calendar, badge: '315h' },
  { id: 'cortes', label: 'Regras de Corte', icon: Scissors, badge: 'Trade-offs' },
  { id: 'banca', label: 'Raio-X Cesgranrio', icon: AlertTriangle, badge: 'Pares' },
  { id: 'caderno', label: 'Caderno de Erros', icon: BookOpen, badge: 'Registro' }
];

interface NavigationTabsProps {
  activeTab: string;
  setActiveTab: (tabId: string) => void;
}

export const NavigationTabs: React.FC<NavigationTabsProps> = ({ activeTab, setActiveTab }) => {
  return (
    <div className="w-full bg-white border border-slate-200 rounded-2xl p-2 sm:p-2.5 shadow-xs mb-6">
      <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-1.5 sm:gap-2">
        {NAV_TABS.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;

          return (
            <button
              key={tab.id}
              id={`body-tab-nav-${tab.id}`}
              onClick={() => setActiveTab(tab.id)}
              className={`flex flex-col items-center justify-center p-2.5 sm:py-2.5 sm:px-2 rounded-xl text-center transition-all cursor-pointer relative group ${
                isActive
                  ? 'bg-slate-900 text-white shadow-xs font-semibold ring-2 ring-emerald-500/50'
                  : 'bg-slate-50/80 hover:bg-slate-100 text-slate-700 hover:text-slate-900 border border-slate-200/80 hover:border-slate-300'
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
  );
};
