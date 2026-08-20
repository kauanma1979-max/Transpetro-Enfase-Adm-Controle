import React, { useState, useRef } from 'react';
import { 
  Image as ImageIcon, 
  FileText, 
  Plus, 
  Trash2, 
  ExternalLink, 
  ZoomIn, 
  X, 
  Upload, 
  Edit3, 
  Save, 
  Check, 
  FileUp,
  Sparkles,
  Layers,
  BookMarked
} from 'lucide-react';

export interface MindMapItem {
  id: string;
  secaoId: string;
  titulo: string;
  tipo: 'image' | 'pdf';
  url: string; // Base64 or external url
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

export const MindMapSection: React.FC<MindMapSectionProps> = ({
  secaoId,
  secaoTitulo,
  customData,
  onSaveData
}) => {
  const [notes, setNotes] = useState<string>(customData.notes || '');
  const [isEditingNotes, setIsEditingNotes] = useState<boolean>(false);
  const [notesSavedToast, setNotesSavedToast] = useState<boolean>(false);

  // Modal for adding mind map
  const [showAddModal, setShowAddModal] = useState<boolean>(false);
  const [addMode, setAddMode] = useState<'upload' | 'url'>('upload');
  const [mapTitle, setMapTitle] = useState<string>('');
  const [mapUrl, setMapUrl] = useState<string>('');
  const [mapType, setMapType] = useState<'image' | 'pdf'>('image');
  const [selectedFile, setSelectedFile] = useState<{ base64: string; type: 'image' | 'pdf'; sizeKb: number; name: string } | null>(null);

  // Lightbox modal for viewing image/PDF
  const [viewingMap, setViewingMap] = useState<MindMapItem | null>(null);

  const fileInputRef = useRef<HTMLInputElement>(null);

  const mindMaps = customData.mindMaps || [];

  const handleSaveNotes = () => {
    onSaveData(secaoId, { ...customData, notes });
    setIsEditingNotes(false);
    setNotesSavedToast(true);
    setTimeout(() => setNotesSavedToast(false), 2500);
  };

  const handleFileSelected = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const isPdf = file.type === 'application/pdf' || file.name.endsWith('.pdf');
    const isImg = file.type.startsWith('image/');

    if (!isPdf && !isImg) {
      alert('Por favor selecione um arquivo de imagem (PNG, JPG, WebP) ou PDF.');
      return;
    }

    const reader = new FileReader();
    reader.onload = (event) => {
      const base64 = event.target?.result as string;
      setSelectedFile({
        base64,
        type: isPdf ? 'pdf' : 'image',
        sizeKb: Math.round(file.size / 1024),
        name: file.name.replace(/\.[^/.]+$/, '')
      });
      if (!mapTitle) {
        setMapTitle(file.name.replace(/\.[^/.]+$/, ''));
      }
      setMapType(isPdf ? 'pdf' : 'image');
    };
    reader.readAsDataURL(file);
  };

  const handleAddMindMap = (e: React.FormEvent) => {
    e.preventDefault();
    let finalUrl = '';
    let finalType: 'image' | 'pdf' = mapType;
    let sizeKb: number | undefined;

    if (addMode === 'upload') {
      if (!selectedFile) {
        alert('Selecione um arquivo para enviar.');
        return;
      }
      finalUrl = selectedFile.base64;
      finalType = selectedFile.type;
      sizeKb = selectedFile.sizeKb;
    } else {
      if (!mapUrl.trim()) {
        alert('Insira a URL do mapa mental.');
        return;
      }
      finalUrl = mapUrl.trim();
      finalType = finalUrl.toLowerCase().includes('.pdf') ? 'pdf' : 'image';
    }

    const newItem: MindMapItem = {
      id: `map-${Date.now()}-${Math.random().toString(36).substr(2, 4)}`,
      secaoId,
      titulo: mapTitle.trim() || (finalType === 'pdf' ? 'Mapa Mental (PDF)' : 'Mapa Mental (Imagem)'),
      tipo: finalType,
      url: finalUrl,
      dataAdicionado: new Date().toLocaleDateString('pt-BR'),
      tamanhoKb: sizeKb
    };

    const updatedMaps = [...mindMaps, newItem];
    onSaveData(secaoId, { ...customData, mindMaps: updatedMaps });

    // Reset Form
    setShowAddModal(false);
    setMapTitle('');
    setMapUrl('');
    setSelectedFile(null);
  };

  const handleDeleteMindMap = (mapId: string) => {
    if (window.confirm('Deseja realmente remover este mapa mental?')) {
      const updatedMaps = mindMaps.filter(m => m.id !== mapId);
      onSaveData(secaoId, { ...customData, mindMaps: updatedMaps });
    }
  };

