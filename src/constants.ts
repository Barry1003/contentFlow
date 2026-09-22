import { ContentPillar, PlatformConfig, PostItem, PostTemplate, RecurringSchedule, UserSettings, IdeaItem } from './types';

export const DEFAULT_PLATFORMS: PlatformConfig[] = [
  {
    id: 'instagram',
    name: 'Instagram',
    color: '#92576E',
    textColor: '#F3F1EC',
    iconName: 'Instagram',
    charLimit: 2200,
    defaultTime: '18:00',
    weeklyGoal: 4,
  },
  {
    id: 'tiktok',
    name: 'TikTok',
    color: '#525252',
    textColor: '#F3F1EC',
    iconName: 'Video',
    charLimit: 4000,
    defaultTime: '19:30',
    weeklyGoal: 5,
  },
  {
    id: 'youtube',
    name: 'YouTube',
    color: '#964F4F',
    textColor: '#F3F1EC',
    iconName: 'Youtube',
    charLimit: 5000,
    defaultTime: '15:00',
    weeklyGoal: 2,
  },
  {
    id: 'x',
    name: 'X (Twitter)',
    color: '#5A6168',
    textColor: '#F3F1EC',
    iconName: 'Twitter',
    charLimit: 280,
    defaultTime: '12:00',
    weeklyGoal: 6,
  },
  {
    id: 'pinterest',
    name: 'Pinterest',
    color: '#865050',
    textColor: '#F3F1EC',
    iconName: 'Pin',
    charLimit: 500,
    defaultTime: '20:00',
    weeklyGoal: 3,
  },
  {
    id: 'linkedin',
    name: 'LinkedIn',
    color: '#466782',
    textColor: '#F3F1EC',
    iconName: 'Linkedin',
    charLimit: 3000,
    defaultTime: '09:00',
    weeklyGoal: 2,
  },
];

export const DEFAULT_PILLARS: ContentPillar[] = [
  { id: 'tutorials', name: 'Tutorials and guides', color: '#596F80', targetPercentage: 30 },
  { id: 'behind_the_scenes', name: 'Behind the scenes', color: '#8E627C', targetPercentage: 25 },
  { id: 'personal_stories', name: 'Personal and studio logs', color: '#9E6F4E', targetPercentage: 20 },
  { id: 'reviews_recommendations', name: 'Product reviews', color: '#4D7A6C', targetPercentage: 15 },
  { id: 'brand_partnerships', name: 'Brand collaborations', color: '#6F6C66', targetPercentage: 10 },
];

export const DEFAULT_TEMPLATES: PostTemplate[] = [
  {
    id: 'tmpl-reel',
    name: 'Viral Short / Reel Template',
    format: 'Reel/Short',
    pillarId: 'tutorials',
    platforms: ['instagram', 'tiktok'],
    captionStructure: "✨ 3 mistakes you're probably making with [TOPIC]:\n\n1. [Mistake 1] — instead, do [Fix 1]\n2. [Mistake 2] — this changes everything\n3. [Mistake 3] — save this so you remember!\n\n💬 Drop a comment below if you want part 2!",
    hashtags: ['#creatorlife', '#dailyroutine', '#learnontiktok', '#creatorgrowth', '#aesthetics'],
    checklist: ['Film B-roll & A-roll', 'Cut fast pacing in CapCut', 'Generate auto-captions', 'Pick trending audio', 'Write punchy cover title'],
    callToAction: 'Save this post and share with your creative bestie!',
  },
  {
    id: 'tmpl-carousel',
    name: 'Educational Carousel',
    format: 'Carousel',
    pillarId: 'reviews_recommendations',
    platforms: ['instagram', 'linkedin'],
    captionStructure: "Swipe through for the full breakdown 👉\n\nHere is everything I learned about [TOPIC] this month.\n\nSlide 1: Hook & Core Question\nSlide 2: Problem context\nSlide 3-6: Step-by-step solutions\nSlide 7: Summary & checklist\nSlide 8: Save & share!",
    hashtags: ['#carouseltips', '#creatorhacks', '#aestheticfeeds', '#productivity'],
    checklist: ['Draft slides in Canva', 'Export high-res PNGs', 'Check slide 1 contrast on mobile', 'Write carousel caption'],
    callToAction: 'Which slide resonated most with you? Let me know in comments!',
  },
];

