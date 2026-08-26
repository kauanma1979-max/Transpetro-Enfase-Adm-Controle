import React, { useState, useRef } from 'react';
import { 
  FileText, 
  Plus, 
  Trash2, 
  ExternalLink, 
  ZoomIn, 
  X, 
  Edit3, 
  Save, 
  Check, 
  FileUp,
  Layers,
  BookMarked,
  AlertCircle,
  Link as LinkIcon,
  Upload,
  Eye
} from 'lucide-react';

export interface MindMapItem {
  id: string;
  secaoId: string;
  titulo: string;
  tipo: 'image' | 'pdf';
  url: string; // Base64 data URL or external URL
  dataAdicionado: string;
  tamanhoKb?: number;
}

interface MindMapSectionProps {
  secaoId: string;
  secaoTitulo: string;
  customData: {
    mindMaps?: MindMapItem[];
    notes?: string;
  };
  onSaveData: (secaoId: string, updated: { mindMaps?: MindMapItem[]; notes?: string }) => void;
}

// Helper to compress image if larger than 1MB to prevent localStorage quota exhaustion
async function processAndCompressImage(file: File): Promise<{ base64: string; sizeKb: number }> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const result = e.target?.result as string;
      if (!result) {
        reject(new Error('Erro ao ler arquivo.'));
        return;
      }

      // If file is small (< 600KB), return as-is
      if (file.size < 600 * 1024) {
        resolve({ base64: result, sizeKb: Math.round(file.size / 1024) });
        return;
      }

      // Otherwise compress via HTML5 canvas
      const img = new Image();
      img.onload = () => {
        const maxWidth = 1600;
        const maxHeight = 1600;
        let width = img.width;
        let height = img.height;

        if (width > maxWidth || height > maxHeight) {
          if (width > height) {
            height = Math.round((height * maxWidth) / width);
            width = maxWidth;
          } else {
            width = Math.round((width * maxHeight) / height);
            height = maxHeight;
          }
        }

        const canvas = document.createElement('canvas');
        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext('2d');
        if (!ctx) {
          resolve({ base64: result, sizeKb: Math.round(file.size / 1024) });
          return;
        }

        ctx.drawImage(img, 0, 0, width, height);
        const compressedBase64 = canvas.toDataURL('image/jpeg', 0.85);
        const compressedSizeKb = Math.round((compressedBase64.length * 3) / 4 / 1024);
        resolve({ base64: compressedBase64, sizeKb: compressedSizeKb });
      };
      img.onerror = () => {
        resolve({ base64: result, sizeKb: Math.round(file.size / 1024) });
      };
      img.src = result;
    };
    reader.onerror = () => reject(new Error('Erro ao carregar arquivo'));
    reader.readAsDataURL(file);
  });
}

