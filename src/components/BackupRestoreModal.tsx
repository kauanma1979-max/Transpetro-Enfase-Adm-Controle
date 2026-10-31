import React, { useState, useRef, useEffect } from 'react';
import { 
  X, 
  Download, 
  Upload, 
  CheckCircle2, 
  AlertTriangle, 
  Database, 
  FileJson, 
  RefreshCw,
  Calendar,
  BookOpen,
  HelpCircle,
  Link as LinkIcon,
  Sparkles,
  Copy,
  Check,
  Code2,
  Cloud
} from 'lucide-react';
import { 
  exportFullBackup, 
  importFullBackup, 
  getBackupStats, 
  BackupStats, 
  getBackupJsonString, 
  importBackupFromJsonString,
  copyBackupToClipboard 
} from '../utils/backupStorage';
import { DriveSyncPanel } from './DriveSyncPanel';

interface BackupRestoreModalProps {
  isOpen: boolean;
  onClose: () => void;
  onDataRestored?: () => void;
  initialTab?: 'drive' | 'file' | 'code';
}

export const BackupRestoreModal: React.FC<BackupRestoreModalProps> = ({
  isOpen,
  onClose,
  onDataRestored,
  initialTab = 'drive'
}) => {
  const [activeMode, setActiveMode] = useState<'drive' | 'file' | 'code'>(initialTab);
  const [stats, setStats] = useState<BackupStats>(getBackupStats());
  const [isImporting, setIsImporting] = useState<boolean>(false);
  const [feedback, setFeedback] = useState<{ type: 'success' | 'error'; message: string } | null>(null);
  const [copied, setCopied] = useState<boolean>(false);
  const [rawJsonInput, setRawJsonInput] = useState<string>('');
  const [previewJson, setPreviewJson] = useState<string>('');
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen) {
      setActiveMode(initialTab);
      const currentStats = getBackupStats();
      setStats(currentStats);
      setFeedback(null);
      setCopied(false);
      try {
        const jsonStr = getBackupJsonString();
        setPreviewJson(jsonStr);
      } catch (e) {
        setPreviewJson('');
      }
    }
  }, [isOpen, initialTab]);

  if (!isOpen) return null;

  const handleExport = () => {
    try {
      exportFullBackup();
      setFeedback({
        type: 'success',
        message: 'Arquivo "PLATAFORMA TRANSPETRO.json" baixado com sucesso! Contém todas as informações do seu estudo.'
      });
      setStats(getBackupStats());
    } catch (e: any) {
      setFeedback({
        type: 'error',
        message: `Falha ao gerar backup: ${e?.message || 'Erro desconhecido'}`
      });
    }
  };

  const handleCopyClipboard = async () => {
    try {
      const success = await copyBackupToClipboard();
      if (success) {
        setCopied(true);
        setFeedback({
          type: 'success',
          message: 'Código JSON completo copiado para a Área de Transferência (Clipboard)! Você pode colar onde quiser.'
        });
        setTimeout(() => setCopied(false), 3000);
      } else {
        setFeedback({
          type: 'error',
          message: 'Não foi possível copiar automaticamente. Use a aba "Código JSON" para copiar manualmente.'
        });
      }
    } catch (e: any) {
      setFeedback({
        type: 'error',
        message: `Erro ao copiar: ${e?.message || 'Permissão negada'}`
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
      setPreviewJson(getBackupJsonString());
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

  const handleRestoreFromTextInput = () => {
    if (!rawJsonInput.trim()) {
      setFeedback({
        type: 'error',
        message: 'Por favor, cole o texto JSON antes de clicar em restaurar.'
      });
      return;
    }

    setIsImporting(true);
    setFeedback(null);

    const result = importBackupFromJsonString(rawJsonInput);
    setIsImporting(false);

    if (result.success) {
      setFeedback({
        type: 'success',
        message: result.message
      });
      if (result.stats) setStats(result.stats);
      setPreviewJson(getBackupJsonString());
      setRawJsonInput('');
      if (onDataRestored) onDataRestored();
    } else {
      setFeedback({
        type: 'error',
        message: result.message
      });
    }
  };

  const jsonSizeKB = (previewJson.length / 1024).toFixed(1);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-xs animate-fadeIn">
      <div 
        className="bg-white w-full max-w-2xl rounded-2xl shadow-2xl border border-slate-200 overflow-hidden flex flex-col max-h-[92vh] animate-scaleUp"
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
                Backup e Sincronização em Nuvem
              </h3>
              <p className="text-xs text-slate-300">
                Sincronize com o Google Drive ou salve/restaure todo o seu progresso localmente
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-5 sm:p-6 space-y-5 overflow-y-auto">
          {/* Current Stats Overview */}
          <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 space-y-3">
            <div className="text-xs font-bold text-slate-700 uppercase tracking-wider flex items-center justify-between">
              <span>Status dos Dados Armazenados</span>
              <span className="text-[11px] font-semibold text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded-md font-mono">
                {stats.totalItems} registros ({jsonSizeKB} KB)
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

          {/* Mode Switcher */}
          <div className="flex border-b border-slate-200">
            <button
              onClick={() => setActiveMode('drive')}
              className={`flex-1 py-2.5 text-xs font-bold border-b-2 flex items-center justify-center gap-2 transition cursor-pointer ${
                activeMode === 'drive'
                  ? 'border-blue-600 text-blue-700 bg-blue-50/50'
                  : 'border-transparent text-slate-500 hover:text-slate-800'
              }`}
            >
              <Cloud className="w-4 h-4 text-blue-600" />
              <span>Google Drive (Nuvem)</span>
            </button>
            <button
              onClick={() => setActiveMode('file')}
              className={`flex-1 py-2.5 text-xs font-bold border-b-2 flex items-center justify-center gap-2 transition cursor-pointer ${
                activeMode === 'file'
                  ? 'border-emerald-600 text-emerald-700 bg-emerald-50/50'
                  : 'border-transparent text-slate-500 hover:text-slate-800'
              }`}
            >
              <FileJson className="w-4 h-4 text-emerald-600" />
              <span>Arquivo .JSON</span>
            </button>
            <button
              onClick={() => setActiveMode('code')}
              className={`flex-1 py-2.5 text-xs font-bold border-b-2 flex items-center justify-center gap-2 transition cursor-pointer ${
                activeMode === 'code'
                  ? 'border-purple-600 text-purple-700 bg-purple-50/50'
                  : 'border-transparent text-slate-500 hover:text-slate-800'
              }`}
            >
              <Code2 className="w-4 h-4 text-purple-600" />
              <span>Código JSON</span>
            </button>
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
              <div className="leading-relaxed font-medium">{feedback.message}</div>
            </div>
          )}

          {/* Mode 1: Google Drive Sync */}
          {activeMode === 'drive' && (
            <DriveSyncPanel 
              onSyncSuccess={() => {
                setStats(getBackupStats());
                setPreviewJson(getBackupJsonString());
                if (onDataRestored) onDataRestored();
              }}
            />
          )}

          {/* Mode 2: File based Backup / Restore */}
          {activeMode === 'file' && (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Export Backup Box */}
              <div className="border border-slate-200 hover:border-emerald-300 rounded-xl p-5 bg-white space-y-3 flex flex-col justify-between transition shadow-xs">
                <div className="space-y-1.5">
                  <div className="w-9 h-9 rounded-lg bg-emerald-100 text-emerald-800 flex items-center justify-center font-bold">
                    <Download className="w-5 h-5" />
                  </div>
                  <h4 className="text-sm font-bold text-slate-900">1. Baixar Arquivo Único (.JSON)</h4>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Gera e faz o download automático do arquivo <strong>PLATAFORMA TRANSPETRO.json</strong> com 100% de todas as suas informações reunidas.
                  </p>
                </div>
                <div className="space-y-2 pt-2">
                  <button
                    id="btn-modal-export-backup"
                    onClick={handleExport}
                    className="w-full py-2.5 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs flex items-center justify-center gap-2 shadow-xs transition cursor-pointer"
                  >
                    <Download className="w-4 h-4" />
                    <span>Baixar PLATAFORMA TRANSPETRO.json</span>
                  </button>
                  <button
                    onClick={handleCopyClipboard}
                    className="w-full py-2 px-3 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold text-xs flex items-center justify-center gap-1.5 transition cursor-pointer"
                  >
                    {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5 text-slate-500" />}
                    <span>{copied ? 'Copiado para o Clipboard!' : 'Ou Copiar Texto JSON'}</span>
                  </button>
                </div>
              </div>

              {/* Restore Backup Box */}
              <div className="border border-slate-200 hover:border-blue-300 rounded-xl p-5 bg-white space-y-3 flex flex-col justify-between transition shadow-xs">
                <div className="space-y-1.5">
                  <div className="w-9 h-9 rounded-lg bg-blue-100 text-blue-800 flex items-center justify-center font-bold">
                    <Upload className="w-5 h-5" />
                  </div>
                  <h4 className="text-sm font-bold text-slate-900">2. Restaurar de Arquivo</h4>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Carregue um arquivo <strong>.json</strong> salvo anteriormente para restaurar 100% dos dados.
                  </p>
                </div>
                <div className="pt-2">
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
          )}

          {/* Mode 3: Raw JSON Text */}
          {activeMode === 'code' && (
            <div className="space-y-4">
              {/* Copy Current State */}
              <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-slate-800 flex items-center gap-1.5">
                    <Code2 className="w-4 h-4 text-blue-600" /> JSON Atual Gerado ({jsonSizeKB} KB)
                  </span>
                  <button
                    onClick={handleCopyClipboard}
                    className="px-3 py-1 bg-white hover:bg-slate-100 text-slate-800 font-bold text-xs rounded-lg border border-slate-300 flex items-center gap-1.5 transition cursor-pointer shadow-2xs"
                  >
                    {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5 text-slate-600" />}
                    <span>{copied ? 'Copiado!' : 'Copiar Tudo'}</span>
                  </button>
                </div>
                <pre className="bg-slate-900 text-emerald-400 p-3 rounded-lg text-[11px] font-mono max-h-36 overflow-y-auto overflow-x-auto select-all">
                  {previewJson}
                </pre>
              </div>

              {/* Paste & Restore */}
              <div className="border border-slate-200 rounded-xl p-4 bg-white space-y-3">
                <div className="text-xs font-bold text-slate-900 flex items-center gap-1.5">
                  <Upload className="w-4 h-4 text-emerald-600" /> Colar Código JSON para Restaurar
                </div>
                <textarea
                  value={rawJsonInput}
                  onChange={(e) => setRawJsonInput(e.target.value)}
                  placeholder="Cole aqui o texto JSON de backup copiado anteriormente..."
                  rows={4}
                  className="w-full p-3 rounded-lg border border-slate-300 text-xs font-mono text-slate-800 focus:ring-2 focus:ring-blue-500 focus:outline-hidden"
                />
                <button
                  onClick={handleRestoreFromTextInput}
                  disabled={isImporting || !rawJsonInput.trim()}
                  className="w-full py-2.5 px-4 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs flex items-center justify-center gap-2 shadow-xs transition cursor-pointer disabled:opacity-40"
                >
                  {isImporting ? <RefreshCw className="w-4 h-4 animate-spin" /> : <CheckCircle2 className="w-4 h-4" />}
                  <span>Aplicar e Restaurar deste JSON</span>
                </button>
              </div>
            </div>
          )}

          <div className="text-[11px] text-slate-600 bg-slate-50 p-3 rounded-lg border border-slate-200/80 leading-relaxed flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-amber-500 shrink-0" />
            <span>
              <strong>Dica de Segurança:</strong> Seus dados de cronograma, caderno de erros, anotações e links ficam salvos com segurança no seu navegador.
            </span>
          </div>
        </div>

        {/* Footer */}
        <div className="bg-slate-100 p-4 border-t border-slate-200 flex items-center justify-end">
          <button
            onClick={onClose}
            className="px-5 py-2 bg-white hover:bg-slate-200 text-slate-700 font-semibold text-xs rounded-xl border border-slate-300 transition cursor-pointer"
          >
            Fechar
          </button>
        </div>
      </div>
    </div>
  );
};