export const DEFAULT_RECURRING_SCHEDULES: RecurringSchedule[] = [
  {
    id: 'recur-tue-fri',
    title: 'Bi-Weekly Reel Routine',
    platforms: ['instagram', 'tiktok'],
    format: 'Reel/Short',
    pillarId: 'tutorials',
    daysOfWeek: [2, 5], // Tue, Fri
    time: '18:00',
    isActive: true,
  },
  {
    id: 'recur-sun-vlog',
    title: 'Sunday Reset / Weekly Vlog',
    platforms: ['youtube', 'instagram'],
    format: 'Long video',
    pillarId: 'personal_stories',
    daysOfWeek: [0], // Sun
    time: '12:00',
    isActive: true,
  },
];

export const DEFAULT_SETTINGS: UserSettings = {
  creatorName: 'Maya',
  niche: 'Lifestyle and creator studio',
  weekStartsOnMonday: true,
  accentColor: 'emerald',
  theme: 'light',
  weeklyTargetPosts: 3,
  platforms: DEFAULT_PLATFORMS,
  pillars: DEFAULT_PILLARS,
  templates: DEFAULT_TEMPLATES,
  recurringSchedules: DEFAULT_RECURRING_SCHEDULES,
};

// Helper to format YYYY-MM-DD
export function formatDateKey(date: Date): string {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, '0');
  const d = String(date.getDate()).padStart(2, '0');
  return `${y}-${m}-${d}`;
}

