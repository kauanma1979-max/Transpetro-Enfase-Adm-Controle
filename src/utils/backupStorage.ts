/**
 * Centralized Backup & Restore Utility for Transpetro 2026.3 App
 */

export interface BackupDataPayload {
  version: string;
  app: string;
  exportTimestamp: string;
  exportDateFormatted: string;
  data: {
    completedDays: string[];
    errorNotebook: any[];
    verticalSyllabusProgress: Record<string, any>;
    customMaterials: Record<string, any>;
    materialLinks: any[];
    scheduleDayNotes?: Record<string, string>;
    bancaNotes?: Record<string, any>;
    otherStorageKeys?: Record<string, any>;
  };
}

export interface BackupStats {
  completedDaysCount: number;
  errorNotebookCount: number;
  verticalTopicsCount: number;
  customMaterialsCount: number;
  materialLinksCount: number;
  scheduleNotesCount: number;
  bancaNotesCount: number;
  totalItems: number;
}

export const STORAGE_KEYS = {
  COMPLETED_DAYS: 'transpetro_completed_days_v2',
  ERROR_NOTEBOOK: 'transpetro_caderno_erros',
  VERTICAL_SYLLABUS: 'transpetro_edital_verticalizado_progress_v2',
  CUSTOM_MATERIALS: 'transpetro_material_estudo_custom_v1',
  MATERIAL_LINKS: 'transpetro_material_links_v1',
  SCHEDULE_DAY_NOTES: 'transpetro_schedule_day_notes',
  BANCA_NOTES: 'transpetro_banca_notes_v1'
};

export const notifyDataUpdated = (sourceKey?: string) => {
  try {
    window.dispatchEvent(new CustomEvent('transpetro_storage_changed', { detail: { key: sourceKey } }));
    window.dispatchEvent(new CustomEvent('transpetro_data_restored', { detail: { key: sourceKey } }));
  } catch (e) {
    // ignore
  }
};

export const getBackupStats = (): BackupStats => {
  let completedDaysCount = 0;
  let errorNotebookCount = 0;
  let verticalTopicsCount = 0;
  let customMaterialsCount = 0;
  let materialLinksCount = 0;
  let scheduleNotesCount = 0;
  let bancaNotesCount = 0;

  try {
    const rawDays = localStorage.getItem(STORAGE_KEYS.COMPLETED_DAYS);
    if (rawDays) completedDaysCount = JSON.parse(rawDays).length || 0;
  } catch (e) { /* ignore */ }

  try {
    const rawErrors = localStorage.getItem(STORAGE_KEYS.ERROR_NOTEBOOK);
    if (rawErrors) errorNotebookCount = JSON.parse(rawErrors).length || 0;
  } catch (e) { /* ignore */ }

  try {
    const rawVertical = localStorage.getItem(STORAGE_KEYS.VERTICAL_SYLLABUS);
    if (rawVertical) verticalTopicsCount = Object.keys(JSON.parse(rawVertical)).length || 0;
  } catch (e) { /* ignore */ }

  try {
    const rawMaterials = localStorage.getItem(STORAGE_KEYS.CUSTOM_MATERIALS);
    if (rawMaterials) customMaterialsCount = Object.keys(JSON.parse(rawMaterials)).length || 0;
  } catch (e) { /* ignore */ }

  try {
    const rawLinks = localStorage.getItem(STORAGE_KEYS.MATERIAL_LINKS);
    if (rawLinks) materialLinksCount = JSON.parse(rawLinks).length || 0;
  } catch (e) { /* ignore */ }

  try {
    const rawSchedNotes = localStorage.getItem(STORAGE_KEYS.SCHEDULE_DAY_NOTES);
    if (rawSchedNotes) scheduleNotesCount = Object.keys(JSON.parse(rawSchedNotes)).length || 0;
  } catch (e) { /* ignore */ }

  try {
    const rawBancaNotes = localStorage.getItem(STORAGE_KEYS.BANCA_NOTES);
    if (rawBancaNotes) bancaNotesCount = Object.keys(JSON.parse(rawBancaNotes)).length || 0;
  } catch (e) { /* ignore */ }

  return {
    completedDaysCount,
    errorNotebookCount,
    verticalTopicsCount,
    customMaterialsCount,
    materialLinksCount,
    scheduleNotesCount,
    bancaNotesCount,
    totalItems: completedDaysCount + errorNotebookCount + verticalTopicsCount + customMaterialsCount + materialLinksCount + scheduleNotesCount + bancaNotesCount
  };
};

