import React, { useState } from 'react';
import { Outlet, useLocation, Navigate } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import Header from '../components/Header';
import { cn } from '../lib/utils';
import { useRole } from '../lib/RoleContext';

export default function Layout() {
    const { activeRole, roles } = useRole();
    const location = useLocation();
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    // [Role Security] Restrict /governance to MD role only
    if (location.pathname === '/governance' && activeRole !== roles.MD) {
        return <Navigate to="/" replace />;
    }

    return (
        <div className="min-h-screen bg-gray-50 flex font-sans">
            <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />

            <div className={cn(
                "flex-1 flex flex-col min-h-screen transition-all duration-300 ease-in-out w-full",
                "ml-0 md:ml-64"
            )}>
                <Header onMenuClick={() => setIsSidebarOpen(true)} />
                <main className="flex-1 p-4 md:p-10 overflow-y-auto w-full max-w-[100vw]">
                    <div className="max-w-7xl mx-auto">
                        <Outlet />
                    </div>
                </main>
            </div>
        </div>
    );
}
