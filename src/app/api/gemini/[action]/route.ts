import { NextRequest, NextResponse } from 'next/server';
import { GoogleGenAI, Type } from '@google/genai';

let aiClient: GoogleGenAI | null = null;
function getAIClient(): GoogleGenAI {
  if (!aiClient) {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      throw new Error('GEMINI_API_KEY environment variable is missing');
    }
    aiClient = new GoogleGenAI({
      apiKey,
      httpOptions: {
        headers: {
          'User-Agent': 'aistudio-build',
        },
      },
    });
  }
  return aiClient;
}

export async function POST(req: NextRequest, { params }: { params: Promise<{ action: string }> }) {
  try {
    const p = await params;
    const action = p.action;
    const body = await req.json();

    if (!process.env.GEMINI_API_KEY) {
      return NextResponse.json({
        error: 'Gemini API key is not configured. Please configure GEMINI_API_KEY in your settings.',
        fallback: true,
      }, { status: 503 });
    }

    const ai = getAIClient();

    switch (action) {
      case 'generate-ideas': {
        const { niche = 'Lifestyle & Beauty', pillars = ['Tutorials', 'Behind the scenes', 'Personal stories'], count = 10 } = body;
        const prompt = `You are an elite social media content strategist for a creator in the "${niche}" niche.
Generate ${count} creative, highly engaging post ideas tailored to their content pillars: ${pillars.join(', ')}.
Each idea must have:
- title: clear, punchy post concept
- hook: curiosity-driven first 3 seconds hook or opening line
- pillar: one of [${pillars.join(', ')}]
- suggestedFormat: Reel/Short, Carousel, Static image, Story, Long video, or Text post
- rationale: brief 1-sentence explanation of why it will perform well`;

        const response = await ai.models.generateContent({
          model: 'gemini-3.8-flash',
          contents: prompt,
          config: {
            responseMimeType: 'application/json',
            responseSchema: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  title: { type: Type.STRING },
                  hook: { type: Type.STRING },
                  pillar: { type: Type.STRING },
                  suggestedFormat: { type: Type.STRING },
                  rationale: { type: Type.STRING },
                },
                required: ['title', 'hook', 'pillar', 'suggestedFormat', 'rationale'],
              },
            },
          },
        });
        return NextResponse.json({ ideas: JSON.parse(response.text || '[]') });
      }

      case 'write-caption': {
        const { title, notes = '', tone = 'casual', platforms = ['Instagram', 'TikTok'], pillar = 'Lifestyle' } = body;
        const prompt = `Write 3 distinct caption options for a social media post:
Title: "${title}"
Pillar: "${pillar}"
Creator notes/shot list: "${notes}"
Target Platforms: ${platforms.join(', ')}
Desired Tone: ${tone} (e.g. fun, professional, inspirational, casual)

Provide:
1. Caption body with proper line spacing and clean emoji usage
2. 5-10 targeted high-reach hashtags
3. A compelling Call To Action (CTA)`;

        const response = await ai.models.generateContent({
          model: 'gemini-3.8-flash',
          contents: prompt,
          config: {
            responseMimeType: 'application/json',
            responseSchema: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  caption: { type: Type.STRING },
                  hashtags: { type: Type.ARRAY, items: { type: Type.STRING } },
                  callToAction: { type: Type.STRING },
                },
                required: ['caption', 'hashtags', 'callToAction'],
              },
            },
          },
        });
        return NextResponse.json({ captions: JSON.parse(response.text || '[]') });
      }

      case 'improve-hook': {
        const { hook, title = '', niche = '', format = 'Reel/Short' } = body;
        const prompt = `The creator has written this initial hook/first line: "${hook}"
Post title: "${title}"
Niche: "${niche}"
Format: "${format}"

Generate 3 dramatically improved, high-retention viral hook alternatives:
1. Curiosity Gap / Contrarian hook
2. Direct Benefit / How-to hook
3. Story / Relatable Emotion hook

For each hook, provide the hook text and a brief explanation of the psychological trigger used.`;

        const response = await ai.models.generateContent({
          model: 'gemini-3.8-flash',
          contents: prompt,
          config: {
            responseMimeType: 'application/json',
            responseSchema: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: { hook: { type: Type.STRING }, trigger: { type: Type.STRING } },
                required: ['hook', 'trigger'],
              },
            },
          },
        });
        return NextResponse.json({ hooks: JSON.parse(response.text || '[]') });
      }

      case 'plan-month': {
        const { niche = 'Lifestyle', platforms = ['Instagram', 'TikTok'], pillars = ['Tutorials', 'Behind the scenes', 'Personal stories', 'Product reviews'], startDate } = body;
        const prompt = `Generate a balanced, high-converting 30-day social media content calendar plan for a creator in "${niche}".
Platforms: ${platforms.join(', ')}
Content Pillars: ${pillars.join(', ')}
Starting Date: ${startDate || 'the next Monday'}

Create 15-20 strategic posts distributed across the 30-day period (approx 3-5 posts per week).
Distribute evenly among platforms and pillars so there is healthy variety.
For each scheduled post, provide:
- dayOffset: integer from 0 to 29 (representing day index from start date)
- title: specific, creative post title
- hook: high-performing opening hook
- platform: one of [${platforms.join(', ')}]
- format: Reel/Short, Carousel, Static image, Story, Long video, or Text post
- pillar: one of [${pillars.join(', ')}]
- time: time of day e.g. "10:00", "14:00", "18:00", "19:30"
- notes: brief shot list or outline`;

        const response = await ai.models.generateContent({
          model: 'gemini-3.8-flash',
          contents: prompt,
          config: {
            responseMimeType: 'application/json',
            responseSchema: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  dayOffset: { type: Type.INTEGER },
                  title: { type: Type.STRING },
                  hook: { type: Type.STRING },
                  platform: { type: Type.STRING },
                  format: { type: Type.STRING },
                  pillar: { type: Type.STRING },
                  time: { type: Type.STRING },
                  notes: { type: Type.STRING },
                },
                required: ['dayOffset', 'title', 'hook', 'platform', 'format', 'pillar', 'time', 'notes'],
              },
            },
          },
        });
        return NextResponse.json({ plan: JSON.parse(response.text || '[]') });
      }

      case 'write-script-draft': {
        const { title, pillar = 'Lifestyle', format = 'Reel/Short', targetSeconds = 60, niche = 'Creator', notes = '' } = body;
        const prompt = `You are a world-class creator scriptwriter.
Write a production-ready script for a social media post:
Title: "${title}"
Topic / Pillar: "${pillar}"
Format: "${format}"
Target Speaking Length: ~${targetSeconds} seconds (approx ${Math.round((targetSeconds / 60) * 150)} words total)
Niche: "${niche}"
Additional Creator Notes: "${notes}"

Provide:
1. hook: High-retention opening spoken line (first 3 seconds) that stops scrolling.
2. body: The core educational, entertaining, or storytelling content with crisp natural spoken delivery.
3. callToAction: Clear, engaging closing CTA.
4. outro: Quick friendly sign-off line.
5. scenes: A 2-column breakdown of 4 to 6 scenes with "visual" (camera angle, b-roll, text on screen) and "audio" (what creator says/voiceover).
6. shotList: 4 to 6 essential checklist items categorized as "scene", "location", "prop", or "outfit".`;

        const response = await ai.models.generateContent({
          model: 'gemini-3.8-flash',
          contents: prompt,
          config: {
            responseMimeType: 'application/json',
            responseSchema: {
              type: Type.OBJECT,
              properties: {
                hook: { type: Type.STRING },
                body: { type: Type.STRING },
                callToAction: { type: Type.STRING },
                outro: { type: Type.STRING },
                scenes: {
                  type: Type.ARRAY,
                  items: { type: Type.OBJECT, properties: { visual: { type: Type.STRING }, audio: { type: Type.STRING } }, required: ['visual', 'audio'] },
                },
                shotList: {
                  type: Type.ARRAY,
                  items: { type: Type.OBJECT, properties: { item: { type: Type.STRING }, category: { type: Type.STRING } }, required: ['item', 'category'] },
                },
              },
              required: ['hook', 'body', 'callToAction', 'outro', 'scenes', 'shotList'],
            },
          },
        });
        return NextResponse.json(JSON.parse(response.text || '{}'));
      }

      case 'refine-text': {
        const { text, action: textAction = 'punchier', context = '' } = body;
        const actionInstructions: Record<string, string> = {
          rewrite: 'Rewrite this text cleanly for social media while preserving the original meaning.',
          shorter: 'Condense and trim this text to be much shorter, eliminating fluff while keeping high impact.',
          punchier: 'Make this text punchy, rhythmic, and high-energy for fast-scrolling mobile audiences.',
          casual: 'Rewrite this in a conversational, relatable, warm, and friendly creator tone.',
          professional: 'Polish this text to sound authoritative, credible, and articulate for platforms like LinkedIn/YouTube.',
          expand: 'Expand on these key points with vivid examples and helpful context without rambling.',
          fix_grammar: 'Fix any spelling, grammar, and punctuation mistakes while maintaining natural voice.',
        };
        const instruction = actionInstructions[textAction] || actionInstructions.punchier;

        const prompt = `You are an expert social media editor.
Task: ${instruction}
Context: ${context || 'Script / social media copy'}
Original text:
"""
${text}
"""

Return JSON with:
- refinedText: The revised text.
- explanation: A concise 1-sentence note explaining what was changed and why.`;

        const response = await ai.models.generateContent({
          model: 'gemini-3.8-flash',
          contents: prompt,
          config: {
            responseMimeType: 'application/json',
            responseSchema: {
              type: Type.OBJECT,
              properties: { refinedText: { type: Type.STRING }, explanation: { type: Type.STRING } },
              required: ['refinedText', 'explanation'],
            },
          },
        });
        return NextResponse.json(JSON.parse(response.text || '{}'));
      }

      case 'generate-hooks': {
        const { title = '', pillar = 'Lifestyle', format = 'Reel/Short', niche = 'Creator', currentHook = '' } = body;
        const prompt = `Generate 5 viral, scroll-stopping opening hook options for this social media post:
Title: "${title}"
Pillar: "${pillar}"
Format: "${format}"
Niche: "${niche}"
Current hook (if any): "${currentHook}"

Provide 5 diverse hooks:
1. Curiosity Gap / Mystery (leaves them needing to know)
2. Contrarian / Unpopular Opinion (challenges a common belief)
3. Direct Benefit / "How I" (shows proof and transformation)
4. Relatable Story / Vulnerable Emotion ("I wasn't going to share this...")
5. Urgent Warning / Mistakes to avoid ("Stop doing this immediately")`;

        const response = await ai.models.generateContent({
          model: 'gemini-3.8-flash',
          contents: prompt,
          config: {
            responseMimeType: 'application/json',
            responseSchema: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: { hook: { type: Type.STRING }, type: { type: Type.STRING }, trigger: { type: Type.STRING } },
                required: ['hook', 'type', 'trigger'],
              },
            },
          },
        });
        return NextResponse.json({ hooks: JSON.parse(response.text || '[]') });
      }

      case 'script-to-caption': {
        const { title, scriptText, platforms = ['Instagram'], tone = 'engaging' } = body;
        const prompt = `Convert this video script into an engaging social media caption:
Title: "${title}"
Target Platforms: ${platforms.join(', ')}
Desired Tone: ${tone}
Video Script Content:
"""
${scriptText}
"""

Format the caption beautifully with clean line breaks, natural bullet points, relevant emojis, a strong hook in line 1, a compelling call to action, and 5-8 targeted hashtags.`;

        const response = await ai.models.generateContent({
          model: 'gemini-3.8-flash',
          contents: prompt,
          config: {
            responseMimeType: 'application/json',
            responseSchema: {
              type: Type.OBJECT,
              properties: {
                caption: { type: Type.STRING },
                hashtags: { type: Type.ARRAY, items: { type: Type.STRING } },
                callToAction: { type: Type.STRING },
              },
              required: ['caption', 'hashtags', 'callToAction'],
            },
          },
        });
        return NextResponse.json(JSON.parse(response.text || '{}'));
      }

      case 'script-to-carousel': {
        const { title, scriptText, slideCount = 6 } = body;
        const prompt = `Convert this video script / post idea into a high-engagement ${slideCount}-slide carousel for Instagram / LinkedIn:
Title: "${title}"
Source Script:
"""
${scriptText}
"""

Provide ${slideCount} slides:
- Slide 1: Cover slide with bold hook headline and visual design note
- Slides 2 to ${slideCount - 1}: Core teaching points, step-by-step insights, or comparisons with concise slide body
- Slide ${slideCount}: Final call to action slide (Save & Share)`;

        const response = await ai.models.generateContent({
          model: 'gemini-3.8-flash',
          contents: prompt,
          config: {
            responseMimeType: 'application/json',
            responseSchema: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  slideNumber: { type: Type.INTEGER },
                  heading: { type: Type.STRING },
                  body: { type: Type.STRING },
                  visualNote: { type: Type.STRING },
                },
                required: ['slideNumber', 'heading', 'body', 'visualNote'],
              },
            },
          },
        });
        return NextResponse.json({ slides: JSON.parse(response.text || '[]') });
      }

      default:
        return NextResponse.json({ error: 'Unknown action' }, { status: 400 });
    }
  } catch (error: any) {
    console.error(`Error in ${(await params).action}:`, error);
    return NextResponse.json(
      { error: 'Failed to process request' },
      { status: 500 }
    );
  }
}