export const exportFullBackup = (): void => {
  const now = new Date();
  const payload: BackupDataPayload = {
    version: '2.1',
    app: 'Transpetro 2026.3 - Pareto Ênfase 1: Administração e Controle',
    exportTimestamp: now.toISOString(),
    exportDateFormatted: now.toLocaleString('pt-BR'),
    data: {
      completedDays: [],
      errorNotebook: [],
      verticalSyllabusProgress: {},
      customMaterials: {},
      materialLinks: [],
      scheduleDayNotes: {},
      bancaNotes: {},
      otherStorageKeys: {}
    }
  };

  try {
    const days = localStorage.getItem(STORAGE_KEYS.COMPLETED_DAYS);
    if (days) payload.data.completedDays = JSON.parse(days);
  } catch (e) { /* ignore */ }

  try {
    const errors = localStorage.getItem(STORAGE_KEYS.ERROR_NOTEBOOK);
    if (errors) payload.data.errorNotebook = JSON.parse(errors);
  } catch (e) { /* ignore */ }

  try {
    const vert = localStorage.getItem(STORAGE_KEYS.VERTICAL_SYLLABUS);
    if (vert) payload.data.verticalSyllabusProgress = JSON.parse(vert);
  } catch (e) { /* ignore */ }

  try {
    const mats = localStorage.getItem(STORAGE_KEYS.CUSTOM_MATERIALS);
    if (mats) payload.data.customMaterials = JSON.parse(mats);
  } catch (e) { /* ignore */ }

  try {
    const links = localStorage.getItem(STORAGE_KEYS.MATERIAL_LINKS);
    if (links) payload.data.materialLinks = JSON.parse(links);
  } catch (e) { /* ignore */ }

  try {
    const schedNotes = localStorage.getItem(STORAGE_KEYS.SCHEDULE_DAY_NOTES);
    if (schedNotes) payload.data.scheduleDayNotes = JSON.parse(schedNotes);
  } catch (e) { /* ignore */ }

  try {
    const bancaNotes = localStorage.getItem(STORAGE_KEYS.BANCA_NOTES);
    if (bancaNotes) payload.data.bancaNotes = JSON.parse(bancaNotes);
  } catch (e) { /* ignore */ }

  // Grab any additional transpetro keys if existing
  for (let i = 0; i < localStorage.length; i++) {
    const key = localStorage.key(i);
    if (key && key.startsWith('transpetro_') && !Object.values(STORAGE_KEYS).includes(key)) {
      try {
        const val = localStorage.getItem(key);
        if (val && payload.data.otherStorageKeys) {
          payload.data.otherStorageKeys[key] = JSON.parse(val);
        }
      } catch (e) {
        if (payload.data.otherStorageKeys && key) {
          payload.data.otherStorageKeys[key] = localStorage.getItem(key);
        }
      }
    }
  }

  const jsonStr = JSON.stringify(payload, null, 2);
  const blob = new Blob([jsonStr], { type: 'application/json;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const downloadLink = document.createElement('a');
  
  const dateSuffix = now.toISOString().slice(0, 10);
  const timeSuffix = String(now.getHours()).padStart(2, '0') + String(now.getMinutes()).padStart(2, '0');
  downloadLink.href = url;
  downloadLink.download = `backup_transpetro_2026_${dateSuffix}_${timeSuffix}.json`;
  document.body.appendChild(downloadLink);
  downloadLink.click();
  document.body.removeChild(downloadLink);
  URL.revokeObjectURL(url);
};

export const importFullBackup = async (file: File): Promise<{ success: boolean; message: string; stats?: BackupStats }> => {
  return new Promise((resolve) => {
    const reader = new FileReader();

    reader.onload = (event) => {
      try {
        const content = event.target?.result as string;
        if (!content) {
          resolve({ success: false, message: 'O arquivo selecionado está vazio.' });
          return;
        }

        const parsed = JSON.parse(content);

        // Basic payload validation
        if (!parsed || (typeof parsed !== 'object')) {
          resolve({ success: false, message: 'Formato de arquivo JSON inválido.' });
          return;
        }

        // Support both direct data structures and wrapped payload structures
        const dataObj = parsed.data || parsed;

        if (dataObj.completedDays) {
          localStorage.setItem(STORAGE_KEYS.COMPLETED_DAYS, JSON.stringify(dataObj.completedDays));
        }

        if (dataObj.errorNotebook) {
          localStorage.setItem(STORAGE_KEYS.ERROR_NOTEBOOK, JSON.stringify(dataObj.errorNotebook));
        }

        if (dataObj.verticalSyllabusProgress) {
          localStorage.setItem(STORAGE_KEYS.VERTICAL_SYLLABUS, JSON.stringify(dataObj.verticalSyllabusProgress));
        }

        if (dataObj.customMaterials) {
          localStorage.setItem(STORAGE_KEYS.CUSTOM_MATERIALS, JSON.stringify(dataObj.customMaterials));
        }

        if (dataObj.materialLinks) {
          localStorage.setItem(STORAGE_KEYS.MATERIAL_LINKS, JSON.stringify(dataObj.materialLinks));
        }

        if (dataObj.scheduleDayNotes) {
          localStorage.setItem(STORAGE_KEYS.SCHEDULE_DAY_NOTES, JSON.stringify(dataObj.scheduleDayNotes));
        }

        if (dataObj.bancaNotes) {
          localStorage.setItem(STORAGE_KEYS.BANCA_NOTES, JSON.stringify(dataObj.bancaNotes));
        }

        if (dataObj.otherStorageKeys && typeof dataObj.otherStorageKeys === 'object') {
          Object.entries(dataObj.otherStorageKeys).forEach(([k, v]) => {
            if (typeof v === 'string') {
              localStorage.setItem(k, v);
            } else {
              localStorage.setItem(k, JSON.stringify(v));
            }
          });
        }

        notifyDataUpdated();

        const stats = getBackupStats();
        resolve({
          success: true,
          message: `Backup restaurado com sucesso! Foram recuperados ${stats.completedDaysCount} dias concluídos, ${stats.verticalTopicsCount} tópicos do edital, ${stats.errorNotebookCount} registros no caderno de erros e ${stats.materialLinksCount} links de materiais.`,
          stats
        });
      } catch (err: any) {
        resolve({
          success: false,
          message: `Erro ao processar o arquivo de backup: ${err?.message || 'Arquivo corrompido ou formato não suportado.'}`
        });
      }
    };

    reader.onerror = () => {
      resolve({ success: false, message: 'Falha na leitura do arquivo de backup.' });
    };

    reader.readAsText(file);
  });
};
