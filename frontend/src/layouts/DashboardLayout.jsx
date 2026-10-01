import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import { Navbar } from '../components/common/Navbar';
import { Sidebar } from '../components/common/Sidebar';
import { NotificationToastContainer } from '../components/common/NotificationCenter';
import { AIChatModal } from '../components/ai/AIChatModal';
import { CustomCursor } from '../components/common/CustomCursor';

export function DashboardLayout() {
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[#050811] text-slate-100 font-sans flex flex-col antialiased">
      {/* Laser Custom Cursor */}
      <CustomCursor />

      {/* Top Navbar */}
      <Navbar onToggleMobileSidebar={() => setMobileSidebarOpen(!mobileSidebarOpen)} />

      {/* Content Area with Sidebar */}
      <div className="flex-1 flex overflow-hidden">
        {/* Sidebar Navigation */}
        <Sidebar
          mobileOpen={mobileSidebarOpen}
          onCloseMobile={() => setMobileSidebarOpen(false)}
        />

        {/* Main Dashboard Screen View */}
        <main className="flex-1 overflow-y-auto bg-[#050811] cyber-grid-bg relative">
          <Outlet />
        </main>
      </div>

      {/* Persistent AI Assistant Floating Button & HUD Modal */}
      <AIChatModal floating={true} />

      {/* Real-Time Toast Alerts */}
      <NotificationToastContainer />
    </div>
  );
}
