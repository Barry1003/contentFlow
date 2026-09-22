import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Sparkles, X, Loader2, Plus, ArrowRight } from 'lucide-react';

interface AiIdeaGeneratorModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AiIdeaGeneratorModal: React.FC<AiIdeaGeneratorModalProps> = ({ isOpen, onClose }) => {
  const { settings, addIdea } = useApp();
  const [topic, setTopic] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedIdeas, setGeneratedIdeas] = useState<any[]>([]);

  if (!isOpen) return null;

  const handleGenerate = () => {
    if (!topic.trim()) return;
    setIsGenerating(true);
    setGeneratedIdeas([]);
    
    // Simulate AI generation
    setTimeout(() => {
      setGeneratedIdeas([
        { title: `5 Myths About ${topic}`, hook: `Stop believing this about ${topic}...`, format: 'Reel/Short' },
        { title: `How to master ${topic} in 24 hours`, hook: `I learned ${topic} in a day, here is how...`, format: 'Carousel' },
        { title: `${topic}: The Ultimate Guide`, hook: `Everything you ever needed to know about ${topic}.`, format: 'Text post' }
      ]);
      setIsGenerating(false);
    }, 1500);
  };

  const handleAddIdea = (idea: any) => {
    addIdea({
      title: idea.title,
      hook: idea.hook,
      pillarId: settings.pillars[0]?.id || '',
      suggestedFormat: idea.format,
      platforms: settings.platforms.map(p => p.id).slice(0, 2),
      notes: 'Generated via AI Studio',
      tags: [],
    });
    // Remove from list
    setGeneratedIdeas(prev => prev.filter(i => i.title !== idea.title));
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose} />
      
      <div className="relative w-full max-w-2xl overflow-hidden rounded-2xl bg-slate-900/90 backdrop-blur-xl border border-white/10 shadow-2xl flex flex-col max-h-[85vh]">
        {/* Header with Gradient */}
        <div className="px-6 py-5 border-b border-white/10 bg-gradient-to-r from-violet-600/20 to-fuchsia-600/20 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-white/10 rounded-lg">
              <Sparkles className="w-5 h-5 text-fuchsia-400" />
            </div>
            <div>
              <h2 className="text-lg font-semibold text-white">AI Idea Generator</h2>
              <p className="text-xs text-slate-400 font-medium">Brainstorm viral content instantly</p>
            </div>
          </div>
          <button onClick={onClose} className="p-2 text-slate-400 hover:text-white hover:bg-white/10 rounded-full transition-colors">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 flex-1 overflow-y-auto custom-scrollbar">
          <div className="space-y-6">
            {/* Input Area */}
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">What is the topic?</label>
              <div className="relative">
                <input
                  type="text"
                  value={topic}
                  onChange={(e) => setTopic(e.target.value)}
                  placeholder="e.g. Productivity hacks for remote workers"
                  className="w-full px-4 py-3 bg-slate-800/50 border border-slate-700 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-fuchsia-500/50 focus:border-fuchsia-500 transition-all"
                  onKeyDown={(e) => e.key === 'Enter' && handleGenerate()}
                />
                <button
                  onClick={handleGenerate}
                  disabled={isGenerating || !topic.trim()}
                  className="absolute right-2 top-2 bottom-2 px-4 bg-gradient-to-r from-violet-600 to-fuchsia-600 text-white rounded-lg text-sm font-medium hover:opacity-90 disabled:opacity-50 transition-all flex items-center gap-2"
                >
                  {isGenerating ? <Loader2 className="w-4 h-4 animate-spin" /> : <Sparkles className="w-4 h-4" />}
                  Generate
                </button>
              </div>
            </div>

            {/* Results Area */}
            {generatedIdeas.length > 0 && (
              <div className="space-y-4 animate-in fade-in slide-in-from-bottom-4 duration-500">
                <h3 className="text-sm font-medium text-slate-300 flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-fuchsia-400" /> 
                  Generated Ideas
                </h3>
                <div className="grid gap-3">
                  {generatedIdeas.map((idea, idx) => (
                    <div key={idx} className="group relative p-4 rounded-xl bg-slate-800/40 border border-slate-700/50 hover:bg-slate-800/80 hover:border-fuchsia-500/30 transition-all">
                      <div className="flex justify-between items-start gap-4">
                        <div className="space-y-1">
                          <h4 className="text-sm font-semibold text-white">{idea.title}</h4>
                          <p className="text-xs text-slate-400 font-medium line-clamp-1">{idea.hook}</p>
                          <span className="inline-block mt-2 px-2 py-0.5 rounded-full bg-slate-700/50 text-[10px] text-slate-300 font-medium">
                            {idea.format}
                          </span>
                        </div>
                        <button
                          onClick={() => handleAddIdea(idea)}
                          className="shrink-0 p-2 text-fuchsia-400 hover:text-white bg-fuchsia-400/10 hover:bg-fuchsia-500 rounded-lg transition-colors opacity-0 group-hover:opacity-100 flex items-center gap-1 text-xs font-medium"
                        >
                          <Plus className="w-4 h-4" /> Save
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
