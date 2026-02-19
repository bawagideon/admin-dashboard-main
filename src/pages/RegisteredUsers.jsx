import React, { useState } from 'react';
import { Search, User, Edit2, Ban, CheckCircle, Clock, Users, Zap, AlertTriangle } from 'lucide-react';
import StatCard from '../components/StatsCard';
import { cn } from '../lib/utils';

const teams = [
    { id: 1, name: 'Team Alpha (Special Ops)', lead: 'Tunde Bakare', members: 5, workload: 45, status: 'Optimal', activeTasks: 3, lastActive: '10 mins ago' },
    { id: 2, name: 'Team Beta (Field Techs)', lead: 'Ngozi Obi', members: 8, workload: 85, status: 'Overloaded', activeTasks: 7, lastActive: '2 hours ago' },
    { id: 3, name: 'Team Gamma (Strategy)', lead: 'Emeka Okafor', members: 3, workload: 15, status: 'Underutilized', activeTasks: 1, lastActive: '1 day ago' },
];

export default function RegisteredUsers() {
    const [searchTerm, setSearchTerm] = useState('');

    const filteredTeams = teams.filter(t =>
        t.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        t.lead.toLowerCase().includes(searchTerm.toLowerCase())
    );

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
                <StatCard title="Total Teams" value="3" subtext="Active units" icon={Users} />
                <StatCard title="Avg Workload" value="48%" subtext="Across all teams" trend="up" icon={Zap} />
                <StatCard title="Capacity Alerts" value="1" subtext="Teams overloaded" icon={AlertTriangle} />
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
