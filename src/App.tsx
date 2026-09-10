import React, { useState, useEffect, useRef } from 'react';
import { Sidebar } from './components/Sidebar';
import { Header } from './components/Header';
import { BerandaView } from './components/BerandaView';
import { TensesView } from './components/TensesView';
import { VocabularyView } from './components/VocabularyView';
import { UtbkView } from './components/UtbkView';
import { AiToolsView } from './components/AiToolsView';
import { IceBreakingView } from './components/IceBreakingView';
import { ListeningView } from './components/ListeningView';
import { ProgressView } from './components/ProgressView';
import { StudentProfile, EducationLevel } from './types';
import { ProfileModal } from './components/ProfileModal';
import { GlobalSearchModal } from './components/search/GlobalSearchModal';
import { SearchResultItem } from './utils/searchIndex';
import { ThemeToggle } from './components/theme/ThemeToggle';
import { ThemeTransitionOverlay } from './components/theme/ThemeTransitionOverlay';
import { AmbientSkyParticles } from './components/theme/AmbientSkyParticles';
import { AuthOptionScreen } from './components/auth/AuthOptionScreen';
import { StudentRegistrationForm } from './components/auth/StudentRegistrationForm';
import { TikTokStreakCelebration } from './components/streak/TikTokStreakCelebration';
import { StreakModal } from './components/streak/StreakModal';
import { LogoutConfirmModal } from './components/auth/LogoutConfirmModal';
import { checkAndRecordDailyStreak } from './utils/streakManager';
import { useAuth } from './context/AuthContext';
import {
  KeyRound,
  ArrowRight,
  ShieldCheck,
  GraduationCap
} from 'lucide-react';
import tsBgImage from './assets/images/tiga_serangkai_bg_1786596285216.jpg';

import { GoogleWorkspaceHub } from './components/GoogleWorkspaceHub';

