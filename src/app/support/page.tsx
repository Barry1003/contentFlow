import React from 'react';
import { ChatInterface } from '../../components/Support/ChatInterface';

export default function SupportPage() {
  return (
    <div className="h-screen bg-slate-50 dark:bg-slate-950 font-sans flex flex-col overflow-hidden">
      <div className="bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 px-6 py-4 flex items-center justify-between shadow-sm z-10">
        <div>
          <h1 className="text-xl font-bold text-slate-900 dark:text-white">Support Inbox</h1>
          <p className="text-sm text-slate-500 dark:text-slate-400">Manage buyer inquiries and messages</p>
        </div>
      </div>
      <div className="flex-1 overflow-hidden">
        <ChatInterface />
      </div>
    </div>
  );
}
