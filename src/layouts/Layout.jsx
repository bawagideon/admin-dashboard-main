import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import Header from '../components/Header';
import { cn } from '../lib/utils';

export default function Layout() {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    return (
        <div className="min-h-screen bg-gray-50 flex font-sans">
            <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />

            <div className={cn(
                "flex-1 flex flex-col min-h-screen transition-all duration-300 ease-in-out w-full",
                "ml-0 md:ml-64"
            )}>
                <Header onMenuClick={() => setIsSidebarOpen(true)} />
                <main className="flex-1 p-4 md:p-8 overflow-y-auto w-full max-w-[100vw]">
                    <Outlet />
                </main>
            </div>
        </div>
    );
}
