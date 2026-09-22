import React, { useState } from 'react';
import { X } from 'lucide-react';

interface InlineDatePickerProps {
  currentDateKey: string;
  onSelectDate: (dateKey: string) => void;
  onClose: () => void;
}

export const InlineDatePicker: React.FC<InlineDatePickerProps> = ({
  currentDateKey,
  onSelectDate,
  onClose,
}) => {
  const [selected, setSelected] = useState(currentDateKey);

  const handleSave = () => {
    if (selected && selected !== currentDateKey) {
      onSelectDate(selected);
    }
    onClose();
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#1C1C1A]/40 transition-opacity"
      onClick={onClose}
    >
      <div
        className="bg-[#FFFFFF] dark:bg-[#232321] rounded-[4px] border border-[#E9E7E2] dark:border-[#323230] p-4 max-w-xs w-full space-y-3 transition-colors"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between">
          <h3 className="text-xs font-medium text-[#2A2925] dark:text-[#D9D7D1]">
            Reschedule post
          </h3>
          <button
            type="button"
            onClick={onClose}
            className="text-[#6F6C66] dark:text-[#9A978F] hover:text-[#2A2925] dark:hover:text-[#D9D7D1] p-0.5 rounded-[3px] focus-ring"
          >
            <X className="w-3.5 h-3.5 stroke-[1.5]" />
          </button>
        </div>

        <div>
          <label className="block text-[11px] font-normal text-[#6F6C66] dark:text-[#9A978F] mb-1">
            Date
          </label>
          <input
            type="date"
            value={selected}
            onChange={(e) => setSelected(e.target.value)}
            className="w-full px-2.5 py-1.5 text-xs rounded-[4px] border border-[#E9E7E2] dark:border-[#323230] bg-[#F7F6F3] dark:bg-[#1C1C1A] text-[#2A2925] dark:text-[#D9D7D1] focus:outline-none focus:ring-1 focus:ring-[#2C6E56] dark:focus:ring-[#5AA88C]"
          />
        </div>

        <div className="flex items-center justify-end gap-1.5 pt-1">
          <button
            type="button"
            onClick={onClose}
            className="h-7 px-2.5 rounded-[4px] text-xs font-normal text-[#6F6C66] dark:text-[#9A978F] hover:text-[#2A2925] dark:hover:text-[#D9D7D1] hover:bg-[#EFECE6] dark:hover:bg-[#2B2B28] transition-colors focus-ring"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={handleSave}
            className="h-7 px-3 rounded-[4px] bg-[#2C6E56] hover:bg-[#235946] dark:hover:bg-[#357E65] text-[#F3F1EC] text-xs font-normal transition-colors focus-ring"
          >
            Move
          </button>
        </div>
      </div>
    </div>
  );
};
