import React, { useState, useEffect } from 'react';
import { 
  Cloud, 
  RefreshCw, 
  CheckCircle2, 
  AlertTriangle, 
  HelpCircle, 
  Copy, 
  Check, 
  Code, 
  RotateCcw, 
  ExternalLink,
  ChevronDown,
  ChevronUp,
  ShieldCheck,
  Zap,
  Info
} from 'lucide-react';
import { 
  getDriveEndpoint, 
  setDriveEndpoint, 
  getDriveAutoSync, 
  setDriveAutoSync,
  getDriveSyncValidated,
  getLastDriveSyncDate,
  getPreSyncSafetyBackup,
  restorePreSyncSafetyBackup,
  fetchGoogleDriveDataViaJsonp,
  getGoogleAppsScriptTemplate,
  normalizeAppsScriptUrl,
  GOOGLE_DRIVE_DEFAULT_FILE_PREFIX
} from '../utils/driveSync';

interface DriveSyncPanelProps {
  onSyncSuccess?: () => void;
  compact?: boolean;
}

export const DriveSyncPanel: React.FC<DriveSyncPanelProps> = ({ 
  onSyncSuccess,
  compact = false 
}) => {
  const [endpoint, setEndpoint] = useState<string>(getDriveEndpoint());
  const [autoSync, setAutoSync] = useState<boolean>(getDriveAutoSync());
  const [isValidated, setIsValidated] = useState<boolean>(getDriveSyncValidated());
  const [lastSync, setLastSync] = useState<string | null>(getLastDriveSyncDate());
  const [statusText, setStatusText] = useState<string>('Pronto para sincronizar');
  const [statusType, setStatusType] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [showScriptCode, setShowScriptCode] = useState<boolean>(false);
  const [codeCopied, setCodeCopied] = useState<boolean>(false);
  const [hasSafetyBackup, setHasSafetyBackup] = useState<boolean>(Boolean(getPreSyncSafetyBackup()));
  const [urlFixedNotice, setUrlFixedNotice] = useState<boolean>(false);

  useEffect(() => {
    const saved = getDriveEndpoint();
    setEndpoint(saved);
    setAutoSync(getDriveAutoSync());
    setIsValidated(getDriveSyncValidated());
    setLastSync(getLastDriveSyncDate());
    setHasSafetyBackup(Boolean(getPreSyncSafetyBackup()));
  }, []);

  const handleEndpointChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setEndpoint(val);
    setDriveEndpoint(val);
    setUrlFixedNotice(false);
    if (isValidated) {
      setIsValidated(false);
    }
  };

  const handleFixUrl = () => {
    const fixed = normalizeAppsScriptUrl(endpoint);
    setEndpoint(fixed);
    setDriveEndpoint(fixed);
    setUrlFixedNotice(true);
    setStatusText('URL corrigida para o formato final /exec.');
    setStatusType('idle');
  };

  const trimmedUrl = endpoint.trim();
  const isInvalidUrlFormat = trimmedUrl.length > 0 && (
    trimmedUrl.includes('/edit') || 
    trimmedUrl.includes('/dev') || 
    (trimmedUrl.startsWith('https://script.google.com/macros/s/') && !trimmedUrl.endsWith('/exec'))
  );

  const handleAutoSyncToggle = (e: React.ChangeEvent<HTMLInputElement>) => {
    const checked = e.target.checked;
    setAutoSync(checked);
    setDriveAutoSync(checked);
  };

  const executarSincronizacao = async () => {
    if (isLoading) return;

    let targetUrl = endpoint.trim();
    if (!targetUrl) {
      setStatusText('Cole a URL do Google Apps Script antes de atualizar.');
      setStatusType('error');
      return;
    }

    // Auto-repair if missing /exec or having /edit /dev
    const normalized = normalizeAppsScriptUrl(targetUrl);
    if (normalized !== targetUrl) {
      targetUrl = normalized;
      setEndpoint(normalized);
      setDriveEndpoint(normalized);
      setUrlFixedNotice(true);
    }

    if (!targetUrl.startsWith('https://script.google.com/')) {
      setStatusText('A URL deve iniciar com https://script.google.com/...');
      setStatusType('error');
      return;
    }

    setIsLoading(true);
    setStatusType('loading');
    setStatusText('Buscando dados no Google Drive...');

    try {
      await fetchGoogleDriveDataViaJsonp(targetUrl, (msg) => {
        setStatusText(msg);
      });

      setStatusType('success');
      setStatusText('Sincronização concluída com sucesso!');
      setIsValidated(true);
      setLastSync(new Date().toLocaleString('pt-BR'));
      setHasSafetyBackup(Boolean(getPreSyncSafetyBackup()));
      setUrlFixedNotice(false);
      if (onSyncSuccess) {
        onSyncSuccess();
      }
    } catch (err: any) {
      setStatusType('error');
      setStatusText(err?.message || 'Falha no acesso. Confira a URL e as permissões.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleUndoSync = () => {
    if (window.confirm('Deseja desfazer a última sincronização e restaurar os dados locais exatamente como estavam antes de sincronizar?')) {
      const res = restorePreSyncSafetyBackup();
      if (res.success) {
        setStatusType('success');
        setStatusText('Sincronização desfeita! Dados locais restaurados.');
        setHasSafetyBackup(false);
        if (onSyncSuccess) onSyncSuccess();
      } else {
        setStatusType('error');
        setStatusText(res.message);
      }
    }
  };

  const handleCopyScript = async () => {
    try {
      const script = getGoogleAppsScriptTemplate(GOOGLE_DRIVE_DEFAULT_FILE_PREFIX);
      if (navigator.clipboard && navigator.clipboard.writeText) {
        await navigator.clipboard.writeText(script);
      } else {
        const textarea = document.createElement('textarea');
        textarea.value = script;
        textarea.style.position = 'fixed';
        textarea.style.opacity = '0';
        document.body.appendChild(textarea);
        textarea.select();
        document.execCommand('copy');
        document.body.removeChild(textarea);
      }
      setCodeCopied(true);
      setTimeout(() => setCodeCopied(false), 3000);
    } catch {
      // ignore
    }
  };

  return (
    <div className="bg-gradient-to-br from-white to-slate-50 rounded-2xl border border-slate-200 shadow-xs p-5 space-y-4">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-100 pb-3.5">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 border border-blue-200 flex items-center justify-center font-bold">
            <Cloud className="w-5 h-5" />
          </div>
          <div>
            <h4 className="text-sm sm:text-base font-bold text-slate-900 flex items-center gap-2">
              Sincronização com Google Drive
              <span className="text-[10px] uppercase font-mono px-2 py-0.5 rounded-full bg-blue-100 text-blue-800 font-bold">
                Nuvem
              </span>
            </h4>
            <p className="text-xs text-slate-500 flex flex-wrap items-center gap-1.5">
              <span>Busca no Drive:</span>
              <span className="font-mono font-bold text-slate-800 bg-slate-100 px-1.5 py-0.5 rounded-sm">{GOOGLE_DRIVE_DEFAULT_FILE_PREFIX}*.json</span>
              <span className="text-[10px] text-emerald-700 bg-emerald-50 px-1.5 py-0.5 rounded-sm font-semibold">
                (pega o mais recente, ignora data/hora)
              </span>
            </p>
          </div>
        </div>

        {lastSync && (
          <div className="text-right">
            <div className="text-[10px] text-slate-400 font-medium">Última sincronização</div>
            <div className="text-xs font-mono font-semibold text-slate-700">{lastSync}</div>
          </div>
        )}
      </div>

      {/* Input de URL */}
      <div className="space-y-1.5">
        <label className="text-xs font-bold text-slate-700 flex items-center justify-between">
          <span>URL do Web App (Google Apps Script /exec):</span>
          {isValidated ? (
            <span className="text-[11px] text-emerald-600 font-bold flex items-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5" /> Validada
            </span>
          ) : (
            <span className="text-[11px] text-slate-400 font-normal">Termina em /exec</span>
          )}
        </label>
        <div className="relative">
          <input
            type="url"
            value={endpoint}
            onChange={handleEndpointChange}
            placeholder="https://script.google.com/macros/s/.../exec"
            className={`w-full text-xs font-mono px-3.5 py-2.5 rounded-xl border bg-white focus:outline-hidden focus:ring-2 transition-all ${
              isInvalidUrlFormat
                ? 'border-amber-400 focus:ring-amber-400 text-amber-900'
                : 'border-slate-300 focus:ring-blue-500 text-slate-800'
            }`}
          />
        </div>

        {urlFixedNotice && (
          <div className="flex items-center gap-2 bg-emerald-50 border border-emerald-200 text-emerald-900 p-2.5 rounded-xl text-xs">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
            <span>URL formatada automaticamente para o endpoint público final <strong>/exec</strong>.</span>
          </div>
        )}

        {isInvalidUrlFormat && (
          <div className="flex items-center justify-between bg-amber-50 border border-amber-200 text-amber-900 p-2.5 rounded-xl text-xs">
            <div className="flex items-center gap-2">
              <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0" />
              <span>A URL do Apps Script precisa terminar em <strong>/exec</strong> (sem /edit ou /dev).</span>
            </div>
            <button
              type="button"
              onClick={handleFixUrl}
              className="ml-2 px-2.5 py-1 bg-amber-600 hover:bg-amber-700 text-white rounded-lg text-[11px] font-bold shrink-0 transition cursor-pointer"
            >
              Corrigir para /exec
            </button>
          </div>
        )}
      </div>

      {/* Botão Oficial e Status Obrigatórios pelo Spec */}
      <div 
        id="drive-sync" 
        className="flex flex-wrap items-center gap-3 pt-1"
        style={{ fontFamily: 'inherit', margin: '12px 0' }}
      >
        <button
          id="drive-sync-btn"
          type="button"
          onClick={executarSincronizacao}
          disabled={isLoading}
          style={{
            padding: '10px 16px',
            border: 0,
            borderRadius: '8px',
            cursor: isLoading ? 'not-allowed' : 'pointer',
            backgroundColor: isLoading ? '#94a3b8' : '#2563eb',
            color: 'white',
            fontWeight: 600,
            fontSize: '13px',
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            boxShadow: '0 1px 2px rgba(0,0,0,0.05)',
            transition: 'background-color 0.2s'
          }}
        >
          {isLoading && <RefreshCw className="w-4 h-4 animate-spin" />}
          <span>Atualizar dados do Google Drive</span>
        </button>

        <span
          id="drive-sync-status"
          role="status"
          style={{
            marginLeft: '10px',
            fontSize: '13px',
            fontWeight: 500,
            color: statusType === 'error' ? '#dc2626' : statusType === 'success' ? '#16a34a' : '#475569'
          }}
        >
          {statusText}
        </span>
      </div>

      {/* Guia de Solução Rápida caso ocorra erro de acesso ou permissão */}
      {statusType === 'error' && (
        <div className="bg-rose-50 border border-rose-200 rounded-xl p-3.5 space-y-3 text-xs text-rose-900 animate-fadeIn">
          <div className="flex items-start gap-2.5">
            <AlertTriangle className="w-5 h-5 text-rose-600 shrink-0 mt-0.5" />
            <div className="space-y-1">
              <div className="font-bold text-rose-950 text-sm">
                Diagnóstico: Como liberar o acesso no Google Apps Script
              </div>
              <p className="text-rose-800 text-[11px] leading-relaxed">
                O navegador foi impedido de carregar o arquivo. Em 99% dos casos, isso ocorre porque a implantação no Apps Script está com <strong>"Quem tem acesso: Somente eu"</strong> (o Google bloqueia o acesso externo de qualquer app).
              </p>
            </div>
          </div>

          <div className="bg-white/90 border border-rose-200/80 rounded-lg p-3 space-y-2 text-[11px] text-slate-700">
            <div className="font-bold text-slate-900">Como ajustar a permissão em 1 minuto:</div>
            <ol className="list-decimal list-inside space-y-1.5 text-slate-600 leading-relaxed">
              <li>Acesse <a href="https://script.google.com" target="_blank" rel="noreferrer" className="text-blue-600 font-bold underline inline-flex items-center gap-0.5">script.google.com <ExternalLink className="w-2.5 h-2.5" /></a> e abra seu projeto.</li>
              <li>No canto superior direito, clique em <strong>Implantar &gt; Gerenciar implantações</strong>.</li>
              <li>Clique no ícone de <strong>Lápis (Editar)</strong> da sua implantação ativa.</li>
              <li>No campo <strong>"Quem tem acesso"</strong>, selecione <strong>"Qualquer pessoa"</strong> (Anyone).</li>
              <li>No campo <strong>Versão</strong>, escolha <strong>"Nova versão"</strong> e clique em <strong>Implantar</strong>.</li>
            </ol>
          </div>

          <div className="flex flex-wrap items-center gap-2 pt-1">
            {trimmedUrl && (
              <a
                href={normalizeAppsScriptUrl(trimmedUrl)}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-rose-600 hover:bg-rose-700 text-white rounded-lg font-bold text-xs shadow-xs transition"
              >
                <ExternalLink className="w-3.5 h-3.5" />
                <span>Testar link no navegador ↗</span>
              </a>
            )}
            <button
              type="button"
              onClick={executarSincronizacao}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-white hover:bg-slate-100 text-slate-800 border border-slate-300 rounded-lg font-bold text-xs transition cursor-pointer"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              <span>Tentar novamente</span>
            </button>
          </div>
        </div>
      )}

      {/* Opções Avançadas e Segurança */}
      <div className="flex flex-wrap items-center justify-between gap-3 pt-2 border-t border-slate-100 text-xs">
        {/* Toggle Auto Sync */}
        <label 
          className={`flex items-center gap-2 cursor-pointer select-none font-medium ${
            !isValidated ? 'opacity-50 cursor-not-allowed text-slate-400' : 'text-slate-700 hover:text-slate-900'
          }`}
          title={!isValidated ? 'Sincronize pelo menos uma vez com sucesso para habilitar atualização automática' : ''}
        >
          <input
            type="checkbox"
            checked={autoSync}
            onChange={handleAutoSyncToggle}
            disabled={!isValidated}
            className="w-4 h-4 rounded-sm text-blue-600 border-slate-300 focus:ring-blue-500 cursor-pointer disabled:cursor-not-allowed"
          />
          <span>Atualizar dados automaticamente ao abrir o app</span>
          {!isValidated && (
            <span className="text-[10px] text-amber-600 bg-amber-50 px-1.5 py-0.5 rounded-sm font-semibold">
              Requer validação prévia
            </span>
          )}
        </label>

        {/* Botão Desfazer Sincronização */}
        {hasSafetyBackup && (
          <button
            type="button"
            onClick={handleUndoSync}
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-rose-600 hover:text-rose-800 hover:bg-rose-50 px-2.5 py-1.5 rounded-lg border border-rose-200 transition cursor-pointer"
            title="Reverte todas as alterações e restaura seus dados locais anteriores"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Desfazer Sincronização</span>
          </button>
        )}
      </div>

      {/* Regra de Mesclagem Segura */}
      <div className="bg-emerald-50/70 border border-emerald-200/80 rounded-xl p-3 text-[11px] text-emerald-900 leading-relaxed flex items-start gap-2">
        <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
        <div>
          <strong>Sincronização Segura e Inteligente (Anti-Perda):</strong> O aplicativo une os dias e matérias concluídos do seu aparelho com os do Google Drive. Nada do seu progresso local é apagado. Além disso, um backup de segurança é criado automaticamente antes de sincronizar para que você possa desfazer se desejar.
        </div>
      </div>

      {/* Accordion: Código e Instruções do Google Apps Script */}
      <div className="border border-slate-200 rounded-xl overflow-hidden bg-white">
        <button
          type="button"
          onClick={() => setShowScriptCode(!showScriptCode)}
          className="w-full px-4 py-2.5 flex items-center justify-between text-xs font-bold text-slate-700 hover:bg-slate-50 transition cursor-pointer"
        >
          <div className="flex items-center gap-2">
            <Code className="w-4 h-4 text-blue-600" />
            <span>Passo a Passo & Código do Google Apps Script (Prefixo: "{GOOGLE_DRIVE_DEFAULT_FILE_PREFIX}*")</span>
          </div>
          {showScriptCode ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
        </button>

        {showScriptCode && (
          <div className="p-4 border-t border-slate-200 bg-slate-50/50 space-y-3 text-xs">
            <div className="space-y-1.5 text-slate-600">
              <div className="font-bold text-slate-800">Como configurar em 4 passos simples:</div>
              <ol className="list-decimal list-inside space-y-1 text-[11px]">
                <li>Salve o arquivo no seu Google Drive com qualquer nome que comece com <code className="bg-slate-200 px-1 py-0.2 rounded-sm font-bold text-slate-800">backup_pareto_transpetro</code> (ex: <code className="font-mono text-slate-700">backup_pareto_transpetro_2026-10-22.json</code>, <code className="font-mono text-slate-700">backup_pareto_transpetro_2026-10-23.json</code>, etc.). O script ignora datas/horários e escolhe automaticamente o <strong>mais recente</strong>!</li>
                <li>Acesse <a href="https://script.google.com" target="_blank" rel="noreferrer" className="text-blue-600 hover:underline font-semibold inline-flex items-center gap-0.5">script.google.com <ExternalLink className="w-2.5 h-2.5" /></a> e clique em <strong>Novo projeto</strong>.</li>
                <li>Cole o código abaixo no arquivo <code className="font-mono">Código.gs</code> e clique em <strong>Salvar (💾)</strong>.</li>
                <li>Clique em <strong>Implantar &gt; Nova implantação</strong>. Selecione <em>Tipo: Aplicativo da Web</em>, <em>Executar como: Eu</em> e <strong><em>Quem tem acesso: Qualquer pessoa</em></strong> (obrigatório). Copie a URL <code className="font-mono">/exec</code> gerada e cole no campo acima!</li>
              </ol>

              {/* Dica para erro 401 invalid_client / OAuth client not fully created */}
              <div className="bg-amber-50/90 border border-amber-200 rounded-lg p-2.5 text-[11px] text-amber-900 space-y-1">
                <div className="font-bold flex items-center gap-1.5 text-amber-950">
                  <AlertTriangle className="w-3.5 h-3.5 text-amber-600 shrink-0" />
                  <span>Apareceu "The OAuth client is not fully created yet" (Erro 401)?</span>
                </div>
                <p className="text-slate-600 text-[10.5px] leading-relaxed">
                  Isso é normal quando um script acaba de ser criado: os servidores do Google levam de <strong>2 a 5 minutos</strong> para propagar as credenciais internas, ou ocorre conflito se houver mais de uma conta Google conectada no mesmo navegador. 
                  <strong> Solução:</strong> Espere 3 minutos e tente autorizar de novo, ou faça o procedimento em uma <strong>Janela Anônima (Ctrl+Shift+N)</strong> logado apenas com sua conta Google.
                </p>
              </div>
            </div>

            <div className="relative">
              <div className="flex items-center justify-between pb-1.5">
                <span className="text-[11px] font-mono text-slate-500 font-bold">Código.gs (Google Apps Script):</span>
                <button
                  type="button"
                  onClick={handleCopyScript}
                  className="px-2.5 py-1 bg-white hover:bg-slate-100 border border-slate-300 rounded-lg text-[11px] font-bold text-slate-700 flex items-center gap-1 transition cursor-pointer"
                >
                  {codeCopied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5 text-slate-500" />}
                  <span>{codeCopied ? 'Copiado!' : 'Copiar Código'}</span>
                </button>
              </div>
              <pre className="bg-slate-900 text-emerald-300 p-3 rounded-xl text-[10px] font-mono overflow-x-auto max-h-60 leading-relaxed select-all">
                {getGoogleAppsScriptTemplate(GOOGLE_DRIVE_DEFAULT_FILE_PREFIX)}
              </pre>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
