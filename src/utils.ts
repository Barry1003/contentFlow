import { ContentPillar, PlatformConfig, PostFormat, PostItem, PostStatus, Priority } from './types';
import { formatDateKey } from './constants';

// Format status styling: quiet 8px dot + neutral text (no filled pastel pills)
// Dots desaturated by 25% to sit quietly on dark and light backgrounds
export const STATUS_CONFIG: Record<
  PostStatus,
  { label: string; humanLabel: string; bg: string; text: string; border: string; dot: string }
> = {
  Idea: {
    label: 'Idea',
    humanLabel: 'Brainstorming',
    bg: 'bg-transparent',
    text: 'text-[#2A2925] dark:text-[#D9D7D1]',
    border: 'border-[#E9E7E2] dark:border-[#323230]',
    dot: '#7E7494',
  },
  'Scripting/Planning': {
    label: 'Planning',
    humanLabel: 'Scripting',
    bg: 'bg-transparent',
    text: 'text-[#2A2925] dark:text-[#D9D7D1]',
    border: 'border-[#E9E7E2] dark:border-[#323230]',
    dot: '#596F80',
  },
  Creating: {
    label: 'Creating',
    humanLabel: 'Filming / Drafting',
    bg: 'bg-transparent',
    text: 'text-[#2A2925] dark:text-[#D9D7D1]',
    border: 'border-[#E9E7E2] dark:border-[#323230]',
    dot: '#9E6F4E',
  },
  Editing: {
    label: 'Editing',
    humanLabel: 'Editing & Polish',
    bg: 'bg-transparent',
    text: 'text-[#2A2925] dark:text-[#D9D7D1]',
    border: 'border-[#E9E7E2] dark:border-[#323230]',
    dot: '#8E627C',
  },
  Ready: {
    label: 'Ready',
    humanLabel: 'Ready to publish',
    bg: 'bg-transparent',
    text: 'text-[#2A2925] dark:text-[#D9D7D1]',
    border: 'border-[#E9E7E2] dark:border-[#323230]',
    dot: '#4D7A6C',
  },
  Scheduled: {
    label: 'Scheduled',
    humanLabel: 'Scheduled',
    bg: 'bg-transparent',
    text: 'text-[#2A2925] dark:text-[#D9D7D1]',
    border: 'border-[#E9E7E2] dark:border-[#323230]',
    dot: '#53667B',
  },
  Posted: {
    label: 'Posted',
    humanLabel: 'Published',
    bg: 'bg-transparent',
    text: 'text-[#2A2925] dark:text-[#D9D7D1]',
    border: 'border-[#E9E7E2] dark:border-[#323230]',
    dot: '#446E54',
  },
};

// Platform muted desaturated dot colors (25% desaturated, 8px dots)
export const PLATFORM_STYLE_TOKENS: Record<
  string,
  { name: string; dotColor: string; softBg: string; textColor: string }
> = {
  instagram: {
    name: 'Instagram',
    dotColor: '#92576E',
    softBg: 'bg-transparent',
    textColor: 'text-[#2A2925] dark:text-[#D9D7D1]',
  },
  tiktok: {
    name: 'TikTok',
    dotColor: '#525252',
    softBg: 'bg-transparent',
    textColor: 'text-[#2A2925] dark:text-[#D9D7D1]',
  },
  youtube: {
    name: 'YouTube',
    dotColor: '#964F4F',
    softBg: 'bg-transparent',
    textColor: 'text-[#2A2925] dark:text-[#D9D7D1]',
  },
  x: {
    name: 'X (Twitter)',
    dotColor: '#5A6168',
    softBg: 'bg-transparent',
    textColor: 'text-[#2A2925] dark:text-[#D9D7D1]',
  },
  facebook: {
    name: 'Facebook',
    dotColor: '#506680',
    softBg: 'bg-transparent',
    textColor: 'text-[#2A2925] dark:text-[#D9D7D1]',
  },
  linkedin: {
    name: 'LinkedIn',
    dotColor: '#466782',
    softBg: 'bg-transparent',
    textColor: 'text-[#2A2925] dark:text-[#D9D7D1]',
  },
  pinterest: {
    name: 'Pinterest',
    dotColor: '#865050',
    softBg: 'bg-transparent',
    textColor: 'text-[#2A2925] dark:text-[#D9D7D1]',
  },
};

export const ALL_STATUSES: PostStatus[] = [
  'Idea',
  'Scripting/Planning',
  'Creating',
  'Editing',
  'Ready',
  'Scheduled',
  'Posted',
];

export const ALL_FORMATS: PostFormat[] = [
  'Reel/Short',
  'Carousel',
  'Static image',
  'Story',
  'Long video',
  'Text post',
  'Live',
];

