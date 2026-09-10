import { initializeApp, getApps, getApp } from 'firebase/app';
import {
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
  signOut,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  updateProfile,
  User as FirebaseUser,
} from 'firebase/auth';
import {
  initializeFirestore,
  getFirestore,
  doc,
  setDoc,
  getDoc,
  getDocFromServer,
  onSnapshot,
  serverTimestamp,
} from 'firebase/firestore';
import firebaseConfigData from '../../firebase-applet-config.json';
import { StudentProfile } from '../types';

export enum OperationType {
  CREATE = 'create',
  UPDATE = 'update',
  DELETE = 'delete',
  LIST = 'list',
  GET = 'get',
  WRITE = 'write',
}

export interface FirestoreErrorInfo {
  error: string;
  operationType: OperationType;
  path: string | null;
  authInfo: {
    userId?: string | null;
    email?: string | null;
    emailVerified?: boolean | null;
    isAnonymous?: boolean | null;
    tenantId?: string | null;
    providerInfo?: {
      providerId?: string | null;
      email?: string | null;
    }[];
  };
}

export function handleFirestoreError(error: unknown, operationType: OperationType, path: string | null) {
  const errInfo: FirestoreErrorInfo = {
    error: error instanceof Error ? error.message : String(error),
    authInfo: {
      userId: auth.currentUser?.uid,
      email: auth.currentUser?.email,
      emailVerified: auth.currentUser?.emailVerified,
      isAnonymous: auth.currentUser?.isAnonymous,
      tenantId: auth.currentUser?.tenantId,
      providerInfo: auth.currentUser?.providerData?.map((provider) => ({
        providerId: provider.providerId,
        email: provider.email,
      })) || [],
    },
    operationType,
    path,
  };
  console.error('Firestore Error: ', JSON.stringify(errInfo));
  throw new Error(JSON.stringify(errInfo));
}

const firebaseConfig = {
  apiKey: firebaseConfigData.apiKey,
  authDomain: firebaseConfigData.authDomain,
  projectId: firebaseConfigData.projectId,
  storageBucket: firebaseConfigData.storageBucket,
  messagingSenderId: firebaseConfigData.messagingSenderId,
  appId: firebaseConfigData.appId,
};

// Initialize Firebase App singleton
const app = getApps().length > 0 ? getApp() : initializeApp(firebaseConfig);

// Initialize Firebase Auth
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
googleProvider.setCustomParameters({
  prompt: 'select_account',
});
googleProvider.addScope('https://www.googleapis.com/auth/drive');
googleProvider.addScope('https://www.googleapis.com/auth/spreadsheets');

let cachedAccessToken: string | null = null;

export const getAccessToken = (): string | null => cachedAccessToken;
export const setAccessToken = (token: string | null): void => {
  cachedAccessToken = token;
};

// Initialize Firestore with explicit long-polling transport to prevent 10s WebChannel timeout in sandboxed iframes & proxies
const rawDbId = (firebaseConfigData as any).firestoreDatabaseId;
const databaseId = rawDbId && rawDbId !== '(default)' ? rawDbId : undefined;

function createFirestoreInstance() {
  try {
    return initializeFirestore(
      app,
      {
        experimentalForceLongPolling: true,
        ignoreUndefinedProperties: true,
      },
      databaseId
    );
  } catch {
    return databaseId ? getFirestore(app, databaseId) : getFirestore(app);
  }
}

export const db = createFirestoreInstance();

// Test connection on boot as mandated by Firebase skill
export async function testConnection() {
  try {
    await getDocFromServer(doc(db, 'test', 'connection'));
  } catch (error) {
    if (error instanceof Error && error.message.includes('the client is offline')) {
      console.warn('Firestore offline notice: The client is currently operating in offline mode.');
    }
  }
}
testConnection().catch(() => {});

// Authentication Helpers
export const signInWithGoogle = async (): Promise<FirebaseUser> => {
  const result = await signInWithPopup(auth, googleProvider);
  const credential = GoogleAuthProvider.credentialFromResult(result);
  if (credential?.accessToken) {
    cachedAccessToken = credential.accessToken;
  }
  return result.user;
};

export const logoutGoogle = async (): Promise<void> => {
  cachedAccessToken = null;
  await signOut(auth);
};

// Email / Username login helper
export const loginWithEmailOrUsername = async (
  identifier: string,
  pass: string
): Promise<FirebaseUser> => {
  const trimmed = identifier.trim().toLowerCase();
  const emailToUse = trimmed.includes('@') ? trimmed : `${trimmed.replace(/[^a-z0-9._-]/g, '')}@thinksmart.student.id`;
  const cred = await signInWithEmailAndPassword(auth, emailToUse, pass);
  return cred.user;
};

// Email / Username register helper
export const registerWithEmailOrUsername = async (
  identifier: string,
  pass: string,
  displayName?: string
): Promise<FirebaseUser> => {
  const trimmed = identifier.trim().toLowerCase();
  const emailToUse = trimmed.includes('@') ? trimmed : `${trimmed.replace(/[^a-z0-9._-]/g, '')}@thinksmart.student.id`;
  const cred = await createUserWithEmailAndPassword(auth, emailToUse, pass);
  if (displayName) {
    try {
      await updateProfile(cred.user, { displayName });
    } catch {
      // Non-blocking
    }
  }
  return cred.user;
};

