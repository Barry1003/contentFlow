import React, { useState } from 'react';
import {
  X,
  History,
  RotateCcw,
  Clock,
  Bookmark,
} from 'lucide-react';
import { ScriptVersion } from '../../types';

interface VersionHistoryModalProps {
  isOpen: boolean;
  onClose: () => void;
  versions: ScriptVersion[];
  onRestore: (versionId: string) => void;
  onSaveSnapshot: (label?: string) => void;
}

export const VersionHistoryModal: React.FC<VersionHistoryModalProps> = ({
  isOpen,
  onClose,
  versions,
  onRestore,
  onSaveSnapshot,
}) => {
  const [selectedVersionId, setSelectedVersionId] = useState<string>(
    versions[0]?.id || ''
  );
  const [newLabel, setNewLabel] = useState('');

  if (!isOpen) return null;

  const activeVersion = versions.find((v) => v.id === selectedVersionId) || versions[0];

  const handleSaveNew = (e: React.FormEvent) => {
    e.preventDefault();
    onSaveSnapshot(newLabel.trim() || undefined);
    setNewLabel('');
  };

  const handleRestore = () => {
    if (!activeVersion) return;
    onRestore(activeVersion.id);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-[#141413]/50 flex items-center justify-center p-4">
      <div className="bg-[#FFFFFF] dark:bg-[#1C1C1A] w-full max-w-2xl rounded-[8px] border border-[#E6E4DF] dark:border-[#2A2A27] flex flex-col max-h-[80vh] overflow-hidden animate-in fade-in duration-100">
        {/* Header */}
        <div className="px-6 py-4 border-b border-[#E6E4DF] dark:border-[#2A2A27] flex items-center justify-between">
          <div className="flex items-center gap-2">
            <History className="w-4 h-4 stroke-[1.5] text-[#6F6C66] dark:text-[#9E9B93]" />
            <h2 className="text-sm font-medium text-[#1C1B19] dark:text-[#F3F2EF]">
              Version History
            </h2>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1 text-[#6F6C66] dark:text-[#9E9B93] hover:text-[#1C1B19] dark:hover:text-[#F3F2EF] rounded hover:bg-[#F3F2EF] dark:hover:bg-[#242421] transition-colors"
          >
            <X className="w-4 h-4 stroke-[1.5]" />
          </button>
        </div>

        {/* Snapshot Quick Action */}
        <form
          onSubmit={handleSaveNew}
          className="px-6 py-2 bg-[#FBFBFA] dark:bg-[#141413] border-b border-[#E6E4DF] dark:border-[#2A2A27] flex items-center gap-2"
        >
          <input
            type="text"
            placeholder="Snapshot name (optional)..."
            value={newLabel}
            onChange={(e) => setNewLabel(e.target.value)}
            className="flex-1 text-xs px-2.5 py-1.5 rounded-[4px] bg-[#FFFFFF] dark:bg-[#1C1C1A] border border-[#E6E4DF] dark:border-[#2A2A27] focus:outline-none focus:ring-1 focus:ring-[#1F5C47] text-[#1C1B19] dark:text-[#F3F2EF]"
          />
          <button
            type="submit"
            className="h-7 px-2.5 rounded-[4px] bg-[#FFFFFF] dark:bg-[#1C1C1A] border border-[#E6E4DF] dark:border-[#2A2A27] text-xs text-[#1C1B19] dark:text-[#F3F2EF] hover:bg-[#F3F2EF] dark:hover:bg-[#242421] flex items-center gap-1 shrink-0"
          >
            <Bookmark className="w-3 h-3 stroke-[1.5]" />
            <span>Save snapshot</span>
          </button>
        </form>

        {/* Content */}
        <div className="flex-1 flex flex-col md:flex-row min-h-0 overflow-hidden">
          {/* History List */}
          <div className="w-full md:w-56 border-r border-[#E6E4DF] dark:border-[#2A2A27] overflow-y-auto p-2 space-y-1 shrink-0 bg-[#FBFBFA] dark:bg-[#141413]">
            {versions.length === 0 ? (
              <div className="p-4 text-center text-xs text-[#6F6C66] dark:text-[#9E9B93]">
                No snapshots saved yet.
              </div>
            ) : (
              versions.map((ver) => {
                const isSelected = ver.id === selectedVersionId;
                const formattedTime = new Date(ver.timestamp).toLocaleTimeString([], {
                  hour: '2-digit',
                  minute: '2-digit',
                  month: 'short',
                  day: 'numeric',
                });
                return (
                  <button
                    key={ver.id}
                    type="button"
                    onClick={() => setSelectedVersionId(ver.id)}
                    className={`w-full text-left p-2 rounded-[4px] text-xs transition-colors border ${
                      isSelected
                        ? 'bg-[#FFFFFF] dark:bg-[#1C1C1A] border-[#E6E4DF] dark:border-[#2A2A27] text-[#1C1B19] dark:text-[#F3F2EF] font-medium'
                        : 'border-transparent text-[#6F6C66] dark:text-[#9E9B93] hover:bg-[#F3F2EF] dark:hover:bg-[#242421]'
                    }`}
                  >
                    <div className="flex items-center gap-1.5 mb-0.5">
                      <Clock className="w-3 h-3 stroke-[1.5] text-[#6F6C66]" />
                      <span className="truncate">{ver.label || 'Autosave'}</span>
                    </div>
                    <span className="text-[10px] text-[#6F6C66] dark:text-[#9E9B93] block tabular-nums">
                      {formattedTime}
                    </span>
                  </button>
                );
              })
            )}
          </div>

          {/* Version Details */}
          <div className="flex-1 overflow-y-auto p-5">
            {activeVersion ? (
              <div className="space-y-3">
                <div className="flex items-center justify-between pb-2 border-b border-[#E6E4DF] dark:border-[#2A2A27]">
                  <span className="text-xs font-medium text-[#1C1B19] dark:text-[#F3F2EF]">
                    {activeVersion.label || 'Snapshot Details'}
                  </span>
                  <span className="text-[11px] text-[#6F6C66] dark:text-[#9E9B93] tabular-nums">
                    {new Date(activeVersion.timestamp).toLocaleString()}
                  </span>
                </div>

                {activeVersion.data.hookText && (
                  <div>
                    <span className="text-[10px] uppercase font-medium text-[#6F6C66] dark:text-[#9E9B93]">
                      Hook
                    </span>
                    <p className="text-xs text-[#1C1B19] dark:text-[#F3F2EF] p-2.5 rounded-[4px] bg-[#FBFBFA] dark:bg-[#141413] border border-[#E6E4DF] dark:border-[#2A2A27] mt-1">
                      {activeVersion.data.hookText}
                    </p>
                  </div>
                )}

                {activeVersion.data.bodyText && (
                  <div>
                    <span className="text-[10px] uppercase font-medium text-[#6F6C66] dark:text-[#9E9B93]">
                      Body Content
                    </span>
                    <p className="text-xs text-[#1C1B19] dark:text-[#F3F2EF] p-2.5 rounded-[4px] bg-[#FBFBFA] dark:bg-[#141413] border border-[#E6E4DF] dark:border-[#2A2A27] mt-1 whitespace-pre-line leading-relaxed max-h-48 overflow-y-auto">
                      {activeVersion.data.bodyText}
                    </p>
                  </div>
                )}

                {activeVersion.data.callToActionText && (
                  <div>
                    <span className="text-[10px] uppercase font-medium text-[#6F6C66] dark:text-[#9E9B93]">
                      Call to Action
                    </span>
                    <p className="text-xs text-[#1C1B19] dark:text-[#F3F2EF] p-2.5 rounded-[4px] bg-[#FBFBFA] dark:bg-[#141413] border border-[#E6E4DF] dark:border-[#2A2A27] mt-1">
                      {activeVersion.data.callToActionText}
                    </p>
                  </div>
                )}

                {activeVersion.data.writtenText && (
                  <div>
                    <span className="text-[10px] uppercase font-medium text-[#6F6C66] dark:text-[#9E9B93]">
                      Written Text
                    </span>
                    <p className="text-xs text-[#1C1B19] dark:text-[#F3F2EF] p-2.5 rounded-[4px] bg-[#FBFBFA] dark:bg-[#141413] border border-[#E6E4DF] dark:border-[#2A2A27] mt-1 whitespace-pre-line">
                      {activeVersion.data.writtenText}
                    </p>
                  </div>
                )}
              </div>
            ) : (
              <div className="h-full flex items-center justify-center text-xs text-[#6F6C66] dark:text-[#9E9B93]">
                Select a version from the left to preview
              </div>
            )}
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-3 border-t border-[#E6E4DF] dark:border-[#2A2A27] flex items-center justify-between bg-[#FFFFFF] dark:bg-[#1C1C1A]">
          <span className="text-xs text-[#6F6C66] dark:text-[#9E9B93]">
            Restoring replaces editor content
          </span>
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={onClose}
              className="h-7 px-3 text-xs text-[#6F6C66] dark:text-[#9E9B93] hover:text-[#1C1B19] dark:hover:text-[#F3F2EF]"
            >
              Close
            </button>
            <button
              type="button"
              onClick={handleRestore}
              disabled={!activeVersion}
              className="h-7 px-3 text-xs font-medium rounded-[4px] bg-[#1F5C47] hover:bg-[#174A39] text-white flex items-center gap-1.5 transition-colors disabled:opacity-50"
            >
              <RotateCcw className="w-3.5 h-3.5 stroke-[1.5]" />
              <span>Restore this version</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