export const PRIORITY_CONFIG: Record<Priority, { label: string; color: string; badge: string; dot: string }> = {
  low: { label: 'Low', color: 'text-[#6F6C66] dark:text-[#9A978F]', badge: 'bg-transparent text-[#6F6C66] dark:text-[#9A978F]', dot: '#6B6963' },
  medium: { label: 'Medium', color: 'text-[#B54708] dark:text-[#C77A1A]', badge: 'bg-transparent text-[#B54708] dark:text-[#C77A1A]', dot: '#C77A1A' },
  high: { label: 'High', color: 'text-[#B42318] dark:text-[#C54A44]', badge: 'bg-transparent text-[#B42318] dark:text-[#C54A44]', dot: '#C54A44' },
};

// Date math helpers
export function getDaysOfWeekLabels(weekStartsOnMonday: boolean): string[] {
  return weekStartsOnMonday
    ? ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
    : ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
}

export interface CalendarDay {
  date: Date;
  dateKey: string;
  dayOfMonth: number;
  isCurrentMonth: boolean;
  isToday: boolean;
  isPast: boolean;
}

export function getMonthMatrix(year: number, month: number, weekStartsOnMonday: boolean): CalendarDay[][] {
  const todayKey = formatDateKey(new Date());
  const firstDayOfMonth = new Date(year, month, 1);
  const lastDayOfMonth = new Date(year, month + 1, 0);

  // Day of week index (0=Sun, 1=Mon, ..., 6=Sat)
  let startDayOfWeek = firstDayOfMonth.getDay();
  if (weekStartsOnMonday) {
    // 0(Sun) -> 6, 1(Mon) -> 0, 2(Tue) -> 1 ...
    startDayOfWeek = (startDayOfWeek + 6) % 7;
  }

  const days: CalendarDay[] = [];

  // Previous month padding
  const prevMonthLastDay = new Date(year, month, 0).getDate();
  for (let i = startDayOfWeek - 1; i >= 0; i--) {
    const d = new Date(year, month - 1, prevMonthLastDay - i);
    const key = formatDateKey(d);
    days.push({
      date: d,
      dateKey: key,
      dayOfMonth: prevMonthLastDay - i,
      isCurrentMonth: false,
      isToday: key === todayKey,
      isPast: key < todayKey,
    });
  }

  // Current month days
  const daysInCurrentMonth = lastDayOfMonth.getDate();
  for (let d = 1; d <= daysInCurrentMonth; d++) {
    const curDate = new Date(year, month, d);
    const key = formatDateKey(curDate);
    days.push({
      date: curDate,
      dateKey: key,
      dayOfMonth: d,
      isCurrentMonth: true,
      isToday: key === todayKey,
      isPast: key < todayKey,
    });
  }

  // Next month padding to fill grid
  const remaining = (7 - (days.length % 7)) % 7;
  for (let d = 1; d <= remaining; d++) {
    const nextDate = new Date(year, month + 1, d);
    const key = formatDateKey(nextDate);
    days.push({
      date: nextDate,
      dateKey: key,
      dayOfMonth: d,
      isCurrentMonth: false,
      isToday: key === todayKey,
      isPast: key < todayKey,
    });
  }

  // Chunk into rows of 7
  const weeks: CalendarDay[][] = [];
  for (let i = 0; i < days.length; i += 7) {
    weeks.push(days.slice(i, i + 7));
  }
  return weeks;
}

export function getWeekDays(referenceDate: Date, weekStartsOnMonday: boolean): CalendarDay[] {
  const todayKey = formatDateKey(new Date());
  const day = referenceDate.getDay();
  const diff = referenceDate.getDate() - day + (weekStartsOnMonday ? (day === 0 ? -6 : 1) : 0);

  const startOfWeek = new Date(referenceDate);
  startOfWeek.setDate(diff);

  const days: CalendarDay[] = [];
  for (let i = 0; i < 7; i++) {
    const d = new Date(startOfWeek);
    d.setDate(startOfWeek.getDate() + i);
    const key = formatDateKey(d);
    days.push({
      date: d,
      dateKey: key,
      dayOfMonth: d.getDate(),
      isCurrentMonth: true,
      isToday: key === todayKey,
      isPast: key < todayKey,
    });
  }
  return days;
}

export function formatFriendlyDate(dateStr: string): string {
  if (!dateStr) return '';
  const [y, m, d] = dateStr.split('-').map(Number);
  const date = new Date(y, m - 1, d);
  const todayKey = formatDateKey(new Date());

  const tom = new Date();
  tom.setDate(tom.getDate() + 1);
  const tomKey = formatDateKey(tom);

  const yest = new Date();
  yest.setDate(yest.getDate() - 1);
  const yestKey = formatDateKey(yest);

  if (dateStr === todayKey) return 'Today';
  if (dateStr === tomKey) return 'Tomorrow';
  if (dateStr === yestKey) return 'Yesterday';

  return date.toLocaleDateString('en-US', {
    weekday: 'short',
    month: 'short',
    day: 'numeric',
  });
}

