import React, { useState } from 'react';
import { Search, User, Edit2, Ban, CheckCircle, Clock, Users, Zap, AlertTriangle } from 'lucide-react';
import StatCard from '../components/StatsCard';
import { cn } from '../lib/utils';
import { useWorkflow } from '../lib/WorkflowContext';
import { SERVICE_STATUS, TEAM_SUGGESTIONS } from '../lib/constants';

export default function RegisteredUsers() {
    const { orders } = useWorkflow();
    const [searchTerm, setSearchTerm] = useState('');

    // Dynamic Team Capacity & Workload Calculation
    const dynamicTeams = TEAM_SUGGESTIONS.map(team => {
        const teamOrders = orders.filter(o => o.assigned === team.name);
        const activeTasks = teamOrders.filter(o =>
            o.status === SERVICE_STATUS.IN_PROGRESS ||
            o.status === SERVICE_STATUS.OPS_REVIEW
        ).length;

        // Baseline capacity of 5 tasks per team
        const workload = Math.min(Math.round((activeTasks / 5) * 100), 100);

        return {
            ...team,
            members: 5, // Simulated member count
            activeTasks,
            workload,
            status: workload > 80 ? 'Overloaded' : workload > 40 ? 'Optimal' : 'Underutilized',
            lastActive: teamOrders.length > 0 ? 'Active Today' : 'No recent tasks'
        };
    });

    const filteredTeams = dynamicTeams.filter(t =>
        t.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        t.lead.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const avgWorkload = Math.round(dynamicTeams.reduce((acc, t) => acc + t.workload, 0) / dynamicTeams.length);
    const capacityAlerts = dynamicTeams.filter(t => t.status === 'Overloaded').length;

    return (
        <div className="space-y-6">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-slate-800">Team Workload Management</h1>
                    <p className="text-slate-500 text-sm">Real-time resource allocation and capacity monitoring</p>
                </div>
                <div className="relative w-full md:w-80">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
                    <input
                        type="text"
                        placeholder="Search teams or leads..."
                        className="w-full pl-9 pr-4 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-primary/50 text-slate-600"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>
            </div>

            {/* Metrics */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <StatCard title="Total Teams" value={dynamicTeams.length.toString()} subtext="Active units" icon={Users} />
                <StatCard title="Avg Workload" value={`${avgWorkload}%`} subtext="Across all teams" trend={avgWorkload > 50 ? "up" : "down"} icon={Zap} />
                <StatCard title="Capacity Alerts" value={capacityAlerts.toString()} subtext="Teams overloaded" icon={AlertTriangle} />
            </div>

            <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse min-w-[900px]">
                        <thead>
                            <tr className="bg-gray-50 border-b border-gray-100">
                                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase">Team & Lead</th>
                                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase">Current Workload</th>
                                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase">Status</th>
                                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase">Active Tasks</th>
                                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase">Last Activity</th>
                                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                            {filteredTeams.map((team) => (
                                <tr key={team.id} className="hover:bg-gray-50 transition">
                                    <td className="px-6 py-4">
                                        <div className="flex items-center gap-3">
                                            <div className="w-10 h-10 bg-slate-900 rounded-lg flex items-center justify-center text-white font-bold text-xs">
                                                T{team.id}
                                            </div>
                                            <div className="flex flex-col">
                                                <span className="font-bold text-slate-800 text-sm">{team.name}</span>
                                                <span className="text-xs text-slate-400">Lead: {team.lead} • {team.members} members</span>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="w-full max-w-[150px] space-y-1.5">
                                            <div className="flex justify-between text-[10px] font-mono text-slate-500">
                                                <span>{team.workload}% Cap</span>
                                            </div>
                                            <div className="h-1.5 w-full bg-gray-100 rounded-full overflow-hidden">
                                                <div
                                                    className={cn(
                                                        "h-full rounded-full transition-all duration-500",
                                                        team.workload > 80 ? 'bg-red-500' : team.workload > 50 ? 'bg-yellow-500' : 'bg-primary'
                                                    )}
                                                    style={{ width: `${team.workload}%` }}
                                                />
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <span className={`inline-flex items-center px-2 py-1 rounded-full text-[10px] font-bold border uppercase tracking-wider ${team.status === 'Optimal' ? 'bg-green-50 text-green-700 border-green-200' :
                                            team.status === 'Overloaded' ? 'bg-red-50 text-red-700 border-red-200' :
                                                'bg-blue-50 text-blue-700 border-blue-200'
                                            }`}>
                                            {team.status}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 text-sm font-bold text-slate-700">
                                        {team.activeTasks} Tasks
                                    </td>
                                    <td className="px-6 py-4 text-xs text-slate-500 flex items-center gap-1.5 align-middle h-full">
                                        <Clock className="w-3 h-3" /> {team.lastActive}
                                    </td>
                                    <td className="px-6 py-4">
                                        <button className="text-primary hover:text-primary/80 font-bold text-xs transition">
                                            View Schedule
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
