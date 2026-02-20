import React, { useState, useEffect, useRef, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, Bell, Settings, Menu, Package, X, Check, RefreshCw, Trash2, Eye, ChevronRight, UserCircle, Zap, Users, CheckCircle, ShieldCheck } from 'lucide-react';
import { cn } from '../lib/utils';
import { useRole } from '../lib/RoleContext';
import { useWorkflow } from '../lib/WorkflowContext';
import { SERVICE_STATUS } from '../lib/constants';

export default function Header({ onMenuClick }) {
    const { activeRole, setActiveRole, roles } = useRole();
    const { orders } = useWorkflow();
    const [showNotifications, setShowNotifications] = useState(false);
    const [showRoleSelector, setShowRoleSelector] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const [showSearchDropdown, setShowSearchDropdown] = useState(false);
    const searchRef = useRef(null);
    const roleSelectorRef = useRef(null);

    const navigate = useNavigate();

    // Dynamic Blueprint-Aligned Notifications (Optimized with useMemo)
    const notifications = useMemo(() => {
        return orders
            .filter(o => o.isSessionAction) // Only show notifications for actions during this session
            .map(o => {
                if (o.status === SERVICE_STATUS.UNASSIGNED) return { id: o.id, text: 'Payment Confirmed', subtext: `Order ${o.orderId}: Stripe/PayPal hook received. Forwarding to Ops Manager.`, time: 'Just now', icon: 'zap' };
                if (o.status === SERVICE_STATUS.IN_PROGRESS) return { id: o.id, text: 'Task Assigned', subtext: `Ops Manager routed ${o.orderId} to ${o.assigned}.`, time: '10m ago', icon: 'user' };
                if (o.status === SERVICE_STATUS.OPS_REVIEW) return { id: o.id, text: 'Evidence Submitted', subtext: `${o.assigned} submitted profiling & documents for ${o.orderId}.`, time: '2h ago', icon: 'check' };
                if (o.status === SERVICE_STATUS.MD_APPROVAL) return { id: o.id, text: 'QA Approved', subtext: `Ops Manager vetted ${o.orderId} for final MD closure.`, time: '4h ago', icon: 'shield' };
                return null;
            }).filter(n => n !== null).slice(0, 5);
    }, [orders]);

    // Mock Search Results
    const searchResults = [
        { type: 'Request', label: 'Request #179 - Biliki', link: '/orders' },
        { type: 'Client', label: 'Biliki Okocha', link: '/customers' },
        { type: 'Service', label: 'Logistics Optimization', link: '/products' },
    ];

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (searchRef.current && !searchRef.current.contains(event.target)) {
                setShowSearchDropdown(false);
            }
            if (roleSelectorRef.current && !roleSelectorRef.current.contains(event.target)) {
                setShowRoleSelector(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    return (
        <header className="h-20 bg-white border-b border-gray-100 sticky top-0 z-30 w-full font-sans transition-all duration-300">
            <div className="max-w-7xl mx-auto h-full flex items-center justify-between px-3 md:px-10">
                <div className="flex items-center gap-2 md:gap-4 flex-1">
                    <button onClick={onMenuClick} className="md:hidden p-2 text-slate-500 hover:bg-gray-100 rounded-lg">
                        <Menu className="w-5 h-5" />
                    </button>
                    <h2 className="text-xl md:text-2xl font-bold text-primary uppercase tracking-widest hidden md:block">Dashboard</h2>
                    <h2 className="text-lg font-bold text-primary uppercase tracking-widest md:hidden">Dangote</h2>
                </div>

                <div className="flex items-center gap-3 md:gap-6">
                    {/* Search Bar */}
                    <div className="relative hidden md:block w-96" ref={searchRef}>
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                        <input
                            type="text"
                            placeholder="Search orders, customers..."
                            className="w-full bg-gray-50 border border-transparent focus:border-primary/20 focus:bg-white text-slate-700 rounded-lg pl-10 pr-4 py-2.5 outline-none transition-all duration-200 placeholder:text-slate-400"
                            value={searchQuery}
                            onChange={(e) => {
                                setSearchQuery(e.target.value);
                                setShowSearchDropdown(e.target.value.length > 0);
                            }}
                            onFocus={() => { if (searchQuery) setShowSearchDropdown(true) }}
                        />

                        {/* Advanced Search Dropdown */}
                        {showSearchDropdown && (
                            <div className="absolute top-full mt-2 w-full bg-white rounded-xl shadow-xl border border-gray-100 overflow-hidden animate-in fade-in slide-in-from-top-1 duration-200">
                                <div className="p-2">
                                    <h4 className="text-xs font-bold text-slate-400 uppercase px-3 py-2">Quick Results</h4>
                                    {searchResults.map((result, idx) => (
                                        <div key={idx} className="flex items-center justify-between px-3 py-2 hover:bg-gray-50 rounded-lg cursor-pointer group transition">
                                            <div className="flex items-center gap-3">
                                                <span className={cn(
                                                    "text-xs font-bold px-2 py-1 rounded",
                                                    result.type === 'Order' ? "bg-blue-100 text-blue-700" :
                                                        result.type === 'Customer' ? "bg-purple-100 text-purple-700" : "bg-green-100 text-green-700"
                                                )}>
                                                    {result.type}
                                                </span>
                                                <span className="text-sm text-slate-700 font-medium group-hover:text-primary">{result.label}</span>
                                            </div>
                                            <ChevronRight className="w-4 h-4 text-slate-400 group-hover:text-primary" />
                                        </div>
                                    ))}
                                    <div className="border-t border-gray-100 mt-2 pt-2 pb-1">
                                        <button className="text-xs text-center w-full text-slate-500 hover:text-primary font-medium">View all results for "{searchQuery}"</button>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Icons */}
                    <div className="flex items-center gap-3">
                        {/* Role Selector */}
                        <div className="relative mr-0 md:mr-2" ref={roleSelectorRef}>
                            <button
                                onClick={() => setShowRoleSelector(!showRoleSelector)}
                                className={cn(
                                    "flex items-center gap-2 px-2 md:px-3 py-1.5 rounded-lg border border-gray-200 text-[10px] md:text-xs font-bold transition-all",
                                    "hover:bg-gray-50 text-slate-600 bg-white shadow-sm"
                                )}
                            >
                                <UserCircle className="w-4 h-4 text-primary" />
                                <span className="hidden md:inline">Viewing as:</span>
                                <span className="text-primary truncate max-w-[50px] sm:max-w-none">{activeRole}</span>
                            </button>

                            {showRoleSelector && (
                                <>
                                    <div className="fixed inset-0 z-10" onClick={() => setShowRoleSelector(false)}></div>
                                    <div className="absolute right-0 top-full mt-2 w-56 bg-white rounded-xl shadow-2xl border border-gray-100 z-20 animate-in fade-in slide-in-from-top-2 duration-200">
                                        <div className="p-2">
                                            <h4 className="text-[10px] font-bold text-slate-400 uppercase px-3 py-2">Select Perspective</h4>
                                            {Object.values(roles).map((role) => (
                                                <button
                                                    key={role}
                                                    onClick={() => {
                                                        setActiveRole(role);
                                                        navigate("/");
                                                        setShowRoleSelector(false);
                                                    }}
                                                    className={cn(
                                                        "w-full flex items-center justify-between px-3 py-2 rounded-lg text-sm transition",
                                                        activeRole === role
                                                            ? "bg-primary/10 text-primary font-bold"
                                                            : "text-slate-600 hover:bg-gray-50"
                                                    )}
                                                >
                                                    {role}
                                                    {activeRole === role && <Check className="w-4 h-4" />}
                                                </button>
                                            ))}
                                        </div>
                                    </div>
                                </>
                            )}
                        </div>

                        {/* Notification Dropdown */}
                        <div className="relative">
                            <button
                                onClick={() => setShowNotifications(!showNotifications)}
                                className={cn("p-2 text-slate-500 hover:bg-gray-50 rounded-full transition-colors relative", showNotifications && "bg-gray-50 text-slate-800")}
                            >
                                <Bell className="w-6 h-6" />
                                <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border border-white"></span>
                            </button>

                            {showNotifications && (
                                <>
                                    <div className="fixed inset-0 z-10" onClick={() => setShowNotifications(false)}></div>
                                    <div className="absolute top-full mt-2 w-[85vw] md:w-96 bg-white rounded-xl shadow-2xl border border-gray-100 z-20 animate-in fade-in slide-in-from-top-2 duration-200 -right-12 md:right-0">
                                        <div className="p-4 border-b border-gray-100 flex justify-between items-center">
                                            <div className="flex items-center gap-2">
                                                <span className="font-bold text-lg text-slate-800">Operational Alerts ({notifications.length})</span>
                                            </div>
                                            <button className="text-xs text-primary/70 hover:text-primary font-medium hover:underline">Mark All Read</button>
                                        </div>
                                        <div className="max-h-[400px] overflow-y-auto">
                                            {notifications.map((notif) => (
                                                <div key={notif.id} className="p-4 border-b border-gray-50 hover:bg-gray-50 transition cursor-pointer group">
                                                    <div className="flex items-start gap-4">
                                                        <div className="p-2 bg-gray-100 rounded-lg text-slate-400 group-hover:bg-white group-hover:shadow-sm transition">
                                                            {notif.icon === 'zap' && <Zap className="w-5 h-5 text-yellow-500" />}
                                                            {notif.icon === 'user' && <Users className="w-5 h-5 text-blue-500" />}
                                                            {notif.icon === 'check' && <CheckCircle className="w-5 h-5 text-green-500" />}
                                                            {notif.icon === 'shield' && <ShieldCheck className="w-5 h-5 text-primary" />}
                                                            {!['zap', 'user', 'check', 'shield'].includes(notif.icon) && <Package className="w-5 h-5" />}
                                                        </div>
                                                        <div className="flex-1">
                                                            <div className="flex justify-between items-start mb-1">
                                                                <h4 className="font-bold text-sm text-slate-800">{notif.text}</h4>
                                                                <span className="text-xs text-slate-400">{notif.time}</span>
                                                            </div>
                                                            <p className="text-xs text-slate-500 leading-relaxed line-clamp-2">{notif.subtext}</p>
                                                        </div>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                        <div className="p-3 text-center border-t border-gray-100">
                                            <button className="text-sm font-semibold text-primary hover:text-primary-hover flex items-center justify-center w-full">
                                                View All Requests
                                            </button>
                                        </div>
                                    </div>
                                </>
                            )}
                        </div>

                        <button className="p-2 text-slate-500 hover:bg-gray-50 rounded-full transition-colors hidden md:block">
                            <Settings className="w-6 h-6" />
                        </button>

                        {/* User Profile */}
                        <div className="w-8 h-8 md:w-10 md:h-10 bg-primary rounded-full flex items-center justify-center text-white font-semibold shadow-md shadow-primary/30 cursor-pointer hover:opacity-90 transition transform hover:scale-105">
                            AD
                        </div>
                    </div>
                </div>
            </div>
        </header>
    );
}
