import React from 'react';
import { useApp } from '../../context/AppContext';
import { Check, Undo2, X, AlertCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export const ToastContainer: React.FC = () => {
  const { toasts, removeToast } = useApp();

  return (
    <div
      id="toast-notification-container"
      className="fixed bottom-16 md:bottom-6 right-4 sm:right-6 z-50 flex flex-col gap-2 max-w-xs w-full pointer-events-none"
    >
      <AnimatePresence>
        {toasts.map((toast) => (
          <motion.div
            key={toast.id}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 6 }}
            transition={{ duration: 0.12, ease: 'easeOut' }}
            className="pointer-events-auto rounded-[4px] px-3 py-2 border border-[#E9E7E2] dark:border-[#323230] bg-[#FFFFFF] dark:bg-[#232321] text-[#2A2925] dark:text-[#D9D7D1] flex items-center justify-between gap-2.5 text-xs"
          >
            <div className="flex items-center gap-2 min-w-0 flex-1">
              {toast.type === 'warning' ? (
                <AlertCircle className="w-4 h-4 text-[#9E6229] shrink-0 stroke-[1.5]" />
              ) : toast.type === 'celebrate' || toast.type === 'success' ? (
                <Check className="w-4 h-4 text-[#2C6E56] dark:text-[#5AA88C] shrink-0 stroke-[1.5]" />
              ) : (
                <div className="w-1.5 h-1.5 rounded-full bg-[#6F6C66] dark:text-[#9A978F] shrink-0" />
              )}
              <span className="truncate font-normal">
                {toast.message}
              </span>
            </div>

            <div className="flex items-center gap-1.5 shrink-0">
              {toast.undoAction && (
                <button
                  type="button"
                  onClick={() => {
                    toast.undoAction?.();
                    removeToast(toast.id);
                  }}
                  className="inline-flex items-center gap-1 text-[11px] font-normal px-2 py-0.5 rounded-[3px] bg-[#F7F6F3] dark:bg-[#1C1C1A] text-[#2A2925] dark:text-[#D9D7D1] hover:bg-[#EFECE6] dark:hover:bg-[#2B2B28] transition-colors focus-ring"
                >
                  <Undo2 className="w-3 h-3 stroke-[1.5]" />
                  Undo
                </button>
              )}
              <button
                type="button"
                onClick={() => removeToast(toast.id)}
                className="text-[#6F6C66] dark:text-[#9A978F] hover:text-[#2A2925] dark:hover:text-[#D9D7D1] p-0.5 rounded-[3px] transition-colors focus-ring"
                aria-label="Close notification"
              >
                <X className="w-3 h-3 stroke-[1.5]" />
              </button>
            </div>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
};
