import React, { useState, useEffect } from 'react';
import { 
  Link as LinkIcon, 
  Plus, 
  ExternalLink, 
  Trash2, 
  Edit3, 
  FileText, 
  FileSpreadsheet, 
  Globe, 
  Video, 
  CheckCircle2, 
  Copy, 
  X, 
  HardDrive,
  HelpCircle,
  Bookmark,
  FolderOpen,
  AlertCircle,
  Save,
  Check
} from 'lucide-react';

export interface MaterialLinkItem {
  id: string;
  secaoId?: string;
  moduloId: string;
  titulo: string;
  url: string;
  tipo: 'pdf' | 'planilha' | 'drive' | 'notion' | 'questoes' | 'video' | 'web' | 'outro';
  descricao?: string;
  dataAdicionado: string;
}

const INITIAL_DEFAULT_LINKS: MaterialLinkItem[] = [
  // Links de Apoio e Bancos de Questões (Transpetro / Marianzo)
  {
    id: 'link-custom-1',
    moduloId: 'geral',
    titulo: 'DEEP SEEK (MARIANZO)- EXPLICAÇÃO DE QUESTÕES - PROVA',
    url: 'https://chat.deepseek.com/a/chat/s/d562bc19-1203-4ecb-8b8b-bc11d04495e8',
    tipo: 'questoes',
    descricao: 'Resolução comentada e análise técnica aprofundada de questões de concurso.',
    dataAdicionado: '25/08/2026'
  },
  {
    id: 'link-custom-2',
    moduloId: 'geral',
    titulo: 'MANUS (MARIANZO)- EXPLICAÇÃO DE QUESTÕES - PROVA',
    url: 'https://manus.im/app/WecEatiAKhd0uT51OK8vhR',
    tipo: 'questoes',
    descricao: 'Resolução passo a passo de questões da prova Transpetro.',
    dataAdicionado: '25/08/2026'
  },
  {
    id: 'link-custom-3',
    moduloId: 'geral',
    titulo: 'CHAT GPT (MARIANZO)- EXPLICAÇÃO DE QUESTÕES - PROVA',
    url: 'https://chatgpt.com/c/6a85f139-5324-83e9-bb91-f560811a93f8',
    tipo: 'questoes',
    descricao: 'Explicações detalhadas de questões de concurso e apoio nos estudos.',
    dataAdicionado: '25/08/2026'
  },
  {
    id: 'link-custom-4',
    moduloId: 'geral',
    titulo: 'DOLA (MARIANZO)- EXPLICAÇÃO DE QUESTÕES - PROVA',
    url: 'https://www.dola.com/chat/38416269413905937',
    tipo: 'questoes',
    descricao: 'Chat e assistente para resolução de dúvidas e questões de concurso.',
    dataAdicionado: '25/08/2026'
  },
  {
    id: 'link-custom-5',
    moduloId: 'proc-adm',
    titulo: 'PROVA ANTERIOR - PDF',
    url: 'https://drive.google.com/file/d/1CrkyJffyikHqtSZTP7ujec13Ts-x6o_U/view',
    tipo: 'pdf',
    descricao: 'Arquivo PDF oficial da prova anterior da Transpetro / Cesgranrio.',
    dataAdicionado: '25/08/2026'
  },
  {
    id: 'link-custom-6',
    moduloId: 'proc-adm',
    titulo: 'TEC CONCURSOS - GUIA QUESTÕES TRANSPETRO',
    url: 'https://www.tecconcursos.com.br/guias/transpetro-2026/profissional-transpetro-de-nivel-medio-enfase-1-administracao-e-controle',
    tipo: 'pdf',
    descricao: 'Guia direcionado e caderno de questões Cesgranrio no TEC Concursos.',
    dataAdicionado: '25/08/2026'
  },
  {
    id: 'link-custom-7',
    moduloId: 'geral',
    titulo: 'NOVA APOSTILA - ADMINISTRAÇÃO E CONTROLE',
    url: 'https://aluno.novaconcursos.com.br/#/impresso-digital-detalhe/',
    tipo: 'questoes',
    descricao: 'Apostila digital oficial e material de apoio para Administração e Controle.',
    dataAdicionado: '25/08/2026'
  },
  // Legislação e Ferramentas
  {
    id: 'link-init-1',
    moduloId: 'proc-adm',
    titulo: 'Lei das Estatais nº 13.303/2016 — Planalto Oficial (Arts. 28 a 91)',
    url: 'https://www.planalto.gov.br/ccivil_03/_ato2015-2018/2016/lei/l13303.htm',
    tipo: 'web',
    descricao: 'Texto integral atualizado da Lei das Estatais com destaque para os artigos cobrados pela Fundação Cesgranrio.',
    dataAdicionado: '20/08/2026'
  },
  {
    id: 'link-init-2',
    moduloId: 'proc-adm',
    titulo: 'Nova Lei de Licitações nº 14.133/2021 — Planalto Oficial',
    url: 'https://www.planalto.gov.br/ccivil_03/_ato2019-2022/2021/lei/l14133.htm',
    tipo: 'web',
    descricao: 'Normas gerais de licitações e contratos aplicáveis subsidiariamente.',
    dataAdicionado: '20/08/2026'
  },
  {
    id: 'link-init-3',
    moduloId: 'logistica-scm',
    titulo: 'Simulador em Planilha: Curva ABC e Ponto de Pedido (Excel/Drive)',
    url: 'https://support.microsoft.com/pt-br/excel',
    tipo: 'planilha',
    descricao: 'Planilha prática de apoio para cálculo de LEC, Ponto de Pedido e Giro de Estoques.',
    dataAdicionado: '20/08/2026'
  },
  {
    id: 'link-init-4',
    moduloId: 'logistica-scm',
    titulo: 'Portal Oficial Transpetro: Frota de Navios e Terminais Dutoviários',
    url: 'https://transpetro.com.br/pt_br/nossas-atividades.html',
    tipo: 'web',
    descricao: 'Mapeamento oficial dos modais de transporte de petróleo, derivados e biocombustíveis.',
    dataAdicionado: '20/08/2026'
  },
  {
    id: 'link-init-5',
    moduloId: 'financas-contabilidade',
    titulo: 'Relações com Investidores Transpetro: Balanços e DFC Consolidados',
    url: 'https://transpetro.com.br/pt_br/governanca-e-sustentabilidade.html',
    tipo: 'pdf',
    descricao: 'Demonstrações financeiras auditadas, DFC (Método Direto e Indireto) e Balanço Patrimonial real.',
    dataAdicionado: '20/08/2026'
  },
  {
    id: 'link-init-6',
    moduloId: 'informatica-lgpd',
    titulo: 'Lei Geral de Proteção de Dados (LGPD nº 13.709/2018) — Planalto Oficial',
    url: 'https://www.planalto.gov.br/ccivil_03/_ato2015-2018/2018/lei/l13709.htm',
    tipo: 'web',
    descricao: 'Legislação de proteção de dados pessoais, princípios CID e atuação da ANPD.',
    dataAdicionado: '20/08/2026'
  }
];

