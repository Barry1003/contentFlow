import React, { useState, useEffect } from 'react';
import {
  X,
  Sparkles,
  Calendar,
  Clock,
  CheckSquare,
  Link as LinkIcon,
  Trash2,
  Copy,
  Save,
  Wand2,
  AlertCircle,
  BarChart2,
  Share2,
  ExternalLink,
  Plus,
  Bookmark,
  Check,
  Tag,
  Loader2,
  PenTool,
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import {
  AssetLink,
  ChecklistItem,
  PerformanceMetrics,
  PostFormat,
  PostItem,
  PostStatus,
  Priority,
} from '../../types';
import {
  ALL_FORMATS,
  ALL_STATUSES,
  PRIORITY_CONFIG,
  STATUS_CONFIG,
  getAccentClasses,
  calculateEngagement,
} from '../../utils';
import { PlatformBadge } from '../Common/PlatformBadge';

export const PostModal: React.FC = () => {
  const {
    selectedPost,
    setSelectedPost,
    isCreateModalOpen,
    setIsCreateModalOpen,
    initialDateForNewPost,
    addPost,
    updatePost,
    deletePost,
    settings,
    updateSettings,
    openContentStudio,
  } = useApp();

  const isOpen = Boolean(selectedPost || isCreateModalOpen);
  const isEditing = Boolean(selectedPost);

  // Default initial post values
  const [title, setTitle] = useState('');
  const [platforms, setPlatforms] = useState<string[]>(['instagram']);
  const [pillarId, setPillarId] = useState(settings.pillars[0]?.id || 'tutorials');
  const [format, setFormat] = useState<PostFormat>('Reel/Short');
  const [scheduledDate, setScheduledDate] = useState(
    initialDateForNewPost || new Date().toISOString().split('T')[0]
  );
  const [scheduledTime, setScheduledTime] = useState('18:00');
  const [status, setStatus] = useState<PostStatus>('Idea');
  const [hook, setHook] = useState('');
  const [caption, setCaption] = useState('');
  const [hashtagInput, setHashtagInput] = useState('');
  const [callToAction, setCallToAction] = useState('');
  const [notes, setNotes] = useState('');
  const [priority, setPriority] = useState<Priority>('medium');
  const [isCollaboration, setIsCollaboration] = useState(false);
  const [collabBrandName, setCollabBrandName] = useState('');
  const [collabPayment, setCollabPayment] = useState('');
  const [assetLinks, setAssetLinks] = useState<AssetLink[]>([]);
  const [checklist, setChecklist] = useState<ChecklistItem[]>([
    { id: '1', label: 'Outline script & hooks', completed: false },
    { id: '2', label: 'Film A-roll and B-roll', completed: false },
    { id: '3', label: 'Edit & polish audio', completed: false },
    { id: '4', label: 'Create cover thumbnail', completed: false },
    { id: '5', label: 'Final review & schedule', completed: false },
  ]);
  const [newChecklistText, setNewChecklistText] = useState('');
  const [newLinkTitle, setNewLinkTitle] = useState('');
  const [newLinkUrl, setNewLinkUrl] = useState('');

  // Performance metrics
  const [metrics, setMetrics] = useState<PerformanceMetrics>({
    views: undefined,
    likes: undefined,
    comments: undefined,
    shares: undefined,
    saves: undefined,
    followersGained: undefined,
    liveUrl: '',
  });

  // Active section tab in modal
  const [modalTab, setModalTab] = useState<'content' | 'script' | 'caption' | 'assets' | 'performance'>('content');

  // AI Hook Improvement state
  const [isImprovingHook, setIsImprovingHook] = useState(false);
  const [aiHooks, setAiHooks] = useState<{ hook: string; trigger: string }[]>([]);
  const [hookAiError, setHookAiError] = useState<string | null>(null);

  // AI Caption Writer state
  const [isAiCaptionOpen, setIsAiCaptionOpen] = useState(false);
  const [captionTone, setCaptionTone] = useState<'fun' | 'professional' | 'inspirational' | 'casual'>('casual');
  const [isGeneratingCaption, setIsGeneratingCaption] = useState(false);
  const [aiCaptionOptions, setAiCaptionOptions] = useState<
    { caption: string; hashtags: string[]; callToAction: string }[]
  >([]);
  const [captionAiError, setCaptionAiError] = useState<string | null>(null);

  // Confirmation state
  const [isDirty, setIsDirty] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  // Template saving feedback
  const [savedAsTemplateSuccess, setSavedAsTemplateSuccess] = useState(false);

  // Accent styling
  const accent = getAccentClasses(settings.accentColor);

  // Populate state when opening a post
  useEffect(() => {
    if (selectedPost) {
      setTitle(selectedPost.title || '');
      setPlatforms(selectedPost.platforms || ['instagram']);
      setPillarId(selectedPost.pillarId || settings.pillars[0]?.id || 'tutorials');
      setFormat(selectedPost.format || 'Reel/Short');
      setScheduledDate(selectedPost.scheduledDate || new Date().toISOString().split('T')[0]);
      setScheduledTime(selectedPost.scheduledTime || '18:00');
      setStatus(selectedPost.status || 'Idea');
      setHook(selectedPost.hook || '');
      setCaption(selectedPost.caption || '');
      setHashtagInput(selectedPost.hashtags?.join(' ') || '');
      setCallToAction(selectedPost.callToAction || '');
      setNotes(selectedPost.notes || '');
      setPriority(selectedPost.priority || 'medium');
      setIsCollaboration(Boolean(selectedPost.isCollaboration));
      setCollabBrandName(selectedPost.collabBrandName || '');
      setCollabPayment(selectedPost.collabPayment || '');
      setAssetLinks(selectedPost.assetLinks || []);
      setChecklist(
        selectedPost.checklist?.length
          ? selectedPost.checklist
          : [
              { id: '1', label: 'Outline script & hooks', completed: false },
              { id: '2', label: 'Film A-roll and B-roll', completed: false },
              { id: '3', label: 'Edit & polish audio', completed: false },
              { id: '4', label: 'Create cover thumbnail', completed: false },
              { id: '5', label: 'Final review & schedule', completed: false },
            ]
      );
      setMetrics(
        selectedPost.metrics || {
          views: undefined,
          likes: undefined,
          comments: undefined,
          shares: undefined,
          saves: undefined,
          followersGained: undefined,
          liveUrl: '',
        }
      );
      setIsDirty(false);
      setAiHooks([]);
      setHookAiError(null);
    } else if (isCreateModalOpen) {
      setTitle('');
      setPlatforms(['instagram']);
      setPillarId(settings.pillars[0]?.id || 'tutorials');
      setFormat('Reel/Short');
      setScheduledDate(initialDateForNewPost || new Date().toISOString().split('T')[0]);
      setScheduledTime('18:00');
      setStatus('Idea');
      setHook('');
      setCaption('');
      setHashtagInput('');
      setCallToAction('');
      setNotes('');
      setPriority('medium');
      setIsCollaboration(false);
      setCollabBrandName('');
      setCollabPayment('');
      setAssetLinks([]);
      setChecklist([
        { id: '1', label: 'Outline script & hooks', completed: false },
        { id: '2', label: 'Film A-roll and B-roll', completed: false },
        { id: '3', label: 'Edit & polish audio', completed: false },
        { id: '4', label: 'Create cover thumbnail', completed: false },
        { id: '5', label: 'Final review & schedule', completed: false },
      ]);
      setMetrics({
        views: undefined,
        likes: undefined,
        comments: undefined,
        shares: undefined,
        saves: undefined,
        followersGained: undefined,
        liveUrl: '',
      });
      setIsDirty(false);
      setAiHooks([]);
      setHookAiError(null);
    }
  }, [selectedPost, isCreateModalOpen, initialDateForNewPost, settings.pillars]);

  if (!isOpen) return null;

  // Multi-select platform toggle
  const togglePlatform = (pId: string) => {
    setIsDirty(true);
    if (platforms.includes(pId)) {
      if (platforms.length > 1) {
        setPlatforms(platforms.filter((p) => p !== pId));
      }
    } else {
      setPlatforms([...platforms, pId]);
    }
  };

  // Checklist handlers
  const toggleChecklist = (id: string) => {
    setIsDirty(true);
    setChecklist((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, completed: !item.completed } : item
      )
    );
  };

  const addChecklistItem = () => {
    if (!newChecklistText.trim()) return;
    setIsDirty(true);
    setChecklist((prev) => [
      ...prev,
      { id: `c-${Date.now()}`, label: newChecklistText.trim(), completed: false },
    ]);
    setNewChecklistText('');
  };

  const removeChecklistItem = (id: string) => {
    setIsDirty(true);
    setChecklist((prev) => prev.filter((item) => item.id !== id));
  };

  // Asset links handlers
  const addAssetLink = () => {
    if (!newLinkUrl.trim()) return;
    setIsDirty(true);
    let type: AssetLink['type'] = 'other';
    const lower = newLinkUrl.toLowerCase();
    if (lower.includes('drive.google')) type = 'google_drive';
    else if (lower.includes('canva.com')) type = 'canva';
    else if (lower.includes('notion.so') || lower.includes('notion.site')) type = 'notion';
    else if (lower.includes('figma.com')) type = 'figma';
    else if (lower.includes('dropbox.com')) type = 'dropbox';

    setAssetLinks((prev) => [
      ...prev,
      {
        id: `link-${Date.now()}`,
        title: newLinkTitle.trim() || 'Asset Link',
        url: newLinkUrl.trim().startsWith('http') ? newLinkUrl.trim() : `https://${newLinkUrl.trim()}`,
        type,
      },
    ]);
    setNewLinkTitle('');
    setNewLinkUrl('');
  };

  const removeAssetLink = (id: string) => {
    setIsDirty(true);
    setAssetLinks((prev) => prev.filter((l) => l.id !== id));
  };

  // Parse hashtags into array
  const parsedHashtags = hashtagInput
    .split(/\s+/)
    .map((tag) => tag.trim())
    .filter(Boolean)
    .map((tag) => (tag.startsWith('#') ? tag : `#${tag}`));

  // Character Limit calculation
  // Find minimum character limit across selected platforms
  const minCharLimit = Math.min(
    ...platforms.map((pId) => {
      const plat = settings.platforms.find((p) => p.id === pId);
      return plat?.charLimit || 2200;
    })
  );
  const currentChars = caption.length;
  const isOverCharLimit = currentChars > minCharLimit;

  // Save changes
  const handleSave = () => {
    if (!title.trim()) {
      alert('Please provide a post title.');
      return;
    }

    const payload = {
      title: title.trim(),
      platforms,
      pillarId,
      format,
      scheduledDate,
      scheduledTime,
      status,
      hook: hook.trim(),
      caption: caption.trim(),
      hashtags: parsedHashtags,
      callToAction: callToAction.trim(),
      notes: notes.trim(),
      priority,
      isCollaboration,
      collabBrandName: isCollaboration ? collabBrandName.trim() : undefined,
      collabPayment: isCollaboration ? collabPayment.trim() : undefined,
      assetLinks,
      checklist,
      metrics: status === 'Posted' ? metrics : undefined,
    };

    if (selectedPost) {
      updatePost(selectedPost.id, payload);
    } else {
      addPost(payload);
    }

    setIsDirty(false);
    setSelectedPost(null);
    setIsCreateModalOpen(false);
  };

  const handleOpenStudio = () => {
    let targetPostId = selectedPost?.id;
    if (!targetPostId) {
      const created = addPost({
        title: title.trim() || 'Untitled Post',
        platforms,
        pillarId,
        format,
        scheduledDate,
        scheduledTime,
        status,
        hook: hook.trim(),
        caption: caption.trim(),
        hashtags: parsedHashtags,
        callToAction: callToAction.trim(),
        notes: notes.trim(),
        priority,
        isCollaboration,
        collabBrandName: isCollaboration ? collabBrandName.trim() : undefined,
        collabPayment: isCollaboration ? collabPayment.trim() : undefined,
        assetLinks,
        checklist,
        scriptContent: {
          hasContent: false,
          targetSeconds: 60,
          hookText: hook.trim(),
          bodyText: '',
          callToActionText: callToAction.trim(),
          sceneRows: [],
          shotList: [],
          slides: [],
          platformVariations: [],
          versions: [],
        },
      });
      targetPostId = created.id;
    } else {
      updatePost(targetPostId, {
        title: title.trim() || 'Untitled Post',
        platforms,
        pillarId,
        format,
        scheduledDate,
        scheduledTime,
        status,
        hook: hook.trim(),
        caption: caption.trim(),
        hashtags: parsedHashtags,
        callToAction: callToAction.trim(),
        notes: notes.trim(),
        priority,
        isCollaboration,
        collabBrandName: isCollaboration ? collabBrandName.trim() : undefined,
        collabPayment: isCollaboration ? collabPayment.trim() : undefined,
        assetLinks,
        checklist,
      });
    }

    setIsDirty(false);
    setSelectedPost(null);
    setIsCreateModalOpen(false);
    openContentStudio(targetPostId);
  };

  const handleClose = () => {
    if (isDirty) {
      const confirmDiscard = window.confirm(
        'You have unsaved changes. Are you sure you want to discard them?'
      );
      if (!confirmDiscard) return;
    }
    setSelectedPost(null);
    setIsCreateModalOpen(false);
  };

  const handleDelete = () => {
    if (selectedPost) {
      deletePost(selectedPost.id);
      setShowDeleteConfirm(false);
      setSelectedPost(null);
    }
  };

  // Save current post as reusable template
  const handleSaveAsTemplate = () => {
    const templateName = prompt('Enter a name for this template:', title || 'My Post Template');
    if (!templateName) return;

    const newTemplate = {
      id: `tmpl-${Date.now()}`,
      name: templateName,
      format,
      pillarId,
      platforms,
      captionStructure: caption,
      hashtags: parsedHashtags,
      checklist: checklist.map((c) => c.label),
      callToAction,
    };

    updateSettings({
      templates: [...settings.templates, newTemplate],
    });
    setSavedAsTemplateSuccess(true);
    setTimeout(() => setSavedAsTemplateSuccess(false), 2500);
  };

  // Load from template
  const handleApplyTemplate = (templateId: string) => {
    const tmpl = settings.templates.find((t) => t.id === templateId);
    if (!tmpl) return;

    setFormat(tmpl.format);
    setPillarId(tmpl.pillarId);
    setPlatforms(tmpl.platforms);
    if (tmpl.captionStructure) setCaption(tmpl.captionStructure);
    if (tmpl.hashtags) setHashtagInput(tmpl.hashtags.join(' '));
    if (tmpl.callToAction) setCallToAction(tmpl.callToAction);
    if (tmpl.checklist?.length) {
      setChecklist(
        tmpl.checklist.map((label, idx) => ({
          id: `c-${idx}`,
          label,
          completed: false,
        }))
      );
    }
    setIsDirty(true);
  };

  // AI Hook Improvement Trigger
  const handleImproveHook = async () => {
    if (!hook.trim()) {
      setHookAiError('Please type an initial hook or idea to improve.');
      return;
    }

    setIsImprovingHook(true);
    setHookAiError(null);

    try {
      const res = await fetch('/api/gemini/improve-hook', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          hook: hook.trim(),
          title: title.trim(),
          niche: settings.niche,
          format,
        }),
      });

      const data = await res.json();
      if (data.hooks && Array.isArray(data.hooks)) {
        setAiHooks(data.hooks);
      } else if (data.fallback || data.error) {
        // Fallback options
        setAiHooks([
          {
            hook: `Stop making this huge mistake with ${title || 'your routine'}:`,
            trigger: 'Contrarian Pattern Interrupt',
          },
          {
            hook: `The exact method that took me from zero to consistency in 30 days:`,
            trigger: 'High Value Curiosity Gap',
          },
          {
            hook: `Nobody talks about this part of ${settings.niche.split('&')[0]}...`,
            trigger: 'Insider Relatability Hook',
          },
        ]);
        if (data.error) {
          setHookAiError('Using creative offline suggestions (configure Gemini API key for dynamic AI).');
        }
      }
    } catch (err: any) {
      console.error('Error calling hook API:', err);
      // Fallback
      setAiHooks([
        {
          hook: `Stop making this huge mistake with ${title || 'your content'}:`,
          trigger: 'Contrarian Pattern Interrupt',
        },
        {
          hook: `The secret hack I wish I knew before starting:`,
          trigger: 'Curiosity Gap',
        },
        {
          hook: `Watch this before you buy or try another thing:`,
          trigger: 'Loss Aversion',
        },
      ]);
      setHookAiError('Using instant template hooks (network/API unavailable).');
    } finally {
      setIsImprovingHook(false);
    }
  };

  // AI Caption Generator Trigger
  const handleGenerateCaption = async () => {
    if (!title.trim()) {
      setCaptionAiError('Please enter a post title first.');
      return;
    }

    setIsGeneratingCaption(true);
    setCaptionAiError(null);

    try {
      const res = await fetch('/api/gemini/write-caption', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title: title.trim(),
          notes: notes.trim(),
          tone: captionTone,
          platforms,
          pillar: settings.pillars.find((p) => p.id === pillarId)?.name || 'General',
        }),
      });

      const data = await res.json();
      if (data.captions && Array.isArray(data.captions)) {
        setAiCaptionOptions(data.captions);
      } else {
        // High quality fallback options
        setAiCaptionOptions([
          {
            caption: `${title}\n\nHere is the real breakdown of what actually works when it comes to this. I tested multiple variations so you don't have to waste time or energy!\n\nSave this post so you have it ready for your next session.`,
            hashtags: ['#creatorlife', '#contenttips', '#learnwithme', '#dailyinspiration', '#aesthetic'],
            callToAction: 'Which one would you try first? Comment below.',
          },
          {
            caption: `Let’s talk about ${title}.\n\nA lot of people overlook this step, but it makes an 80% difference in the final result.\n\nHere are my top 3 rules:\n1. Keep it simple and repeatable\n2. Focus on consistency over perfection\n3. Protect your creative peace\n\nSave or share if this resonated with you today.`,
            hashtags: ['#creatorgrowth', '#mindsetreset', '#routinevlog', '#creatortips'],
            callToAction: 'Share with someone who needs to see this.',
          },
          {
            caption: `The quick guide to ${title}.\n\nSwipe through / watch until the end for the full breakdown! Everything you need to get started today.\n\nAll tools and items referenced in bio.`,
            hashtags: ['#tutorial', '#howtotips', '#stepbystep', '#creatorskills'],
            callToAction: 'Tap the link in bio for full resource links.',
          },
        ]);
        if (data.error) {
          setCaptionAiError('Using smart creator presets (configure Gemini API key for dynamic AI).');
        }
      }
    } catch (err: any) {
      console.error('Caption generator error:', err);
      setAiCaptionOptions([
        {
          caption: `${title}\n\nHere is the exact method I use. Save this post for later and let me know your thoughts in the comments.`,
          hashtags: ['#creatorcommunity', '#contentcreator', '#dailyvlog', '#aesthetics'],
          callToAction: 'Let me know if you want a part 2.',
        },
      ]);
      setCaptionAiError('Using offline creator captions.');
    } finally {
      setIsGeneratingCaption(false);
    }
  };

  const applyAiCaption = (option: { caption: string; hashtags: string[]; callToAction: string }) => {
    setCaption(option.caption);
    setHashtagInput(option.hashtags.join(' '));
    setCallToAction(option.callToAction);
    setIsDirty(true);
    setIsAiCaptionOpen(false);
  };

  return (
    <div
      id="post-modal-backdrop"
      className="fixed inset-0 z-50 bg-[#141413]/50 flex items-center justify-center p-2 sm:p-4 overflow-y-auto"
      onClick={handleClose}
    >
      <div
        id="post-modal-dialog"
        className="bg-[#FFFFFF] dark:bg-[#1C1C1A] border border-[#E6E4DF] dark:border-[#2A2A27] rounded-[8px] w-full max-w-2xl max-h-[90vh] flex flex-col overflow-hidden my-auto animate-in fade-in duration-100"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="px-6 py-4 border-b border-[#E6E4DF] dark:border-[#2A2A27] flex items-center justify-between gap-3 shrink-0">
          <div className="flex items-center gap-2">
            <span
              className={`w-2 h-2 rounded-full ${
                STATUS_CONFIG[status]?.dot || 'bg-[#6F6C66]'
              }`}
            />
            <h3 className="text-sm font-medium text-[#1C1B19] dark:text-[#F3F2EF]">
              {isEditing ? 'Edit Post' : 'New Post'}
            </h3>
          </div>

          <div className="flex items-center gap-2">
            {/* Write Content Button */}
            <button
              type="button"
              onClick={handleOpenStudio}
              className="inline-flex items-center gap-1.5 h-7 px-2.5 rounded-[4px] bg-[#1F5C47] hover:bg-[#174A39] text-white text-xs font-medium transition-colors"
              title="Open full-screen Content Studio for this post"
            >
              <PenTool className="w-3.5 h-3.5 stroke-[1.5]" />
              <span>Open Studio</span>
            </button>

            {/* Template actions */}
            {settings.templates.length > 0 && !isEditing && (
              <select
                onChange={(e) => handleApplyTemplate(e.target.value)}
                defaultValue=""
                className="h-7 text-xs bg-[#FBFBFA] dark:bg-[#141413] text-[#6F6C66] dark:text-[#9E9B93] px-2 rounded-[4px] border border-[#E6E4DF] dark:border-[#2A2A27]"
              >
                <option value="" disabled>
                  Templates...
                </option>
                {settings.templates.map((tmpl) => (
                  <option key={tmpl.id} value={tmpl.id}>
                    {tmpl.name}
                  </option>
                ))}
              </select>
            )}

            <button
              onClick={handleSaveAsTemplate}
              className="hidden sm:inline-flex items-center gap-1 h-7 text-xs text-[#6F6C66] dark:text-[#9E9B93] hover:text-[#1C1B19] dark:hover:text-[#F3F2EF] px-2 rounded-[4px] hover:bg-[#F3F2EF] dark:hover:bg-[#242421] transition-colors"
              title="Save current configuration as a reusable template"
            >
              <Bookmark className="w-3.5 h-3.5 stroke-[1.5]" />
              <span>{savedAsTemplateSuccess ? 'Saved' : 'Save template'}</span>
            </button>

            <button
              onClick={handleClose}
              className="p-1 rounded text-[#6F6C66] dark:text-[#9E9B93] hover:text-[#1C1B19] dark:hover:text-[#F3F2EF] hover:bg-[#F3F2EF] dark:hover:bg-[#242421] transition-colors"
              aria-label="Close modal"
            >
              <X className="w-4 h-4 stroke-[1.5]" />
            </button>
          </div>
        </div>

        {/* Modal Section Tabs */}
        <div className="px-6 border-b border-[#E6E4DF] dark:border-[#2A2A27] bg-[#FBFBFA] dark:bg-[#141413] flex items-center gap-1 text-xs shrink-0 overflow-x-auto py-1.5">
          <button
            onClick={() => setModalTab('content')}
            className={`h-7 px-2.5 rounded-[4px] transition-colors shrink-0 ${
              modalTab === 'content'
                ? 'bg-[#FFFFFF] dark:bg-[#1C1C1A] text-[#1C1B19] dark:text-[#F3F2EF] font-medium border border-[#E6E4DF] dark:border-[#2A2A27]'
                : 'text-[#6F6C66] dark:text-[#9E9B93] hover:text-[#1C1B19] dark:hover:text-[#F3F2EF]'
            }`}
          >
            Details & Schedule
          </button>
          <button
            onClick={() => setModalTab('script')}
            className={`h-7 px-2.5 rounded-[4px] transition-colors shrink-0 flex items-center gap-1.5 ${
              modalTab === 'script'
                ? 'bg-[#FFFFFF] dark:bg-[#1C1C1A] text-[#1C1B19] dark:text-[#F3F2EF] font-medium border border-[#E6E4DF] dark:border-[#2A2A27]'
                : 'text-[#6F6C66] dark:text-[#9E9B93] hover:text-[#1C1B19] dark:hover:text-[#F3F2EF]'
            }`}
          >
            <PenTool className="w-3.5 h-3.5 stroke-[1.5]" />
            <span>Script</span>
            {selectedPost?.scriptContent?.hasContent && (
              <span className="w-1.5 h-1.5 rounded-full bg-[#1F5C47]" />
            )}
          </button>
          <button
            onClick={() => setModalTab('caption')}
            className={`h-7 px-2.5 rounded-[4px] transition-colors shrink-0 flex items-center gap-1 ${
              modalTab === 'caption'
                ? 'bg-[#FFFFFF] dark:bg-[#1C1C1A] text-[#1C1B19] dark:text-[#F3F2EF] font-medium border border-[#E6E4DF] dark:border-[#2A2A27]'
                : 'text-[#6F6C66] dark:text-[#9E9B93] hover:text-[#1C1B19] dark:hover:text-[#F3F2EF]'
            }`}
          >
            <span>Hook & Caption</span>
            {isOverCharLimit && (
              <span className="w-1.5 h-1.5 rounded-full bg-[#C53B3B]" />
            )}
          </button>
          <button
            onClick={() => setModalTab('assets')}
            className={`h-7 px-2.5 rounded-[4px] transition-colors shrink-0 flex items-center gap-1 ${
              modalTab === 'assets'
                ? 'bg-[#FFFFFF] dark:bg-[#1C1C1A] text-[#1C1B19] dark:text-[#F3F2EF] font-medium border border-[#E6E4DF] dark:border-[#2A2A27]'
                : 'text-[#6F6C66] dark:text-[#9E9B93] hover:text-[#1C1B19] dark:hover:text-[#F3F2EF]'
            }`}
          >
            <span>Checklist & Links</span>
            <span className="text-[10px] text-[#6F6C66] dark:text-[#9E9B93] tabular-nums">
              ({checklist.filter((c) => c.completed).length}/{checklist.length})
            </span>
          </button>
          {status === 'Posted' && (
            <button
              onClick={() => setModalTab('performance')}
              className={`h-7 px-2.5 rounded-[4px] transition-colors shrink-0 flex items-center gap-1 ${
                modalTab === 'performance'
                  ? 'bg-[#FFFFFF] dark:bg-[#1C1C1A] text-[#1C1B19] dark:text-[#F3F2EF] font-medium border border-[#E6E4DF] dark:border-[#2A2A27]'
                  : 'text-[#6F6C66] dark:text-[#9E9B93] hover:text-[#1C1B19] dark:hover:text-[#F3F2EF]'
              }`}
            >
              <BarChart2 className="w-3.5 h-3.5 stroke-[1.5]" />
              <span>Results</span>
            </button>
          )}
        </div>

        {/* Modal Body Scroll Area */}
        <div className="flex-1 overflow-y-auto p-5 space-y-4">
          {/* TAB 1: Details & Scheduling */}
          {modalTab === 'content' && (
            <div className="space-y-4">
              {/* Title */}
              <div>
                <label className="block text-xs font-medium text-[#6F6C66] dark:text-[#9E9B93] uppercase tracking-wider mb-1">
                  Title / Working Concept *
                </label>
                <input
                  id="post-title-input"
                  type="text"
                  placeholder="e.g. My 5-Minute Morning Routine"
                  value={title}
                  onChange={(e) => {
                    setTitle(e.target.value);
                    setIsDirty(true);
                  }}
                  className="w-full px-3 py-2 text-xs font-medium bg-[#FBFBFA] dark:bg-[#141413] border border-[#E6E4DF] dark:border-[#2A2A27] rounded-[4px] text-[#1C1B19] dark:text-[#F3F2EF] placeholder-[#6F6C66]/50 focus:outline-none focus:ring-1 focus:ring-[#1F5C47]"
                />
              </div>

              {/* Multi-Select Platforms */}
              <div>
                <label className="block text-xs font-medium text-[#6F6C66] dark:text-[#9E9B93] uppercase tracking-wider mb-1.5">
                  Platforms
                </label>
                <div className="flex flex-wrap gap-1.5">
                  {settings.platforms.map((plat) => {
                    const isSelected = platforms.includes(plat.id);
                    return (
                      <button
                        key={plat.id}
                        type="button"
                        onClick={() => togglePlatform(plat.id)}
                        className={`flex items-center gap-1.5 h-7 px-2.5 rounded-[4px] text-xs transition-colors border ${
                          isSelected
                            ? 'bg-[#1C1B19] dark:bg-[#F3F2EF] text-[#FFFFFF] dark:text-[#1C1C1A] border-transparent font-medium'
                            : 'bg-[#FBFBFA] dark:bg-[#141413] text-[#6F6C66] dark:text-[#9E9B93] border-[#E6E4DF] dark:border-[#2A2A27] hover:bg-[#F3F2EF] dark:hover:bg-[#242421]'
                        }`}
                      >
                        {isSelected && <Check className="w-3 h-3 stroke-[2]" />}
                        <span>{plat.name}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Pillar & Format */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-medium text-[#6F6C66] dark:text-[#9E9B93] uppercase tracking-wider mb-1">
                    Content Pillar
                  </label>
                  <select
                    value={pillarId}
                    onChange={(e) => {
                      setPillarId(e.target.value);
                      setIsDirty(true);
                    }}
                    className="w-full px-2.5 py-1.5 text-xs bg-[#FBFBFA] dark:bg-[#141413] border border-[#E6E4DF] dark:border-[#2A2A27] rounded-[4px] text-[#1C1B19] dark:text-[#F3F2EF] focus:outline-none focus:ring-1 focus:ring-[#1F5C47]"
                  >
                    {settings.pillars.map((pil) => (
                      <option key={pil.id} value={pil.id}>
                        {pil.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-medium text-[#6F6C66] dark:text-[#9E9B93] uppercase tracking-wider mb-1">
                    Format
                  </label>
                  <select
                    value={format}
                    onChange={(e) => {
                      setFormat(e.target.value as PostFormat);
                      setIsDirty(true);
                    }}
                    className="w-full px-2.5 py-1.5 text-xs bg-[#FBFBFA] dark:bg-[#141413] border border-[#E6E4DF] dark:border-[#2A2A27] rounded-[4px] text-[#1C1B19] dark:text-[#F3F2EF] focus:outline-none focus:ring-1 focus:ring-[#1F5C47]"
                  >
                    {ALL_FORMATS.map((fmt) => (
                      <option key={fmt} value={fmt}>
                        {fmt}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Schedule Date & Time */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-medium text-[#6F6C66] dark:text-[#9E9B93] uppercase tracking-wider mb-1">
                    Scheduled Date
                  </label>
                  <div className="relative">
                    <Calendar className="w-3.5 h-3.5 absolute left-2.5 top-1/2 -translate-y-1/2 text-[#6F6C66] pointer-events-none" />
                    <input
                      type="date"
                      value={scheduledDate}
                      onChange={(e) => {
                        setScheduledDate(e.target.value);
                        setIsDirty(true);
                      }}
                      className="w-full pl-8 pr-2.5 py-1.5 text-xs bg-[#FBFBFA] dark:bg-[#141413] border border-[#E6E4DF] dark:border-[#2A2A27] rounded-[4px] text-[#1C1B19] dark:text-[#F3F2EF] focus:outline-none focus:ring-1 focus:ring-[#1F5C47]"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-medium text-[#6F6C66] dark:text-[#9E9B93] uppercase tracking-wider mb-1">
                    Time
                  </label>
                  <div className="relative">
                    <Clock className="w-3.5 h-3.5 absolute left-2.5 top-1/2 -translate-y-1/2 text-[#6F6C66] pointer-events-none" />
                    <input
                      type="time"
                      value={scheduledTime}
                      onChange={(e) => {
                        setScheduledTime(e.target.value);
                        setIsDirty(true);
                      }}
                      className="w-full pl-8 pr-2.5 py-1.5 text-xs bg-[#FBFBFA] dark:bg-[#141413] border border-[#E6E4DF] dark:border-[#2A2A27] rounded-[4px] text-[#1C1B19] dark:text-[#F3F2EF] focus:outline-none focus:ring-1 focus:ring-[#1F5C47]"
                    />
                  </div>
                </div>
              </div>

              {/* Pipeline Status & Priority */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-medium text-[#6F6C66] dark:text-[#9E9B93] uppercase tracking-wider mb-1">
                    Status
                  </label>
                  <select
                    value={status}
                    onChange={(e) => {
                      setStatus(e.target.value as PostStatus);
                      setIsDirty(true);
                    }}
                    className="w-full px-2.5 py-1.5 text-xs bg-[#FBFBFA] dark:bg-[#141413] border border-[#E6E4DF] dark:border-[#2A2A27] rounded-[4px] text-[#1C1B19] dark:text-[#F3F2EF] focus:outline-none focus:ring-1 focus:ring-[#1F5C47]"
                  >
                    {ALL_STATUSES.map((st) => (
                      <option key={st} value={st}>
                        {st}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-medium text-[#6F6C66] dark:text-[#9E9B93] uppercase tracking-wider mb-1">
                    Priority
                  </label>
                  <div className="flex gap-1.5">
                    {(['low', 'medium', 'high'] as Priority[]).map((p) => {
                      const isSelected = priority === p;
                      const cfg = PRIORITY_CONFIG[p];
                      return (
                        <button
                          key={p}
                          type="button"
                          onClick={() => {
                            setPriority(p);
                            setIsDirty(true);
                          }}
                          className={`flex-1 h-7 text-xs rounded-[4px] border transition-colors ${
                            isSelected
                              ? 'bg-[#1C1B19] dark:bg-[#F3F2EF] text-[#FFFFFF] dark:text-[#1C1C1A] border-transparent font-medium'
                              : 'bg-[#FBFBFA] dark:bg-[#141413] text-[#6F6C66] dark:text-[#9E9B93] border-[#E6E4DF] dark:border-[#2A2A27] hover:bg-[#F3F2EF] dark:hover:bg-[#242421]'
                          }`}
                        >
                          {cfg.label}
                        </button>
                      );
                    })}
                  </div>
                </div>
              </div>

              {/* Brand Collab Toggle */}
              <div className="pt-2 border-t border-[#E6E4DF] dark:border-[#2A2A27]">
                <div className="flex items-center justify-between">
                  <div>
                    <span className="text-xs font-medium text-[#1C1B19] dark:text-[#F3F2EF]">
                      Brand collaboration
                    </span>
                    <p className="text-[11px] text-[#6F6C66] dark:text-[#9E9B93]">
                      Tag this post as a sponsored partnership
                    </p>
                  </div>
                  <input
                    type="checkbox"
                    checked={isCollaboration}
                    onChange={(e) => {
                      setIsCollaboration(e.target.checked);
                      setIsDirty(true);
                    }}
                    className="w-4 h-4 rounded border-[#E6E4DF] dark:border-[#2A2A27] text-[#1F5C47] focus:ring-[#1F5C47]"
                  />
                </div>

                {isCollaboration && (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mt-2 p-2.5 bg-[#FBFBFA] dark:bg-[#141413] border border-[#E6E4DF] dark:border-[#2A2A27] rounded-[4px]">
                    <div>
                      <label className="block text-[10px] uppercase font-medium text-[#6F6C66] dark:text-[#9E9B93] mb-1">
                        Brand name
                      </label>
                      <input
                        type="text"
                        placeholder="e.g. Notion"
                        value={collabBrandName}
                        onChange={(e) => {
                          setCollabBrandName(e.target.value);
                          setIsDirty(true);
                        }}
                        className="w-full px-2 py-1 text-xs bg-[#FFFFFF] dark:bg-[#1C1C1A] border border-[#E6E4DF] dark:border-[#2A2A27] rounded-[4px] text-[#1C1B19] dark:text-[#F3F2EF]"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] uppercase font-medium text-[#6F6C66] dark:text-[#9E9B93] mb-1">
                        Compensation (optional)
                      </label>
                      <input
                        type="text"
                        placeholder="e.g. $1,500"
                        value={collabPayment}
                        onChange={(e) => {
                          setCollabPayment(e.target.value);
                          setIsDirty(true);
                        }}
                        className="w-full px-2 py-1 text-xs bg-[#FFFFFF] dark:bg-[#1C1C1A] border border-[#E6E4DF] dark:border-[#2A2A27] rounded-[4px] text-[#1C1B19] dark:text-[#F3F2EF]"
                      />
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* TAB 2: Dedicated Script & Content Studio */}
          {modalTab === 'script' && (
            <div className="space-y-4">
              <div className="p-4 rounded-[6px] bg-[#FBFBFA] dark:bg-[#141413] border border-[#E6E4DF] dark:border-[#2A2A27] flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="px-2 py-0.5 rounded-[3px] text-[11px] font-medium bg-[#FFFFFF] dark:bg-[#1C1C1A] border border-[#E6E4DF] dark:border-[#2A2A27] text-[#1C1B19] dark:text-[#F3F2EF]">
                      {format}
                    </span>
                    {selectedPost?.scriptContent?.hasContent ? (
                      <span className="text-[11px] text-[#1F5C47] font-medium">
                        Script written
                      </span>
                    ) : (
                      <span className="text-[11px] text-[#6F6C66] dark:text-[#9E9B93]">
                        No script yet
                      </span>
                    )}
                  </div>
                  <h4 className="text-xs font-medium text-[#1C1B19] dark:text-[#F3F2EF]">
                    Content Studio
                  </h4>
                  <p className="text-[11px] text-[#6F6C66] dark:text-[#9E9B93] mt-0.5 max-w-md">
                    Structured writing space for {format} with teleprompter, shot list, and version history.
                  </p>
                </div>

                <button
                  type="button"
                  onClick={handleOpenStudio}
                  className="h-8 px-3 rounded-[4px] bg-[#1F5C47] hover:bg-[#174A39] text-white font-medium text-xs flex items-center justify-center gap-1.5 transition-colors shrink-0"
                >
                  <PenTool className="w-3.5 h-3.5 stroke-[1.5]" />
                  <span>Open Studio</span>
                </button>
              </div>

              {/* Quick Hook & Body Outline */}
              <div className="space-y-3">
                <div>
                  <label className="block text-xs font-medium text-[#6F6C66] dark:text-[#9E9B93] uppercase tracking-wider mb-1">
                    Opening Hook
                  </label>
                  <input
                    type="text"
                    value={hook}
                    onChange={(e) => {
                      setHook(e.target.value);
                      setIsDirty(true);
                    }}
                    placeholder="Grab attention in the first 3 seconds..."
                    className="w-full px-3 py-1.5 text-xs bg-[#FBFBFA] dark:bg-[#141413] border border-[#E6E4DF] dark:border-[#2A2A27] rounded-[4px] text-[#1C1B19] dark:text-[#F3F2EF] focus:outline-none focus:ring-1 focus:ring-[#1F5C47]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-[#6F6C66] dark:text-[#9E9B93] uppercase tracking-wider mb-1">
                    Talking Points / Outline
                  </label>
                  <textarea
                    rows={6}
                    value={notes}
                    onChange={(e) => {
                      setNotes(e.target.value);
                      setIsDirty(true);
                    }}
                    placeholder="Main content, step-by-step breakdown..."
                    className="w-full p-2.5 text-xs bg-[#FBFBFA] dark:bg-[#141413] border border-[#E6E4DF] dark:border-[#2A2A27] rounded-[4px] text-[#1C1B19] dark:text-[#F3F2EF] focus:outline-none focus:ring-1 focus:ring-[#1F5C47] leading-relaxed resize-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-[#6F6C66] dark:text-[#9E9B93] uppercase tracking-wider mb-1">
                    Call To Action
                  </label>
                  <input
                    type="text"
                    value={callToAction}
                    onChange={(e) => {
                      setCallToAction(e.target.value);
                      setIsDirty(true);
                    }}
                    placeholder="e.g. Save this post for your next filming day"
                    className="w-full px-3 py-1.5 text-xs bg-[#FBFBFA] dark:bg-[#141413] border border-[#E6E4DF] dark:border-[#2A2A27] rounded-[4px] text-[#1C1B19] dark:text-[#F3F2EF] focus:outline-none focus:ring-1 focus:ring-[#1F5C47]"
                  />
                </div>
              </div>
            </div>
          )}

          {/* TAB 3: Hook & Caption with AI Generator */}
          {modalTab === 'caption' && (
            <div className="space-y-4">
              {/* Hook / First Line */}
              <div>
                <div className="flex items-center justify-between mb-1">
                  <label className="text-xs font-medium text-[#6F6C66] dark:text-[#9E9B93] uppercase tracking-wider">
                    Opening Hook
                  </label>
                  <button
                    type="button"
                    onClick={handleImproveHook}
                    disabled={isImprovingHook}
                    className="inline-flex items-center gap-1 text-xs font-medium text-[#1C1B19] dark:text-[#F3F2EF] hover:bg-[#F3F2EF] dark:hover:bg-[#242421] px-2 py-0.5 rounded-[4px] border border-[#E6E4DF] dark:border-[#2A2A27] transition-colors disabled:opacity-50"
                  >
                    {isImprovingHook ? (
                      <Loader2 className="w-3 h-3 animate-spin stroke-[1.5]" />
                    ) : (
                      <Sparkles className="w-3 h-3 stroke-[1.5] text-[#1F5C47]" />
                    )}
                    <span>Refine with AI</span>
                  </button>
                </div>

                <input
                  type="text"
                  placeholder="e.g. Stop layering your skincare like this..."
                  value={hook}
                  onChange={(e) => {
                    setHook(e.target.value);
                    setIsDirty(true);
                  }}
                  className="w-full px-3 py-1.5 text-xs bg-[#FBFBFA] dark:bg-[#141413] border border-[#E6E4DF] dark:border-[#2A2A27] rounded-[4px] text-[#1C1B19] dark:text-[#F3F2EF] placeholder-[#6F6C66]/50 focus:outline-none focus:ring-1 focus:ring-[#1F5C47]"
                />

                {/* AI Improved Hooks Output list */}
                {aiHooks.length > 0 && (
                  <div className="mt-2 p-3 bg-[#FBFBFA] dark:bg-[#141413] border border-[#E6E4DF] dark:border-[#2A2A27] rounded-[4px] space-y-2">
                    <span className="text-[11px] font-medium text-[#6F6C66] dark:text-[#9E9B93] block">
                      Suggested hooks:
                    </span>
                    {aiHooks.map((h, i) => (
                      <div
                        key={i}
                        onClick={() => {
                          setHook(h.hook);
                          setIsDirty(true);
                        }}
                        className="p-2 rounded-[4px] bg-[#FFFFFF] dark:bg-[#1C1C1A] border border-[#E6E4DF] dark:border-[#2A2A27] hover:border-[#1F5C47] cursor-pointer transition-colors text-xs flex items-start justify-between gap-2 group"
                      >
                        <div>
                          <p className="text-[#1C1B19] dark:text-[#F3F2EF] font-medium">
                            "{h.hook}"
                          </p>
                          <span className="text-[10px] text-[#6F6C66] dark:text-[#9E9B93]">
                            {h.trigger}
                          </span>
                        </div>
                        <span className="text-[11px] text-[#1F5C47] font-medium shrink-0 opacity-0 group-hover:opacity-100 transition-opacity">
                          Apply
                        </span>
                      </div>
                    ))}
                    {hookAiError && (
                      <p className="text-[11px] text-[#C53B3B] italic mt-1">{hookAiError}</p>
                    )}
                  </div>
                )}
              </div>

              {/* Caption Section with AI Writer Trigger */}
              <div>
                <div className="flex items-center justify-between mb-1">
                  <div className="flex items-center gap-2">
                    <label className="text-xs font-medium text-[#6F6C66] dark:text-[#9E9B93] uppercase tracking-wider">
                      Caption
                    </label>
                    <span
                      className={`text-[11px] tabular-nums px-1.5 py-0.5 rounded-[3px] ${
                        isOverCharLimit
                          ? 'bg-[#C53B3B]/10 text-[#C53B3B] font-medium'
                          : 'text-[#6F6C66] dark:text-[#9E9B93]'
                      }`}
                    >
                      {currentChars} / {minCharLimit}
                    </span>
                  </div>

                  <button
                    type="button"
                    onClick={() => setIsAiCaptionOpen(!isAiCaptionOpen)}
                    className="inline-flex items-center gap-1 text-xs font-medium text-[#1C1B19] dark:text-[#F3F2EF] hover:bg-[#F3F2EF] dark:hover:bg-[#242421] px-2 py-0.5 rounded-[4px] border border-[#E6E4DF] dark:border-[#2A2A27] transition-colors"
                  >
                    <Wand2 className="w-3 h-3 stroke-[1.5] text-[#1F5C47]" />
                    <span>Generate caption</span>
                  </button>
                </div>

                {/* AI Caption Generator Panel */}
                {isAiCaptionOpen && (
                  <div className="mb-3 p-3 bg-[#FBFBFA] dark:bg-[#141413] border border-[#E6E4DF] dark:border-[#2A2A27] rounded-[6px] space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-medium text-[#1C1B19] dark:text-[#F3F2EF]">
                        AI Caption Writer
                      </span>
                      <div className="flex items-center gap-1">
                        <span className="text-[11px] text-[#6F6C66] dark:text-[#9E9B93]">Tone:</span>
                        {(['casual', 'fun', 'inspirational', 'professional'] as const).map(
                          (t) => (
                            <button
                              key={t}
                              type="button"
                              onClick={() => setCaptionTone(t)}
                              className={`px-2 py-0.5 rounded-[4px] text-[11px] capitalize transition-colors ${
                                captionTone === t
                                  ? 'bg-[#1C1B19] dark:bg-[#F3F2EF] text-[#FFFFFF] dark:text-[#1C1C1A] font-medium'
                                  : 'bg-[#FFFFFF] dark:bg-[#1C1C1A] text-[#6F6C66] dark:text-[#9E9B93] border border-[#E6E4DF] dark:border-[#2A2A27]'
                              }`}
                            >
                              {t}
                            </button>
                          )
                        )}
                      </div>
                    </div>

                    <button
                      type="button"
                      onClick={handleGenerateCaption}
                      disabled={isGeneratingCaption}
                      className="w-full py-1.5 px-3 rounded-[4px] text-xs font-medium text-white bg-[#1F5C47] hover:bg-[#174A39] transition-colors flex items-center justify-center gap-1.5 disabled:opacity-50"
                    >
                      {isGeneratingCaption ? (
                        <>
                          <Loader2 className="w-3.5 h-3.5 animate-spin stroke-[1.5]" />
                          <span>Generating captions...</span>
                        </>
                      ) : (
                        <>
                          <Sparkles className="w-3.5 h-3.5 stroke-[1.5]" />
                          <span>Generate 3 captions ({captionTone})</span>
                        </>
                      )}
                    </button>

                    {captionAiError && (
                      <p className="text-[11px] text-[#C53B3B] italic">{captionAiError}</p>
                    )}

                    {/* Captions Choices */}
                    {aiCaptionOptions.length > 0 && (
                      <div className="space-y-2 pt-1">
                        {aiCaptionOptions.map((opt, idx) => (
                          <div
                            key={idx}
                            className="p-3 bg-[#FFFFFF] dark:bg-[#1C1C1A] border border-[#E6E4DF] dark:border-[#2A2A27] rounded-[4px] text-xs space-y-2"
                          >
                            <p className="whitespace-pre-line text-[#1C1B19] dark:text-[#F3F2EF]">
                              {opt.caption}
                            </p>
                            <p className="text-[#6F6C66] dark:text-[#9E9B93] text-[11px]">
                              {opt.hashtags.join(' ')}
                            </p>
                            <div className="flex items-center justify-between pt-1 border-t border-[#E6E4DF] dark:border-[#2A2A27]">
                              <span className="text-[10px] text-[#6F6C66] dark:text-[#9E9B93]">
                                CTA: {opt.callToAction}
                              </span>
                              <button
                                type="button"
                                onClick={() => applyAiCaption(opt)}
                                className="px-2 py-0.5 text-xs font-medium text-white bg-[#1F5C47] hover:bg-[#174A39] rounded-[4px] transition-colors"
                              >
                                Use this caption
                              </button>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                )}

                <textarea
                  rows={5}
                  placeholder="Write caption text..."
                  value={caption}
                  onChange={(e) => {
                    setCaption(e.target.value);
                    setIsDirty(true);
                  }}
                  className={`w-full p-2.5 text-xs bg-[#FBFBFA] dark:bg-[#141413] border rounded-[4px] text-[#1C1B19] dark:text-[#F3F2EF] placeholder-[#6F6C66]/50 focus:outline-none focus:ring-1 resize-none ${
                    isOverCharLimit
                      ? 'border-[#C53B3B] focus:ring-[#C53B3B]'
                      : 'border-[#E6E4DF] dark:border-[#2A2A27] focus:ring-[#1F5C47]'
                  }`}
                />
              </div>

              {/* Call to Action & Hashtags */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-medium text-[#6F6C66] dark:text-[#9E9B93] uppercase tracking-wider mb-1">
                    Call To Action
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Save this for later"
                    value={callToAction}
                    onChange={(e) => {
                      setCallToAction(e.target.value);
                      setIsDirty(true);
                    }}
                    className="w-full px-3 py-1.5 text-xs bg-[#FBFBFA] dark:bg-[#141413] border border-[#E6E4DF] dark:border-[#2A2A27] rounded-[4px] text-[#1C1B19] dark:text-[#F3F2EF] focus:outline-none focus:ring-1 focus:ring-[#1F5C47]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-[#6F6C66] dark:text-[#9E9B93] uppercase tracking-wider mb-1">
                    Hashtags
                  </label>
                  <input
                    type="text"
                    placeholder="#marketing #design #productivity"
                    value={hashtagInput}
                    onChange={(e) => {
                      setHashtagInput(e.target.value);
                      setIsDirty(true);
                    }}
                    className="w-full px-3 py-1.5 text-xs bg-[#FBFBFA] dark:bg-[#141413] border border-[#E6E4DF] dark:border-[#2A2A27] rounded-[4px] text-[#1C1B19] dark:text-[#F3F2EF] focus:outline-none focus:ring-1 focus:ring-[#1F5C47]"
                  />
                </div>
              </div>
            </div>
          )}

          {/* TAB 4: Checklist & Asset Links & Notes */}
          {modalTab === 'assets' && (
            <div className="space-y-4">
              {/* Production Checklist */}
              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <label className="text-xs font-medium text-[#6F6C66] dark:text-[#9E9B93] uppercase tracking-wider">
                    Checklist
                  </label>
                  <span className="text-[11px] text-[#6F6C66] dark:text-[#9E9B93] tabular-nums">
                    {checklist.filter((c) => c.completed).length} of {checklist.length} done
                  </span>
                </div>

                <div className="space-y-1 mb-2">
                  {checklist.map((item) => (
                    <div
                      key={item.id}
                      className="flex items-center justify-between p-2 rounded-[4px] bg-[#FBFBFA] dark:bg-[#141413] border border-[#E6E4DF] dark:border-[#2A2A27] text-xs"
                    >
                      <label className="flex items-center gap-2 flex-1 cursor-pointer select-none">
                        <input
                          type="checkbox"
                          checked={item.completed}
                          onChange={() => toggleChecklist(item.id)}
                          className="w-3.5 h-3.5 rounded border-[#E6E4DF] dark:border-[#2A2A27] text-[#1F5C47] focus:ring-[#1F5C47]"
                        />
                        <span
                          className={
                            item.completed
                              ? 'line-through text-[#6F6C66] dark:text-[#9E9B93]'
                              : 'text-[#1C1B19] dark:text-[#F3F2EF]'
                          }
                        >
                          {item.label}
                        </span>
                      </label>
                      <button
                        type="button"
                        onClick={() => removeChecklistItem(item.id)}
                        className="p-0.5 text-[#6F6C66] hover:text-[#C53B3B] transition-colors"
                      >
                        <X className="w-3.5 h-3.5 stroke-[1.5]" />
                      </button>
                    </div>
                  ))}
                </div>

                {/* Add Checklist item */}
                <div className="flex gap-1.5">
                  <input
                    type="text"
                    placeholder="Add step..."
                    value={newChecklistText}
                    onChange={(e) => setNewChecklistText(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), addChecklistItem())}
                    className="flex-1 px-2.5 py-1 text-xs bg-[#FBFBFA] dark:bg-[#141413] border border-[#E6E4DF] dark:border-[#2A2A27] rounded-[4px] text-[#1C1B19] dark:text-[#F3F2EF]"
                  />
                  <button
                    type="button"
                    onClick={addChecklistItem}
                    className="h-7 px-2.5 bg-[#FFFFFF] dark:bg-[#1C1C1A] hover:bg-[#F3F2EF] dark:hover:bg-[#242421] text-xs font-medium rounded-[4px] border border-[#E6E4DF] dark:border-[#2A2A27] text-[#1C1B19] dark:text-[#F3F2EF] transition-colors"
                  >
                    Add
                  </button>
                </div>
              </div>

              {/* Asset Links */}
              <div className="pt-3 border-t border-[#E6E4DF] dark:border-[#2A2A27]">
                <label className="block text-xs font-medium text-[#6F6C66] dark:text-[#9E9B93] uppercase tracking-wider mb-1.5">
                  Asset Links
                </label>

                <div className="space-y-1 mb-2">
                  {assetLinks.map((link) => (
                    <div
                      key={link.id}
                      className="flex items-center justify-between p-2 rounded-[4px] bg-[#FBFBFA] dark:bg-[#141413] border border-[#E6E4DF] dark:border-[#2A2A27] text-xs"
                    >
                      <a
                        href={link.url}
                        target="_blank"
                        rel="noreferrer noopener"
                        className="flex items-center gap-1.5 text-[#1F5C47] hover:underline truncate max-w-sm"
                      >
                        <LinkIcon className="w-3 h-3 shrink-0 stroke-[1.5]" />
                        <span className="font-medium">{link.title}:</span>
                        <span className="text-[#6F6C66] dark:text-[#9E9B93] truncate">{link.url}</span>
                        <ExternalLink className="w-3 h-3 shrink-0 stroke-[1.5]" />
                      </a>
                      <button
                        type="button"
                        onClick={() => removeAssetLink(link.id)}
                        className="p-0.5 text-[#6F6C66] hover:text-[#C53B3B] transition-colors"
                      >
                        <X className="w-3.5 h-3.5 stroke-[1.5]" />
                      </button>
                    </div>
                  ))}
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-1.5">
                  <input
                    type="text"
                    placeholder="Label (e.g. Slides)"
                    value={newLinkTitle}
                    onChange={(e) => setNewLinkTitle(e.target.value)}
                    className="px-2.5 py-1 text-xs bg-[#FBFBFA] dark:bg-[#141413] border border-[#E6E4DF] dark:border-[#2A2A27] rounded-[4px] text-[#1C1B19] dark:text-[#F3F2EF]"
                  />
                  <input
                    type="url"
                    placeholder="URL (https://...)"
                    value={newLinkUrl}
                    onChange={(e) => setNewLinkUrl(e.target.value)}
                    className="px-2.5 py-1 text-xs bg-[#FBFBFA] dark:bg-[#141413] border border-[#E6E4DF] dark:border-[#2A2A27] rounded-[4px] text-[#1C1B19] dark:text-[#F3F2EF]"
                  />
                  <button
                    type="button"
                    onClick={addAssetLink}
                    className="h-7 px-2.5 bg-[#FFFFFF] dark:bg-[#1C1C1A] hover:bg-[#F3F2EF] dark:hover:bg-[#242421] text-xs font-medium rounded-[4px] border border-[#E6E4DF] dark:border-[#2A2A27] text-[#1C1B19] dark:text-[#F3F2EF] transition-colors"
                  >
                    Add link
                  </button>
                </div>
              </div>

              {/* Notes & Script */}
              <div className="pt-3 border-t border-[#E6E4DF] dark:border-[#2A2A27]">
                <label className="block text-xs font-medium text-[#6F6C66] dark:text-[#9E9B93] uppercase tracking-wider mb-1">
                  Notes
                </label>
                <textarea
                  rows={4}
                  placeholder="Additional notes, equipment setup..."
                  value={notes}
                  onChange={(e) => {
                    setNotes(e.target.value);
                    setIsDirty(true);
                  }}
                  className="w-full p-2.5 text-xs bg-[#FBFBFA] dark:bg-[#141413] border border-[#E6E4DF] dark:border-[#2A2A27] rounded-[4px] text-[#1C1B19] dark:text-[#F3F2EF] focus:outline-none focus:ring-1 focus:ring-[#1F5C47] resize-none"
                />
              </div>
            </div>
          )}

          {/* TAB 5: Performance Logging (When status is 'Posted') */}
          {modalTab === 'performance' && (
            <div className="space-y-4">
              <div className="p-3 bg-[#FBFBFA] dark:bg-[#141413] border border-[#E6E4DF] dark:border-[#2A2A27] rounded-[4px] text-xs text-[#6F6C66] dark:text-[#9E9B93]">
                Log actual reach and engagement stats to update analytics.
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                <div>
                  <label className="block text-xs font-medium text-[#6F6C66] dark:text-[#9E9B93] mb-1">
                    Views
                  </label>
                  <input
                    type="number"
                    placeholder="25000"
                    value={metrics.views ?? ''}
                    onChange={(e) => {
                      setMetrics({ ...metrics, views: e.target.value ? Number(e.target.value) : undefined });
                      setIsDirty(true);
                    }}
                    className="w-full px-2.5 py-1.5 text-xs bg-[#FBFBFA] dark:bg-[#141413] border border-[#E6E4DF] dark:border-[#2A2A27] rounded-[4px] text-[#1C1B19] dark:text-[#F3F2EF] tabular-nums"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-[#6F6C66] dark:text-[#9E9B93] mb-1">
                    Likes
                  </label>
                  <input
                    type="number"
                    placeholder="1800"
                    value={metrics.likes ?? ''}
                    onChange={(e) => {
                      setMetrics({ ...metrics, likes: e.target.value ? Number(e.target.value) : undefined });
                      setIsDirty(true);
                    }}
                    className="w-full px-2.5 py-1.5 text-xs bg-[#FBFBFA] dark:bg-[#141413] border border-[#E6E4DF] dark:border-[#2A2A27] rounded-[4px] text-[#1C1B19] dark:text-[#F3F2EF] tabular-nums"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-[#6F6C66] dark:text-[#9E9B93] mb-1">
                    Comments
                  </label>
                  <input
                    type="number"
                    placeholder="140"
                    value={metrics.comments ?? ''}
                    onChange={(e) => {
                      setMetrics({ ...metrics, comments: e.target.value ? Number(e.target.value) : undefined });
                      setIsDirty(true);
                    }}
                    className="w-full px-2.5 py-1.5 text-xs bg-[#FBFBFA] dark:bg-[#141413] border border-[#E6E4DF] dark:border-[#2A2A27] rounded-[4px] text-[#1C1B19] dark:text-[#F3F2EF] tabular-nums"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-[#6F6C66] dark:text-[#9E9B93] mb-1">
                    Shares
                  </label>
                  <input
                    type="number"
                    placeholder="350"
                    value={metrics.shares ?? ''}
                    onChange={(e) => {
                      setMetrics({ ...metrics, shares: e.target.value ? Number(e.target.value) : undefined });
                      setIsDirty(true);
                    }}
                    className="w-full px-2.5 py-1.5 text-xs bg-[#FBFBFA] dark:bg-[#141413] border border-[#E6E4DF] dark:border-[#2A2A27] rounded-[4px] text-[#1C1B19] dark:text-[#F3F2EF] tabular-nums"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-[#6F6C66] dark:text-[#9E9B93] mb-1">
                    Saves
                  </label>
                  <input
                    type="number"
                    placeholder="920"
                    value={metrics.saves ?? ''}
                    onChange={(e) => {
                      setMetrics({ ...metrics, saves: e.target.value ? Number(e.target.value) : undefined });
                      setIsDirty(true);
                    }}
                    className="w-full px-2.5 py-1.5 text-xs bg-[#FBFBFA] dark:bg-[#141413] border border-[#E6E4DF] dark:border-[#2A2A27] rounded-[4px] text-[#1C1B19] dark:text-[#F3F2EF] tabular-nums"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-[#6F6C66] dark:text-[#9E9B93] mb-1">
                    Followers Gained
                  </label>
                  <input
                    type="number"
                    placeholder="120"
                    value={metrics.followersGained ?? ''}
                    onChange={(e) => {
                      setMetrics({
                        ...metrics,
                        followersGained: e.target.value ? Number(e.target.value) : undefined,
                      });
                      setIsDirty(true);
                    }}
                    className="w-full px-2.5 py-1.5 text-xs bg-[#FBFBFA] dark:bg-[#141413] border border-[#E6E4DF] dark:border-[#2A2A27] rounded-[4px] text-[#1C1B19] dark:text-[#F3F2EF] tabular-nums"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-[#6F6C66] dark:text-[#9E9B93] mb-1">
                  Live Post URL
                </label>
                <div className="flex gap-1.5">
                  <input
                    type="url"
                    placeholder="https://..."
                    value={metrics.liveUrl ?? ''}
                    onChange={(e) => {
                      setMetrics({ ...metrics, liveUrl: e.target.value });
                      setIsDirty(true);
                    }}
                    className="flex-1 px-2.5 py-1.5 text-xs bg-[#FBFBFA] dark:bg-[#141413] border border-[#E6E4DF] dark:border-[#2A2A27] rounded-[4px] text-[#1C1B19] dark:text-[#F3F2EF]"
                  />
                  {metrics.liveUrl && (
                    <a
                      href={metrics.liveUrl}
                      target="_blank"
                      rel="noreferrer noopener"
                      className="h-7 px-2 rounded-[4px] bg-[#FFFFFF] dark:bg-[#1C1C1A] border border-[#E6E4DF] dark:border-[#2A2A27] text-[#6F6C66] dark:text-[#9E9B93] hover:text-[#1C1B19] dark:hover:text-[#F3F2EF] flex items-center justify-center transition-colors"
                      title="Open live post"
                    >
                      <ExternalLink className="w-3.5 h-3.5 stroke-[1.5]" />
                    </a>
                  )}
                </div>
              </div>

              {/* Calculated engagement rate */}
              {metrics.views && metrics.views > 0 ? (
                <div className="p-2.5 bg-[#FBFBFA] dark:bg-[#141413] rounded-[4px] border border-[#E6E4DF] dark:border-[#2A2A27] flex items-center justify-between text-xs">
                  <span className="text-[#6F6C66] dark:text-[#9E9B93]">
                    Engagement Rate:
                  </span>
                  <span className="font-medium text-[#1F5C47] tabular-nums">
                    {calculateEngagement(metrics).rate}%
                  </span>
                </div>
              ) : null}
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div className="px-6 py-3 border-t border-[#E6E4DF] dark:border-[#2A2A27] bg-[#FFFFFF] dark:bg-[#1C1C1A] flex items-center justify-between gap-3 shrink-0">
          <div>
            {isEditing && (
              <>
                {showDeleteConfirm ? (
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-[#C53B3B] font-medium">Delete post?</span>
                    <button
                      type="button"
                      onClick={handleDelete}
                      className="px-2.5 py-1 text-xs font-medium bg-[#C53B3B] text-white rounded-[4px] transition-colors"
                    >
                      Yes, delete
                    </button>
                    <button
                      type="button"
                      onClick={() => setShowDeleteConfirm(false)}
                      className="px-2 py-1 text-xs text-[#6F6C66] dark:text-[#9E9B93] hover:text-[#1C1B19] dark:hover:text-[#F3F2EF]"
                    >
                      Cancel
                    </button>
                  </div>
                ) : (
                  <button
                    type="button"
                    onClick={() => setShowDeleteConfirm(true)}
                    className="p-1.5 text-[#6F6C66] dark:text-[#9E9B93] hover:text-[#C53B3B] transition-colors rounded-[4px] hover:bg-[#F3F2EF] dark:hover:bg-[#242421]"
                    title="Delete post"
                  >
                    <Trash2 className="w-4 h-4 stroke-[1.5]" />
                  </button>
                )}
              </>
            )}
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={handleClose}
              className="h-7 px-3 text-xs font-medium text-[#6F6C66] dark:text-[#9E9B93] hover:text-[#1C1B19] dark:hover:text-[#F3F2EF] rounded-[4px] transition-colors"
            >
              Cancel
            </button>
            <button
              id="save-post-submit-btn"
              type="button"
              onClick={handleSave}
              className="h-7 px-3.5 text-xs font-medium text-white bg-[#1F5C47] hover:bg-[#174A39] rounded-[4px] transition-colors"
            >
              {isEditing ? 'Save changes' : 'Save post'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