export const MindMapSection: React.FC<MindMapSectionProps> = ({
  secaoId,
  secaoTitulo,
  customData,
  onSaveData
}) => {
  const [notes, setNotes] = useState<string>(customData.notes || '');
  const [isEditingNotes, setIsEditingNotes] = useState<boolean>(false);
  const [notesSavedToast, setNotesSavedToast] = useState<boolean>(false);
  const [actionToast, setActionToast] = useState<string | null>(null);

  // Modal for adding / editing mind map
  const [showModal, setShowModal] = useState<boolean>(false);
  const [editingMapId, setEditingMapId] = useState<string | null>(null);
  const [addMode, setAddMode] = useState<'upload' | 'url'>('upload');
  const [mapTitle, setMapTitle] = useState<string>('');
  const [mapUrl, setMapUrl] = useState<string>('');
  const [mapType, setMapType] = useState<'image' | 'pdf'>('image');
  const [selectedFile, setSelectedFile] = useState<{ base64: string; type: 'image' | 'pdf'; sizeKb: number; name: string } | null>(null);
  const [modalError, setModalError] = useState<string | null>(null);
  const [isProcessingFile, setIsProcessingFile] = useState<boolean>(false);
  const [isDragging, setIsDragging] = useState<boolean>(false);

  // Lightbox modal for viewing image/PDF
  const [viewingMap, setViewingMap] = useState<MindMapItem | null>(null);

  const fileInputRef = useRef<HTMLInputElement>(null);

  const mindMaps = customData.mindMaps || [];

  const triggerToast = (msg: string) => {
    setActionToast(msg);
    setTimeout(() => setActionToast(null), 3000);
  };

  const handleSaveNotes = () => {
    onSaveData(secaoId, { ...customData, notes });
    setIsEditingNotes(false);
    setNotesSavedToast(true);
    setTimeout(() => setNotesSavedToast(false), 2500);
  };

  // Open modal in ADD mode
  const handleOpenAddModal = () => {
    setEditingMapId(null);
    setMapTitle('');
    setMapUrl('');
    setMapType('image');
    setSelectedFile(null);
    setModalError(null);
    setAddMode('upload');
    setShowModal(true);
  };

  // Open modal in EDIT mode
  const handleOpenEditModal = (map: MindMapItem) => {
    setEditingMapId(map.id);
    setMapTitle(map.titulo);
    setMapType(map.tipo);
    setModalError(null);

    if (map.url.startsWith('data:')) {
      setAddMode('upload');
      setSelectedFile({
        base64: map.url,
        type: map.tipo,
        sizeKb: map.tamanhoKb || Math.round(map.url.length / 1024),
        name: map.titulo
      });
      setMapUrl('');
    } else {
      setAddMode('url');
      setMapUrl(map.url);
      setSelectedFile(null);
    }

    setShowModal(true);
  };

  const handleProcessFile = async (file: File) => {
    setModalError(null);
    const isPdf = file.type === 'application/pdf' || file.name.toLowerCase().endsWith('.pdf');
    const isImg = file.type.startsWith('image/') || /\.(png|jpe?g|webp|gif|svg)$/i.test(file.name);

    if (!isPdf && !isImg) {
      setModalError('Por favor, selecione um arquivo de imagem (PNG, JPG, WebP) ou documento PDF.');
      return;
    }

    if (file.size > 15 * 1024 * 1024) {
      setModalError('O arquivo selecionado é muito grande. O limite máximo recomendado é 15MB.');
      return;
    }

    setIsProcessingFile(true);

    try {
      if (isPdf) {
        const reader = new FileReader();
        reader.onload = (event) => {
          const base64 = event.target?.result as string;
          setSelectedFile({
            base64,
            type: 'pdf',
            sizeKb: Math.round(file.size / 1024),
            name: file.name.replace(/\.[^/.]+$/, '')
          });
          setMapType('pdf');
          if (!mapTitle.trim()) {
            setMapTitle(file.name.replace(/\.[^/.]+$/, ''));
          }
          setIsProcessingFile(false);
        };
        reader.onerror = () => {
          setModalError('Não foi possível ler o arquivo PDF.');
          setIsProcessingFile(false);
        };
        reader.readAsDataURL(file);
      } else {
        const { base64, sizeKb } = await processAndCompressImage(file);
        setSelectedFile({
          base64,
          type: 'image',
          sizeKb,
          name: file.name.replace(/\.[^/.]+$/, '')
        });
        setMapType('image');
        if (!mapTitle.trim()) {
          setMapTitle(file.name.replace(/\.[^/.]+$/, ''));
        }
        setIsProcessingFile(false);
      }
    } catch (err: any) {
      setModalError(`Erro ao carregar arquivo: ${err?.message || 'Arquivo inválido'}`);
      setIsProcessingFile(false);
    }
  };

  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      handleProcessFile(file);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
    const file = e.dataTransfer.files?.[0];
    if (file) {
      handleProcessFile(file);
    }
  };

  const handleSaveMindMap = (e: React.FormEvent) => {
    e.preventDefault();
    setModalError(null);

    let finalUrl = '';
    let finalType: 'image' | 'pdf' = mapType;
    let sizeKb: number | undefined;

    if (addMode === 'upload') {
      if (!selectedFile) {
        setModalError('Por favor, clique no quadro acima para escolher uma imagem ou arquivo PDF.');
        return;
      }
      finalUrl = selectedFile.base64;
      finalType = selectedFile.type;
      sizeKb = selectedFile.sizeKb;
    } else {
      if (!mapUrl.trim()) {
        setModalError('Por favor, insira o link ou URL do mapa mental.');
        return;
      }
      finalUrl = mapUrl.trim();
      if (!finalUrl.startsWith('http://') && !finalUrl.startsWith('https://')) {
        finalUrl = `https://${finalUrl}`;
      }
      finalType = finalUrl.toLowerCase().includes('.pdf') ? 'pdf' : mapType;
    }

    const titleToSave = mapTitle.trim() || (finalType === 'pdf' ? `Mapa Mental PDF (${secaoTitulo})` : `Esquema Visual (${secaoTitulo})`);

    try {
      if (editingMapId) {
        // Edit existing item
        const updatedMaps = mindMaps.map(m => {
          if (m.id === editingMapId) {
            return {
              ...m,
              titulo: titleToSave,
              tipo: finalType,
              url: finalUrl,
              tamanhoKb: sizeKb || m.tamanhoKb
            };
          }
          return m;
        });
        onSaveData(secaoId, { ...customData, mindMaps: updatedMaps });
        triggerToast('Mapa mental atualizado com sucesso!');
      } else {
        // Add new item
        const newItem: MindMapItem = {
          id: `map-${Date.now()}-${Math.random().toString(36).substr(2, 5)}`,
          secaoId,
          titulo: titleToSave,
          tipo: finalType,
          url: finalUrl,
          dataAdicionado: new Date().toLocaleDateString('pt-BR'),
          tamanhoKb: sizeKb
        };
        const updatedMaps = [newItem, ...mindMaps];
        onSaveData(secaoId, { ...customData, mindMaps: updatedMaps });
        triggerToast('Novo mapa mental inserido com sucesso!');
      }

      // Reset and close
      setShowModal(false);
      setEditingMapId(null);
      setMapTitle('');
      setMapUrl('');
      setSelectedFile(null);
      setModalError(null);
    } catch (err: any) {
      setModalError('Não foi possível salvar os dados. Verifique se o arquivo não excede a memória do navegador.');
    }
  };

  const handleDeleteMindMap = (mapId: string, mapTitleStr: string) => {
    const updatedMaps = mindMaps.filter(m => m.id !== mapId);
    onSaveData(secaoId, { ...customData, mindMaps: updatedMaps });
    triggerToast(`"${mapTitleStr}" foi excluído com sucesso.`);
  };

  return (
    <div className="space-y-4 pt-2 border-t border-slate-100">
      {/* Toast Feedback */}
      {actionToast && (
        <div className="bg-emerald-600 text-white text-xs px-3.5 py-2 rounded-xl shadow-md flex items-center gap-2 animate-fadeIn font-medium">
          <Check className="w-4 h-4 shrink-0" />
          <span>{actionToast}</span>
        </div>
      )}

      {/* Header of Mind Maps & Notes */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 rounded-md bg-purple-100 text-purple-700 flex items-center justify-center font-bold text-xs">
            <Layers className="w-3.5 h-3.5" />
          </div>
          <h5 className="text-xs sm:text-sm font-bold text-slate-900">
            Mapas Mentais & Anotações Pessoais
          </h5>
          <span className="text-[11px] font-semibold text-purple-700 bg-purple-50 px-2 py-0.5 rounded-full border border-purple-200">
            {mindMaps.length} {mindMaps.length === 1 ? 'mapa' : 'mapas'}
          </span>
        </div>

        <button
          onClick={handleOpenAddModal}
          className="px-3.5 py-1.5 rounded-xl bg-purple-600 hover:bg-purple-700 text-white font-bold text-xs shadow-xs hover:shadow-md transition cursor-pointer flex items-center gap-1.5 self-start sm:self-auto"
        >
          <Plus className="w-4 h-4" />
          <span>Inserir Mapa Mental (Imagem / PDF)</span>
        </button>
      </div>

      {/* Mind Maps Grid */}
      {mindMaps.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
          {mindMaps.map((map) => (
            <div
              key={map.id}
              className="group relative bg-slate-50 hover:bg-white border border-slate-200 hover:border-purple-300 rounded-xl overflow-hidden shadow-xs hover:shadow-md transition flex flex-col justify-between"
            >
              {/* Media Preview or Icon Header */}
              {map.tipo === 'image' ? (
                <div 
                  onClick={() => setViewingMap(map)}
                  className="h-32 bg-slate-200/70 overflow-hidden relative cursor-pointer flex items-center justify-center group-hover:opacity-95"
                >
                  <img
                    src={map.url}
                    alt={map.titulo}
                    className="w-full h-full object-cover group-hover:scale-105 transition duration-300"
                    onError={(e) => {
                      (e.target as HTMLElement).style.display = 'none';
                    }}
                  />
                  <div className="absolute inset-0 bg-slate-950/30 opacity-0 group-hover:opacity-100 transition flex items-center justify-center text-white gap-1.5 font-bold text-xs backdrop-blur-2xs">
                    <ZoomIn className="w-4 h-4" />
                    <span>Ampliar Imagem</span>
                  </div>
                </div>
              ) : (
                <div 
                  onClick={() => setViewingMap(map)}
                  className="h-32 bg-gradient-to-br from-rose-50 to-rose-100/60 p-4 flex flex-col items-center justify-center text-center cursor-pointer border-b border-rose-100 group-hover:from-rose-100 group-hover:to-rose-200/70 transition"
                >
                  <div className="w-12 h-12 rounded-xl bg-white text-rose-600 shadow-xs flex items-center justify-center font-bold mb-2">
                    <FileText className="w-6 h-6" />
                  </div>
                  <span className="text-[11px] font-bold text-rose-800 uppercase tracking-wider">
                    Documento PDF
                  </span>
                  <span className="text-[10px] text-slate-500 mt-0.5">Clique para visualizar</span>
                </div>
              )}

              {/* Card Footer Info & Actions (Zoom, Edit, Delete) */}
              <div className="p-3 bg-white border-t border-slate-100 flex items-center justify-between gap-2">
                <div className="min-w-0 flex-1">
                  <p className="text-xs font-bold text-slate-900 truncate" title={map.titulo}>
                    {map.titulo}
                  </p>
                  <div className="flex items-center gap-1.5 text-[10px] text-slate-500 mt-0.5">
                    <span>{map.dataAdicionado}</span>
                    {map.tamanhoKb && <span>· {map.tamanhoKb} KB</span>}
                  </div>
                </div>

                <div className="flex items-center gap-1 shrink-0">
                  <button
                    onClick={() => setViewingMap(map)}
                    title="Visualizar Mapa Mental"
                    className="p-1.5 rounded-lg text-slate-500 hover:text-purple-700 hover:bg-purple-50 transition cursor-pointer"
                  >
                    <Eye className="w-3.5 h-3.5" />
                  </button>
                  <button
                    onClick={() => handleOpenEditModal(map)}
                    title="Editar Mapa Mental"
                    className="p-1.5 rounded-lg text-slate-500 hover:text-blue-700 hover:bg-blue-50 transition cursor-pointer"
                  >
                    <Edit3 className="w-3.5 h-3.5" />
                  </button>
                  <button
                    onClick={() => handleDeleteMindMap(map.id, map.titulo)}
                    title="Excluir Mapa Mental"
                    className="p-1.5 rounded-lg text-slate-400 hover:text-rose-600 hover:bg-rose-50 transition cursor-pointer"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Personal Notes Box */}
      <div className="bg-slate-50/80 border border-slate-200 rounded-xl p-4 space-y-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2 text-xs font-bold text-slate-800">
            <BookMarked className="w-4 h-4 text-purple-600" />
            <span>Minhas Anotações & Mnemônicos deste Tópico:</span>
          </div>

          <div className="flex items-center gap-2">
            {notesSavedToast && (
              <span className="text-[11px] text-emerald-700 font-bold flex items-center gap-1 bg-emerald-100 px-2 py-0.5 rounded-md animate-fadeIn">
                <Check className="w-3 h-3" /> Salvo!
              </span>
            )}
            {!isEditingNotes && (
              <button
                onClick={() => setIsEditingNotes(true)}
                className="text-xs font-bold text-purple-700 hover:text-purple-800 flex items-center gap-1 cursor-pointer transition"
              >
                <Edit3 className="w-3.5 h-3.5" />
                <span>{notes ? 'Editar Anotação' : '+ Escrever Anotação'}</span>
              </button>
            )}
          </div>
        </div>

        {isEditingNotes ? (
          <div className="space-y-2 pt-1">
            <textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Digite aqui seus resumos rápidos, mnemônicos, pegadinhas de prova da Cesgranrio ou dicas de fixação..."
              rows={4}
              className="w-full text-xs p-3 rounded-lg border border-purple-300 focus:outline-hidden focus:ring-2 focus:ring-purple-400 bg-white text-slate-800 leading-relaxed font-sans"
            />
            <div className="flex items-center justify-end gap-2">
              <button
                type="button"
                onClick={() => {
                  setNotes(customData.notes || '');
                  setIsEditingNotes(false);
                }}
                className="px-3 py-1.5 text-xs text-slate-600 hover:text-slate-800 font-semibold cursor-pointer"
              >
                Cancelar
              </button>
              <button
                type="button"
                onClick={handleSaveNotes}
                className="px-4 py-1.5 rounded-lg bg-purple-600 hover:bg-purple-700 text-white font-bold text-xs flex items-center gap-1.5 shadow-xs cursor-pointer transition"
              >
                <Save className="w-3.5 h-3.5" />
                <span>Salvar Anotações</span>
              </button>
            </div>
          </div>
        ) : (
          <div className="text-xs text-slate-700 bg-white p-3 rounded-lg border border-slate-200 min-h-[48px] whitespace-pre-line leading-relaxed">
            {notes || (
              <span className="text-slate-400 italic">
                Nenhuma anotação pessoal inserida ainda. Clique em "+ Escrever Anotação" para registrar macetes, mnemônicos e pontos de revisão.
              </span>
            )}
          </div>
        )}
      </div>

      {/* Modal: Inserir / Editar Mapa Mental */}
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
              <div className="flex items-center gap-2 min-w-0 pr-2">
                <Layers className="w-5 h-5 text-purple-400 shrink-0" />
                <h4 className="font-bold text-sm truncate">
                  {editingMapId ? 'Editar Mapa Mental' : `Inserir Mapa Mental em ${secaoTitulo}`}
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
            <form onSubmit={handleSaveMindMap} className="p-5 space-y-4 overflow-y-auto">
              {/* Error Banner */}
              {modalError && (
                <div className="p-3 bg-rose-50 border border-rose-200 text-rose-800 rounded-xl text-xs flex items-start gap-2 animate-fadeIn">
                  <AlertCircle className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
                  <div className="leading-relaxed font-medium">{modalError}</div>
                </div>
              )}

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Título / Nome do Mapa Mental:
                </label>
                <input
                  type="text"
                  placeholder="Ex: Esquema Resumido Lei 13.303, Fluxograma PDCA, Tríade CID..."
                  value={mapTitle}
                  onChange={(e) => setMapTitle(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-lg p-2.5 text-xs text-slate-800 focus:outline-hidden focus:border-purple-600 focus:bg-white"
                />
              </div>

              {/* Mode Switch: Upload File or External URL */}
              <div className="flex border-b border-slate-200">
                <button
                  type="button"
                  onClick={() => {
                    setAddMode('upload');
                    setModalError(null);
                  }}
                  className={`flex-1 py-2.5 text-xs font-bold border-b-2 transition cursor-pointer flex items-center justify-center gap-1.5 ${
                    addMode === 'upload' ? 'border-purple-600 text-purple-700 bg-purple-50/50' : 'border-transparent text-slate-500 hover:text-slate-800'
                  }`}
                >
                  <FileUp className="w-4 h-4" />
                  <span>Enviar Arquivo (Imagem / PDF)</span>
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setAddMode('url');
                    setModalError(null);
                  }}
                  className={`flex-1 py-2.5 text-xs font-bold border-b-2 transition cursor-pointer flex items-center justify-center gap-1.5 ${
                    addMode === 'url' ? 'border-purple-600 text-purple-700 bg-purple-50/50' : 'border-transparent text-slate-500 hover:text-slate-800'
                  }`}
                >
                  <LinkIcon className="w-4 h-4" />
                  <span>Inserir Link / URL</span>
                </button>
              </div>

              {addMode === 'upload' ? (
                <div>
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/png,image/jpeg,image/jpg,image/webp,image/gif,application/pdf"
                    onChange={handleFileInputChange}
                    className="hidden"
                  />
                  <div
                    onClick={() => fileInputRef.current?.click()}
                    onDragOver={handleDragOver}
                    onDragLeave={handleDragLeave}
                    onDrop={handleDrop}
                    className={`border-2 border-dashed rounded-xl p-5 text-center cursor-pointer transition space-y-2 ${
                      isDragging 
                        ? 'border-purple-500 bg-purple-100/70 scale-[1.01]' 
                        : 'border-purple-200 hover:border-purple-400 bg-purple-50/40 hover:bg-purple-50/70'
                    }`}
                  >
                    {isProcessingFile ? (
                      <div className="py-4 space-y-2">
                        <div className="w-8 h-8 border-3 border-purple-600 border-t-transparent rounded-full animate-spin mx-auto"></div>
                        <p className="text-xs font-bold text-purple-800">Processando arquivo...</p>
                      </div>
                    ) : selectedFile ? (
                      <div className="space-y-2">
                        <div className="w-10 h-10 rounded-full bg-purple-100 text-purple-700 mx-auto flex items-center justify-center">
                          {selectedFile.type === 'pdf' ? <FileText className="w-5 h-5" /> : <FileUp className="w-5 h-5" />}
                        </div>
                        <div>
                          <p className="text-xs font-bold text-purple-900 truncate max-w-xs mx-auto">{selectedFile.name}</p>
                          <p className="text-[11px] text-slate-500">{selectedFile.type === 'pdf' ? 'Arquivo PDF' : 'Imagem'} · {selectedFile.sizeKb} KB</p>
                        </div>
                        <span className="inline-block text-[11px] font-semibold text-purple-700 bg-purple-100 px-3 py-1 rounded-lg">
                          Clique ou arraste para substituir arquivo
                        </span>
                      </div>
                    ) : (
                      <div>
                        <div className="w-10 h-10 rounded-full bg-purple-100 text-purple-700 mx-auto flex items-center justify-center mb-2">
                          <Upload className="w-5 h-5" />
                        </div>
                        <p className="text-xs font-bold text-slate-800">Clique para selecionar imagem ou PDF</p>
                        <p className="text-[10px] text-slate-500 mt-0.5">Suporta PNG, JPG, JPEG, WebP e PDF (ou arraste aqui)</p>
                      </div>
                    )}
                  </div>
                </div>
              ) : (
                <div className="space-y-3">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Link / URL Direta do Arquivo ou Imagem:
                    </label>
                    <input
                      type="text"
                      placeholder="https://exemplo.com/mapa-mental.png ou https://drive.google.com/..."
                      value={mapUrl}
                      onChange={(e) => setMapUrl(e.target.value)}
                      className="w-full bg-slate-50 border border-slate-200 rounded-lg p-2.5 text-xs text-slate-800 focus:outline-hidden focus:border-purple-600 focus:bg-white font-mono"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Tipo do Material:
                    </label>
                    <select
                      value={mapType}
                      onChange={(e) => setMapType(e.target.value as any)}
                      className="w-full bg-slate-50 border border-slate-200 rounded-lg p-2.5 text-xs text-slate-800 font-medium"
                    >
                      <option value="image">🖼️ Imagem (PNG, JPG, WebP)</option>
                      <option value="pdf">📄 Documento PDF</option>
                    </select>
                  </div>
                </div>
              )}

              {/* Modal Buttons (Cancelar & Salvar) */}
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
                  disabled={isProcessingFile}
                  className="px-5 py-2.5 rounded-xl bg-purple-600 hover:bg-purple-700 text-white font-bold text-xs shadow-xs hover:shadow-md transition cursor-pointer disabled:opacity-50 flex items-center gap-1.5"
                >
                  <Save className="w-4 h-4" />
                  <span>{editingMapId ? 'Salvar Alterações' : 'Salvar Mapa Mental'}</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Lightbox Modal: Visualizador de Imagem / PDF */}
      {viewingMap && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/85 backdrop-blur-sm animate-fadeIn"
          onClick={() => setViewingMap(null)}
        >
          <div 
            className="bg-white w-full max-w-4xl max-h-[90vh] rounded-2xl shadow-2xl border border-slate-700 overflow-hidden flex flex-col"
            onClick={e => e.stopPropagation()}
          >
            <div className="bg-slate-900 text-white p-4 flex items-center justify-between border-b border-slate-800">
              <div className="flex items-center gap-2 min-w-0 pr-2">
                <Layers className="w-5 h-5 text-purple-400 shrink-0" />
                <h4 className="font-bold text-sm truncate">{viewingMap.titulo}</h4>
                <span className="text-[10px] bg-slate-800 text-slate-300 px-2 py-0.5 rounded-full uppercase">
                  {viewingMap.tipo}
                </span>
              </div>
              <div className="flex items-center gap-2">
                {viewingMap.url.startsWith('http') && (
                  <a
                    href={viewingMap.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition"
                    title="Abrir link original em nova aba"
                  >
                    <ExternalLink className="w-4 h-4" />
                  </a>
                )}
                <button 
                  type="button"
                  onClick={() => setViewingMap(null)} 
                  className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            <div className="p-4 flex-1 overflow-auto bg-slate-950 flex items-center justify-center min-h-[300px]">
              {viewingMap.tipo === 'image' ? (
                <img
                  src={viewingMap.url}
                  alt={viewingMap.titulo}
                  className="max-w-full max-h-[75vh] object-contain rounded-lg shadow-lg"
                />
              ) : (
                <div className="w-full h-[70vh] flex flex-col items-center justify-center bg-slate-900 rounded-xl p-6 text-center text-white space-y-4">
                  <FileText className="w-16 h-16 text-rose-500 animate-pulse" />
                  <div>
                    <h5 className="text-base font-bold">{viewingMap.titulo}</h5>
                    <p className="text-xs text-slate-400 mt-1">Visualização do documento PDF</p>
                  </div>
                  {viewingMap.url.startsWith('data:application/pdf') ? (
                    <iframe
                      src={viewingMap.url}
                      title={viewingMap.titulo}
                      className="w-full h-full rounded-lg border border-slate-700"
                    />
                  ) : (
                    <a
                      href={viewingMap.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-5 py-2.5 rounded-xl bg-rose-600 hover:bg-rose-700 text-white font-bold text-xs flex items-center gap-2 transition"
                    >
                      <ExternalLink className="w-4 h-4" />
                      <span>Abrir Documento PDF Completo</span>
                    </a>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