// Helper to strictly deduplicate links by normalized URL or normalized Title
function sanitizeAndDeduplicate(list: MaterialLinkItem[]): MaterialLinkItem[] {
  const seenUrls = new Set<string>();
  const seenTitles = new Set<string>();
  const result: MaterialLinkItem[] = [];

  for (const item of list) {
    if (!item || !item.titulo || !item.url) continue;

    const normUrl = item.url.trim().toLowerCase().replace(/\/+$/, '');
    const normTitle = item.titulo.trim().toLowerCase();

    // Check if we've already seen this URL or this exact title
    if (seenUrls.has(normUrl) || seenTitles.has(normTitle)) {
      continue;
    }

    seenUrls.add(normUrl);
    seenTitles.add(normTitle);
    result.push(item);
  }

  return result;
}

interface MaterialLinksSectionProps {
  moduloId?: string;
  moduloTitulo?: string;
  secaoId?: string;
  showAllModulesFilter?: boolean;
}

export const MODULOS_OPCOES = [
  { id: 'proc-adm', nome: 'Processos Adm & Leis' },
  { id: 'logistica-scm', nome: 'Logística & SCM' },
  { id: 'financas-contabilidade', nome: 'Finanças & Contabilidade' },
  { id: 'informatica-lgpd', nome: 'Informática & LGPD' },
  { id: 'geral', nome: 'Geral Transpetro' }
];

