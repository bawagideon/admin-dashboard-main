import React from 'react';
import { NavLink } from 'react-router-dom';
import {
    LayoutDashboard,
    ShoppingCart,
    Users,
    X,
    ClipboardList,
    Inbox,
    Activity,
    Package,
    ShieldCheck,
    Sparkles
} from 'lucide-react';
import { useRole } from '../lib/RoleContext';
import { cn } from '../lib/utils';

export default function Sidebar({ isOpen, onClose }) {
    const { activeRole, roles } = useRole();

    const sidebarItems = [
        { icon: LayoutDashboard, label: 'Overview', path: '/' },
        // Role-Specific Items
        ...(activeRole === roles.ADMIN ? [
            { icon: Inbox, label: 'Admin Inbox', path: '/inbox' },
            { icon: Package, label: 'Service Catalog', path: '/products' },
            { icon: ShoppingCart, label: 'Service Requests', path: '/orders' }
        ] : []),
        ...(activeRole === roles.OPS_MANAGER ? [
            { icon: ShoppingCart, label: 'Service Requests', path: '/orders' },
            { icon: Users, label: 'Team Workload', path: '/users' },
            { icon: Package, label: 'Service Catalog', path: '/products' }
        ] : []),
        ...(activeRole === roles.TEAM_MEMBER ? [
            { icon: ClipboardList, label: 'Mission Control', path: '/mission-control' }
        ] : []),
        ...(activeRole === roles.MD ? [
            { icon: ShieldCheck, label: 'Executive Governance', path: '/governance' },
            { icon: Users, label: 'Clients', path: '/customers' },
            { icon: ShoppingCart, label: 'Service Requests', path: '/orders' }
        ] : []),
    ];

    const restartTour = () => {
        localStorage.removeItem('hasSeenWorkflowTour');
        window.dispatchEvent(new Event('restart-tour'));
        if (window.innerWidth < 1024) {
            onClose();
        }
    };

    return (
        <>
            {/* Mobile Overlay */}
            {isOpen && (
                <div
                    className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm z-40 lg:hidden"
                    onClick={onClose}
                />
            )}

            <aside className={cn(
                "fixed inset-y-0 left-0 z-50 w-72 bg-slate-900 text-slate-400 transition-transform duration-300 transform lg:translate-x-0 border-r border-slate-800",
                isOpen ? "translate-x-0" : "-translate-x-full"
            )}>
                <div className="flex flex-col h-full">
                    {/* Header */}
                    <div className="h-20 flex items-center justify-between px-6 border-b border-slate-800">
                        <div className="flex items-center gap-3">
                            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                                <span className="text-white font-black">D</span>
                            </div>
                            <span className="text-white font-bold text-lg tracking-tight">Dangote Services</span>
                        </div>
                        <button onClick={onClose} className="lg:hidden p-2 hover:bg-slate-800 rounded-lg transition-colors">
                            <X className="w-5 h-5" />
                        </button>
                    </div>

                    {/* Navigation */}
                    <nav className="flex-1 px-4 py-4 space-y-1 overflow-y-auto">
                        {sidebarItems.map((item) => (
                            <NavLink
                                key={item.path}
                                to={item.path}
                                onClick={() => {
                                    if (window.innerWidth < 1024) {
                                        onClose();
                                    }
                                }}
                                className={({ isActive }) =>
                                    cn(
                                        "flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 group font-medium text-sm",
                                        isActive
                                            ? "bg-primary/10 text-primary shadow-sm"
                                            : "text-slate-400 hover:bg-slate-800 hover:text-white"
                                    )
                                }
                            >
                                <item.icon className="w-5 h-5" />
                                {item.label}
                            </NavLink>
                        ))}
                    </nav>

                    {/* Footer / System Health */}
                    <div className="p-4 border-t border-slate-800 space-y-3">
                        <button
                            onClick={restartTour}
                            className="w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 group font-medium text-xs text-primary bg-primary/5 hover:bg-primary/10 border border-primary/20"
                        >
                            <Sparkles className="w-4 h-4" />
                            Presentation Tour
                        </button>

                        <NavLink
                            to="/audit-logs"
                            onClick={() => {
                                if (window.innerWidth < 1024) {
                                    onClose();
                                }
                            }}
                            className={({ isActive }) =>
                                cn(
                                    "flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 group font-medium text-xs",
                                    isActive
                                        ? "bg-primary/10 text-primary"
                                        : "text-slate-500 hover:bg-slate-800 hover:text-slate-300"
                                )
                            }
                        >
                            <Activity className="w-4 h-4" />
                            System Health
                        </NavLink>

                        <div className="bg-slate-800/50 text-green-500 px-4 py-3 rounded-xl flex items-center gap-3 w-full text-[10px] font-bold border border-slate-800 uppercase tracking-tighter">
                            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse shadow-[0_0_8px_rgba(34,197,94,0.6)]"></div>
                            All Systems Operational
                        </div>
                    </div>
                </div>
            </aside>
        </>
    );
}