// Helper to recursively strip undefined values for Firestore
function sanitizeForFirestore(obj: Record<string, any>): Record<string, any> {
  const result: Record<string, any> = {};
  for (const [key, val] of Object.entries(obj)) {
    if (val === undefined) {
      continue;
    } else if (val !== null && typeof val === 'object' && !Array.isArray(val) && !(val instanceof Date)) {
      result[key] = sanitizeForFirestore(val);
    } else {
      result[key] = val;
    }
  }
  return result;
}

export const syncProfileToCloud = async (
  userId: string,
  profile: StudentProfile,
  userEmail?: string | null
): Promise<void> => {
  if (!userId) return;
  const path = `users/${userId}`;
  const userDocRef = doc(db, 'users', userId);
  const dataToSave = sanitizeForFirestore({
    ...profile,
    email: userEmail || profile.email || null,
    googleUid: userId,
    isGoogleLinked: true,
    lastSyncedAt: new Date().toISOString(),
    updatedAt: serverTimestamp(),
  });

  try {
    await setDoc(userDocRef, dataToSave, { merge: true });
  } catch (error: any) {
    if (error?.code === 'permission-denied' || error?.message?.includes('Missing or insufficient permissions')) {
      handleFirestoreError(error, OperationType.WRITE, path);
    }
    throw error;
  }
};

export const fetchProfileFromCloud = async (
  userId: string
): Promise<StudentProfile | null> => {
  if (!userId) return null;
  const path = `users/${userId}`;
  const userDocRef = doc(db, 'users', userId);

  try {
    const docSnap = await getDoc(userDocRef);
    if (docSnap.exists()) {
      const data = docSnap.data();
      return {
        name: data.name || 'Siswa Cendekia',
        educationLevel: data.educationLevel || 'SMA',
        classGrade: data.classGrade || 'XII',
        major: data.major || 'MIPA',
        customMajor: data.customMajor,
        schoolName: data.schoolName,
        schoolNpsn: data.schoolNpsn,
        schoolCity: data.schoolCity,
        schoolProvince: data.schoolProvince,
        targetUtbkScore: data.targetUtbkScore || '750+',
        accessCode: data.accessCode || 'TS2026',
        avatarLetter: data.avatarLetter || data.name?.charAt(0)?.toUpperCase() || 'S',
        avatarUrl: data.avatarUrl,
        joinedDate: data.joinedDate || new Date().toLocaleDateString('id-ID'),
        completedLessons: data.completedLessons || [],
        quizScores: data.quizScores || {},
        streakDays: data.streakDays ?? 1,
        totalStudyMinutes: data.totalStudyMinutes ?? 0,
        vocabularyMastered: data.vocabularyMastered ?? 0,
        universalPrestige: data.universalPrestige ?? 0,
        username: data.username,
        email: data.email,
        googleUid: data.googleUid || userId,
        isGoogleLinked: true,
        lastSyncedAt: data.lastSyncedAt,
      };
    }
    return null;
  } catch (error: any) {
    if (error?.code === 'permission-denied' || error?.message?.includes('Missing or insufficient permissions')) {
      handleFirestoreError(error, OperationType.GET, path);
    }
    console.warn('Could not fetch cloud profile (offline/connecting):', error?.message || error);
    return null;
  }
};

export const listenToCloudProfile = (
  userId: string,
  onUpdate: (profile: StudentProfile) => void,
  onError?: (error: unknown) => void
) => {
  if (!userId) return () => {};
  const path = `users/${userId}`;
  const userDocRef = doc(db, 'users', userId);

  return onSnapshot(
    userDocRef,
    (docSnap) => {
      if (docSnap.exists()) {
        const data = docSnap.data();
        onUpdate({
          name: data.name || 'Siswa Cendekia',
          educationLevel: data.educationLevel || 'SMA',
          classGrade: data.classGrade || 'XII',
          major: data.major || 'MIPA',
          customMajor: data.customMajor,
          schoolName: data.schoolName,
          targetUtbkScore: data.targetUtbkScore || '750+',
          accessCode: data.accessCode || 'TS2026',
          avatarLetter: data.avatarLetter || data.name?.charAt(0)?.toUpperCase() || 'S',
          avatarUrl: data.avatarUrl,
          joinedDate: data.joinedDate || new Date().toLocaleDateString('id-ID'),
          completedLessons: data.completedLessons || [],
          quizScores: data.quizScores || {},
          streakDays: data.streakDays ?? 1,
          totalStudyMinutes: data.totalStudyMinutes ?? 0,
          vocabularyMastered: data.vocabularyMastered ?? 0,
          email: data.email,
          googleUid: data.googleUid || userId,
          isGoogleLinked: true,
          lastSyncedAt: data.lastSyncedAt,
        });
      }
    },
    (error) => {
      if (error?.code === 'permission-denied' || error?.message?.includes('Missing or insufficient permissions')) {
        handleFirestoreError(error, OperationType.GET, path);
      }
      console.warn('Firestore snapshot listener offline/interrupted:', error.message);
      if (onError) onError(error);
    }
  );
};