// Generate 10 realistic sample posts relative to today
export function generateSamplePosts(): PostItem[] {
  const today = new Date();
  
  const addDays = (days: number): string => {
    const d = new Date(today);
    d.setDate(today.getDate() + days);
    return formatDateKey(d);
  };

  return [
    {
      id: 'sample-1',
      title: 'My 5-Minute Morning Glow Routine',
      platforms: ['instagram', 'tiktok'],
      pillarId: 'tutorials',
      format: 'Reel/Short',
      scheduledDate: addDays(-4),
      scheduledTime: '18:30',
      status: 'Posted',
      hook: 'Stop layering your skincare like this — you are wasting 80% of your products.',
      caption: "✨ The 5-minute morning routine that changed my skin barrier forever!\n\nNo 10-step regimens here. Just gentle cleansing, peptide hydration, and my holy grail sunscreen. Which step do you never skip?\n\nProducts tagged in link in bio!",
      hashtags: ['#glowingskin', '#skincareroutine', '#morningreset', '#cleanbeauty', '#skincaretips'],
      callToAction: 'Comment "GLOW" and I will DM you the direct product links!',
      notes: 'Natural morning sunlight by the bathroom window. Close-up texture shots of the serum dropper.',
      assetLinks: [
        { id: 'link-1', title: 'Drive Footage - Morning B-Roll', url: 'https://drive.google.com', type: 'google_drive' },
      ],
      checklist: [
        { id: 'c-1', label: 'Film natural lighting B-roll', completed: true },
        { id: 'c-2', label: 'Edit voiceover in CapCut', completed: true },
        { id: 'c-3', label: 'Export 4K 60fps', completed: true },
        { id: 'c-4', label: 'Schedule on Later / Meta', completed: true },
      ],
      priority: 'high',
      isCollaboration: false,
      metrics: {
        views: 84500,
        likes: 7230,
        comments: 412,
        shares: 980,
        saves: 3410,
        followersGained: 680,
        liveUrl: 'https://instagram.com/p/sample1',
        loggedAt: new Date(Date.now() - 4 * 86400000).toISOString(),
      },
      createdAt: new Date(Date.now() - 6 * 86400000).toISOString(),
      updatedAt: new Date(Date.now() - 4 * 86400000).toISOString(),
    },
    {
      id: 'sample-2',
      title: 'Behind the Scenes: Packing My Studio for Fashion Week',
      platforms: ['tiktok', 'instagram'],
      pillarId: 'behind_the_scenes',
      format: 'Reel/Short',
      scheduledDate: addDays(-2),
      scheduledTime: '19:00',
      status: 'Posted',
      hook: 'Everything I pack in my carry-on as a full-time creator traveling for fashion week.',
      caption: "Packing chaos turned aesthetic packing vlog ✈️👜 The capsule wardrobe method saved my sanity this season!\n\nDrop your #1 travel essential below!",
      hashtags: ['#packwithme', '#creatorbts', '#fashionweekprep', '#capsulewardrobe', '#aestheticvlog'],
      callToAction: 'Which outfit do you want me to style first on day 1?',
      notes: 'Use fast transitions snapping suitcase shut. Upbeat jazz lo-fi audio.',
      assetLinks: [
        { id: 'link-2', title: 'Canva Cover Thumbnails', url: 'https://canva.com', type: 'canva' },
      ],
      checklist: [
        { id: 'c-21', label: 'Flat-lay garment shots', completed: true },
        { id: 'c-22', label: 'Speed up packing clip', completed: true },
        { id: 'c-23', label: 'Sync to beat', completed: true },
      ],
      priority: 'medium',
      isCollaboration: false,
      metrics: {
        views: 42100,
        likes: 3890,
        comments: 184,
        shares: 320,
        saves: 1140,
        followersGained: 245,
        liveUrl: 'https://tiktok.com/@creator/video/sample2',
        loggedAt: new Date(Date.now() - 2 * 86400000).toISOString(),
      },
      createdAt: new Date(Date.now() - 4 * 86400000).toISOString(),
      updatedAt: new Date(Date.now() - 2 * 86400000).toISOString(),
    },
    {
      id: 'sample-3',
      title: 'Top 5 Creator Tech Investments That Actually Paid Off',
      platforms: ['youtube', 'x'],
      pillarId: 'reviews_recommendations',
      format: 'Long video',
      scheduledDate: addDays(-1),
      scheduledTime: '14:00',
      status: 'Ready', // deliberate unposted yesterday to showcase overdue badge!
      hook: 'I spent $12,000 on camera gear over 3 years. Here are the only 5 items worth every single penny.',
      caption: "Full breakdown on creator gear: lighting, mics, lenses, and workflow apps. Don't waste your budget before watching this!\n\nTimestamps in description.",
      hashtags: ['#creatorgear', '#cameragear', '#youtubecreator', '#techreview'],
      callToAction: 'Watch the full 14-min deep dive on YouTube. Link in bio!',
      notes: 'Include side-by-side audio test comparing shotgun mic vs wireless lavalier.',
      assetLinks: [],
      checklist: [
        { id: 'c-31', label: 'Record talking head', completed: true },
        { id: 'c-32', label: 'Color grade in Premiere', completed: true },
        { id: 'c-33', label: 'Render 1440p thumbnail', completed: true },
        { id: 'c-34', label: 'Hit publish on YouTube studio', completed: false },
      ],
      priority: 'high',
      isCollaboration: false,
      createdAt: new Date(Date.now() - 3 * 86400000).toISOString(),
      updatedAt: new Date(Date.now() - 1 * 86400000).toISOString(),
    },
    {
      id: 'sample-4',
      title: 'Lululemon vs Amazon Dupes: Honest Blind Test',
      platforms: ['instagram', 'tiktok', 'youtube'],
      pillarId: 'reviews_recommendations',
      format: 'Carousel',
      scheduledDate: addDays(0), // Today!
      scheduledTime: '17:00',
      status: 'Scheduled',
      hook: 'Can my boyfriend tell the difference between $118 leggings and $24 Amazon leggings?',
      caption: "The ultimate blindfold test! 🧘‍♀️ We tested stretch, opacity, and seam quality so you don't waste your money.\n\nSwipe to slide 4 to see which one was the true winner!",
      hashtags: ['#dupes', '#activewear', '#honestreview', '#shoppinghaul', '#tiktokmademebuyit'],
      callToAction: 'Save this post before your next gym outfit haul!',
      notes: 'High contrast side-by-side comparison graphics with macro fabric textures.',
      assetLinks: [
        { id: 'link-4', title: 'Drive - Product High Res Photos', url: 'https://drive.google.com', type: 'google_drive' },
      ],
      checklist: [
        { id: 'c-41', label: 'Take macro fabric shots', completed: true },
        { id: 'c-42', label: 'Build 6-slide carousel layout', completed: true },
        { id: 'c-43', label: 'Schedule for 5 PM peak time', completed: true },
      ],
      priority: 'high',
      isCollaboration: false,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
    {
      id: 'sample-5',
      title: 'Weekly Sunday Reset Routine: Cleaning, Meal Prep & Planning',
      platforms: ['tiktok', 'pinterest'],
      pillarId: 'personal_stories',
      format: 'Reel/Short',
      scheduledDate: addDays(1), // Tomorrow
      scheduledTime: '11:00',
      status: 'Creating',
      hook: 'Sundays used to give me immense dread until I started doing this 90-minute reset.',
      caption: "Reset with me for a productive, low-stress week ahead 🕯️✨ I wash my sheets, prep iced matcha jars, and map my content calendar on ContentFlow.\n\nWhat is your non-negotiable Sunday ritual?",
      hashtags: ['#sundayreset', '#cleanwithme', '#mealprepping', '#matchalover', '#organizedlife'],
      callToAction: 'Save this for Sunday inspiration!',
      notes: 'Soft morning acoustic indie audio. Cinematic slow pan of clean sheets and fresh flowers.',
      assetLinks: [],
      checklist: [
        { id: 'c-51', label: 'Film matcha preparation', completed: true },
        { id: 'c-52', label: 'Record screen-record of calendar', completed: false },
        { id: 'c-53', label: 'Final sound design', completed: false },
      ],
      priority: 'medium',
      isCollaboration: false,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
    {
      id: 'sample-6',
      title: 'Summer Glow Serum Campaign with GlowRecipe',
      platforms: ['instagram', 'tiktok'],
      pillarId: 'brand_partnerships',
      format: 'Reel/Short',
      scheduledDate: addDays(3),
      scheduledTime: '18:00',
      status: 'Editing',
      hook: 'If you only use one active ingredient during humid weather, make it this one.',
      caption: "#AD Bringing you my holy grail watermelon dew drops for that glass skin finish 🍉✨ Key ingredients: niacinamide + hyaluronic acid.\n\nUse code MAYAGLOW for 15% off!",
      hashtags: ['#ad', '#glowrecipepartner', '#glassskin', '#dewyskin', '#skincaredaily'],
      callToAction: 'Tap the link in bio to shop with my exclusive discount code!',
      notes: 'Ensure brand logo is visible in the first 2 seconds per contract requirements. Send draft to agency by tomorrow 2pm.',
      assetLinks: [
        { id: 'link-61', title: 'Brand Brief & Approved Talking Points', url: 'https://notion.so', type: 'notion' },
        { id: 'link-62', title: 'Rough Cut V1 on Frame.io', url: 'https://drive.google.com', type: 'google_drive' },
      ],
      checklist: [
        { id: 'c-61', label: 'Review brief compliance', completed: true },
        { id: 'c-62', label: 'Film 3 hook variations', completed: true },
        { id: 'c-63', label: 'Send draft for agency approval', completed: false },
        { id: 'c-64', label: 'Add required disclosure #ad', completed: true },
      ],
      priority: 'high',
      isCollaboration: true,
      collabBrandName: 'GlowRecipe',
      collabPayment: '$2,400',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
    {
      id: 'sample-7',
      title: '3 Lighting Setups for Creators Under $100',
      platforms: ['youtube', 'tiktok'],
      pillarId: 'tutorials',
      format: 'Reel/Short',
      scheduledDate: addDays(5),
      scheduledTime: '19:00',
      status: 'Scripting/Planning',
      hook: 'You do not have bad skin or a bad camera. You just have bad lighting.',
      caption: "Lighting 101: 3 foolproof setups that make any cheap phone camera look like a $4,000 cinema rig 💡 Save this breakdown!\n\nSetup 1: 45° Key Light\nSetup 2: Window Softbox diffusion\nSetup 3: Warm background rim accent",
      hashtags: ['#creatorhacks', '#videolighting', '#contentcreationtips', '#phonevideography'],
      callToAction: 'Which lighting setup is your favorite?',
      notes: 'Demonstrate with overhead diagrams and split-screen before vs after.',
      assetLinks: [],
      checklist: [
        { id: 'c-71', label: 'Outline 3 lighting setups', completed: true },
        { id: 'c-72', label: 'Set up tripod markers', completed: false },
        { id: 'c-73', label: 'Film tutorial', completed: false },
      ],
      priority: 'medium',
      isCollaboration: false,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
    {
      id: 'sample-8',
      title: 'How I Grew 50K Followers Without Burning Out',
      platforms: ['x', 'linkedin', 'instagram'],
      pillarId: 'personal_stories',
      format: 'Text post',
      scheduledDate: addDays(7),
      scheduledTime: '12:30',
      status: 'Idea',
      hook: 'Most creators quit at month 4. Here is the batching system that protected my mental health.',
      caption: "10 harsh truths about content creation nobody tells you when you start:\n\n1. Consistency beats perfection every single time.\n2. One evergreen format will drive 70% of your audience.\n3. Rest is a prerequisite for creativity.\n\nThread below 🧵👇",
      hashtags: ['#creatorgrowth', '#mentalhealth', '#solopreneur', '#contenttips'],
      callToAction: 'Retweet / share if you needed this reminder today.',
      notes: 'High engagement thread style with bullet points and personal reflection.',
      assetLinks: [],
      checklist: [
        { id: 'c-81', label: 'Draft 8 tweets in thread', completed: false },
        { id: 'c-82', label: 'Add graphic screenshot', completed: false },
      ],
      priority: 'low',
      isCollaboration: false,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
    {
      id: 'sample-9',
      title: 'Current Morning Coffee Order & Book Review',
      platforms: ['pinterest', 'instagram'],
      pillarId: 'personal_stories',
      format: 'Static image',
      scheduledDate: addDays(9),
      scheduledTime: '10:00',
      status: 'Idea',
      hook: 'Brown sugar shaken espresso recipe + my review of "Tomorrow, and Tomorrow, and Tomorrow".',
      caption: "Current favorites: slow mornings, homemade brown sugar oat milk shaken espresso, and a book that broke my heart in the best way ☕️📖\n\nRecipe in comments!",
      hashtags: ['#coffeevibes', '#booktok', '#aestheticmorning', '#readingjournal'],
      callToAction: 'What book are you currently obsessed with?',
      notes: 'Warm filmic tones, linen tablecloth, coffee glass condensation aesthetic.',
      assetLinks: [],
      checklist: [
        { id: 'c-91', label: 'Photograph flat lay', completed: false },
        { id: 'c-92', label: 'Edit in Lightroom', completed: false },
      ],
      priority: 'low',
      isCollaboration: false,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
    {
      id: 'sample-10',
      title: 'Live Q&A: Content Batching Masterclass',
      platforms: ['instagram', 'tiktok', 'youtube'],
      pillarId: 'tutorials',
      format: 'Live',
      scheduledDate: addDays(11),
      scheduledTime: '20:00',
      status: 'Scheduled',
      hook: 'Join me live tonight! Planning a whole month of content in 45 minutes.',
      caption: "Going live at 8 PM EST! Bring your coffee, open your Notion or ContentFlow, and let's plan our entire content calendars together. Answering all your questions about camera gear and monetization!\n\nSet a reminder on this story!",
      hashtags: ['#instagramlive', '#contentplanning', '#creatorsession', '#qanda'],
      callToAction: 'Drop questions in the question sticker below!',
      notes: 'Prepare agenda: 10m welcome, 20m batching demonstration, 15m live Q&A.',
      assetLinks: [],
      checklist: [
        { id: 'c-101', label: 'Post 24h countdown sticker on story', completed: false },
        { id: 'c-102', label: 'Test ring light and microphone setup', completed: false },
        { id: 'c-103', label: 'Outline 5 talking points', completed: true },
      ],
      priority: 'high',
      isCollaboration: false,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
  ];
}

export const SAMPLE_IDEAS: IdeaItem[] = [
  {
    id: 'idea-1',
    title: '5 Aesthetic desk accessories under $25 that elevate your workspace',
    hook: 'Your desk doesn’t need expensive upgrades to look like a Pinterest board.',
    pillarId: 'reviews_recommendations',
    suggestedFormat: 'Carousel',
    platforms: ['instagram', 'pinterest'],
    notes: 'Include clean desk mat, acrylic pen holder, warm brass lamp, cable organiser.',
    tags: ['desksetup', 'aesthetic', 'budget', 'workspace'],
    createdAt: new Date().toISOString(),
  },
  {
    id: 'idea-2',
    title: 'A day in my life filming 4 videos in 3 hours',
    hook: 'Here is what real content batching looks like behind the curated clips.',
    pillarId: 'behind_the_scenes',
    suggestedFormat: 'Reel/Short',
    platforms: ['tiktok', 'instagram'],
    notes: 'Time-lapse of outfit changes, camera repositioning, coffee refill.',
    tags: ['vlog', 'batching', 'bts'],
    createdAt: new Date().toISOString(),
  },
  {
    id: 'idea-3',
    title: 'The exact formula I use to write viral hooks in 60 seconds',
    hook: 'If your video drops off in the first 2 seconds, you didn’t have a content problem—you had a hook problem.',
    pillarId: 'tutorials',
    suggestedFormat: 'Reel/Short',
    platforms: ['tiktok', 'instagram', 'youtube'],
    notes: 'Cover Negative Hook vs Curiosity Gap vs Bold Statement.',
    tags: ['growth', 'copywriting', 'viralhacks'],
    createdAt: new Date().toISOString(),
  },
];

export interface ScriptTemplateDefinition {
  id: string;
  name: string;
  description: string;
  format: 'video' | 'carousel' | 'written';
  targetSeconds?: number;
  hookText: string;
  bodyText: string;
  callToActionText: string;
  outroText?: string;
  sceneRows?: { visual: string; audio: string }[];
  shotList?: { item: string; category: 'scene' | 'location' | 'prop' | 'outfit' }[];
  slides?: { heading: string; body: string; visualNote: string }[];
}

export const SCRIPT_TEMPLATES: ScriptTemplateDefinition[] = [
  {
    id: 'storytime',
    name: 'Storytime',
    description: 'Hook with the climax, build tension, share lesson learned',
    format: 'video',
    targetSeconds: 60,
    hookText: 'I almost quit content creation 6 months ago because of this one mistake...',
    bodyText: 'It was a Tuesday night, 2 AM, and I was staring at zero views after spending 14 hours editing.\n\nHere is what I realized that completely flipped my mindset and 10x\'d my audience in 90 days:\n\n1. Stop editing for other creators and start talking to one person.\n2. Pacing matters more than color grading.\n3. The first 3 seconds are 80% of your retention.',
    callToActionText: 'Save this reminder for whenever you feel stuck in your creator journey.',
    outroText: 'See you in the next one! Let me know if you\'ve felt this way in comments.',
    sceneRows: [
      { visual: 'Close up talking head looking emotional / real into camera', audio: 'I almost quit content creation 6 months ago because of this one mistake...' },
      { visual: 'B-roll of computer screen / timeline cursor scrubbing', audio: 'It was 2 AM, staring at zero views after 14 hours of editing.' },
      { visual: 'Talking head with hand gestures explaining shift', audio: 'Here is what I realized that changed everything:' },
      { visual: 'Text overlay on screen: #1 Pacing over perfection', audio: 'First: Stop editing for creators, talk to one real person.' },
      { visual: 'Smiling at camera, drinking coffee in daylight', audio: 'Save this for when you need a boost. You\'ve got this!' }
    ],
    shotList: [
      { item: 'Talking head desk setup', category: 'location' },
      { item: 'Overhead keyboard & coffee mug', category: 'scene' },
      { item: 'Editing timeline macro screen shot', category: 'scene' },
      { item: 'Cozy oversized neutral knit sweater', category: 'outfit' }
    ]
  },
  {
    id: 'tutorial',
    name: 'Tutorial / How-to',
    description: 'Crisp step-by-step guidance that delivers immediate actionable value',
    format: 'video',
    targetSeconds: 60,
    hookText: 'Stop doing [COMMON MISTAKE]. Here is the 3-step method that takes literally 2 minutes.',
    bodyText: 'Step 1: Set up your workspace and eliminate distraction.\nStep 2: Apply the 80/20 rule to your preparation.\nStep 3: Execute in 25-minute sprints without pausing to second-guess.',
    callToActionText: 'Drop a "GUIDE" below and I will DM you the free printable checklist!',
    outroText: 'Follow for daily creator productivity hacks that actually work.',
    sceneRows: [
      { visual: 'Holding up phone or tool pointing at screen', audio: 'Stop doing this mistake. Here is the 2-minute fix.' },
      { visual: 'Screen record demo of step 1', audio: 'Step 1: Do this first before touching anything else.' },
      { visual: 'B-roll demonstration of step 2', audio: 'Step 2: Notice how this immediately speeds up the result.' },
      { visual: 'Final result side-by-side comparison', audio: 'Look at the difference. It takes less than 2 minutes.' },
      { visual: 'Friendly pointing at comment prompt', audio: 'Drop a comment below if you want the full template!' }
    ],
    shotList: [
      { item: 'Ring light / key light adjusted', category: 'prop' },
      { item: 'Tripod top-down angle', category: 'prop' },
      { item: 'Clean desk with minimal styling', category: 'location' }
    ]
  },
  {
    id: 'grwm',
    name: 'Get Ready With Me (GRWM)',
    description: 'Casual conversational prep routine paired with personal reflections',
    format: 'video',
    targetSeconds: 90,
    hookText: 'Get ready with me while we talk about the harsh truth no one tells you about going full-time...',
    bodyText: 'Everyone posts the laptop by the beach, but no one talks about the quarterly taxes, the self-discipline to work without a boss, and having to pitch yourself 50 times a week.\n\nApplying my favorite sunscreen and lip oil right now—shade 02!',
    callToActionText: 'Tell me in the comments: what is your biggest hesitation with going full-time?',
    outroText: 'Outfit is tagged on my LTK. Hope you have the best day!',
    sceneRows: [
      { visual: 'Applying skincare headband and looking into mirror', audio: 'Get ready with me while we talk about the harsh truths of full-time creating.' },
      { visual: 'Blending foundation with beauty sponge', audio: 'Everyone shows the highlight reel, but here is what the day-to-day actually feels like.' },
      { visual: 'Applying mascara, nodding thoughtfully', audio: 'The hardest part isn\'t making the content—it\'s managing your own psychology.' },
      { visual: 'Full outfit check in standing mirror', audio: 'Final look! Let me know your thoughts down in the comments.' }
    ],
    shotList: [
      { item: 'Bathroom vanity with warm soft lighting', category: 'location' },
      { item: 'Skincare headband and makeup brushes', category: 'prop' },
      { item: 'Everyday elevated neutral outfit', category: 'outfit' }
    ]
  },
  {
    id: 'day_in_life',
    name: 'Day in My Life',
    description: 'Timestamped diary format showing authentic behind-the-scenes rhythm',
    format: 'video',
    targetSeconds: 60,
    hookText: 'What a 12-hour work day actually looks like as a solo 6-figure creator.',
    bodyText: '7:30 AM: Morning matcha & journal before looking at any screens.\n9:00 AM: Deep work batch filming 3 Reels.\n1:00 PM: Client brand check-in calls.\n4:00 PM: Editing & scheduling thumbnail assets.\n7:00 PM: Gym & completely unplugging.',
    callToActionText: 'Would you rather have a 9-to-5 or be your own boss? Let\'s debate below!',
    outroText: 'Thanks for hanging out today! See you tomorrow at 9 AM.',
    sceneRows: [
      { visual: 'Alarm ringing, pouring matcha into textured ceramic mug', audio: '7:30 AM: Grounding morning routine before touching email.' },
      { visual: 'Adjusting camera ring light, switching outfits', audio: '9:00 AM: Filming sprint. 3 videos knocked out before lunch.' },
      { visual: 'Typing on MacBook, client proposal review', audio: '1:00 PM: Business operations and brand partner approvals.' },
      { visual: 'Golden hour walk outside leaving studio', audio: '7:00 PM: Shutdown routine. Health comes first.' }
    ],
    shotList: [
      { item: 'Kitchen matcha whisk setup', category: 'prop' },
      { item: 'Desk workspace in daytime natural light', category: 'location' },
      { item: 'Outdoor golden hour walk route', category: 'location' }
    ]
  },
  {
    id: 'product_review',
    name: 'Product Review (Honest & Unfiltered)',
    description: 'Balanced pros, cons, and honest verdict with macro demonstration',
    format: 'video',
    targetSeconds: 60,
    hookText: 'Is [PRODUCT] actually worth the hype, or did TikTok just lie to all of us?',
    bodyText: 'I tested this for 30 consecutive days so you don\'t waste your money.\n\nThe Good: Incredible build quality and seamless battery life.\nThe Bad: The app connectivity is super clunky and way too overpriced.\nThe Verdict: If you have budget, buy it. If not, buy [AFFORDABLE ALTERNATIVE] instead.',
    callToActionText: 'Save this before your next shopping haul!',
    outroText: 'What product should I test next? Leave your requests below!',
    sceneRows: [
      { visual: 'Holding product box up to camera with skeptical look', audio: 'Is this actually worth the hype or is it pure marketing?' },
      { visual: 'Macro close-up unboxing and material test', audio: 'I tested it for 30 days straight. Here is the unfiltered truth.' },
      { visual: 'Side-by-side comparison test with competitor', audio: 'The build quality is a 9/10, but look at how confusing this part is.' },
      { visual: 'Giving final thumbs up/down rating card', audio: 'Final score: 7/10. Here is what I\'d buy instead.' }
    ],
    shotList: [
      { item: 'Product in pristine packaging', category: 'prop' },
      { item: 'Macro lens or 3x iPhone camera mode', category: 'prop' },
      { item: 'Clean neutral tabletop surface', category: 'location' }
    ]
  },
  {
    id: 'myth_vs_fact',
    name: 'Myth vs Fact',
    description: 'Debunking a widespread misconception in your industry',
    format: 'video',
    targetSeconds: 45,
    hookText: 'The biggest lie you\'ve been told about [INDUSTRY / NICHE]...',
    bodyText: 'Myth: You need 100k followers to make full-time income.\nFact: You only need 1,000 engaged subscribers who trust your recommendations.\n\nHere is why depth of relationship beats reach every single time:',
    callToActionText: 'Share this with a friend who is waiting to hit some arbitrary follower count!',
    outroText: 'Drop your favorite myth in the comments and let\'s bust it together.'
  },
  {
    id: 'tips_list',
    name: 'Tips List (5 Quick Wins)',
    description: 'Rapid-fire tips delivered with energetic tempo and visual numbers',
    format: 'video',
    targetSeconds: 60,
    hookText: '5 tiny habits that completely transformed my creative output in 30 days:',
    bodyText: 'Tip 1: Outline scripts before setting up cameras.\nTip 2: Batch B-roll footage on dedicated film days.\nTip 3: Use recurring hooks that proven creators test.\nTip 4: Keep raw footage organized in date-tagged folders.\nTip 5: Done is better than perfect.',
    callToActionText: 'Which of these 5 habits are you going to start this week?',
    outroText: 'Save this post to reference during your next studio session!'
  },
  {
    id: 'question_hook',
    name: 'Question Hook',
    description: 'Polarizing or thoughtful question that stimulates immediate replies',
    format: 'video',
    targetSeconds: 45,
    hookText: 'Why is nobody talking about this upcoming platform shift?',
    bodyText: 'Over the last 2 weeks, algorithmic reach has shifted heavily towards saves and shares over basic likes.\n\nIf you want your content to stay relevant, here are the 2 things you need to optimize for starting today:',
    callToActionText: 'What is your prediction for where content is heading? Tell me in the comments!',
    outroText: 'Follow for real-time creator updates and algorithm breakdowns.'
  }
];

