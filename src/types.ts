export type PlatformId = 'instagram' | 'tiktok' | 'youtube' | 'x' | 'facebook' | 'linkedin' | 'pinterest' | string;

export interface PlatformConfig {
  id: string;
  name: string;
  color: string; // Tailwind color or hex
  textColor: string;
  iconName: string;
  charLimit: number;
  defaultTime: string;
  weeklyGoal: number;
}

export interface ContentPillar {
  id: string;
  name: string;
  color: string; // hex color for badge
  targetPercentage?: number;
  description?: string;
}

export type PostFormat = 
  | 'Reel/Short'
  | 'Carousel'
  | 'Static image'
  | 'Story'
  | 'Long video'
  | 'Text post'
  | 'Live';

export type PostStatus = 
  | 'Idea'
  | 'Scripting/Planning'
  | 'Creating'
  | 'Editing'
  | 'Ready'
  | 'Scheduled'
  | 'Posted';

export type Priority = 'low' | 'medium' | 'high';

export interface AssetLink {
  id: string;
  title: string;
  url: string;
  type: 'google_drive' | 'canva' | 'notion' | 'dropbox' | 'figma' | 'other';
}

export interface ChecklistItem {
  id: string;
  label: string;
  completed: boolean;
}

export interface PerformanceMetrics {
  views?: number;
  likes?: number;
  comments?: number;
  shares?: number;
  saves?: number;
  followersGained?: number;
  liveUrl?: string;
  loggedAt?: string;
}

export interface ScriptSceneRow {
  id: string;
  visual: string;
  audio: string;
}

export interface ShotListItem {
  id: string;
  item: string;
  category: 'scene' | 'location' | 'prop' | 'outfit';
  completed: boolean;
}

export interface CarouselSlide {
  id: string;
  slideNumber: number;
  heading: string;
  body: string;
  visualNote?: string;
}

export interface ScriptVersion {
  id: string;
  timestamp: string;
  label?: string;
  data: Partial<ScriptContentData>;
}

export interface PlatformCaptionVariation {
  platformId: string;
  caption: string;
}

export interface ScriptContentData {
  hasContent: boolean;
  lastEdited?: string;
  videoMode?: 'sections' | 'table';
  hookText?: string;
  bodyText?: string;
  callToActionText?: string;
  outroText?: string;
  sceneRows?: ScriptSceneRow[];
  shotList?: ShotListItem[];
  targetSeconds?: number;
  slides?: CarouselSlide[];
  writtenText?: string;
  isThreadMode?: boolean;
  platformVariations?: PlatformCaptionVariation[];
  history?: ScriptVersion[];
  versions?: ScriptVersion[];
}

export interface PostItem {
  id: string;
  title: string;
  platforms: string[]; // platform ids
  pillarId: string;
  format: PostFormat;
  scheduledDate: string; // YYYY-MM-DD
  scheduledTime: string; // HH:mm
  status: PostStatus;
  caption: string;
  hashtags: string[];
  hook: string;
  callToAction: string;
  notes: string;
  assetLinks: AssetLink[];
  checklist: ChecklistItem[];
  priority: Priority;
  isCollaboration: boolean;
  collabBrandName?: string;
  collabPayment?: string;
  metrics?: PerformanceMetrics;
  scriptContent?: ScriptContentData;
  createdAt: string;
  updatedAt: string;
}

export interface IdeaItem {
  id: string;
  title: string;
  hook: string;
  pillarId: string;
  suggestedFormat: PostFormat;
  platforms: string[];
  notes: string;
  tags: string[];
  createdAt: string;
}

export interface PostTemplate {
  id: string;
  name: string;
  format: PostFormat;
  pillarId: string;
  platforms: string[];
  captionStructure: string;
  hashtags: string[];
  checklist: string[];
  callToAction?: string;
}

export interface RecurringSchedule {
  id: string;
  title: string;
  platforms: string[];
  format: PostFormat;
  pillarId: string;
  daysOfWeek: number[]; // 0=Sun, 1=Mon, ..., 6=Sat
  time: string; // HH:mm
  isActive: boolean;
}

export interface UserSettings {
  creatorName: string;
  niche: string;
  weekStartsOnMonday: boolean;
  accentColor: 'rose' | 'violet' | 'amber' | 'emerald' | 'sky' | 'indigo';
  theme: 'light' | 'dark' | 'system';
  weeklyTargetPosts?: number;
  platforms: PlatformConfig[];
  pillars: ContentPillar[];
  templates: PostTemplate[];
  recurringSchedules: RecurringSchedule[];
  hasCompletedOnboarding?: boolean;
  lastExportedAt?: string;
}

export type ActiveTab = 'today' | 'calendar' | 'board' | 'ideas' | 'insights' | 'dashboard' | 'analytics' | 'settings';

export interface ToastItem {
  id: string;
  message: string;
  undoAction?: () => void;
  type?: 'info' | 'success' | 'celebrate' | 'warning';
  timestamp?: number;
}

export type CalendarViewMode = 'month' | 'week' | 'list';

export interface CalendarFilters {
  search: string;
  platforms: string[];
  statuses: PostStatus[];
  pillars: string[];
  formats: PostFormat[];
  onlyOverdue: boolean;
}
