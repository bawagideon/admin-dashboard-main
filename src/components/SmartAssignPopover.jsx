import React from 'react';
import { Users, Zap, CheckCircle2, AlertCircle } from 'lucide-react';
import { cn } from '../lib/utils';

export default function SmartAssignPopover({ request, onAssign, onClose }) {
    const teams = [
        { id: 1, name: 'Team Alpha (Special Ops)', workload: 45, expertise: ['Pipeline', 'Audit'], status: 'Available' },
        { id: 2, name: 'Team Beta (Field Techs)', workload: 85, expertise: ['Maintenance', 'Repair'], status: 'Busy' },
        { id: 3, name: 'Team Gamma (Strategy)', workload: 15, expertise: ['Planning', 'Compliance'], status: 'Available' },
    ];

    // Suggestion logic based on workload and service match
    const getSuggestion = (team) => {
        if (team.workload < 50 && team.expertise.some(e => request.service.includes(e))) {
            return { label: 'Optimal Match', color: 'text-green-500 bg-green-50' };
        }
        if (team.workload > 80) {
            return { label: 'Overloaded', color: 'text-red-500 bg-red-50' };
        }
        return null;
    };

    return (
        <div className="absolute right-0 top-10 w-80 bg-white rounded-2xl border border-gray-100 shadow-2xl z-50 overflow-hidden animate-in fade-in slide-in-from-top-2 duration-200">
            <div className="p-4 border-b border-gray-50 bg-slate-50 flex items-center justify-between">
                <div>
                    <h4 className="text-sm font-bold text-slate-800 flex items-center gap-2">
                        <Zap className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                        Smart Assign Suggestions
                    </h4>
                    <p className="text-[10px] text-slate-500 mt-0.5">Recommended based on team availability</p>
                </div>
            </div>

            <div className="p-2 max-h-80 overflow-y-auto">
                {teams.map((team) => {
                    const suggestion = getSuggestion(team);
                    return (
                        <button
                            key={team.id}
                            onClick={() => onAssign(team.name)}
                            className="w-full text-left p-3 rounded-xl hover:bg-gray-50 transition border border-transparent hover:border-gray-100 group mb-1 last:mb-0"
                        >
                            <div className="flex justify-between items-start mb-2">
                                <div className="flex items-center gap-2">
                                    <Users className="w-4 h-4 text-slate-400 group-hover:text-primary" />
                                    <span className="text-xs font-bold text-slate-700">{team.name}</span>
                                </div>
                                {suggestion && (
                                    <span className={cn("text-[9px] font-black px-1.5 py-0.5 rounded uppercase tracking-wider", suggestion.color)}>
                                        {suggestion.label}
                                    </span>
                                )}
                            </div>

                            <div className="flex items-center gap-3">
                                <div className="flex-1 h-1.5 bg-gray-100 rounded-full overflow-hidden">
                                    <div
                                        className={cn(
                                            "h-full rounded-full transition-all duration-500",
                                            team.workload > 80 ? 'bg-red-500' : team.workload > 50 ? 'bg-yellow-500' : 'bg-green-500'
                                        )}
                                        style={{ width: `${team.workload}%` }}
                                    ></div>
                                </div>
                                <span className="text-[10px] font-mono text-slate-400">{team.workload}%</span>
                            </div>

                            <div className="mt-2 flex flex-wrap gap-1">
                                {team.expertise.map(exp => (
                                    <span key={exp} className="text-[9px] bg-slate-100 text-slate-500 px-1.5 py-0.5 rounded">
                                        {exp}
                                    </span>
                                ))}
                            </div>
                        </button>
                    );
                })}
            </div>

            <div className="p-3 bg-gray-50 flex justify-end border-t border-gray-100">
                <button
                    onClick={onClose}
                    className="text-[11px] font-bold text-slate-400 hover:text-slate-600 px-3 py-1.5"
                >
                    Cancel
                </button>
            </div>
        </div>
    );
}
