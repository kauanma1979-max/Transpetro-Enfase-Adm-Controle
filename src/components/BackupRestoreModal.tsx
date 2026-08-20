import React, { useState, useRef, useEffect } from 'react';
import { 
  X, 
  Download, 
  Upload, 
  CheckCircle2, 
  AlertTriangle, 
  HardDrive, 
  Database, 
  FileJson, 
  RefreshCw,
  Calendar,
  BookOpen,
  HelpCircle,
  Link as LinkIcon,
  Sparkles
} from 'lucide-react';
import { exportFullBackup, importFullBackup, getBackupStats, BackupStats } from '../utils/backupStorage';

interface BackupRestoreModalProps {
  isOpen: boolean;
  onClose: () => void;
  onDataRestored?: () => void;
}

export const BackupRestoreModal: React.FC<BackupRestoreModalProps> = ({
  isOpen,
  onClose,
  onDataRestored
}) => {
  const [stats, setStats] = useState<BackupStats>(getBackupStats());
  const [isImporting, setIsImporting] = useState<boolean>(false);
  const [feedback, setFeedback] = useState<{ type: 'success' | 'error'; message: string } | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen) {
      setStats(getBackupStats());
      setFeedback(null);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleExport = () => {
    try {
      exportFullBackup();
      setFeedback({
        type: 'success',
        message: 'Arquivo de backup gerado e baixado com sucesso! Guarde este arquivo em segurança.'
      });
      setStats(getBackupStats());
    } catch (e: any) {
      setFeedback({
        type: 'error',
        message: `Falha ao gerar backup: ${e?.message || 'Erro desconhecido'}`
      });
    }
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsImporting(true);
    setFeedback(null);

    const result = await importFullBackup(file);
    setIsImporting(false);

    if (result.success) {
      setFeedback({
        type: 'success',
        message: result.message
      });
      if (result.stats) setStats(result.stats);
      if (onDataRestored) onDataRestored();
    } else {
      setFeedback({
        type: 'error',
        message: result.message
      });
    }

    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-xs animate-fadeIn">
      <div 
        className="bg-white w-full max-w-xl rounded-2xl shadow-2xl border border-slate-200 overflow-hidden flex flex-col max-h-[90vh] animate-scaleUp"
        onClick={e => e.stopPropagation()}
      >
        {/* Header */}
        <div className="bg-gradient-to-r from-slate-900 via-slate-850 to-slate-900 text-white p-5 flex items-center justify-between border-b border-slate-800">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 flex items-center justify-center font-bold">
              <Database className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base sm:text-lg font-bold text-white tracking-tight flex items-center gap-2">
                Backup e Restauração de Dados
              </h3>
              <p className="text-xs text-slate-300">
                Salve ou restaure todo o seu progresso de estudos em arquivo JSON
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6 overflow-y-auto">
          {/* Current Stats Overview */}
          <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 space-y-3">
            <div className="text-xs font-bold text-slate-700 uppercase tracking-wider flex items-center justify-between">
              <span>Status dos Dados Armazenados Localmente</span>
              <span className="text-[11px] font-semibold text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded-md font-mono">
                {stats.totalItems} registros
              </span>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
              <div className="bg-white p-2.5 rounded-lg border border-slate-200 text-center">
                <div className="text-[11px] text-slate-500 flex items-center justify-center gap-1">
                  <Calendar className="w-3 h-3 text-emerald-600" /> Dias Feitos
                </div>
                <div className="text-sm font-bold text-slate-900 mt-0.5">{stats.completedDaysCount}</div>
              </div>
              <div className="bg-white p-2.5 rounded-lg border border-slate-200 text-center">
                <div className="text-[11px] text-slate-500 flex items-center justify-center gap-1">
                  <BookOpen className="w-3 h-3 text-blue-600" /> Tópicos Edital
                </div>
                <div className="text-sm font-bold text-slate-900 mt-0.5">{stats.verticalTopicsCount}</div>
              </div>
              <div className="bg-white p-2.5 rounded-lg border border-slate-200 text-center">
                <div className="text-[11px] text-slate-500 flex items-center justify-center gap-1">
                  <HelpCircle className="w-3 h-3 text-purple-600" /> Caderno Erros
                </div>
                <div className="text-sm font-bold text-slate-900 mt-0.5">{stats.errorNotebookCount}</div>
              </div>
              <div className="bg-white p-2.5 rounded-lg border border-slate-200 text-center">
                <div className="text-[11px] text-slate-500 flex items-center justify-center gap-1">
                  <LinkIcon className="w-3 h-3 text-amber-600" /> Links & Materiais
                </div>
                <div className="text-sm font-bold text-slate-900 mt-0.5">{stats.materialLinksCount}</div>
              </div>
            </div>
          </div>

          {/* Feedback message */}
          {feedback && (
            <div className={`p-4 rounded-xl text-xs flex items-start gap-3 border ${
              feedback.type === 'success'
                ? 'bg-emerald-50 text-emerald-900 border-emerald-200'
                : 'bg-rose-50 text-rose-900 border-rose-200'
            }`}>
              {feedback.type === 'success' ? (
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
              ) : (
                <AlertTriangle className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
              )}
              <div className="leading-relaxed">{feedback.message}</div>
            </div>
          )}

          {/* Action Boxes */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Export Backup Box */}
            <div className="border border-slate-200 hover:border-emerald-300 rounded-xl p-5 bg-white space-y-3 flex flex-col justify-between transition shadow-xs">
              <div className="space-y-1.5">
                <div className="w-9 h-9 rounded-lg bg-emerald-100 text-emerald-800 flex items-center justify-center font-bold">
                  <Download className="w-5 h-5" />
                </div>
                <h4 className="text-sm font-bold text-slate-900">1. Fazer Backup (Exportar)</h4>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Gera um arquivo <strong>.json</strong> completo com todos os seus dias estudados, anotações, caderno de erros, progresso do edital e links.
                </p>
              </div>
              <button
                id="btn-modal-export-backup"
                onClick={handleExport}
                className="w-full py-2.5 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs flex items-center justify-center gap-2 shadow-xs transition cursor-pointer"
              >
                <Download className="w-4 h-4" />
                <span>Baixar Arquivo de Backup</span>
              </button>
            </div>

            {/* Restore Backup Box */}
            <div className="border border-slate-200 hover:border-blue-300 rounded-xl p-5 bg-white space-y-3 flex flex-col justify-between transition shadow-xs">
              <div className="space-y-1.5">
                <div className="w-9 h-9 rounded-lg bg-blue-100 text-blue-800 flex items-center justify-center font-bold">
                  <Upload className="w-5 h-5" />
                </div>
                <h4 className="text-sm font-bold text-slate-900">2. Restaurar Backup (Importar)</h4>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Carregue um arquivo <strong>.json</strong> exportado anteriormente para recuperar 100% dos seus dados em qualquer dispositivo.
                </p>
              </div>
              <div>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept=".json,application/json"
                  onChange={handleFileChange}
                  className="hidden"
                  id="input-file-backup"
                />
                <button
                  id="btn-modal-import-backup"
                  onClick={() => fileInputRef.current?.click()}
                  disabled={isImporting}
                  className="w-full py-2.5 px-4 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs flex items-center justify-center gap-2 shadow-xs transition cursor-pointer disabled:opacity-50"
                >
                  {isImporting ? (
                    <RefreshCw className="w-4 h-4 animate-spin" />
                  ) : (
                    <Upload className="w-4 h-4" />
                  )}
                  <span>{isImporting ? 'Restaurando...' : 'Selecionar Arquivo JSON'}</span>
                </button>
              </div>
            </div>
          </div>

          <div className="text-[11px] text-slate-500 bg-slate-50 p-3 rounded-lg border border-slate-200/80 leading-relaxed flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-amber-500 shrink-0" />
            <span>
              <strong>Dica de Segurança:</strong> Faça um backup regular dos seus estudos. Os dados ficam salvos com segurança no seu navegador.
            </span>
          </div>
        </div>

        {/* Footer */}
        <div className="bg-slate-100 p-4 border-t border-slate-200 flex items-center justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-white hover:bg-slate-200 text-slate-700 font-semibold text-xs rounded-xl border border-slate-300 transition"
          >
            Fechar
          </button>
        </div>
      </div>
    </div>
  );
};
