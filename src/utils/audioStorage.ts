// IndexedDB storage helper for client-side custom MP3 and audio files

export interface StoredAudioItem {
  id: string;
  name: string;
  artist: string;
  size: number;
  type: string;
  blob: Blob;
  createdAt: number;
  durationFormatted?: string;
}

const DB_NAME = 'ThinkSmartEnglishAudioDB';
const DB_VERSION = 1;
const STORE_NAME = 'custom_audio_tracks';

function openDatabase(): Promise<IDBDatabase> {
  return new Promise((resolve, reject) => {
    if (typeof window === 'undefined' || !window.indexedDB) {
      reject(new Error('IndexedDB is not supported in this browser.'));
      return;
    }

    const request = indexedDB.open(DB_NAME, DB_VERSION);

    request.onupgradeneeded = (event) => {
      const db = (event.target as IDBOpenDBRequest).result;
      if (!db.objectStoreNames.contains(STORE_NAME)) {
        db.createObjectStore(STORE_NAME, { keyPath: 'id' });
      }
    };

    request.onsuccess = () => {
      resolve(request.result);
    };

    request.onerror = () => {
      reject(request.error);
    };
  });
}

export async function saveAudioToStorage(file: File): Promise<StoredAudioItem> {
  const db = await openDatabase();
  const id = `track_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`;
  
  // Format clean name
  const cleanTitle = file.name.replace(/\.[^/.]+$/, '').trim();
  
  const record: StoredAudioItem = {
    id,
    name: cleanTitle,
    artist: 'Lagu Kustom User',
    size: file.size,
    type: file.type || 'audio/mpeg',
    blob: file,
    createdAt: Date.now(),
  };

  return new Promise((resolve, reject) => {
    const tx = db.transaction(STORE_NAME, 'readwrite');
    const store = tx.objectStore(STORE_NAME);
    const req = store.put(record);

    req.onsuccess = () => resolve(record);
    req.onerror = () => reject(req.error);
  });
}

export async function getAllStoredAudios(): Promise<StoredAudioItem[]> {
  try {
    const db = await openDatabase();
    return new Promise((resolve, reject) => {
      const tx = db.transaction(STORE_NAME, 'readonly');
      const store = tx.objectStore(STORE_NAME);
      const req = store.getAll();

      req.onsuccess = () => {
        const results = (req.result as StoredAudioItem[]) || [];
        // sort by newest
        results.sort((a, b) => b.createdAt - a.createdAt);
        resolve(results);
      };
      req.onerror = () => reject(req.error);
    });
  } catch (err) {
    console.warn('Could not read from audio storage:', err);
    return [];
  }
}

export async function deleteStoredAudio(id: string): Promise<void> {
  const db = await openDatabase();
  return new Promise((resolve, reject) => {
    const tx = db.transaction(STORE_NAME, 'readwrite');
    const store = tx.objectStore(STORE_NAME);
    const req = store.delete(id);

    req.onsuccess = () => resolve();
    req.onerror = () => reject(req.error);
  });
}

export function formatFileSize(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}
