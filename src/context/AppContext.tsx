import React, { createContext, useContext, useEffect, useState, useMemo } from 'react';
import {
  ActiveTab,
  CalendarFilters,
  CalendarViewMode,
  IdeaItem,
  PostItem,
  PostStatus,
  ScriptContentData,
  ScriptVersion,
  ToastItem,
  UserSettings,
} from '../types';
import {
  DEFAULT_SETTINGS,
  formatDateKey,
  generateSamplePosts,
  SAMPLE_IDEAS,
} from '../constants';
import {
  createPost,
  updatePostInDb,
  deletePostInDb,
  createIdea,
  updateIdeaInDb,
  deleteIdeaInDb,
  saveSettings,
} from '../app/actions';

interface AppContextType {
  posts: PostItem[];
  ideas: IdeaItem[];
  settings: UserSettings;
  activeTab: ActiveTab;
  setActiveTab: (tab: ActiveTab) => void;
  calendarViewMode: CalendarViewMode;
  setCalendarViewMode: (mode: CalendarViewMode) => void;
  currentDate: Date;
  setCurrentDate: (d: Date | ((prev: Date) => Date)) => void;
  filters: CalendarFilters;
  setFilters: React.Dispatch<React.SetStateAction<CalendarFilters>>;
  clearFilters: () => void;
  hasActiveFilters: boolean;

  selectedPost: PostItem | null;
  setSelectedPost: (post: PostItem | null) => void;
  isCreateModalOpen: boolean;
  setIsCreateModalOpen: (open: boolean) => void;
  initialDateForNewPost: string | null;
  openCreateModalForDate: (dateStr?: string) => void;

  // Quick Add
  isQuickAddOpen: boolean;
  setIsQuickAddOpen: (open: boolean) => void;
  openQuickAdd: (dateStr?: string) => void;
  quickAddPost: (title: string, platform: string, scheduledDate: string) => PostItem;

  // Global modals
  isSearchOpen: boolean;
  setIsSearchOpen: (open: boolean) => void;
  isShortcutsOpen: boolean;
  setIsShortcutsOpen: (open: boolean) => void;
  isSettingsOpen: boolean;
  setIsSettingsOpen: (open: boolean) => void;
  isAiPlanModalOpen: boolean;
  setIsAiPlanModalOpen: (open: boolean) => void;
  isAiIdeaModalOpen: boolean;
  setIsAiIdeaModalOpen: (open: boolean) => void;

  // Onboarding
  showOnboarding: boolean;
  setShowOnboarding: (show: boolean) => void;
  completeOnboarding: (
    name: string,
    niche: string,
    platforms: string[],
    weeklyTarget: number,
    keepSampleData: boolean
  ) => void;

  // Toast & Undo
  toasts: ToastItem[];
  addToast: (
    message: string,
    undoAction?: () => void,
    type?: 'info' | 'success' | 'celebrate' | 'warning'
  ) => void;
  removeToast: (id: string) => void;
  celebrateMilestone: (message: string) => void;

  // Post Actions
  addPost: (post: Omit<PostItem, 'id' | 'createdAt' | 'updatedAt'>) => PostItem;
  updatePost: (id: string, updates: Partial<PostItem>) => void;
  deletePost: (id: string) => void;
  movePostToDate: (id: string, newDate: string) => void;
  updatePostStatus: (id: string, newStatus: PostStatus) => void;
  duplicatePost: (id: string) => PostItem | null;

  // Idea Actions
  addIdea: (idea: Omit<IdeaItem, 'id' | 'createdAt'>) => IdeaItem;
  updateIdea: (id: string, updates: Partial<IdeaItem>) => void;
  deleteIdea: (id: string) => void;
  convertIdeaToPost: (ideaId: string, scheduledDate?: string) => void;

  // Content Studio
  activeStudioPostId: string | null;
  openContentStudio: (postId: string) => void;
  closeContentStudio: () => void;
  updatePostScriptContent: (postId: string, content: Partial<ScriptContentData>) => void;
  saveScriptVersion: (postId: string, label?: string) => void;
  restoreScriptVersion: (postId: string, versionId: string) => void;