export default function App() {
  const [activeTab, setActiveTab] = useState<
    'home' | 'tenses' | 'vocab' | 'utbk' | 'ai' | 'icebreaking' | 'listening' | 'progress' | 'workspace'
  >('home');

  const { currentUser, cloudProfile, syncProfile, signOut } = useAuth();
  const [accessGranted, setAccessGranted] = useState<boolean>(false);
  const [profileCompleted, setProfileCompleted] = useState<boolean>(false);
  const [authMode, setAuthMode] = useState<'choice' | 'register'>('choice');
  const [accessCode, setAccessCode] = useState<string>('TS2026');
  const [codeError, setCodeError] = useState<string>('');

  const [prefillName, setPrefillName] = useState<string>('');
  const [prefillAvatar, setPrefillAvatar] = useState<string | undefined>(undefined);

  const [searchQuery, setSearchQuery] = useState<string>('');
  const [isSearchModalOpen, setIsSearchModalOpen] = useState<boolean>(false);
  const [targetTenseId, setTargetTenseId] = useState<string | undefined>(undefined);
  const [targetVocabId, setTargetVocabId] = useState<string | undefined>(undefined);
  const [isProfileModalOpen, setIsProfileModalOpen] = useState<boolean>(false);
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState<boolean>(false);
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState<boolean>(false);

  // Streak & TikTok Celebration System States
  const [isStreakCelebrationOpen, setIsStreakCelebrationOpen] = useState<boolean>(false);
  const [celebrationData, setCelebrationData] = useState<{
    previousStreak: number;
    newStreak: number;
    isTierUpgrade: boolean;
  }>({
    previousStreak: 1,
    newStreak: 1,
    isTierUpgrade: false,
  });
  const [isStreakModalOpen, setIsStreakModalOpen] = useState<boolean>(false);
  const [isLogoutConfirmOpen, setIsLogoutConfirmOpen] = useState<boolean>(false);
  const streakCheckHandledRef = useRef<boolean>(false);

  const lastSyncedProfileRef = useRef<string>('');

  const handleSelectSearchResult = (item: SearchResultItem) => {
    setActiveTab(item.targetTab);
    setIsMobileSidebarOpen(false);

    if (item.targetTab === 'tenses' && item.targetId) {
      setTargetTenseId(item.targetId);
      // Clear target id after a delay so subsequent clicks can re-trigger if needed
      setTimeout(() => setTargetTenseId(undefined), 1000);
    } else if (item.targetTab === 'vocab' && item.targetId) {
      setTargetVocabId(item.targetId);
      setTimeout(() => setTargetVocabId(undefined), 1000);
    }
  };

  const [profile, setProfile] = useState<StudentProfile>(() => {
    const saved = localStorage.getItem('ts_student_profile');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (parsed.targetUniversity) {
          parsed.targetUtbkScore = '750+';
          delete parsed.targetUniversity;
        }
        if (!parsed.educationLevel) {
          parsed.educationLevel = 'SMA';
        }
        if (!parsed.major) {
          parsed.major = 'MIPA';
        }
        if (!parsed.email) {
          parsed.email = 'mwnfs35@gmail.com';
        }
        return parsed;
      } catch (e) {
        console.error(e);
      }
    }
    return {
      name: 'Siswa Cendekia',
      educationLevel: 'SMA',
      classGrade: 'XII',
      major: 'MIPA',
      targetUtbkScore: '750+',
      accessCode: 'TS2026',
      avatarLetter: 'S',
      joinedDate: new Date().toLocaleDateString('id-ID'),
      completedLessons: ['t1', 't2'],
      quizScores: {},
      streakDays: 5,
      totalStudyMinutes: 120,
      vocabularyMastered: 18,
      email: 'mwnfs35@gmail.com',
    };
  });

  // Hydrate from cloud profile only if user has already entered the main dashboard (profileCompleted is true)
  useEffect(() => {
    if (cloudProfile && profileCompleted) {
      const currentJson = JSON.stringify(profile);
      const incomingJson = JSON.stringify({ ...profile, ...cloudProfile });
      if (currentJson !== incomingJson) {
        setProfile((prev) => ({
          ...prev,
          ...cloudProfile,
        }));
        lastSyncedProfileRef.current = incomingJson;
      }
    }
  }, [cloudProfile, profileCompleted]);

  // Check persisted access
  useEffect(() => {
    const savedGranted = localStorage.getItem('ts_access_granted');
    const savedCompleted = localStorage.getItem('ts_profile_completed');
    const savedCode = localStorage.getItem('ts_access_code');
    if (savedCode) {
      setAccessCode(savedCode);
    }
    if (savedGranted === 'true') {
      setAccessGranted(true);
    }
    if (savedCompleted === 'true') {
      setProfileCompleted(true);
    }
  }, []);

  // Automatic Daily Streak Check & TikTok Celebration Trigger on App Open / Hydration
  useEffect(() => {
    if (accessGranted && profileCompleted && !streakCheckHandledRef.current) {
      streakCheckHandledRef.current = true;
      const streakResult = checkAndRecordDailyStreak(profile);
      if (streakResult.shouldCelebrate) {
        setCelebrationData({
          previousStreak: streakResult.previousStreak,
          newStreak: streakResult.newStreak,
          isTierUpgrade: streakResult.isTierUpgrade,
        });
        if (streakResult.updatedProfile.streakDays !== profile.streakDays) {
          setProfile(streakResult.updatedProfile);
        }
        const timer = setTimeout(() => {
          setIsStreakCelebrationOpen(true);
        }, 600);
        return () => clearTimeout(timer);
      }
    }
  }, [accessGranted, profileCompleted, profile]);

  // Save profile changes locally and debounced sync to cloud (with equality check to prevent loops)
  useEffect(() => {
    const profileString = JSON.stringify(profile);
    localStorage.setItem('ts_student_profile', profileString);

    if (currentUser && profileCompleted) {
      if (lastSyncedProfileRef.current === profileString) {
        return; // Profile hasn't changed, skip network call
      }
      const timeoutId = setTimeout(() => {
        lastSyncedProfileRef.current = profileString;
        syncProfile(profile);
      }, 1500);
      return () => clearTimeout(timeoutId);
    }
  }, [profile, currentUser, profileCompleted, syncProfile]);

  // Access Code Verification (MANDATORY GATEWAY)
  const handleVerifyAccessCode = (e: React.FormEvent) => {
    e.preventDefault();
    if (!accessCode.trim()) {
      setCodeError('Silakan masukkan kode akses unik dari buku fisik Anda.');
      return;
    }
    // Accept official book registration codes or any 4+ char alphanumeric code
    const validCodes = ['TS2026', 'TS-ENGLISH', 'SMA2026', 'TIGASERANGKAI', 'ADMIN123'];
    const formatted = accessCode.trim().toUpperCase();

    if (validCodes.includes(formatted) || formatted.length >= 4) {
      setAccessGranted(true);
      localStorage.setItem('ts_access_granted', 'true');
      localStorage.setItem('ts_access_code', formatted);
      setCodeError('');
      setAuthMode('choice');
    } else {
      setCodeError('Kode akses tidak valid. Pastikan kode sesuai dengan yang tertera di buku fisik.');
    }
  };

  const handleLessonComplete = (lessonId: string, score = 100) => {
    if (!profile.completedLessons.includes(lessonId)) {
      setProfile((prev) => {
        const prestigeGain = 150 + Math.round(score * 0.8);
        return {
          ...prev,
          completedLessons: [...prev.completedLessons, lessonId],
          quizScores: { ...prev.quizScores, [lessonId]: score },
          universalPrestige: (prev.universalPrestige || 0) + prestigeGain,
        };
      });
    }
  };

  const handleAddScore = (category: string, score: number) => {
    setProfile((prev) => {
      const addedVocab = category === 'vocab' ? 1 : 0;
      const prestigeGain = category === 'vocab' ? 50 : category === 'utbk' ? Math.round(score * 0.5) : 50;
      const newPrestige = (prev.universalPrestige || 0) + prestigeGain;
      return {
        ...prev,
        vocabularyMastered: prev.vocabularyMastered + addedVocab,
        universalPrestige: newPrestige,
      };
    });
  };

  const handleLogout = async () => {
    try {
      await signOut();
    } catch (err) {
      console.error('Error during sign out:', err);
    }
    localStorage.removeItem('ts_profile_completed');
    lastSyncedProfileRef.current = '';
    setProfileCompleted(false);
    setAuthMode('choice');
    setPrefillName('');
    setPrefillAvatar(undefined);
  };

  // Primary Authentication Gate: Login Screen with Register option
  if (!profileCompleted) {
    return (
      <div className="min-h-screen bg-[#F1F5F9] dark:bg-[#0B0F19] flex items-center justify-center p-3 sm:p-4 font-sans text-slate-800 dark:text-slate-100 transition-colors duration-300 relative overflow-hidden">
        <ThemeTransitionOverlay />
        <AmbientSkyParticles />
        <div className="absolute top-4 right-4 z-20">
          <ThemeToggle variant="pill" />
        </div>

        {authMode === 'choice' ? (
          <AuthOptionScreen
            accessCode={accessCode}
            onSelectRegister={() => {
              setAuthMode('register');
            }}
            onLoginSuccess={(existingProfile) => {
              setProfile(existingProfile);
              setProfileCompleted(true);
              setAccessGranted(true);
              localStorage.setItem('ts_profile_completed', 'true');
              localStorage.setItem('ts_access_granted', 'true');
              if (existingProfile.accessCode) {
                setAccessCode(existingProfile.accessCode);
                localStorage.setItem('ts_access_code', existingProfile.accessCode);
              }
              // Trigger streak evaluation on login
              const streakResult = checkAndRecordDailyStreak(existingProfile, true);
              setCelebrationData({
                previousStreak: streakResult.previousStreak,
                newStreak: streakResult.newStreak,
                isTierUpgrade: streakResult.isTierUpgrade,
              });
              if (streakResult.updatedProfile.streakDays !== existingProfile.streakDays) {
                setProfile(streakResult.updatedProfile);
              }
              setTimeout(() => {
                setIsStreakCelebrationOpen(true);
              }, 500);
            }}
            onGoogleConnectedNeedRegister={(googleName, googlePhoto) => {
              if (googleName) setPrefillName(googleName);
              if (googlePhoto) setPrefillAvatar(googlePhoto);
              setAuthMode('register');
            }}
          />
        ) : (
          <StudentRegistrationForm
            accessCode={accessCode}
            initialName={prefillName}
            initialAvatar={prefillAvatar}
            onBackToOptions={() => {
              setAuthMode('choice');
            }}
            onCompleteRegistration={(newProfile) => {
              setProfile(newProfile);
              setProfileCompleted(true);
              setAccessGranted(true);
              localStorage.setItem('ts_profile_completed', 'true');
              localStorage.setItem('ts_access_granted', 'true');
              if (newProfile.accessCode) {
                setAccessCode(newProfile.accessCode);
                localStorage.setItem('ts_access_code', newProfile.accessCode);
              }
              if (currentUser) {
                syncProfile(newProfile);
              }
              // Trigger streak celebration on initial registration
              const streakResult = checkAndRecordDailyStreak(newProfile, true);
              setCelebrationData({
                previousStreak: streakResult.previousStreak,
                newStreak: streakResult.newStreak,
                isTierUpgrade: streakResult.isTierUpgrade,
              });
              setTimeout(() => {
                setIsStreakCelebrationOpen(true);
              }, 500);
            }}
          />
        )}
      </div>
    );
  }

  // MAIN APPLICATION DASHBOARD
  return (
    <div className="h-screen w-full bg-[#F8FAFC] dark:bg-[#0B0F19] flex flex-col md:flex-row font-sans text-slate-800 dark:text-slate-100 overflow-hidden transition-colors duration-300 relative">
      <ThemeTransitionOverlay />
      <AmbientSkyParticles isFocusedScreen={activeTab !== 'beranda'} />

      {/* Quickbar Sidebar Navigation (Fixed Left Bar) */}
      <Sidebar
        activeTab={activeTab}
        onTabChange={(tab) => {
          setActiveTab(tab as any);
          setIsMobileSidebarOpen(false);
        }}
        setActiveTab={(tab) => {
          setActiveTab(tab as any);
          setIsMobileSidebarOpen(false);
        }}
        isCollapsed={isSidebarCollapsed}
        onToggleCollapse={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
        isMobileOpen={isMobileSidebarOpen}
        onCloseMobile={() => setIsMobileSidebarOpen(false)}
        profile={profile}
        onOpenProfileModal={() => setIsProfileModalOpen(true)}
        onLogout={() => setIsLogoutConfirmOpen(true)}
      />

      {/* Main Content Area (Independently Scrollable Container) */}
      <div className="flex-1 flex flex-col min-w-0 h-full overflow-y-auto custom-scrollbar transition-all duration-300 relative">
        <Header
          profile={profile}
          onLogout={() => setIsLogoutConfirmOpen(true)}
          onOpenProfileModal={() => setIsProfileModalOpen(true)}
          onOpenStreakModal={() => setIsStreakModalOpen(true)}
          onNavigateHome={() => setActiveTab('home')}
          onUpdateStreak={(newDays) => {
            setProfile((prev) => ({
              ...prev,
              streakDays: newDays,
            }));
          }}
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          onOpenSearchModal={() => setIsSearchModalOpen(true)}
          isSidebarCollapsed={isSidebarCollapsed}
          onToggleSidebar={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
          onToggleMobileSidebar={() => setIsMobileSidebarOpen(!isMobileSidebarOpen)}
        />

        <main className="flex-1 p-4 md:p-6 lg:p-8 max-w-7xl w-full mx-auto space-y-6 pb-12">
          {activeTab === 'home' && (
            <BerandaView
              profile={profile}
              onNavigate={(tab) => setActiveTab(tab)}
              onOpenStreakGallery={() => setIsStreakModalOpen(true)}
              onUpdateStreak={(newDays) => {
                setProfile((prev) => ({
                  ...prev,
                  streakDays: newDays,
                }));
              }}
            />
          )}

          {activeTab === 'tenses' && (
            <TensesView
              completedLessons={profile.completedLessons}
              onCompleteLesson={(lessonId, score) => handleLessonComplete(lessonId, score ?? 100)}
              searchQuery={searchQuery}
              targetTenseId={targetTenseId}
            />
          )}

          {activeTab === 'vocab' && (
            <VocabularyView
              vocabularyMastered={profile.vocabularyMastered}
              onAddMasteredVocab={() => handleAddScore('vocab', 1)}
              searchQuery={searchQuery}
              targetVocabId={targetVocabId}
            />
          )}

          {activeTab === 'utbk' && (
            <UtbkView
              onQuizFinished={(score) => handleAddScore('utbk', score)}
            />
          )}

          {(activeTab === 'icebreaking' || activeTab === 'ai') && <IceBreakingView />}

          {activeTab === 'listening' && <ListeningView />}

          {activeTab === 'progress' && (
            <ProgressView
              profile={profile}
              onOpenStreakGallery={() => setIsStreakModalOpen(true)}
              onUpdateStreak={(newDays) => {
                setProfile((prev) => ({
                  ...prev,
                  streakDays: newDays,
                }));
              }}
            />
          )}

          {activeTab === 'workspace' && (
            <GoogleWorkspaceHub profile={profile} />
          )}
        </main>
      </div>

      {/* Interactive Profile & 1x1 Photo Management Modal */}
      <ProfileModal
        isOpen={isProfileModalOpen}
        onClose={() => setIsProfileModalOpen(false)}
        profile={profile}
        onSaveProfile={(updatedProfile) => {
          setProfile(updatedProfile);
        }}
        onNavigateToTab={(tab) => {
          setActiveTab(tab);
          setIsProfileModalOpen(false);
        }}
      />

      {/* Universal Search & Command Palette Spotlight Modal */}
      <GlobalSearchModal
        isOpen={isSearchModalOpen}
        onClose={() => setIsSearchModalOpen(false)}
        onSelectResult={handleSelectSearchResult}
        initialQuery={searchQuery}
      />

      {/* TikTok-Style Streak Daily Attendance Celebration Overlay */}
      <TikTokStreakCelebration
        isOpen={isStreakCelebrationOpen}
        onClose={() => setIsStreakCelebrationOpen(false)}
        previousStreak={celebrationData.previousStreak}
        newStreak={celebrationData.newStreak}
        isTierUpgrade={celebrationData.isTierUpgrade}
        studentName={profile.name}
        startDate={profile.joinedDate}
        onOpenStreakGallery={() => setIsStreakModalOpen(true)}
      />

      {/* Interactive Streak Evolution Gallery Modal */}
      <StreakModal
        isOpen={isStreakModalOpen}
        onClose={() => setIsStreakModalOpen(false)}
        streakDays={profile.streakDays}
        onUpdateStreak={(newDays) => {
          setProfile((prev) => ({
            ...prev,
            streakDays: newDays,
          }));
        }}
        studentName={profile.name}
      />

      {/* Universal Portal-Mounted Logout & Switch Access Confirmation Modal */}
      <LogoutConfirmModal
        isOpen={isLogoutConfirmOpen}
        onClose={() => setIsLogoutConfirmOpen(false)}
        onConfirm={handleLogout}
        profile={profile}
      />
    </div>
  );
}