export const MaterialLinksSection: React.FC<MaterialLinksSectionProps> = ({
  moduloId = 'todos',
  moduloTitulo,
  secaoId,
  showAllModulesFilter = false
}) => {
  const [links, setLinks] = useState<MaterialLinkItem[]>(() => {
    const saved = localStorage.getItem('transpetro_material_links_v1');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) {
          return sanitizeAndDeduplicate(parsed);
        }
      } catch (e) {
        return sanitizeAndDeduplicate(INITIAL_DEFAULT_LINKS);
      }
    }
    return sanitizeAndDeduplicate(INITIAL_DEFAULT_LINKS);
  });

  const [filterModulo, setFilterModulo] = useState<string>('todos');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [showModal, setShowModal] = useState<boolean>(false);
  const [editingItem, setEditingItem] = useState<MaterialLinkItem | null>(null);

  // Form State
  const [formTitulo, setFormTitulo] = useState<string>('');
  const [formUrl, setFormUrl] = useState<string>('');
  const [formTipo, setFormTipo] = useState<MaterialLinkItem['tipo']>('pdf');
  const [formModuloId, setFormModuloId] = useState<string>(moduloId !== 'todos' ? moduloId : 'proc-adm');
  const [formDescricao, setFormDescricao] = useState<string>('');
  const [formError, setFormError] = useState<string | null>(null);

  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [actionToast, setActionToast] = useState<string | null>(null);

  const triggerToast = (msg: string) => {
    setActionToast(msg);
    setTimeout(() => setActionToast(null), 3000);
  };

  useEffect(() => {
    const deduplicated = sanitizeAndDeduplicate(links);
    try {
      localStorage.setItem('transpetro_material_links_v1', JSON.stringify(deduplicated));
    } catch (e) {
      console.error('Error saving links', e);
    }
  }, [links]);

  useEffect(() => {
    const handleRestore = () => {
      try {
        const saved = localStorage.getItem('transpetro_material_links_v1');
        if (saved) {
          setLinks(sanitizeAndDeduplicate(JSON.parse(saved)));
        }
      } catch (e) { /* ignore */ }
    };

    window.addEventListener('transpetro_data_restored', handleRestore);
    return () => {
      window.removeEventListener('transpetro_data_restored', handleRestore);
    };
  }, []);

  // Filter links
  const isGlobalView = showAllModulesFilter || moduloId === 'todos';

  const visibleLinks = links.filter(l => {
    // Section specific filtering if in a sub-section
    if (secaoId && l.secaoId && l.secaoId !== secaoId) {
      return false;
    }

    // Module filtering
    if (!isGlobalView) {
      if (l.moduloId !== moduloId && l.moduloId !== 'geral') return false;
    } else {
      if (filterModulo !== 'todos' && l.moduloId !== filterModulo) return false;
    }

    // Text search query filtering
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const matchTitle = l.titulo.toLowerCase().includes(q);
      const matchDesc = l.descricao?.toLowerCase().includes(q);
      const matchUrl = l.url.toLowerCase().includes(q);
      return matchTitle || matchDesc || matchUrl;
    }

    return true;
  });

  const handleOpenAdd = () => {
    setEditingItem(null);
    setFormTitulo('');
    setFormUrl('');
    setFormTipo('pdf');
    setFormModuloId(moduloId !== 'todos' ? moduloId : (filterModulo !== 'todos' ? filterModulo : 'proc-adm'));
    setFormDescricao('');
    setFormError(null);
    setShowModal(true);
  };

  const handleOpenEdit = (item: MaterialLinkItem) => {
    setEditingItem(item);
    setFormTitulo(item.titulo);
    setFormUrl(item.url);
    setFormTipo(item.tipo);
    setFormModuloId(item.moduloId);
    setFormDescricao(item.descricao || '');
    setFormError(null);
    setShowModal(true);
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setFormError(null);

    if (!formTitulo.trim()) {
      setFormError('Por favor, informe o título ou nome do material.');
      return;
    }

    if (!formUrl.trim()) {
      setFormError('Por favor, insira o link ou URL do material.');
      return;
    }

    let validUrl = formUrl.trim();
    if (!validUrl.startsWith('http://') && !validUrl.startsWith('https://')) {
      validUrl = `https://${validUrl}`;
    }

    if (editingItem) {
      // Edit mode
      setLinks(prev => prev.map(item => 
        item.id === editingItem.id
          ? {
              ...item,
              titulo: formTitulo.trim(),
              url: validUrl,
              tipo: formTipo,
              moduloId: formModuloId,
              descricao: formDescricao.trim()
            }
          : item
      ));
      triggerToast('Card de material atualizado com sucesso!');
    } else {
      // Add mode
      const newItem: MaterialLinkItem = {
        id: `link-${Date.now()}-${Math.random().toString(36).substr(2, 5)}`,
        moduloId: formModuloId,
        secaoId,
        titulo: formTitulo.trim(),
        url: validUrl,
        tipo: formTipo,
        descricao: formDescricao.trim(),
        dataAdicionado: new Date().toLocaleDateString('pt-BR')
      };
      setLinks(prev => [newItem, ...prev]);
      triggerToast('Novo card de material adicionado com sucesso!');
    }

    setShowModal(false);
    setEditingItem(null);
  };

  const handleDelete = (id: string, tituloStr: string) => {
    setLinks(prev => prev.filter(l => l.id !== id));
    triggerToast(`"${tituloStr}" foi removido com sucesso.`);
  };

  const handleCopyLink = (item: MaterialLinkItem) => {
    try {
      navigator.clipboard.writeText(item.url);
      setCopiedId(item.id);
      setTimeout(() => setCopiedId(null), 2000);
      triggerToast('Link copiado para a Área de Transferência!');
    } catch (e) {
      triggerToast('Link selecionado para cópia.');
    }
  };

  const getTipoBadge = (tipo: MaterialLinkItem['tipo']) => {
    switch (tipo) {
      case 'pdf':
        return { label: 'Arquivo PDF', bg: 'bg-rose-50 text-rose-700 border-rose-200', icon: FileText };
      case 'planilha':
        return { label: 'Planilha / Excel', bg: 'bg-emerald-50 text-emerald-700 border-emerald-200', icon: FileSpreadsheet };
      case 'drive':
        return { label: 'Google Drive', bg: 'bg-blue-50 text-blue-700 border-blue-200', icon: HardDrive };
      case 'notion':
        return { label: 'Notion / Resumo', bg: 'bg-slate-100 text-slate-800 border-slate-300', icon: Bookmark };
      case 'questoes':
        return { label: 'Banco de Questões', bg: 'bg-amber-50 text-amber-700 border-amber-200', icon: HelpCircle };
      case 'video':
        return { label: 'Videoaula', bg: 'bg-indigo-50 text-indigo-700 border-indigo-200', icon: Video };
      default:
        return { label: 'Link Web / Portal', bg: 'bg-cyan-50 text-cyan-700 border-cyan-200', icon: Globe };
    }
  };

  const getModuloBadge = (mId: string) => {
    switch (mId) {
      case 'proc-adm':
        return { label: 'Processos Adm & Leis', color: 'text-blue-700 bg-blue-50 border-blue-200' };
      case 'logistica-scm':
        return { label: 'Logística & SCM', color: 'text-amber-700 bg-amber-50 border-amber-200' };
      case 'financas-contabilidade':
        return { label: 'Finanças & Contab', color: 'text-emerald-700 bg-emerald-50 border-emerald-200' };
      case 'informatica-lgpd':
        return { label: 'Informática & LGPD', color: 'text-purple-700 bg-purple-50 border-purple-200' };
      default:
        return { label: 'Geral Transpetro', color: 'text-slate-700 bg-slate-100 border-slate-200' };
    }
  };

  return (
    <div className="space-y-5">
      {/* Toast Feedback */}
      {actionToast && (
        <div className="bg-blue-600 text-white text-xs px-3.5 py-2 rounded-xl shadow-md flex items-center gap-2 animate-fadeIn font-medium">
          <Check className="w-4 h-4 shrink-0" />
          <span>{actionToast}</span>
        </div>
      )}

      {/* Header of Links Section */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-gradient-to-r from-blue-50/80 via-indigo-50/40 to-slate-50 p-4 sm:p-5 rounded-2xl border border-blue-100">
        <div className="flex items-start gap-3.5">
          <div className="w-10 h-10 rounded-xl bg-blue-600 text-white flex items-center justify-center shrink-0 shadow-xs mt-0.5">
            <FolderOpen className="w-5 h-5" />
          </div>
          <div>
            <div className="flex flex-wrap items-center gap-2 mb-1">
              <span className="px-2 py-0.5 bg-blue-100 text-blue-800 rounded-full text-[10px] font-bold tracking-wide uppercase">
                {isGlobalView ? 'Central de Estudos' : 'Material Complementar'}
              </span>
              <span className="px-2 py-0.5 bg-slate-100 text-slate-700 rounded-full text-[10px] font-semibold border border-slate-200">
                {visibleLinks.length} {visibleLinks.length === 1 ? 'material' : 'materiais'}
              </span>
            </div>
            <h3 className="text-base sm:text-lg font-extrabold text-slate-900 tracking-tight">
              {isGlobalView ? 'Acesso Rápido a Materiais, Arquivos & Links de Apoio' : 'Materiais & Arquivos de Apoio'}
            </h3>
            <p className="text-xs text-slate-600 mt-0.5 max-w-2xl leading-relaxed">
              {isGlobalView 
                ? 'Acesse rapidamente e cadastre links para suas apostilas em PDF, Google Drive, resumos no Notion, planilhas Excel e cadernos de questões de todas as disciplinas.'
                : 'Adicione links para seus PDFs, pastas do Google Drive, resumos do Notion, planilhas e questões deste tema.'}
            </p>
          </div>
        </div>

        <button
          id={`btn-add-link-${moduloId}`}
          onClick={handleOpenAdd}
          className="px-4 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs flex items-center justify-center gap-2 shadow-xs hover:shadow-md transition cursor-pointer self-start md:self-center shrink-0 w-full sm:w-auto"
        >
          <Plus className="w-4 h-4" />
          <span>+ Adicionar Card de Material</span>
        </button>
      </div>

      {/* Filter Tabs & Search Bar (When in Global View or All Modules) */}
      {isGlobalView && (
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-3 bg-slate-50/80 p-2.5 rounded-2xl border border-slate-200/80">
          {/* Module Selector Filter Pills */}
          <div className="flex flex-wrap items-center gap-1.5">
            <button
              onClick={() => setFilterModulo('todos')}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition cursor-pointer flex items-center gap-1.5 ${
                filterModulo === 'todos'
                  ? 'bg-blue-600 text-white shadow-xs'
                  : 'text-slate-600 hover:text-slate-900 bg-white hover:bg-slate-100 border border-slate-200/60'
              }`}
            >
              <span>Todos</span>
              <span className={`text-[10px] px-1.5 py-0.2 rounded-full ${filterModulo === 'todos' ? 'bg-blue-800 text-blue-100' : 'bg-slate-200 text-slate-700 font-bold'}`}>
                {links.length}
              </span>
            </button>

            {MODULOS_OPCOES.map((mod) => {
              const count = links.filter(l => l.moduloId === mod.id).length;
              return (
                <button
                  key={mod.id}
                  onClick={() => setFilterModulo(mod.id)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition cursor-pointer flex items-center gap-1.5 ${
                    filterModulo === mod.id
                      ? 'bg-blue-600 text-white shadow-xs font-bold'
                      : 'text-slate-600 hover:text-slate-900 bg-white hover:bg-slate-100 border border-slate-200/60'
                  }`}
                >
                  <span>{mod.nome}</span>
                  <span className={`text-[10px] px-1.5 py-0.2 rounded-full ${filterModulo === mod.id ? 'bg-blue-800 text-blue-100' : 'bg-slate-200 text-slate-700 font-bold'}`}>
                    {count}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Search bar */}
          <div className="relative w-full lg:w-72 shrink-0">
            <input
              type="text"
              placeholder="Buscar por nome ou URL..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-white border border-slate-200 rounded-xl pl-3 pr-8 py-2 text-xs text-slate-800 placeholder-slate-400 focus:outline-hidden focus:border-blue-600 shadow-2xs"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery('')}
                className="absolute right-2.5 top-2.5 text-slate-400 hover:text-slate-600 cursor-pointer"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>
        </div>
      )}

      {/* Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {visibleLinks.map((item) => {
          const badge = getTipoBadge(item.tipo);
          const IconComp = badge.icon;
          const moduloInfo = getModuloBadge(item.moduloId);

          return (
            <div
              key={item.id}
              id={`card-material-link-${item.id}`}
              className="group bg-white hover:bg-slate-50/70 border border-slate-200 hover:border-blue-300 rounded-xl p-4 shadow-xs hover:shadow-md transition flex flex-col justify-between space-y-3"
            >
              <div className="space-y-2">
                {/* Header Tag & Actions (Copy, Edit, Delete) */}
                <div className="flex items-center justify-between gap-2">
                  <div className="flex flex-wrap items-center gap-1.5">
                    <span className={`text-[11px] font-bold px-2.5 py-0.5 rounded-full border flex items-center gap-1.5 ${badge.bg}`}>
                      <IconComp className="w-3.5 h-3.5" />
                      <span>{badge.label}</span>
                    </span>

                    {isGlobalView && (
                      <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-md border ${moduloInfo.color}`}>
                        {moduloInfo.label}
                      </span>
                    )}
                  </div>

                  <div className="flex items-center gap-1 opacity-90 group-hover:opacity-100 transition">
                    <button
                      type="button"
                      onClick={() => handleCopyLink(item)}
                      title="Copiar Link"
                      className="p-1.5 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded-lg transition cursor-pointer"
                    >
                      {copiedId === item.id ? (
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                      ) : (
                        <Copy className="w-3.5 h-3.5" />
                      )}
                    </button>
                    <button
                      type="button"
                      onClick={() => handleOpenEdit(item)}
                      title="Editar Card"
                      className="p-1.5 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition cursor-pointer"
                    >
                      <Edit3 className="w-3.5 h-3.5" />
                    </button>
                    <button
                      type="button"
                      onClick={() => handleDelete(item.id, item.titulo)}
                      title="Excluir Card"
                      className="p-1.5 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition cursor-pointer"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>

                {/* Title */}
                <h5 className="text-xs sm:text-sm font-bold text-slate-900 leading-snug group-hover:text-blue-700 transition">
                  {item.titulo}
                </h5>

                {/* Optional Description */}
                {item.descricao && (
                  <p className="text-xs text-slate-600 leading-relaxed line-clamp-2">
                    {item.descricao}
                  </p>
                )}
              </div>

              {/* Card Footer & Direct Action Link */}
              <div className="pt-2 border-t border-slate-100 flex flex-col gap-2">
                <div className="text-[10px] text-slate-400 font-mono truncate" title={item.url}>
                  {item.url}
                </div>

                <a
                  href={item.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-2 px-3 rounded-lg bg-blue-50 hover:bg-blue-600 text-blue-700 hover:text-white font-bold text-xs flex items-center justify-center gap-1.5 border border-blue-200 hover:border-blue-600 transition shadow-2xs cursor-pointer"
                >
                  <ExternalLink className="w-3.5 h-3.5" />
                  <span>Acessar Arquivo / Link</span>
                </a>
              </div>
            </div>
          );
        })}

        {/* Empty state / add card placeholder */}
        {visibleLinks.length === 0 && (
          <div 
            onClick={handleOpenAdd}
            className="col-span-full border-2 border-dashed border-slate-200 hover:border-blue-400 bg-slate-50/50 hover:bg-blue-50/30 rounded-xl p-8 text-center cursor-pointer transition space-y-2"
          >
            <div className="w-10 h-10 rounded-full bg-blue-100 text-blue-700 mx-auto flex items-center justify-center font-bold">
              <Plus className="w-5 h-5" />
            </div>
            <p className="text-xs font-bold text-slate-800">
              Nenhum material encontrado com os filtros atuais
            </p>
            <p className="text-[11px] text-slate-500 max-w-md mx-auto">
              Clique aqui para adicionar quantos cards de links forem necessários para apostilas em PDF, Google Drive, Notion ou planilhas.
            </p>
          </div>
        )}
      </div>

      {/* Modal: Adicionar / Editar Link de Material */}
      {showModal && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/75 backdrop-blur-xs animate-fadeIn"
          onClick={() => setShowModal(false)}
        >
          <div 
            className="bg-white w-full max-w-lg rounded-2xl shadow-2xl border border-slate-200 overflow-hidden animate-scaleUp max-h-[92vh] flex flex-col"
            onClick={e => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="bg-slate-900 text-white p-4 flex items-center justify-between shrink-0">
              <div className="flex items-center gap-2">
                <LinkIcon className="w-5 h-5 text-blue-400" />
                <h4 className="font-bold text-sm">
                  {editingItem ? 'Editar Card de Material' : 'Adicionar Novo Card de Material'}
                </h4>
              </div>
              <button 
                type="button"
                onClick={() => setShowModal(false)} 
                className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Form */}
            <form onSubmit={handleSave} className="p-5 space-y-4 overflow-y-auto">
              {/* Inline Error Banner */}
              {formError && (
                <div className="p-3 bg-rose-50 border border-rose-200 text-rose-800 rounded-xl text-xs flex items-start gap-2 animate-fadeIn">
                  <AlertCircle className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
                  <div className="leading-relaxed font-medium">{formError}</div>
                </div>
              )}

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Nome / Título do Material ou Arquivo: *
                </label>
                <input
                  type="text"
                  required
                  placeholder="Ex: Apostila de Licitações 13.303.pdf, Planilha de Finanças, Drive de Questões..."
                  value={formTitulo}
                  onChange={(e) => setFormTitulo(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-lg p-2.5 text-xs text-slate-800 focus:outline-hidden focus:border-blue-600 focus:bg-white"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Link / URL do Arquivo: *
                </label>
                <input
                  type="text"
                  required
                  placeholder="https://drive.google.com/... ou https://notion.so/... ou link do arquivo"
                  value={formUrl}
                  onChange={(e) => setFormUrl(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-lg p-2.5 text-xs text-slate-800 focus:outline-hidden focus:border-blue-600 focus:bg-white font-mono"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Tipo do Arquivo / Formato:
                  </label>
                  <select
                    value={formTipo}
                    onChange={(e) => setFormTipo(e.target.value as any)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-lg p-2.5 text-xs text-slate-800 font-medium"
                  >
                    <option value="pdf">📄 Documento PDF / Apostila</option>
                    <option value="planilha">📊 Planilha Excel / Google Sheets</option>
                    <option value="drive">📁 Pasta Google Drive / Nuvem</option>
                    <option value="notion">💡 Notion / Resumo Esquematizado</option>
                    <option value="questoes">🎯 Banco de Questões / Simulado</option>
                    <option value="video">🎬 Videoaula / Gravação</option>
                    <option value="web">🌐 Link Web / Artigo Oficial</option>
                    <option value="outro">📦 Outro Material</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Módulo / Disciplina Vinculada:
                  </label>
                  {isGlobalView ? (
                    <select
                      value={formModuloId}
                      onChange={(e) => setFormModuloId(e.target.value)}
                      className="w-full bg-slate-50 border border-slate-200 rounded-lg p-2.5 text-xs text-slate-800 font-medium"
                    >
                      {MODULOS_OPCOES.map((m) => (
                        <option key={m.id} value={m.id}>{m.nome}</option>
                      ))}
                    </select>
                  ) : (
                    <input
                      type="text"
                      disabled
                      value={moduloTitulo || formModuloId}
                      className="w-full bg-slate-100 border border-slate-200 rounded-lg p-2.5 text-xs text-slate-600 cursor-not-allowed truncate"
                    />
                  )}
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Descrição ou Observações (Opcional):
                </label>
                <textarea
                  rows={2}
                  placeholder="Ex: Resolução comentada, tabela resumo, foco na Cesgranrio..."
                  value={formDescricao}
                  onChange={(e) => setFormDescricao(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-lg p-2.5 text-xs text-slate-800 focus:outline-hidden focus:border-blue-600 focus:bg-white"
                />
              </div>

              {/* Action Buttons */}
              <div className="flex items-center justify-end gap-2 pt-3 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="px-4 py-2.5 text-xs font-semibold text-slate-600 hover:text-slate-800 hover:bg-slate-100 rounded-xl transition cursor-pointer"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs shadow-xs hover:shadow-md transition cursor-pointer flex items-center gap-1.5"
                >
                  <Save className="w-4 h-4" />
                  <span>{editingItem ? 'Salvar Alterações' : 'Adicionar Card'}</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
