import { Users, Zap, CheckCircle2, AlertCircle, X } from 'lucide-react';
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
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            {/* Backdrop for all resolutions */}
            <div
                className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-300"
                onClick={onClose}
            />

            <div className={cn(
                "relative z-[110] bg-white rounded-[2.5rem] border border-gray-100 shadow-[0_30px_90px_-20px_rgba(0,0,0,0.3)] animate-in fade-in zoom-in-95 duration-300",
                "w-full max-w-lg overflow-hidden flex flex-col max-h-[90vh]"
            )}>
                {/* Header Section */}
                <div className="p-6 border-b border-gray-50 bg-slate-50/50 backdrop-blur-sm">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-2xl bg-primary/10 flex items-center justify-center text-primary shadow-sm">
                                <Zap className="w-5 h-5 text-yellow-500 fill-yellow-500" />
                            </div>
                            <div>
                                <h4 className="text-xs font-black text-primary uppercase tracking-[0.2em]">
                                    Smart Recommendations
                                </h4>
                                <p className="text-[10px] text-slate-400 font-medium mt-1 uppercase tracking-wider">Precision Routing v2.1</p>
                            </div>
                        </div>
                        <button
                            onClick={onClose}
                            className="w-10 h-10 rounded-xl hover:bg-slate-100 flex items-center justify-center text-slate-400 hover:text-slate-600 transition-all border border-transparent hover:border-slate-100"
                        >
                            <X className="w-5 h-5" />
                        </button>
                    </div>
                </div>

                {/* Team Selection Area */}
                <div className="p-4 overflow-y-auto custom-scrollbar flex-1">
                    {teams.map((team) => {
                        const suggestion = getSuggestion(team);
                        return (
                            <button
                                key={team.id}
                                onClick={() => onAssign(team.name)}
                                className="w-full text-left p-5 rounded-3xl hover:bg-slate-50 transition-all border border-transparent hover:border-slate-200 group mb-3 last:mb-0 relative overflow-hidden"
                            >
                                <div className="flex justify-between items-start mb-4">
                                    <div className="space-y-1">
                                        <span className="text-base font-black text-slate-800 group-hover:text-primary transition-colors">{team.name}</span>
                                        <div className="flex items-center gap-2">
                                            <div className={cn(
                                                "w-2 h-2 rounded-full animate-pulse",
                                                team.status === 'Available' ? 'bg-emerald-500 shadow-[0_0_10px_rgba(16,185,129,0.5)]' : 'bg-yellow-500'
                                            )} />
                                            <span className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">{team.status}</span>
                                        </div>
                                    </div>
                                    {suggestion && (
                                        <span className={cn(
                                            "text-[9px] font-black px-3 py-1.5 rounded-xl uppercase tracking-widest border shadow-sm",
                                            suggestion.color.includes('green') ? 'bg-emerald-50 border-emerald-100 text-emerald-600' : 'bg-red-50 border-red-100 text-red-600'
                                        )}>
                                            {suggestion.label}
                                        </span>
                                    )}
                                </div>

                                {/* Workload Metric */}
                                <div className="space-y-3">
                                    <div className="flex justify-between items-center text-[10px] font-black uppercase tracking-widest">
                                        <span className="text-slate-400">Current Load Efficiency</span>
                                        <span className={cn(team.workload > 80 ? 'text-red-500' : 'text-slate-600')}>{team.workload}%</span>
                                    </div>
                                    <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden p-[1px]">
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
                                <div className="mt-4 flex flex-wrap gap-2">
                                    {team.expertise.map(exp => (
                                        <span key={exp} className="text-[9px] font-bold bg-white text-slate-500 px-3 py-1 rounded-lg border border-slate-100 shadow-sm group-hover:border-primary/20 group-hover:text-primary transition-colors">
                                            {exp}
                                        </span>
                                    ))}
                                </div>
                            </button>
                        );
                    })}
                </div>

                {/* Footer Section */}
                <div className="p-5 bg-slate-900 flex justify-between items-center">
                    <span className="text-[10px] font-bold text-slate-500 uppercase tracking-[0.25em] italic">Enterprise Assignment Engine</span>
                    <button
                        onClick={onClose}
                        className="text-[11px] font-black text-white px-6 py-2.5 hover:bg-white/10 rounded-2xl transition-all uppercase tracking-widest border border-white/10 hover:border-white/20"
                    >
                        Dismiss
                    </button>
                </div>
            </div>
        </div>
    );
}