// Calculate engagement rate
export function calculateEngagement(metrics?: PostItem['metrics']): {
  rate: number;
  totalInteractions: number;
} {
  if (!metrics || !metrics.views || metrics.views === 0) {
    return { rate: 0, totalInteractions: 0 };
  }
  const total =
    (metrics.likes || 0) +
    (metrics.comments || 0) +
    (metrics.shares || 0) +
    (metrics.saves || 0);

  const rate = (total / metrics.views) * 100;
  return { rate: parseFloat(rate.toFixed(2)), totalInteractions: total };
}

// Color palette accent classes (Quiet productivity palette)
export function getAccentClasses(accent?: string) {
  switch (accent) {
    case 'slate':
      return {
        bg: 'bg-[#38434F]',
        hoverBg: 'hover:bg-[#2B343E]',
        text: 'text-[#38434F] dark:text-[#9FB1C5]',
        border: 'border-[#38434F]',
        ring: 'focus:ring-[#38434F]/60',
        lightBg: 'bg-[#F0EEEA] dark:bg-[#232321]',
        gradient: '',
      };
    case 'navy':
      return {
        bg: 'bg-[#233B5D]',
        hoverBg: 'hover:bg-[#1A2E49]',
        text: 'text-[#233B5D] dark:text-[#8BAAD4]',
        border: 'border-[#233B5D]',
        ring: 'focus:ring-[#233B5D]/60',
        lightBg: 'bg-[#F0EEEA] dark:bg-[#232321]',
        gradient: '',
      };
    case 'espresso':
      return {
        bg: 'bg-[#4A3C36]',
        hoverBg: 'hover:bg-[#3B302B]',
        text: 'text-[#4A3C36] dark:text-[#C5B4AC]',
        border: 'border-[#4A3C36]',
        ring: 'focus:ring-[#4A3C36]/60',
        lightBg: 'bg-[#F0EEEA] dark:bg-[#232321]',
        gradient: '',
      };
    case 'terracotta':
      return {
        bg: 'bg-[#8A4A38]',
        hoverBg: 'hover:bg-[#723B2B]',
        text: 'text-[#8A4A38] dark:text-[#E0A798]',
        border: 'border-[#8A4A38]',
        ring: 'focus:ring-[#8A4A38]/60',
        lightBg: 'bg-[#F0EEEA] dark:bg-[#232321]',
        gradient: '',
      };
    case 'green':
    default:
      return {
        bg: 'bg-[#2C6E56]',
        hoverBg: 'hover:bg-[#245B47]',
        text: 'text-[#2C6E56] dark:text-[#5AA88C]',
        border: 'border-[#2C6E56]',
        ring: 'focus:ring-[#5AA88C]/60',
        lightBg: 'bg-[#F0EEEA] dark:bg-[#232321]',
        gradient: '',
      };
  }
}

export const ACCENT_COLORS = [
  { id: 'green', name: 'Deep Green (Default)', hex: '#2C6E56' },
  { id: 'slate', name: 'Muted Slate', hex: '#38434F' },
  { id: 'navy', name: 'Classic Navy', hex: '#233B5D' },
  { id: 'espresso', name: 'Espresso', hex: '#4A3C36' },
  { id: 'terracotta', name: 'Terracotta', hex: '#8A4A38' },
];

export function calculatePostingStreak(posts: PostItem[], weeklyTarget: number): number {
  if (!posts.length) return 0;
  const postedOrScheduled = posts.filter((p) => p.status === 'Posted' || p.status === 'Scheduled');
  if (!postedOrScheduled.length) return 0;

  const today = new Date();
  let streak = 0;
  for (let w = 0; w < 8; w++) {
    const weekStart = new Date(today);
    weekStart.setDate(today.getDate() - today.getDay() - w * 7);
    const weekEnd = new Date(weekStart);
    weekEnd.setDate(weekStart.getDate() + 6);

    const startKey = formatDateKey(weekStart);
    const endKey = formatDateKey(weekEnd);

    const count = postedOrScheduled.filter(
      (p) => p.scheduledDate >= startKey && p.scheduledDate <= endKey
    ).length;

    if (count >= Math.max(1, weeklyTarget)) {
      streak += 1;
    } else if (w === 0) {
      continue;
    } else {
      break;
    }
  }
  return Math.max(1, streak);
}

export function getPostsThisWeekCount(posts: PostItem[], weekStartsOnMonday: boolean): number {
  const d = new Date();
  const day = d.getDay();
  const diff = d.getDate() - day + (weekStartsOnMonday ? (day === 0 ? -6 : 1) : 0);
  const start = new Date(d.setDate(diff));
  const end = new Date(start);
  end.setDate(start.getDate() + 6);

  const startKey = formatDateKey(start);
  const endKey = formatDateKey(end);

  return posts.filter((p) => p.scheduledDate >= startKey && p.scheduledDate <= endKey).length;
}
