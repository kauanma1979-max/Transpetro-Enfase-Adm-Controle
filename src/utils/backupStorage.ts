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

export const generateBackupPayload = (): BackupDataPayload => {
  const now = new Date();
  const payload: BackupDataPayload = {
    version: '2.2',
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

  return payload;
};

export const getBackupJsonString = (): string => {
  return JSON.stringify(generateBackupPayload(), null, 2);
};

export const copyBackupToClipboard = async (): Promise<boolean> => {
  try {
    const jsonStr = getBackupJsonString();
    if (navigator.clipboard && navigator.clipboard.writeText) {
      await navigator.clipboard.writeText(jsonStr);
      return true;
    } else {
      // Fallback for environments where clipboard API is restricted
      const textarea = document.createElement('textarea');
      textarea.value = jsonStr;
      textarea.style.position = 'fixed';
      textarea.style.opacity = '0';
      document.body.appendChild(textarea);
      textarea.select();
      const successful = document.execCommand('copy');
      document.body.removeChild(textarea);
      return successful;
    }
  } catch (e) {
    console.error('Failed to copy to clipboard', e);
    return false;
  }
};

export const exportFullBackup = (): void => {
  const payload = generateBackupPayload();
  const jsonStr = JSON.stringify(payload, null, 2);
  const blob = new Blob([jsonStr], { type: 'application/json;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const downloadLink = document.createElement('a');
  
  const now = new Date();
  const dateSuffix = now.toISOString().slice(0, 10);
  const timeSuffix = String(now.getHours()).padStart(2, '0') + String(now.getMinutes()).padStart(2, '0');
  downloadLink.href = url;
  downloadLink.setAttribute('download', `backup_transpetro_2026_${dateSuffix}_${timeSuffix}.json`);
  document.body.appendChild(downloadLink);
  downloadLink.click();
  
  // Safe cleanup with timeout to prevent premature revocation in sandboxed iframes
  setTimeout(() => {
    try {
      document.body.removeChild(downloadLink);
      URL.revokeObjectURL(url);
    } catch (e) { /* ignore */ }
  }, 1000);
};

export const exportErrorNotebookJson = (): void => {
  try {
    const rawErrors = localStorage.getItem(STORAGE_KEYS.ERROR_NOTEBOOK);
    const errors = rawErrors ? JSON.parse(rawErrors) : [];
    const jsonStr = JSON.stringify(errors, null, 2);
    const blob = new Blob([jsonStr], { type: 'application/json;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const downloadLink = document.createElement('a');
    const now = new Date();
    const dateSuffix = now.toISOString().slice(0, 10);
    const timeSuffix = String(now.getHours()).padStart(2, '0') + String(now.getMinutes()).padStart(2, '0');
    downloadLink.href = url;
    downloadLink.setAttribute('download', `caderno_erros_transpetro_${dateSuffix}_${timeSuffix}.json`);
    document.body.appendChild(downloadLink);
    downloadLink.click();
    setTimeout(() => {
      try {
        document.body.removeChild(downloadLink);
        URL.revokeObjectURL(url);
      } catch (e) { /* ignore */ }
    }, 1000);
  } catch (e) {
    console.error('Error exporting error notebook JSON', e);
  }
};

export const restoreFromRawData = (dataObj: any): { success: boolean; message: string; stats?: BackupStats } => {
  try {
    if (!dataObj || (typeof dataObj !== 'object' && !Array.isArray(dataObj))) {
      return { success: false, message: 'Formato de dados inválido.' };
    }

    // CASE 1: The user uploaded an array directly
    if (Array.isArray(dataObj)) {
      if (dataObj.length > 0) {
        const first = dataObj[0];
        // Check if items are errors (have disciplina, regraCorreta, motivoErro, or subtopico)
        if (first && (first.regraCorreta || first.disciplina || first.motivoErro || first.subtopico)) {
          localStorage.setItem(STORAGE_KEYS.ERROR_NOTEBOOK, JSON.stringify(dataObj));
          localStorage.setItem('transpetro_caderno_erros_customized', 'true');
          notifyDataUpdated(STORAGE_KEYS.ERROR_NOTEBOOK);
          const stats = getBackupStats();
          return {
            success: true,
            message: `Caderno de erros restaurado com sucesso! Foram carregados ${dataObj.length} registros de erros.`,
            stats
          };
        }
        // Check if items are completed days (array of string ids)
        if (typeof first === 'string') {
          localStorage.setItem(STORAGE_KEYS.COMPLETED_DAYS, JSON.stringify(dataObj));
          notifyDataUpdated(STORAGE_KEYS.COMPLETED_DAYS);
          const stats = getBackupStats();
          return {
            success: true,
            message: `Cronograma restaurado com sucesso! Foram carregados ${dataObj.length} dias concluídos.`,
            stats
          };
        }
      }
    }

    const payload = dataObj.data || dataObj;

    // 1. COMPLETED DAYS
    const days = payload.completedDays || 
                 payload.diasConcluidos || 
                 payload.completed_days || 
                 payload[STORAGE_KEYS.COMPLETED_DAYS];
    if (days && Array.isArray(days)) {
      localStorage.setItem(STORAGE_KEYS.COMPLETED_DAYS, JSON.stringify(days));
    }

    // 2. ERROR NOTEBOOK
    const errorsList = payload.errorNotebook || 
                       payload.caderno_erros || 
                       payload.cadernoErros || 
                       payload.errors || 
                       payload.erros || 
                       payload[STORAGE_KEYS.ERROR_NOTEBOOK] ||
                       (payload.otherStorageKeys && payload.otherStorageKeys[STORAGE_KEYS.ERROR_NOTEBOOK]);
    if (errorsList && Array.isArray(errorsList)) {
      localStorage.setItem(STORAGE_KEYS.ERROR_NOTEBOOK, JSON.stringify(errorsList));
      localStorage.setItem('transpetro_caderno_erros_customized', 'true');
    }

    // 3. VERTICAL SYLLABUS PROGRESS
    const vert = payload.verticalSyllabusProgress || 
                 payload.editalVerticalizado || 
                 payload.verticalProgress || 
                 payload[STORAGE_KEYS.VERTICAL_SYLLABUS];
    if (vert && typeof vert === 'object') {
      localStorage.setItem(STORAGE_KEYS.VERTICAL_SYLLABUS, JSON.stringify(vert));
    }

    // 4. CUSTOM MATERIALS
    const mats = payload.customMaterials || 
                 payload.materialEstudoCustom || 
                 payload[STORAGE_KEYS.CUSTOM_MATERIALS];
    if (mats && typeof mats === 'object') {
      localStorage.setItem(STORAGE_KEYS.CUSTOM_MATERIALS, JSON.stringify(mats));
    }

    // 5. MATERIAL LINKS
    const links = payload.materialLinks || 
                  payload.links || 
                  payload[STORAGE_KEYS.MATERIAL_LINKS];
    if (links && Array.isArray(links)) {
      localStorage.setItem(STORAGE_KEYS.MATERIAL_LINKS, JSON.stringify(links));
    }

    // 6. SCHEDULE NOTES
    const schedNotes = payload.scheduleDayNotes || 
                       payload.dayNotes || 
                       payload[STORAGE_KEYS.SCHEDULE_DAY_NOTES];
    if (schedNotes && typeof schedNotes === 'object') {
      localStorage.setItem(STORAGE_KEYS.SCHEDULE_DAY_NOTES, JSON.stringify(schedNotes));
    }

    // 7. BANCA NOTES
    const bancaNotes = payload.bancaNotes || 
                       payload[STORAGE_KEYS.BANCA_NOTES];
    if (bancaNotes && typeof bancaNotes === 'object') {
      localStorage.setItem(STORAGE_KEYS.BANCA_NOTES, JSON.stringify(bancaNotes));
    }

    // 8. OTHER KEYS
    if (payload.otherStorageKeys && typeof payload.otherStorageKeys === 'object') {
      Object.entries(payload.otherStorageKeys).forEach(([k, v]) => {
        if (k !== STORAGE_KEYS.ERROR_NOTEBOOK) {
          if (typeof v === 'string') {
            localStorage.setItem(k, v);
          } else {
            localStorage.setItem(k, JSON.stringify(v));
          }
        }
      });
    }

    notifyDataUpdated();

    const stats = getBackupStats();
    return {
      success: true,
      message: `Backup restaurado com sucesso! Foram carregados ${stats.completedDaysCount} dias concluídos, ${stats.verticalTopicsCount} tópicos do edital, ${stats.errorNotebookCount} registros no caderno de erros e ${stats.materialLinksCount} links/arquivos de materiais.`,
      stats
    };
  } catch (err: any) {
    return {
      success: false,
      message: `Erro ao aplicar dados de backup: ${err?.message || 'Erro desconhecido.'}`
    };
  }
};

export const importBackupFromJsonString = (jsonString: string): { success: boolean; message: string; stats?: BackupStats } => {
  try {
    if (!jsonString || !jsonString.trim()) {
      return { success: false, message: 'O texto JSON fornecido está vazio.' };
    }
    const parsed = JSON.parse(jsonString);
    return restoreFromRawData(parsed);
  } catch (err: any) {
    return {
      success: false,
      message: `Erro ao analisar JSON: Formato inválido. Detalhe: ${err?.message || 'Sintaxe inválida'}`
    };
  }
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
        const result = restoreFromRawData(parsed);
        resolve(result);
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

