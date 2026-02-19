import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ClipboardList, Package, Users, TrendingUp, Zap, FileText, CheckCircle, Mail, ShieldCheck } from 'lucide-react';
import { useRole } from '../lib/RoleContext';
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
    ScatterChart,
    Scatter
} from 'recharts';
import StatCard from '../components/StatsCard';

// Mock Data
const salesData = [
    { x: 10, y: 200 }, { x: 30, y: 400 }, { x: 45, y: 300 }, { x: 60, y: 550 },
    { x: 80, y: 700 }, { x: 100, y: 600 }, { x: 120, y: 800 }, { x: 150, y: 750 },
];

const categoryData = [
    { name: 'Unknown', value: 100 },
];

const LoadingBar = ({ percentage }) => (
    <div className="w-full bg-gray-100 rounded-full h-2.5 mt-2">
        <div
            className="bg-primary h-2.5 rounded-full"
            style={{ width: `${percentage}%` }}
        ></div>
    </div>
);

export default function Overview() {
    const navigate = useNavigate();
    const { activeRole, roles } = useRole();
    return (
        <div className="space-y-6">
            <h1 className="text-2xl font-bold text-slate-800">Dangote Service Management</h1>

            {/* Metrics Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
                <StatCard
                    title="Active Requests"
                    value="42"
                    subtext="+12% from last week"
                    trend="up"
                    icon={ClipboardList}
                />
                <StatCard
                    title="Pending Assignment"
                    value="8"
                    subtext="Requires Ops attention"
                    trend="down"
                    icon={Zap}
                />
                <StatCard
                    title="Service Types"
                    value="14"
                    subtext="Available in catalog"
                    icon={Package}
                />
                <StatCard
                    title="Team on Duty"
                    value="24"
                    subtext="Available for tasks"
                    icon={Users}
                />
            </div>

            {/* Charts Section */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Service Pipeline Overview */}
                <div className="lg:col-span-2 bg-white p-6 rounded-xl border border-gray-100 shadow-sm">
                    <h3 className="text-lg font-bold text-slate-800 mb-6">Fulfillment Throughput</h3>
                    <div className="h-80 w-full min-h-[320px]">
                        <ResponsiveContainer width="100%" height="100%">
                            <ScatterChart margin={{ top: 20, right: 20, bottom: 20, left: 20 }}>
                                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E2E8F0" />
                                <XAxis type="number" dataKey="x" name="stature" hide />
                                <YAxis type="number" dataKey="y" name="weight" axisLine={false} tickLine={false} tick={{ fill: '#64748B' }} />
                                <Tooltip cursor={{ strokeDasharray: '3 3' }} />
                                <Scatter name="Throughput" data={salesData} fill="#7c3aed" line shape="circle" />
                            </ScatterChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                {/* Service Distribution & Quick Actions */}
                <div className="space-y-6">
                    <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm flex flex-col">
                        <h3 className="text-lg font-bold text-slate-800 mb-6">Service Distribution</h3>
                        <div className="space-y-6">
                            <div>
                                <div className="flex justify-between text-sm font-medium text-slate-600 mb-1">
                                    <span>Industrial Logistics</span>
                                    <span>65%</span>
                                </div>
                                <LoadingBar percentage={65} />
                            </div>
                            <div>
                                <div className="flex justify-between text-sm font-medium text-slate-600 mb-1">
                                    <span>Resource Planning</span>
                                    <span>35%</span>
                                </div>
                                <LoadingBar percentage={35} />
                            </div>
                        </div>
                    </div>

                    {/* Quick Actions Widget */}
                    <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm">
                        <div className="flex items-center gap-2 mb-4">
                            <Zap className="w-5 h-5 text-yellow-500 fill-yellow-500" />
                            <h3 className="text-lg font-bold text-slate-800">Pipeline Actions</h3>
                        </div>
                        <div className="space-y-3">
                            {(activeRole === roles.ADMIN || activeRole === roles.MD) && (
                                <button
                                    onClick={() => navigate('/inbox')}
                                    className="w-full flex items-center justify-between px-4 py-3 bg-gray-50 hover:bg-gray-100 rounded-xl text-sm font-medium text-slate-700 transition group"
                                >
                                    <div className="flex items-center gap-3">
                                        <FileText className="w-4 h-4 text-blue-500" />
                                        Verify New Requests
                                    </div>
                                    <span className="text-[10px] bg-blue-100 text-blue-600 px-1.5 py-0.5 rounded font-black uppercase">Admin</span>
                                </button>
                            )}

                            {(activeRole === roles.ADMIN || activeRole === roles.OPS_MANAGER) && (
                                <button
                                    onClick={() => navigate('/orders')}
                                    className="w-full flex items-center justify-between px-4 py-3 bg-gray-50 hover:bg-gray-100 rounded-xl text-sm font-medium text-slate-700 transition group"
                                >
                                    <div className="flex items-center gap-3">
                                        <Zap className="w-4 h-4 text-yellow-500" />
                                        Assign Pending Tasks
                                    </div>
                                    <span className="text-[10px] bg-yellow-100 text-yellow-600 px-1.5 py-0.5 rounded font-black uppercase">Ops</span>
                                </button>
                            )}

                            {(activeRole === roles.ADMIN || activeRole === roles.MD) && (
                                <button
                                    onClick={() => navigate('/governance')}
                                    className="w-full flex items-center justify-between px-4 py-3 bg-slate-900 text-white hover:bg-slate-800 rounded-xl text-sm font-medium transition group shadow-lg shadow-slate-200"
                                >
                                    <div className="flex items-center gap-3">
                                        <ShieldCheck className="w-4 h-4 text-primary" />
                                        Review Completed Executions
                                    </div>
                                    <span className="text-[10px] bg-primary/20 text-primary px-1.5 py-0.5 rounded font-black uppercase">MD Final</span>
                                </button>
                            )}

                            {activeRole === roles.TEAM_MEMBER && (
                                <button
                                    onClick={() => navigate('/mission-control')}
                                    className="w-full flex items-center justify-between px-4 py-3 bg-primary text-white hover:bg-primary/90 rounded-xl text-sm font-medium transition group shadow-lg shadow-primary/20"
                                >
                                    <div className="flex items-center gap-3">
                                        <ClipboardList className="w-4 h-4" />
                                        Go to My Assignments
                                    </div>
                                </button>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
