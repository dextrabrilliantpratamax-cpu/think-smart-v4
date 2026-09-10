/**
 * Utility functions for streak management, daily presence check-ins, and formatting.
 */
import { StudentProfile } from '../types';
import { getStreakTier } from '../components/streak/streakTiers';

export function formatIndonesianDate(dateInput?: string | Date): string {
  if (!dateInput) return '';
  try {
    const d = typeof dateInput === 'string' ? new Date(dateInput) : dateInput;
    if (isNaN(d.getTime())) return String(dateInput);

    const months = [
      'Januari',
      'Februari',
      'Maret',
      'April',
      'Mei',
      'Juni',
      'Juli',
      'Agustus',
      'September',
      'Oktober',
      'November',
      'Desember',
    ];

    const day = d.getDate();
    const month = months[d.getMonth()];
    const year = d.getFullYear();

    return `${day} ${month} ${year}`;
  } catch {
    return String(dateInput || '');
  }
}

export function getTodayDateString(): string {
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, '0');
  const day = String(now.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

export function getYesterdayDateString(): string {
  const d = new Date();
  d.setDate(d.getDate() - 1);
  const year = d.getFullYear();
  const month = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

export interface WeekDayStreakItem {
  dayName: string;
  dayShort: string;
  dateNumber: number;
  isToday: boolean;
  isPast: boolean;
  isFuture: boolean;
  isClaimed: boolean;
}

/**
 * Returns a 7-day strip (Senin to Minggu) for the current week.
 */
export function getCurrentWeekStreakDays(currentStreakDays: number): WeekDayStreakItem[] {
  const now = new Date();
  const currentDayIndex = now.getDay(); // 0 is Sunday, 1 is Monday ...
  // In Indonesia, week starts on Monday (0 -> index 6 for Sunday, 1 -> index 0 for Monday)
  const mondayOffset = currentDayIndex === 0 ? -6 : 1 - currentDayIndex;

  const monday = new Date(now);
  monday.setDate(now.getDate() + mondayOffset);

  const dayNames = ['Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu', 'Minggu'];
  const dayShorts = ['Sen', 'Sel', 'Rab', 'Kam', 'Jum', 'Sab', 'Min'];

  const weekDays: WeekDayStreakItem[] = [];

  for (let i = 0; i < 7; i++) {
    const dayDate = new Date(monday);
    dayDate.setDate(monday.getDate() + i);

    const isToday =
      dayDate.getDate() === now.getDate() &&
      dayDate.getMonth() === now.getMonth() &&
      dayDate.getFullYear() === now.getFullYear();

    const isPast = dayDate < new Date(now.getFullYear(), now.getMonth(), now.getDate());
    const isFuture = dayDate > new Date(now.getFullYear(), now.getMonth(), now.getDate());
    const isClaimed = isPast || (isToday && currentStreakDays > 0);

    weekDays.push({
      dayName: dayNames[i],
      dayShort: dayShorts[i],
      dateNumber: dayDate.getDate(),
      isToday,
      isPast,
      isFuture,
      isClaimed,
    });
  }

  return weekDays;
}

export interface StreakCheckResult {
  shouldCelebrate: boolean;
  previousStreak: number;
  newStreak: number;
  isTierUpgrade: boolean;
  updatedProfile: StudentProfile;
}

/**
 * Evaluates whether a streak celebration should be triggered when user logs in or opens the app.
 */
export function checkAndRecordDailyStreak(
  profile: StudentProfile,
  forceCelebrate = false
): StreakCheckResult {
  const today = getTodayDateString();
  const yesterday = getYesterdayDateString();

  const lastActiveDate = localStorage.getItem('ts_last_streak_active_date');
  const lastCelebrationDate = localStorage.getItem('ts_last_streak_celebration_date');

  let currentStreak = profile.streakDays || 1;
  let prevStreak = currentStreak;
  let newStreak = currentStreak;

  // Determine if streak increments
  if (lastActiveDate === yesterday) {
    // Consecutive day login: +1 streak day!
    prevStreak = currentStreak;
    newStreak = currentStreak + 1;
  } else if (lastActiveDate === today) {
    // Same day: preserve current streak
    prevStreak = Math.max(1, currentStreak - 1);
    newStreak = currentStreak;
  } else if (!lastActiveDate) {
    // First time
    prevStreak = Math.max(1, currentStreak - 1);
    newStreak = currentStreak;
  } else {
    // More than 1 day gap: start active again
    prevStreak = currentStreak;
    newStreak = currentStreak; // keep or refresh
  }

  const prevTier = getStreakTier(prevStreak);
  const newTier = getStreakTier(newStreak);
  const isTierUpgrade = newTier.id !== prevTier.id;

  const shouldCelebrate = forceCelebrate || lastCelebrationDate !== today;

  const updatedProfile: StudentProfile = {
    ...profile,
    streakDays: newStreak,
  };

  if (shouldCelebrate) {
    localStorage.setItem('ts_last_streak_active_date', today);
    localStorage.setItem('ts_last_streak_celebration_date', today);
    localStorage.setItem('ts_student_profile', JSON.stringify(updatedProfile));
  }

  return {
    shouldCelebrate,
    previousStreak: prevStreak,
    newStreak,
    isTierUpgrade,
    updatedProfile,
  };
}
