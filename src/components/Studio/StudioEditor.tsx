import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { X, Sparkles, PenTool, LayoutTemplate, MessageSquare } from 'lucide-react';
import { PostItem } from '../../types';

interface StudioEditorProps {
  post: PostItem | null;
  onClose: () => void;
}

export const StudioEditor: React.FC<StudioEditorProps> = ({ post, onClose }) => {
  const { updatePost } = useApp();
  const [content, setContent] = useState(post?.scriptContent?.bodyText || post?.caption || '');
  const [isImproving, setIsImproving] = useState(false);

  if (!post) return null;

  const handleImprove = () => {
    setIsImproving(true);
    setTimeout(() => {
      setContent(prev => `✨ Improved version of your content:\n\n${prev}\n\n#Viral #Trending`);
      setIsImproving(false);
    }, 1500);
  };

  const handleSave = () => {
    updatePost(post.id, {
      caption: content,
      scriptContent: {
        ...post.scriptContent,
        hasContent: true,
        bodyText: content,
      }
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-slate-950/80 backdrop-blur-md" onClick={onClose} />
      
      <div className="relative w-full max-w-5xl h-[85vh] rounded-2xl bg-[#0F172A] border border-slate-800 shadow-2xl flex overflow-hidden">
        {/* Sidebar Tools */}
        <div className="w-16 border-r border-slate-800 bg-slate-900/50 flex flex-col items-center py-6 gap-6">
          <button className="p-3 bg-fuchsia-500/20 text-fuchsia-400 rounded-xl hover:bg-fuchsia-500/30 transition-colors" title="Write">
            <PenTool className="w-5 h-5" />
          </button>
          <button className="p-3 text-slate-500 hover:text-slate-300 hover:bg-slate-800 rounded-xl transition-colors" title="Templates">
            <LayoutTemplate className="w-5 h-5" />
          </button>
          <button className="p-3 text-slate-500 hover:text-slate-300 hover:bg-slate-800 rounded-xl transition-colors" title="Comments">
            <MessageSquare className="w-5 h-5" />
          </button>
        </div>

        {/* Main Editor */}
        <div className="flex-1 flex flex-col relative">
          {/* Header */}
          <div className="h-16 px-6 border-b border-slate-800 flex items-center justify-between bg-slate-900/30">
            <div className="flex items-center gap-3">
              <span className="px-2.5 py-1 rounded-md bg-slate-800 text-xs font-medium text-slate-300 border border-slate-700">
                {post.format}
              </span>
              <h2 className="text-sm font-semibold text-white truncate max-w-md">{post.title}</h2>
            </div>
            <div className="flex items-center gap-3">
              <button
                onClick={handleImprove}
                disabled={isImproving || !content.trim()}
                className="px-4 py-1.5 rounded-lg text-sm font-medium bg-gradient-to-r from-violet-600/20 to-fuchsia-600/20 border border-fuchsia-500/30 text-fuchsia-300 hover:bg-fuchsia-500/20 transition-all flex items-center gap-2 disabled:opacity-50"
              >
                <Sparkles className="w-4 h-4" />
                {isImproving ? 'Improving...' : 'AI Enhance'}
              </button>
              <button onClick={handleSave} className="px-4 py-1.5 bg-white text-slate-900 text-sm font-semibold rounded-lg hover:bg-slate-200 transition-colors">
                Save Changes
              </button>
              <button onClick={onClose} className="p-1.5 text-slate-400 hover:text-white rounded-lg transition-colors ml-2">
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Editor Area */}
          <div className="flex-1 p-8 bg-[#0F172A] overflow-y-auto">
            <textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="Start writing your content here..."
              className="w-full h-full min-h-[400px] bg-transparent text-slate-300 text-lg leading-relaxed placeholder-slate-600 focus:outline-none resize-none font-sans"
            />
          </div>
        </div>
      </div>
    </div>
  );
};
