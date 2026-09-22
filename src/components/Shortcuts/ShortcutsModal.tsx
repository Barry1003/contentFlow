import React from 'react';
import { useApp } from '../../context/AppContext';
import { X } from 'lucide-react';

export const ShortcutsModal: React.FC = () => {
  const { isShortcutsOpen, setIsShortcutsOpen } = useApp();

  if (!isShortcutsOpen) return null;

  const shortcuts = [
    { key: 'N', desc: 'Quick add a new post' },
    { key: 'T', desc: 'Jump to Today view' },
    { key: '/', desc: 'Open global search' },
    { key: '1 – 6', desc: 'Switch views (Today, Calendar, Pipeline, Studio, Ideas, Insights)' },
    { key: 'ESC', desc: 'Close dialogs' },
    { key: '?', desc: 'Keyboard shortcuts guide' },
  ];

  return (
    <div
      id="shortcuts-modal-backdrop"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#1C1C1A]/40 transition-opacity"
      onClick={() => setIsShortcutsOpen(false)}
    >
      <div
        id="shortcuts-modal-container"
        className="w-full max-w-sm bg-[#FFFFFF] dark:bg-[#232321] rounded-[4px] border border-[#E9E7E2] dark:border-[#323230] p-5 space-y-4 transition-colors"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between">
          <h2 className="text-xs font-medium text-[#2A2925] dark:text-[#D9D7D1]">
            Keyboard shortcuts
          </h2>
          <button
            type="button"
            onClick={() => setIsShortcutsOpen(false)}
            className="text-[#6F6C66] dark:text-[#9A978F] hover:text-[#2A2925] dark:hover:text-[#D9D7D1] p-0.5 rounded-[3px] focus-ring"
          >
            <X className="w-3.5 h-3.5 stroke-[1.5]" />
          </button>
        </div>

        <div className="divide-y divide-[#E9E7E2] dark:divide-[#323230]">
          {shortcuts.map((item, idx) => (
            <div
              key={idx}
              className="py-2 flex items-center justify-between text-xs font-normal"
            >
              <span className="text-[#6F6C66] dark:text-[#9A978F]">
                {item.desc}
              </span>
              <kbd className="px-2 py-0.5 text-[11px] font-mono font-normal text-[#2A2925] dark:text-[#D9D7D1] bg-[#F7F6F3] dark:bg-[#1C1C1A] border border-[#E9E7E2] dark:border-[#323230] rounded-[3px] shrink-0 ml-2">
                {item.key}
              </kbd>
            </div>
          ))}
        </div>

        <div className="pt-1">
          <button
            type="button"
            onClick={() => setIsShortcutsOpen(false)}
            className="w-full h-7 rounded-[4px] bg-[#F7F6F3] dark:bg-[#1C1C1A] border border-[#E9E7E2] dark:border-[#323230] text-xs font-normal text-[#2A2925] dark:text-[#D9D7D1] hover:bg-[#EFECE6] dark:hover:bg-[#2B2B28] transition-colors focus-ring"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
