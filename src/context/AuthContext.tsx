import React, { createContext, useContext, useState, useEffect, useCallback, ReactNode } from 'react';
import { User as FirebaseUser, onAuthStateChanged } from 'firebase/auth';
import {
  auth,
  signInWithGoogle,
  logoutGoogle,
  loginWithEmailOrUsername,
  registerWithEmailOrUsername,
  syncProfileToCloud,
  fetchProfileFromCloud,
  getAccessToken,
  setAccessToken,
} from '../lib/firebase';
import { StudentProfile } from '../types';

export type CloudSyncStatus = 'offline' | 'syncing' | 'synced' | 'error';

interface AuthContextType {
  currentUser: FirebaseUser | null;
  accessToken: string | null;
  isLoading: boolean;
  isConfigured: boolean;
  syncStatus: CloudSyncStatus;
  lastSyncedAt: string | null;
  cloudProfile: StudentProfile | null;
  signInWithGoogle: () => Promise<FirebaseUser | null>;
  signInWithEmail: (identifier: string, pass: string) => Promise<FirebaseUser | null>;
  registerWithEmail: (identifier: string, pass: string, displayName?: string) => Promise<FirebaseUser | null>;
  signOut: () => Promise<void>;
  syncProfile: (profile: StudentProfile) => Promise<boolean>;
  loadCloudProfile: () => Promise<StudentProfile | null>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<FirebaseUser | null>(null);
  const [accessToken, setAccessTokenState] = useState<string | null>(getAccessToken());
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [syncStatus, setSyncStatus] = useState<CloudSyncStatus>('offline');
  const [lastSyncedAt, setLastSyncedAt] = useState<string | null>(null);
  const [cloudProfile, setCloudProfile] = useState<StudentProfile | null>(null);
  const isConfigured = true;

  // Function to load or migrate profile upon login
  const handleUserSession = useCallback(async (user: FirebaseUser) => {
    try {
      setSyncStatus('syncing');
      const remoteProfile = await fetchProfileFromCloud(user.uid);
      if (remoteProfile) {
        setCloudProfile(remoteProfile);
        if (remoteProfile.lastSyncedAt) {
          setLastSyncedAt(remoteProfile.lastSyncedAt);
        }
        setSyncStatus('synced');
      } else {
        // No remote profile yet: Migrate local profile to cloud
        const localSaved = localStorage.getItem('ts_student_profile');
        let profileToSync: StudentProfile;
        if (localSaved) {
          try {
            profileToSync = JSON.parse(localSaved);
          } catch {
            profileToSync = {
              name: user.displayName || 'Siswa Cendekia',
              educationLevel: 'SMA',
              classGrade: 'XII',
              major: 'MIPA',
              targetUtbkScore: '750+',
              accessCode: 'TS2026',
              avatarLetter: (user.displayName || 'S').charAt(0).toUpperCase(),
              avatarUrl: user.photoURL || undefined,
              joinedDate: new Date().toLocaleDateString('id-ID'),
              completedLessons: ['t1', 't2'],
              quizScores: {},
              streakDays: 5,
              totalStudyMinutes: 120,
              vocabularyMastered: 18,
            };
          }
        } else {
          profileToSync = {
            name: user.displayName || 'Siswa Cendekia',
            educationLevel: 'SMA',
            classGrade: 'XII',
            major: 'MIPA',
            targetUtbkScore: '750+',
            accessCode: 'TS2026',
            avatarLetter: (user.displayName || 'S').charAt(0).toUpperCase(),
            avatarUrl: user.photoURL || undefined,
            joinedDate: new Date().toLocaleDateString('id-ID'),
            completedLessons: ['t1', 't2'],
            quizScores: {},
            streakDays: 5,
            totalStudyMinutes: 120,
            vocabularyMastered: 18,
          };
        }

        // If local user had default name but Google name is provided, enrich with Google profile
        if (user.displayName && (!profileToSync.name || profileToSync.name === 'Siswa Cendekia')) {
          profileToSync.name = user.displayName;
        }
        if (user.photoURL && !profileToSync.avatarUrl) {
          profileToSync.avatarUrl = user.photoURL;
        }

        await syncProfileToCloud(user.uid, profileToSync, user.email);
        setCloudProfile(profileToSync);
        const timestamp = new Date().toISOString();
        setLastSyncedAt(timestamp);
        setSyncStatus('synced');
      }
    } catch (err) {
      console.warn('Notice in handleUserSession (client operating with offline/local data):', err);
      setSyncStatus('offline');
    }
  }, []);