  return (
    <div className="space-y-4 pt-2 border-t border-slate-100">
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
          onClick={() => setShowAddModal(true)}
          className="px-3 py-1.5 rounded-lg bg-purple-50 hover:bg-purple-600 text-purple-700 hover:text-white font-bold text-xs border border-purple-200 transition cursor-pointer flex items-center gap-1.5 self-start sm:self-auto shadow-xs"
        >
          <Plus className="w-3.5 h-3.5" />
          <span>+ Inserir Mapa Mental (Imagem / PDF)</span>
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
                  <div className="absolute inset-0 bg-slate-950/20 opacity-0 group-hover:opacity-100 transition flex items-center justify-center text-white gap-1.5 font-bold text-xs backdrop-blur-2xs">
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

              {/* Card Footer Info & Actions */}
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
                    title="Visualizar em tamanho grande"
                    className="p-1.5 rounded-lg text-slate-500 hover:text-purple-700 hover:bg-purple-50 transition cursor-pointer"
                  >
                    <ZoomIn className="w-3.5 h-3.5" />
                  </button>
                  <button
                    onClick={() => handleDeleteMindMap(map.id)}
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
                onClick={() => {
                  setNotes(customData.notes || '');
                  setIsEditingNotes(false);
                }}
                className="px-3 py-1.5 text-xs text-slate-600 hover:text-slate-800 font-semibold cursor-pointer"
              >
                Cancelar
              </button>
              <button
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

      {/* Modal: Inserir Mapa Mental */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-xs animate-fadeIn">
          <div 
            className="bg-white w-full max-w-lg rounded-2xl shadow-2xl border border-slate-200 overflow-hidden"
            onClick={e => e.stopPropagation()}
          >
            <div className="bg-slate-900 text-white p-4 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Layers className="w-5 h-5 text-purple-400" />
                <h4 className="font-bold text-sm">Inserir Mapa Mental em {secaoTitulo}</h4>
              </div>
              <button onClick={() => setShowAddModal(false)} className="text-slate-400 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleAddMindMap} className="p-5 space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Título / Nome do Mapa Mental:
                </label>
                <input
                  type="text"
                  required
                  placeholder="Ex: Esquema Resumido Lei 13.303, Fluxograma PDCA, Tríade CID..."
                  value={mapTitle}
                  onChange={(e) => setMapTitle(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-lg p-2.5 text-xs text-slate-800 focus:outline-hidden focus:border-purple-600"
                />
              </div>

              {/* Mode Switch: Upload File or External URL */}
              <div className="flex border-b border-slate-200">
                <button
                  type="button"
                  onClick={() => setAddMode('upload')}
                  className={`flex-1 py-2 text-xs font-bold border-b-2 transition ${
                    addMode === 'upload' ? 'border-purple-600 text-purple-700' : 'border-transparent text-slate-500'
                  }`}
                >
                  📁 Enviar Arquivo (Imagem / PDF)
                </button>
                <button
                  type="button"
                  onClick={() => setAddMode('url')}
                  className={`flex-1 py-2 text-xs font-bold border-b-2 transition ${
                    addMode === 'url' ? 'border-purple-600 text-purple-700' : 'border-transparent text-slate-500'
                  }`}
                >
                  🔗 Inserir Link / URL
                </button>
              </div>

              {addMode === 'upload' ? (
                <div>
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*,.pdf"
                    onChange={handleFileSelected}
                    className="hidden"
                  />
                  <div
                    onClick={() => fileInputRef.current?.click()}
                    className="border-2 border-dashed border-purple-200 hover:border-purple-400 bg-purple-50/40 rounded-xl p-6 text-center cursor-pointer transition space-y-2"
                  >
                    <div className="w-10 h-10 rounded-full bg-purple-100 text-purple-700 mx-auto flex items-center justify-center">
                      <FileUp className="w-5 h-5" />
                    </div>
                    {selectedFile ? (
                      <div>
                        <p className="text-xs font-bold text-purple-900">{selectedFile.name}</p>
                        <p className="text-[11px] text-slate-500">{selectedFile.type === 'pdf' ? 'Arquivo PDF' : 'Imagem'} · {selectedFile.sizeKb} KB</p>
                      </div>
                    ) : (
                      <div>
                        <p className="text-xs font-bold text-slate-700">Clique para selecionar imagem ou PDF</p>
                        <p className="text-[10px] text-slate-400">Suporta PNG, JPG, JPEG, WebP e PDF (até 5MB)</p>
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
                      type="url"
                      placeholder="https://exemplo.com/mapa-mental.png ou https://drive.google.com/..."
                      value={mapUrl}
                      onChange={(e) => setMapUrl(e.target.value)}
                      className="w-full bg-slate-50 border border-slate-200 rounded-lg p-2.5 text-xs text-slate-800 focus:outline-hidden focus:border-purple-600"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Tipo do Material:
                    </label>
                    <select
                      value={mapType}
                      onChange={(e) => setMapType(e.target.value as any)}
                      className="w-full bg-slate-50 border border-slate-200 rounded-lg p-2.5 text-xs text-slate-800"
                    >
                      <option value="image">🖼️ Imagem (PNG, JPG, WebP)</option>
                      <option value="pdf">📄 Documento PDF</option>
                    </select>
                  </div>
                </div>
              )}

              <div className="flex items-center justify-end gap-2 pt-3 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="px-4 py-2 text-xs font-semibold text-slate-600 hover:text-slate-800"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-xl bg-purple-600 hover:bg-purple-700 text-white font-bold text-xs shadow-xs transition"
                >
                  Salvar Mapa Mental
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Lightbox Modal: Visualizador de Imagem / PDF */}
      {viewingMap && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-sm animate-fadeIn"
          onClick={() => setViewingMap(null)}
        >
          <div 
            className="bg-white w-full max-w-4xl max-h-[90vh] rounded-2xl shadow-2xl border border-slate-700 overflow-hidden flex flex-col"
            onClick={e => e.stopPropagation()}
          >
            <div className="bg-slate-900 text-white p-4 flex items-center justify-between border-b border-slate-800">
              <div className="flex items-center gap-2 min-w-0">
                <Layers className="w-5 h-5 text-purple-400 shrink-0" />
                <h4 className="font-bold text-sm truncate">{viewingMap.titulo}</h4>
                <span className="text-[10px] bg-slate-800 text-slate-300 px-2 py-0.5 rounded-full">
                  {viewingMap.tipo.toUpperCase()}
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
                  onClick={() => setViewingMap(null)} 
                  className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition"
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