  // Settings Actions
  updateSettings: (updates: Partial<UserSettings>) => void;

  // Bulk / Data Management
  clearSampleData: () => void;
  restoreSampleData: () => void;
  exportJsonBackup: () => void;
  importJsonBackup: (file: File) => Promise<boolean>;
  exportCsvCalendar: () => void;
  applyRecurringSchedules: (weeksAhead?: number) => number;

  // Reminders / Overdue
  dueTodayOrTomorrowPosts: PostItem[];
  overduePosts: PostItem[];
  bannerDismissed: boolean;
  setBannerDismissed: (dismissed: boolean) => void;

  // Backup reminder helper
  needsBackupReminder: boolean;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

const STORAGE_POSTS_KEY = 'contentflow_posts_v1';
const STORAGE_IDEAS_KEY = 'contentflow_ideas_v1';
const STORAGE_SETTINGS_KEY = 'contentflow_settings_v1';
const STORAGE_VIEW_MODE_KEY = 'contentflow_view_mode_v1';
const STORAGE_FILTERS_KEY = 'contentflow_filters_v1';
const STORAGE_ONBOARDED_KEY = 'contentflow_onboarded_v1';

export const AppProvider: React.FC<{ 
  children: React.ReactNode; 
  initialPosts?: PostItem[];
  initialIdeas?: IdeaItem[];
  initialSettings?: UserSettings;
}> = ({ children, initialPosts, initialIdeas, initialSettings }) => {
  // Initialize state with localStorage or defaults
  const [posts, setPosts] = useState<PostItem[]>(initialPosts || generateSamplePosts());

  const [ideas, setIdeas] = useState<IdeaItem[]>(initialIdeas || SAMPLE_IDEAS);

  const [settings, setSettings] = useState<UserSettings>(initialSettings || DEFAULT_SETTINGS);

  // Navigation & View states - default to 'today' as requested!
  const [activeTab, setActiveTab] = useState<ActiveTab>('today');
  
  const [calendarViewMode, setCalendarViewModeState] = useState<CalendarViewMode>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_VIEW_MODE_KEY);
      if (saved === 'month' || saved === 'week' || saved === 'list') {
        return saved;
      }
    } catch {
      // ignore
    }
    return 'month';
  });

  const setCalendarViewMode = (mode: CalendarViewMode) => {
    setCalendarViewModeState(mode);
    try {
      localStorage.setItem(STORAGE_VIEW_MODE_KEY, mode);
    } catch {}
  };

  const [currentDate, setCurrentDate] = useState<Date>(new Date());
  const [selectedPost, setSelectedPost] = useState<PostItem | null>(null);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [initialDateForNewPost, setInitialDateForNewPost] = useState<string | null>(null);

  // Quick Add modal
  const [isQuickAddOpen, setIsQuickAddOpen] = useState(false);

  // Content Studio active post
  const [activeStudioPostId, setActiveStudioPostId] = useState<string | null>(null);

  // Search & Shortcuts & Profile dialogs
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isShortcutsOpen, setIsShortcutsOpen] = useState(false);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);

  // AI modals
  const [isAiPlanModalOpen, setIsAiPlanModalOpen] = useState(false);
  const [isAiIdeaModalOpen, setIsAiIdeaModalOpen] = useState(false);
  const [bannerDismissed, setBannerDismissed] = useState(false);

  // Onboarding
  const [showOnboarding, setShowOnboarding] = useState<boolean>(() => {
    try {
      const onboarded = localStorage.getItem(STORAGE_ONBOARDED_KEY);
      return !onboarded;
    } catch {
      return false;
    }
  });

  // Toasts
  const [toasts, setToasts] = useState<ToastItem[]>([]);

  const addToast = (
    message: string,
    undoAction?: () => void,
    type: 'info' | 'success' | 'celebrate' | 'warning' = 'info'
  ) => {
    const id = `toast-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`;
    const newToast: ToastItem = { id, message, undoAction, type, timestamp: Date.now() };
    setToasts((prev) => [...prev.slice(-3), newToast]); // keep max 4 toasts

    // Auto remove after 5 seconds
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 5000);
  };

  const removeToast = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  const celebrateMilestone = (message: string) => {
    addToast(message, undefined, 'celebrate');
  };

  // Filters with persistence
  const [filters, setFiltersState] = useState<CalendarFilters>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_FILTERS_KEY);
      if (saved) {
        return JSON.parse(saved);
      }
    } catch {}
    return {
      search: '',
      platforms: [],
      statuses: [],
      pillars: [],
      formats: [],
      onlyOverdue: false,
    };
  });

  const setFilters: React.Dispatch<React.SetStateAction<CalendarFilters>> = (val) => {
    setFiltersState((prev) => {
      const next = typeof val === 'function' ? val(prev) : val;
      try {
        localStorage.setItem(STORAGE_FILTERS_KEY, JSON.stringify(next));
      } catch {}
      return next;
    });
  };

  const clearFilters = () => {
    const emptyFilters: CalendarFilters = {
      search: '',
      platforms: [],
      statuses: [],
      pillars: [],
      formats: [],
      onlyOverdue: false,
    };
    setFilters(emptyFilters);
  };

  const hasActiveFilters = useMemo(() => {
    return Boolean(
      filters.search.trim() ||
        filters.platforms.length > 0 ||
        filters.statuses.length > 0 ||
        filters.pillars.length > 0 ||
        filters.formats.length > 0 ||
        filters.onlyOverdue
    );
  }, [filters]);

  // We no longer auto-save posts to localStorage. They are saved directly to the DB inside the actions.
  // We can keep localStorage for local-only state like calendar mode and filters.

  // Apply theme class to document
  useEffect(() => {
    const root = document.documentElement;
    if (settings.theme === 'dark') {
      root.classList.add('dark');
    } else if (settings.theme === 'light') {
      root.classList.remove('dark');
    } else {
      if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
        root.classList.add('dark');
      } else {
        root.classList.remove('dark');
      }
    }
  }, [settings.theme]);

  // Global keyboard shortcuts (N for new post, T for today, / for search, 1-5 for views, ? for cheatsheet)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Don't trigger if typing in an input or textarea
      const target = e.target as HTMLElement;
      if (
        target.tagName === 'INPUT' ||
        target.tagName === 'TEXTAREA' ||
        target.isContentEditable
      ) {
        return;
      }

      if (e.key === 'n' || e.key === 'N') {
        e.preventDefault();
        openQuickAdd();
      } else if (e.key === 't' || e.key === 'T') {
        e.preventDefault();
        setCurrentDate(new Date());
        setActiveTab('today');
      } else if (e.key === '/') {
        e.preventDefault();
        setIsSearchOpen(true);
      } else if (e.key === '?' || (e.shiftKey && e.key === '/')) {
        e.preventDefault();
        setIsShortcutsOpen(true);
      } else if (e.key === '1') {
        setActiveTab('today');
      } else if (e.key === '2') {
        setActiveTab('calendar');
      } else if (e.key === '3') {
        setActiveTab('board');
      } else if (e.key === '4') {
        setActiveTab('ideas');
      } else if (e.key === '5') {
        setActiveTab('insights');
      } else if (e.key === 'Escape') {
        setIsSearchOpen(false);
        setIsShortcutsOpen(false);
        setIsQuickAddOpen(false);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Helpers for Due & Overdue
  const todayStr = useMemo(() => formatDateKey(new Date()), []);
  const tomorrowStr = useMemo(() => {
    const tom = new Date();
    tom.setDate(tom.getDate() + 1);
    return formatDateKey(tom);
  }, []);

  const overduePosts = useMemo(() => {
    return posts.filter(
      (p) => p.status !== 'Posted' && p.scheduledDate < todayStr
    );
  }, [posts, todayStr]);

  const dueTodayOrTomorrowPosts = useMemo(() => {
    return posts.filter(
      (p) =>
        p.status !== 'Posted' &&
        (p.scheduledDate === todayStr || p.scheduledDate === tomorrowStr)
    );
  }, [posts, todayStr, tomorrowStr]);

  // Check if user needs a backup reminder (> 14 days without export)
  const needsBackupReminder = useMemo(() => {
    if (!settings.lastExportedAt) return false;
    const diffDays =
      (Date.now() - new Date(settings.lastExportedAt).getTime()) / (1000 * 60 * 60 * 24);
    return diffDays >= 14;
  }, [settings.lastExportedAt]);

  // Modal Actions
  const openCreateModalForDate = (dateStr?: string) => {
    setInitialDateForNewPost(dateStr || formatDateKey(new Date()));
    setSelectedPost(null);
    setIsCreateModalOpen(true);
  };

  const openQuickAdd = (dateStr?: string) => {
    setInitialDateForNewPost(dateStr || formatDateKey(new Date()));
    setIsQuickAddOpen(true);
  };

  // Quick Add 3-tap action
  const quickAddPost = (title: string, platform: string, scheduledDate: string): PostItem => {
    const newPost = addPost({
      title: title.trim(),
      platforms: [platform],
      pillarId: settings.pillars[0]?.id || 'tutorials',
      format: 'Reel/Short',
      scheduledDate,
      scheduledTime: '18:00',
      status: 'Idea',
      caption: '',
      hashtags: [],
      hook: '',
      callToAction: '',
      notes: '',
      assetLinks: [],
      checklist: [
        { id: `c-${Date.now()}-1`, label: 'Outline hook & script', completed: false },
        { id: `c-${Date.now()}-2`, label: 'Film footage', completed: false },
        { id: `c-${Date.now()}-3`, label: 'Edit & polish audio', completed: false },
        { id: `c-${Date.now()}-4`, label: 'Publish to channel', completed: false },
      ],
      priority: 'medium',
      isCollaboration: false,
    });
    addToast(`"${newPost.title}" scheduled!`, () => deletePost(newPost.id), 'success');
    return newPost;
  };

  // Onboarding completion
  const completeOnboarding = (
    name: string,
    niche: string,
    platforms: string[],
    weeklyTarget: number,
    keepSampleData: boolean
  ) => {
    const updatedPlatforms = settings.platforms.map((p) => ({
      ...p,
      isEnabled: platforms.includes(p.id),
    }));

    updateSettings({
      creatorName: name || settings.creatorName,
      niche: niche || settings.niche,
      platforms: updatedPlatforms,
      weeklyTargetPosts: weeklyTarget || settings.weeklyTargetPosts || 5,
      hasCompletedOnboarding: true,
    });

    if (!keepSampleData) {
      clearSampleData();
    }

    try {
      localStorage.setItem(STORAGE_ONBOARDED_KEY, 'true');
    } catch {}

    setShowOnboarding(false);
    celebrateMilestone('Calendar ready');
  };

  // Post Actions
  const addPost = (postData: Omit<PostItem, 'id' | 'createdAt' | 'updatedAt'>): PostItem => {
    const newPost: PostItem = {
      ...postData,
      id: `post-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    setPosts((prev) => [newPost, ...prev]);
    createPost(newPost).catch(console.error);
    return newPost;
  };

  const updatePost = (id: string, updates: Partial<PostItem>) => {
    setPosts((prev) =>
      prev.map((p) => {
        if (p.id === id) {
          const updated = {
            ...p,
            ...updates,
            updatedAt: new Date().toISOString(),
          };
          if (selectedPost?.id === id) {
            setSelectedPost(updated);
          }
          return updated;
        }
        return p;
      })
    );
    updatePostInDb(id, updates).catch(console.error);
  };

  const deletePost = (id: string) => {
    const postToDelete = posts.find((p) => p.id === id);
    if (!postToDelete) return;

    setPosts((prev) => prev.filter((p) => p.id !== id));
    if (selectedPost?.id === id) {
      setSelectedPost(null);
    }
    
    deletePostInDb(id).catch(console.error);

    // Show 5-second undo toast
    addToast(
      `Deleted "${postToDelete.title}"`,
      () => {
        setPosts((prev) => [postToDelete, ...prev]);
        createPost(postToDelete).catch(console.error);
      },
      'info'
    );
  };

  const movePostToDate = (id: string, newDate: string) => {
    const post = posts.find((p) => p.id === id);
    if (!post) return;
    const oldDate = post.scheduledDate;
    if (oldDate === newDate) return;

    updatePost(id, { scheduledDate: newDate });

    // Show undo toast
    addToast(
      `Moved to ${newDate}`,
      () => {
        updatePost(id, { scheduledDate: oldDate });
      },
      'info'
    );
  };

  const updatePostStatus = (id: string, newStatus: PostStatus) => {
    const post = posts.find((p) => p.id === id);
    updatePost(id, { status: newStatus });
    if (newStatus === 'Posted') {
      celebrateMilestone('Marked as posted');
    }
  };

  const duplicatePost = (id: string): PostItem | null => {
    const post = posts.find((p) => p.id === id);
    if (!post) return null;

    const copy = addPost({
      ...post,
      title: `${post.title} (Copy)`,
      status: 'Idea',
      metrics: undefined,
      scheduledDate: formatDateKey(new Date()),
      checklist: post.checklist.map((c) => ({ ...c, completed: false })),
    });

    addToast(`Duplicated "${post.title}"`, () => deletePost(copy.id), 'success');
    return copy;
  };

  // Idea Actions
  const addIdea = (ideaData: Omit<IdeaItem, 'id' | 'createdAt'>): IdeaItem => {
    const newIdea: IdeaItem = {
      ...ideaData,
      id: `idea-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`,
      createdAt: new Date().toISOString(),
    };
    setIdeas((prev) => [newIdea, ...prev]);
    createIdea(newIdea).catch(console.error);
    return newIdea;
  };

  const updateIdea = (id: string, updates: Partial<IdeaItem>) => {
    setIdeas((prev) =>
      prev.map((i) => (i.id === id ? { ...i, ...updates } : i))
    );
    updateIdeaInDb(id, updates).catch(console.error);
  };

  const deleteIdea = (id: string) => {
    const ideaToDelete = ideas.find((i) => i.id === id);
    if (!ideaToDelete) return;

    setIdeas((prev) => prev.filter((i) => i.id !== id));
    deleteIdeaInDb(id).catch(console.error);
    
    addToast(
      `Deleted idea "${ideaToDelete.title}"`,
      () => {
        setIdeas((prev) => [ideaToDelete, ...prev]);
        createIdea(ideaToDelete).catch(console.error);
      },
      'info'
    );
  };

  const convertIdeaToPost = (ideaId: string, scheduledDate?: string) => {
    const idea = ideas.find((i) => i.id === ideaId);
    if (!idea) return;

    const newPost = addPost({
      title: idea.title,
      platforms: idea.platforms.length > 0 ? idea.platforms : ['instagram'],
      pillarId: idea.pillarId,
      format: idea.suggestedFormat || 'Reel/Short',
      scheduledDate: scheduledDate || formatDateKey(new Date()),
      scheduledTime: '18:00',
      status: 'Idea',
      caption: '',
      hashtags: idea.tags.map((t) => (t.startsWith('#') ? t : `#${t}`)),
      hook: idea.hook || '',
      callToAction: '',
      notes: idea.notes || '',
      assetLinks: [],
      checklist: [
        { id: `c-${Date.now()}-1`, label: 'Outline hook & script', completed: Boolean(idea.hook || idea.notes) },
        { id: `c-${Date.now()}-2`, label: 'Film footage', completed: false },
        { id: `c-${Date.now()}-3`, label: 'Edit & sound design', completed: false },
        { id: `c-${Date.now()}-4`, label: 'Final review & schedule', completed: false },
      ],
      priority: 'medium',
      isCollaboration: false,
      scriptContent: {
        hasContent: Boolean(idea.hook || idea.notes),
        hookText: idea.hook || '',
        bodyText: idea.notes || '',
        callToActionText: '',
        outroText: '',
        targetSeconds: 60,
        videoMode: 'sections',
      },
    });

    deleteIdea(ideaId);
    setSelectedPost(newPost);
    celebrateMilestone('Idea added to calendar');
  };

  // Content Studio Handlers
  const openContentStudio = (postId: string) => {
    setActiveStudioPostId(postId);
    setActiveTab('studio');
  };

  const closeContentStudio = () => {
    setActiveStudioPostId(null);
  };

  const updatePostScriptContent = (postId: string, contentUpdates: Partial<ScriptContentData>) => {
    setPosts((prevPosts) =>
      prevPosts.map((p) => {
        if (p.id !== postId) return p;

        const existingScript = p.scriptContent || {
          hasContent: false,
          videoMode: 'sections',
          targetSeconds: 60,
        };

        const mergedScript: ScriptContentData = {
          ...existingScript,
          ...contentUpdates,
          lastEdited: new Date().toISOString(),
        };

        // Determine if script has meaningful content
        const hasText = Boolean(
          mergedScript.hookText?.trim() ||
          mergedScript.bodyText?.trim() ||
          (mergedScript.sceneRows && mergedScript.sceneRows.length > 0 && mergedScript.sceneRows.some((r) => r.audio?.trim() || r.visual?.trim())) ||
          (mergedScript.slides && mergedScript.slides.length > 0 && mergedScript.slides.some((s) => s.body?.trim() || s.heading?.trim())) ||
          mergedScript.writtenText?.trim()
        );

        mergedScript.hasContent = hasText;

        // Auto-update checklist: mark "Script written" as completed
        let updatedChecklist = [...p.checklist];
        const scriptChecklistIndex = updatedChecklist.findIndex((c) =>
          c.label.toLowerCase().includes('script') || c.label.toLowerCase().includes('hook')
        );

        if (hasText) {
          if (scriptChecklistIndex >= 0) {
            updatedChecklist[scriptChecklistIndex] = {
              ...updatedChecklist[scriptChecklistIndex],
              completed: true,
            };
          } else {
            updatedChecklist.unshift({
              id: `c-script-${Date.now()}`,
              label: 'Script written',
              completed: true,
            });
          }
        }

        // Auto-suggest / advance status from 'Idea' or 'Scripting/Planning' to 'Creating'
        let updatedStatus = p.status;
        if (hasText && (p.status === 'Idea' || p.status === 'Scripting/Planning')) {
          updatedStatus = 'Creating';
        }

        const updatedPost: PostItem = {
          ...p,
          scriptContent: mergedScript,
          checklist: updatedChecklist,
          status: updatedStatus,
          updatedAt: new Date().toISOString(),
        };

        if (selectedPost?.id === postId) {
          setSelectedPost(updatedPost);
        }

        return updatedPost;
      })
    );
  };

  const saveScriptVersion = (postId: string, label?: string) => {
    const post = posts.find((p) => p.id === postId);
    if (!post || !post.scriptContent) return;

    const newVersion: ScriptVersion = {
      id: `ver-${Date.now()}`,
      timestamp: new Date().toISOString(),
      label: label || `Snapshot ${new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`,
      data: { ...post.scriptContent },
    };

    const existingHistory = post.scriptContent.history || [];
    const updatedHistory = [newVersion, ...existingHistory].slice(0, 10);

    updatePostScriptContent(postId, {
      history: updatedHistory,
    });
  };

  const restoreScriptVersion = (postId: string, versionId: string) => {
    const post = posts.find((p) => p.id === postId);
    if (!post?.scriptContent?.history) return;

    const versionToRestore = post.scriptContent.history.find((v) => v.id === versionId);
    if (!versionToRestore) return;

    // Save current version before restoring
    saveScriptVersion(postId, 'Before restore');

    updatePostScriptContent(postId, {
      ...versionToRestore.data,
      history: post.scriptContent.history,
    });

    addToast('Restored previous script version', undefined, 'success');
  };

  // Settings Actions
  const updateSettings = (updates: Partial<UserSettings>) => {
    setSettings((prev) => {
      const next = { ...prev, ...updates };
      saveSettings(next).catch(console.error);
      return next;
    });
  };

  // Bulk Actions
  const clearSampleData = () => {
    setPosts([]);
    setIdeas([]);
    setSelectedPost(null);
  };

  const restoreSampleData = () => {
    setPosts(generateSamplePosts());
    setIdeas(SAMPLE_IDEAS);
  };

  const exportJsonBackup = () => {
    const exportTime = new Date().toISOString();
    const data = {
      version: '1.0',
      exportedAt: exportTime,
      creator: settings.creatorName,
      settings: { ...settings, lastExportedAt: exportTime },
      posts,
      ideas,
    };
    updateSettings({ lastExportedAt: exportTime });

    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `contentflow-backup-${formatDateKey(new Date())}.json`;
    a.click();
    URL.revokeObjectURL(url);
    addToast('Backup exported successfully!', undefined, 'success');
  };

  const importJsonBackup = async (file: File): Promise<boolean> => {
    try {
      const text = await file.text();
      const parsed = JSON.parse(text);
      if (Array.isArray(parsed.posts)) {
        setPosts(parsed.posts);
      }
      if (Array.isArray(parsed.ideas)) {
        setIdeas(parsed.ideas);
      }
      if (parsed.settings) {
        setSettings((prev) => ({ ...prev, ...parsed.settings }));
      }
      addToast('Backup restored successfully!', undefined, 'success');
      return true;
    } catch (e) {
      console.error('Failed to import backup:', e);
      addToast('Failed to parse backup file', undefined, 'warning');
      return false;
    }
  };

  const exportCsvCalendar = () => {
    const headers = [
      'Title',
      'Status',
      'Scheduled Date',
      'Scheduled Time',
      'Platforms',
      'Content Pillar',
      'Format',
      'Priority',
      'Hook',
      'Caption',
      'Hashtags',
      'Call to Action',
      'Is Collab',
      'Collab Brand',
      'Collab Payment',
      'Views',
      'Likes',
      'Comments',
      'Shares',
      'Saves',
      'Live URL',
    ];

    const escapeCsv = (val: any) => {
      if (val === undefined || val === null) return '""';
      const str = String(val).replace(/"/g, '""');
      return `"${str}"`;
    };

    const rows = posts.map((p) => {
      const pillarName = settings.pillars.find((pil) => pil.id === p.pillarId)?.name || p.pillarId;
      return [
        escapeCsv(p.title),
        escapeCsv(p.status),
        escapeCsv(p.scheduledDate),
        escapeCsv(p.scheduledTime),
        escapeCsv(p.platforms.join(', ')),
        escapeCsv(pillarName),
        escapeCsv(p.format),
        escapeCsv(p.priority),
        escapeCsv(p.hook),
        escapeCsv(p.caption),
        escapeCsv(p.hashtags.join(' ')),
        escapeCsv(p.callToAction),
        escapeCsv(p.isCollaboration ? 'Yes' : 'No'),
        escapeCsv(p.collabBrandName || ''),
        escapeCsv(p.collabPayment || ''),
        escapeCsv(p.metrics?.views || 0),
        escapeCsv(p.metrics?.likes || 0),
        escapeCsv(p.metrics?.comments || 0),
        escapeCsv(p.metrics?.shares || 0),
        escapeCsv(p.metrics?.saves || 0),
        escapeCsv(p.metrics?.liveUrl || ''),
      ].join(',');
    });

    const csvContent = [headers.join(','), ...rows].join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `contentflow-calendar-${formatDateKey(new Date())}.csv`;
    a.click();
    URL.revokeObjectURL(url);
    addToast('Calendar exported to CSV', undefined, 'success');
  };

  const applyRecurringSchedules = (weeksAhead = 3): number => {
    let count = 0;
    const today = new Date();
    const newPostsToInsert: PostItem[] = [];

    settings.recurringSchedules.forEach((sched) => {
      if (!sched.isActive) return;

      for (let day = 1; day <= weeksAhead * 7; day++) {
        const targetDate = new Date(today);
        targetDate.setDate(today.getDate() + day);
        const dayOfWeek = targetDate.getDay();

        if (sched.daysOfWeek.includes(dayOfWeek)) {
          const dateStr = formatDateKey(targetDate);
          const exists = posts.some(
            (p) => p.scheduledDate === dateStr && p.title.toLowerCase() === sched.title.toLowerCase()
          );

          if (!exists) {
            newPostsToInsert.push({
              id: `post-recur-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`,
              title: sched.title,
              platforms: sched.platforms,
              pillarId: sched.pillarId,
              format: sched.format,
              scheduledDate: dateStr,
              scheduledTime: sched.time,
              status: 'Scheduled',
              caption: '',
              hashtags: [],
              hook: '',
              callToAction: '',
              notes: 'Auto-generated placeholder from recurring schedule.',
              assetLinks: [],
              checklist: [
                { id: `c-${Date.now()}-1`, label: 'Prepare concept & hook', completed: false },
                { id: `c-${Date.now()}-2`, label: 'Film footage', completed: false },
                { id: `c-${Date.now()}-3`, label: 'Edit & polish', completed: false },
              ],
              priority: 'medium',
              isCollaboration: false,
              createdAt: new Date().toISOString(),
              updatedAt: new Date().toISOString(),
            });
            count++;
          }
        }
      }
    });

    if (newPostsToInsert.length > 0) {
      setPosts((prev) => [...newPostsToInsert, ...prev]);
      addToast(`Generated ${count} recurring posts!`, undefined, 'success');
    }

    return count;
  };

  return (
    <AppContext.Provider
      value={{
        posts,
        ideas,
        settings,
        activeTab,
        setActiveTab,
        calendarViewMode,
        setCalendarViewMode,
        currentDate,
        setCurrentDate,
        filters,
        setFilters,
        clearFilters,
        hasActiveFilters,
        selectedPost,
        setSelectedPost,
        isCreateModalOpen,
        setIsCreateModalOpen,
        initialDateForNewPost,
        openCreateModalForDate,
        isQuickAddOpen,
        setIsQuickAddOpen,
        openQuickAdd,
        quickAddPost,
        isSearchOpen,
        setIsSearchOpen,
        isShortcutsOpen,
        setIsShortcutsOpen,
        isSettingsOpen,
        setIsSettingsOpen,
        isAiPlanModalOpen,
        setIsAiPlanModalOpen,
        isAiIdeaModalOpen,
        setIsAiIdeaModalOpen,
        showOnboarding,
        setShowOnboarding,
        completeOnboarding,
        toasts,
        addToast,
        removeToast,
        celebrateMilestone,
        addPost,
        updatePost,
        deletePost,
        movePostToDate,
        updatePostStatus,
        duplicatePost,
        addIdea,
        updateIdea,
        deleteIdea,
        convertIdeaToPost,
        activeStudioPostId,
        openContentStudio,
        closeContentStudio,
        updatePostScriptContent,
        saveScriptVersion,
        restoreScriptVersion,
        updateSettings,
        clearSampleData,
        restoreSampleData,
        exportJsonBackup,
        importJsonBackup,
        exportCsvCalendar,
        applyRecurringSchedules,
        dueTodayOrTomorrowPosts,
        overduePosts,
        bannerDismissed,
        setBannerDismissed,
        needsBackupReminder,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};

export const useAppContext = useApp;