  // Monitor Firebase Auth state
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      setCurrentUser(user);
      setIsLoading(false);
      if (user) {
        await handleUserSession(user);
      } else {
        setSyncStatus('offline');
        setCloudProfile(null);
      }
    });

    return () => unsubscribe();
  }, [handleUserSession]);

  const handleSignInWithGoogle = async (): Promise<FirebaseUser | null> => {
    try {
      setIsLoading(true);
      const user = await signInWithGoogle();
      const token = getAccessToken();
      setAccessTokenState(token);
      setCurrentUser(user);
      if (user) {
        await handleUserSession(user);
      }
      return user;
    } catch (error) {
      console.error('Google Sign In Error:', error);
      setSyncStatus('error');
      return null;
    } finally {
      setIsLoading(false);
    }
  };

  const handleSignInWithEmail = async (identifier: string, pass: string): Promise<FirebaseUser | null> => {
    try {
      setIsLoading(true);
      const user = await loginWithEmailOrUsername(identifier, pass);
      setCurrentUser(user);
      if (user) {
        await handleUserSession(user);
      }
      return user;
    } catch (error) {
      console.warn('Email Sign In Notice:', error);
      return null;
    } finally {
      setIsLoading(false);
    }
  };

  const handleRegisterWithEmail = async (
    identifier: string,
    pass: string,
    displayName?: string
  ): Promise<FirebaseUser | null> => {
    try {
      setIsLoading(true);
      const user = await registerWithEmailOrUsername(identifier, pass, displayName);
      setCurrentUser(user);
      if (user) {
        await handleUserSession(user);
      }
      return user;
    } catch (error) {
      console.warn('Email Register Notice:', error);
      return null;
    } finally {
      setIsLoading(false);
    }
  };

  const handleSignOut = async (): Promise<void> => {
    try {
      await logoutGoogle();
      setAccessTokenState(null);
      setCurrentUser(null);
      setCloudProfile(null);
      setSyncStatus('offline');
    } catch (error) {
      console.error('Sign Out Error:', error);
    }
  };

  const syncProfile = useCallback(
    async (profile: StudentProfile): Promise<boolean> => {
      if (!currentUser) {
        setSyncStatus('offline');
        return false;
      }
      try {
        setSyncStatus('syncing');
        await syncProfileToCloud(currentUser.uid, profile, currentUser.email);
        const timestamp = new Date().toISOString();
        setLastSyncedAt(timestamp);
        setCloudProfile(profile);
        setSyncStatus('synced');
        return true;
      } catch (error) {
        console.warn('Notice: Cloud sync deferred (client operating with offline/local data):', error);
        setSyncStatus('offline');
        return false;
      }
    },
    [currentUser]
  );

  const loadCloudProfile = useCallback(async (): Promise<StudentProfile | null> => {
    if (!currentUser) return null;
    try {
      setSyncStatus('syncing');
      const profile = await fetchProfileFromCloud(currentUser.uid);
      if (profile) {
        setSyncStatus('synced');
        setCloudProfile(profile);
        if (profile.lastSyncedAt) {
          setLastSyncedAt(profile.lastSyncedAt);
        }
        return profile;
      }
      setSyncStatus('synced');
      return null;
    } catch (error) {
      console.warn('Notice: Cloud profile load deferred (client operating with offline/local data):', error);
      setSyncStatus('offline');
      return null;
    }
  }, [currentUser]);

  return (
    <AuthContext.Provider
      value={{
        currentUser,
        accessToken,
        isLoading,
        isConfigured,
        syncStatus,
        lastSyncedAt,
        cloudProfile,
        signInWithGoogle: handleSignInWithGoogle,
        signInWithEmail: handleSignInWithEmail,
        registerWithEmail: handleRegisterWithEmail,
        signOut: handleSignOut,
        syncProfile,
        loadCloudProfile,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
