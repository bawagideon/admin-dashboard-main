import React, { useState } from 'react';
import {
    ClipboardCheck,
    FileUp,
    Send,
    AlertCircle,
    Clock,
    CheckCircle2,
    MessageSquare,
    Zap
} from 'lucide-react';
import { cn } from '../lib/utils';
import RequestTimeline from '../components/RequestTimeline';
import { useWorkflow } from '../lib/WorkflowContext';
import { SERVICE_STATUS } from '../lib/constants';
import MissionControlTour from '../components/tours/MissionControlTour';
import { toast } from 'sonner';

export default function SpecialistWorkspace() {
    const { orders, updateOrder, transitionOrder } = useWorkflow();
    const tasks = orders.filter(o => o.status === SERVICE_STATUS.IN_PROGRESS);
    const [selectedTaskIdx, setSelectedTaskIdx] = useState(0);
    const activeTask = tasks[selectedTaskIdx];

    const toggleCheck = (itemId) => {
        const updatedChecklist = activeTask.checklist.map(c =>
            c.id === itemId ? { ...c, completed: !c.completed } : c
        );
        updateOrder(activeTask.id, { checklist: updatedChecklist });
    };

    const submitForReview = () => {
        transitionOrder(activeTask.id, SERVICE_STATUS.OPS_REVIEW);
        toast.success('Mission complete!', {
            description: 'Task submitted to Ops Manager for review.',
        });
    };

    return (
        <div className="space-y-6">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div className="flex flex-col gap-1">
                    <h1 className="text-xl md:text-2xl font-bold text-slate-800 tracking-tight">Specialist Mission Control</h1>
                    <p className="text-slate-500 text-xs md:text-sm">Active Assignments: {tasks.length}</p>
                </div>
                <div className="bg-slate-100 px-4 py-2 rounded-xl border border-slate-200 flex items-center gap-2">
                    <Clock className="w-4 h-4 text-slate-400" />
                    <span className="text-xs font-bold text-slate-600 uppercase tracking-wider">Sync: Real-time</span>
                </div>
            </div>

            {tasks.length > 0 ? (
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    {/* ... existing content ... */}
                    <div className="lg:col-span-1 space-y-4">
                        <h3 className="text-xs font-black text-slate-400 uppercase tracking-widest pl-2">Assigned Tracks</h3>
                        {tasks.map((task, idx) => (
                            <button
                                key={task.id}
                                onClick={() => setSelectedTaskIdx(idx)}
                                className={cn(
                                    "w-full text-left p-4 rounded-2xl border transition-all duration-300 relative overflow-hidden",
                                    selectedTaskIdx === idx
                                        ? "bg-slate-900 border-slate-900 shadow-xl ring-4 ring-primary/10"
                                        : "bg-white border-slate-100 hover:border-primary/30"
                                )}
                            >
                                {task.rework && (
                                    <div className="absolute top-0 right-0 p-1.5 bg-red-500 rounded-bl-xl shadow-lg">
                                        <AlertCircle className="w-3 h-3 text-white animate-pulse" />
                                    </div>
                                )}
                                <div className="flex flex-col gap-1">
                                    <span className={cn("text-[10px] font-black uppercase tracking-widest", selectedTaskIdx === idx ? "text-primary" : "text-slate-400")}>
                                        {task.orderId} • {task.service}
                                    </span>
                                    <span className={cn("text-sm font-bold", selectedTaskIdx === idx ? "text-white" : "text-slate-800")}>
                                        {task.customer}
                                    </span>
                                    <div className="mt-3 flex items-center justify-between">
                                        <div className="flex items-center gap-1.5">
                                            <Clock className={cn("w-3 h-3", selectedTaskIdx === idx ? "text-slate-500" : "text-slate-300")} />
                                            <span className={cn("text-[10px] font-mono", selectedTaskIdx === idx ? "text-slate-500" : "text-slate-400")}>
                                                SLA: 14h Left
                                            </span>
                                        </div>
                                        <span className={cn(
                                            "text-[9px] font-black px-1.5 py-0.5 rounded",
                                            task.priority === 'High' ? 'bg-red-500/10 text-red-500' : 'bg-blue-500/10 text-blue-500'
                                        )}>
                                            {task.priority}
                                        </span>
                                    </div>
                                </div>
                            </button>
                        ))}
                    </div>

                    <div className="lg:col-span-2 space-y-6">
                        {activeTask.rework && (
                            <div className="bg-red-50 border border-red-100 rounded-2xl p-4 flex gap-4 animate-in slide-in-from-top-4 duration-500">
                                <div className="w-10 h-10 rounded-xl bg-red-100 flex items-center justify-center shrink-0">
                                    <AlertCircle className="w-6 h-6 text-red-500" />
                                </div>
                                <div className="flex-1">
                                    <h4 className="text-sm font-black text-red-900 uppercase tracking-wide">Rework Needed</h4>
                                    <p className="text-xs text-red-600 mt-1 leading-relaxed">
                                        <span className="font-bold">Ops Manager Feedback:</span> {activeTask.reworkComment}
                                    </p>
                                </div>
                            </div>
                        )}

                        <div className="bg-slate-900 rounded-[2rem] md:rounded-[2.5rem] border border-slate-800 shadow-2xl overflow-hidden min-h-[400px] md:min-h-[600px] flex flex-col relative transition-all duration-500">
                            {/* Action Center Header */}
                            <div className="mission-control-header p-4 md:p-8 border-b border-slate-800 bg-slate-900/50 backdrop-blur-xl sticky top-0 z-10 flex flex-col sm:flex-row sm:items-center justify-between gap-6">
                                <div className="flex items-center gap-4">
                                    <div className="w-16 h-16 bg-primary/20 rounded-3xl flex items-center justify-center border border-primary/30 shadow-[0_0_20px_rgba(124,58,237,0.2)]">
                                        <Zap className="w-8 h-8 text-primary animate-pulse" />
                                    </div>
                                    <div>
                                        <div className="flex items-center gap-2">
                                            <h2 className="text-2xl font-black text-white italic tracking-tighter uppercase">{activeTask.service}</h2>
                                            <span className="px-2 py-0.5 bg-primary/20 text-primary text-[10px] font-black rounded uppercase tracking-widest border border-primary/30">Action Center</span>
                                        </div>
                                        <p className="text-slate-400 text-sm font-medium mt-1">Order {activeTask.orderId} • {activeTask.customer}</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-3">
                                    <button
                                        onClick={submitForReview}
                                        className="group relative flex items-center gap-2 px-8 py-3.5 bg-primary text-white rounded-2xl text-sm font-black uppercase tracking-widest hover:bg-primary-hover transition-all hover:scale-[1.05] active:scale-95 shadow-[0_10px_30px_rgba(124,58,237,0.4)]"
                                    >
                                        <div className="absolute inset-0 bg-white/20 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity blur" />
                                        <Send className="w-4 h-4 relative z-10" />
                                        <span className="relative z-10">Submit for Approval</span>
                                    </button>
                                </div>
                            </div>

                            <div className="flex-1 grid grid-cols-1 lg:grid-cols-5 overflow-hidden">
                                {/* The mighty Evidence Locker */}
                                <div className="lg:col-span-3 p-4 md:p-8 space-y-6 md:space-y-8 overflow-y-auto custom-scrollbar">
                                    <div id="evidence-locker">
                                        <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-4 md:mb-6 gap-2">
                                            <h4 className="text-[10px] md:text-xs font-black text-slate-500 uppercase tracking-widest flex items-center gap-2">
                                                <div className="w-1.5 h-1.5 bg-primary rounded-full shadow-[0_0_8px_rgba(124,58,237,0.8)]" />
                                                Box 4: Evidence Locker
                                            </h4>
                                            <span className="text-[9px] md:text-[10px] text-slate-500 font-mono tracking-tighter uppercase">Profiling & Documents Required</span>
                                        </div>

                                        <div className="grid grid-cols-1 gap-4">
                                            {activeTask.checklist?.map((item) => (
                                                <button
                                                    key={item.id}
                                                    onClick={() => toggleCheck(item.id)}
                                                    className={cn(
                                                        "group w-full flex items-center justify-between p-5 rounded-2xl border-2 transition-all duration-300 relative overflow-hidden",
                                                        item.completed
                                                            ? "bg-emerald-500/5 border-emerald-500/20"
                                                            : "bg-slate-800/20 border-slate-800 hover:border-primary/50"
                                                    )}
                                                >
                                                    {item.completed && (
                                                        <div className="absolute inset-0 bg-emerald-500/5 animate-pulse" />
                                                    )}
                                                    <div className="flex items-center gap-5 relative z-10">
                                                        <div className={cn(
                                                            "w-10 h-10 rounded-xl flex items-center justify-center transition-all duration-500 shadow-lg",
                                                            item.completed
                                                                ? "bg-emerald-500 text-white rotate-[360deg] scale-110"
                                                                : "bg-slate-800 text-slate-500 border border-slate-700"
                                                        )}>
                                                            {item.completed ? <CheckCircle2 className="w-6 h-6" /> : <ClipboardCheck className="w-5 h-5" />}
                                                        </div>
                                                        <div className="flex flex-col text-left">
                                                            <span className={cn(
                                                                "text-sm font-black tracking-tight transition-colors",
                                                                item.completed ? "text-emerald-400" : "text-slate-300"
                                                            )}>
                                                                {item.label}
                                                            </span>
                                                            <span className="text-[10px] text-slate-500 font-medium uppercase mt-0.5 tracking-wider">
                                                                {item.completed ? "Evidence Secured" : "Awaiting Verification"}
                                                            </span>
                                                        </div>
                                                    </div>
                                                    <div className="relative z-10">
                                                        {item.completed ? (
                                                            <div className="flex items-center gap-1.5 px-3 py-1 bg-emerald-500/10 rounded-full border border-emerald-500/20">
                                                                <div className="w-1.5 h-1.5 bg-emerald-400 rounded-full shadow-[0_0_5px_rgba(52,211,153,0.5)]" />
                                                                <span className="text-[10px] text-emerald-400 font-black uppercase tracking-widest">Verified</span>
                                                            </div>
                                                        ) : (
                                                            <div className="p-2.5 bg-slate-800 rounded-xl text-primary transition-all group-hover:scale-110 group-hover:bg-primary group-hover:text-white group-hover:shadow-[0_0_15px_rgba(124,58,237,0.3)]">
                                                                <FileUp className="w-5 h-5" />
                                                            </div>
                                                        )}
                                                    </div>
                                                </button>
                                            ))}
                                        </div>
                                    </div>

                                    {/* Action Center Progress Area */}
                                    <div className="p-8 bg-slate-800/30 rounded-[2rem] border border-slate-800/50">
                                        <div className="flex items-end justify-between mb-4">
                                            <div>
                                                <h5 className="text-[10px] font-black text-primary uppercase tracking-[0.2em] mb-1">Execution Score</h5>
                                                <div className="text-4xl font-black text-white italic tracking-tighter">
                                                    {activeTask.checklist ? Math.round((activeTask.checklist.filter(c => c.completed).length / activeTask.checklist.length) * 100) : 0}%
                                                </div>
                                            </div>
                                            <div className="text-right">
                                                <span className="text-[10px] font-bold text-slate-500 uppercase block leading-none mb-1">Status</span>
                                                <span className="text-xs font-black text-emerald-400 px-3 py-1 bg-emerald-500/10 rounded-lg border border-emerald-500/20">Active Session</span>
                                            </div>
                                        </div>
                                        <div className="w-full h-3 bg-slate-800 rounded-full overflow-hidden border border-slate-700 p-0.5">
                                            <div
                                                className="h-full bg-gradient-to-r from-primary via-purple-500 to-indigo-500 rounded-full transition-all duration-1000 ease-out shadow-[0_0_15px_rgba(124,58,237,0.5)]"
                                                style={{ width: `${activeTask.checklist ? (activeTask.checklist.filter(c => c.completed).length / activeTask.checklist.length) * 100 : 0}%` }}
                                            />
                                        </div>
                                    </div>
                                </div>

                                {/* Timeline Sidebar */}
                                <div className="lg:col-span-2 bg-slate-900/50 p-4 md:p-8 border-t lg:border-t-0 lg:border-l border-slate-800 flex flex-col gap-8">
                                    <div className="space-y-6">
                                        <h4 className="text-[10px] md:text-xs font-black text-slate-500 uppercase tracking-widest flex items-center gap-2">
                                            <MessageSquare className="w-4 h-4 text-primary" />
                                            Mission Log
                                        </h4>
                                        <RequestTimeline request={activeTask} />
                                    </div>

                                    {/* Additional info block */}
                                    <div className="mt-auto p-6 bg-primary/5 rounded-3xl border border-primary/10">
                                        <div className="flex items-center gap-3 mb-3">
                                            <AlertCircle className="w-5 h-5 text-primary" />
                                            <span className="text-xs font-black text-white uppercase tracking-wider">Mission Briefing</span>
                                        </div>
                                        <p className="text-[11px] text-slate-400 leading-relaxed italic">
                                            "Ensure all evidence is secured before final submission. Ops Managers will vet the profiling documents before executive approval."
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            ) : (
                <div className="bg-white rounded-3xl border border-dashed border-slate-200 p-12 text-center flex flex-col items-center">
                    <div className="w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center mb-4">
                        <ClipboardCheck className="w-8 h-8 text-slate-300" />
                    </div>
                    <h2 className="text-xl font-bold text-slate-800">No active tasks assigned</h2>
                    <p className="text-slate-500 text-sm max-w-sm mt-2">
                        Any tasks assigned to you by the Ops Manager will appear here for execution and evidence collection.
                    </p>
                </div>
            )}
            <MissionControlTour />
        </div>
    );
}
