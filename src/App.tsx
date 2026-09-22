"use client";
/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { Sidebar } from './components/Navigation/Sidebar';
import { BottomNav } from './components/Navigation/BottomNav';
import { Header } from './components/Header/Header';
import { CalendarView } from './components/Calendar/CalendarView';
import { BoardView } from './components/Board/BoardView';
import { TodayView } from './components/Today/TodayView';
import { ContentStudioView } from './components/Studio/ContentStudioView';
import { IdeasBankView } from './components/Ideas/IdeasBankView';
import { DashboardView } from './components/Dashboard/DashboardView';
import { SettingsView } from './components/Settings/SettingsView';
import { PostModal } from './components/PostModal/PostModal';
import { AiIdeaGeneratorModal } from './components/AI/AiIdeaGeneratorModal';
import { AiMonthPlannerModal } from './components/AI/AiMonthPlannerModal';

const AppLayout: React.FC = () => {
  const { activeTab } = useApp();

  return (
    <div className="flex h-screen w-screen overflow-hidden bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-50 font-sans antialiased">
      {/* Desktop Sidebar */}
      <Sidebar />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col h-full min-w-0 overflow-hidden relative">
        <Header />

        <main className="flex-1 flex flex-col min-h-0 overflow-hidden pb-16 md:pb-0">
          {activeTab === 'today' && <TodayView />}
          {activeTab === 'calendar' && <CalendarView />}
          {activeTab === 'board' && <BoardView />}
          {activeTab === 'studio' && <ContentStudioView />}
          {activeTab === 'ideas' && <IdeasBankView />}
          {(activeTab === 'dashboard' || activeTab === 'analytics' || activeTab === 'insights') && <DashboardView />}
          {activeTab === 'settings' && <SettingsView />}
        </main>
      </div>

      {/* Mobile Bottom Navigation */}
      <BottomNav />

      {/* Global Modals */}
      <PostModal />
      <AiIdeaGeneratorModal />
      <AiMonthPlannerModal />
    </div>
  );
};

import { SignedIn, RedirectToSignIn } from '@neondatabase/neon-js/auth/react';

export default function App({ initialPosts, initialIdeas, initialSettings }: any) {
  return (
    <>
      <SignedIn>
        <AppProvider initialPosts={initialPosts} initialIdeas={initialIdeas} initialSettings={initialSettings}>
          <AppLayout />
        </AppProvider>
      </SignedIn>
      <RedirectToSignIn />
    </>
  );
}
