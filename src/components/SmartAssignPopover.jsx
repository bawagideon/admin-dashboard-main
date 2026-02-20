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
        <div className="absolute right-0 bottom-full mb-4 w-[340px] bg-white rounded-[2rem] border border-gray-100 shadow-[0_20px_70px_-15px_rgba(0,0,0,0.15)] z-[100] animate-in fade-in slide-in-from-bottom-4 zoom-in-95 duration-300">
            {/* Subtle Arrow */}
            <div className="absolute -bottom-2 right-12 w-4 h-4 bg-white rotate-45 border-b border-r border-gray-100 shadow-[5px_5px_10px_rgba(0,0,0,0.02)]" />

            <div className="p-5 border-b border-gray-50 bg-slate-50/50 backdrop-blur-sm rounded-t-[2rem]">
                <div className="flex items-center justify-between">
                    <div>
                        <h4 className="text-[11px] font-black text-primary uppercase tracking-[0.15em] flex items-center gap-2">
                            <Zap className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                            Smart Recommendations
                        </h4>
                        <p className="text-[10px] text-slate-400 font-medium mt-1 uppercase tracking-wider">Based on Real-time Workload</p>
                    </div>
                    <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                        <Users className="w-4 h-4 text-primary" />
                    </div>
                </div>
            </div>

            <div className="p-3 max-h-[360px] overflow-y-auto custom-scrollbar">
                {teams.map((team) => {
                    const suggestion = getSuggestion(team);
                    return (
                        <button
                            key={team.id}
                            onClick={() => onAssign(team.name)}
                            className="w-full text-left p-4 rounded-2xl hover:bg-slate-50 transition-all border border-transparent hover:border-slate-100 group mb-2 last:mb-0 relative overflow-hidden"
                        >
                            <div className="flex justify-between items-start mb-3">
                                <div className="space-y-0.5">
                                    <span className="text-xs font-black text-slate-800 group-hover:text-primary transition-colors">{team.name}</span>
                                    <div className="flex items-center gap-2">
                                        <div className={cn(
                                            "w-1.5 h-1.5 rounded-full animate-pulse",
                                            team.status === 'Available' ? 'bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.5)]' : 'bg-yellow-500'
                                        )} />
                                        <span className="text-[9px] text-slate-400 font-medium uppercase tracking-widest">{team.status}</span>
                                    </div>
                                </div>
                                {suggestion && (
                                    <span className={cn(
                                        "text-[8px] font-black px-2 py-1 rounded-lg uppercase tracking-widest border shadow-sm",
                                        suggestion.color.includes('green') ? 'bg-emerald-50 border-emerald-100 text-emerald-600' : 'bg-red-50 border-red-100 text-red-600'
                                    )}>
                                        {suggestion.label}
                                    </span>
                                )}
                            </div>

                            {/* Workload Metric */}
                            <div className="space-y-2">
                                <div className="flex justify-between items-center text-[9px] font-black uppercase tracking-tighter">
                                    <span className="text-slate-400">Current Load</span>
                                    <span className={cn(team.workload > 80 ? 'text-red-500' : 'text-slate-600')}>{team.workload}%</span>
                                </div>
                                <div className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden p-[1px]">
                                    <div
                                        className={cn(
                                            "h-full rounded-full transition-all duration-1000 ease-out shadow-sm",
                                            team.workload > 80 ? 'bg-gradient-to-r from-red-400 to-red-600' :
                                                team.workload > 50 ? 'bg-gradient-to-r from-yellow-400 to-orange-500' :
                                                    'bg-gradient-to-r from-emerald-400 to-primary'
                                        )}
                                        style={{ width: `${team.workload}%` }}
                                    ></div>
                                </div>
                            </div>

                            {/* Expertise Tags */}
                            <div className="mt-3 flex flex-wrap gap-1.5">
                                {team.expertise.map(exp => (
                                    <span key={exp} className="text-[8px] font-bold bg-white text-slate-500 px-2 py-0.5 rounded-md border border-slate-100 shadow-sm group-hover:border-primary/20 group-hover:text-primary transition-colors">
                                        {exp}
                                    </span>
                                ))}
                            </div>
                        </button>
                    );
                })}
            </div>

            <div className="p-4 bg-slate-900 flex justify-between items-center rounded-b-[2rem]">
                <span className="text-[9px] font-bold text-slate-500 uppercase tracking-[0.2em] italic">Precision Routing v2</span>
                <button
                    onClick={onClose}
                    className="text-[10px] font-black text-white px-5 py-2 hover:bg-white/10 rounded-xl transition-all uppercase tracking-widest"
                >
                    Dismiss
                </button>
            </div>
        </div>
    );
}
