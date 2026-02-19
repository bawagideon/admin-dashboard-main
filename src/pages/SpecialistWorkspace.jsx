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
        alert('Mission complete! Task submitted to Ops Manager for review.');
    };

    return (
        <div className="space-y-6">
            <div className="flex flex-col gap-2">
                <h1 className="text-2xl font-bold text-slate-800 tracking-tight">Specialist Mission Control</h1>
                <p className="text-slate-500 text-sm">Active Assignments: {tasks.length}</p>
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

                        <div className="bg-white rounded-3xl border border-slate-100 shadow-sm overflow-hidden min-h-[500px] flex flex-col">
                            <div className="p-6 border-b border-slate-50 flex items-center justify-between">
                                <div className="flex items-center gap-3">
                                    <div className="w-12 h-12 bg-primary/10 rounded-2xl flex items-center justify-center">
                                        <Zap className="w-6 h-6 text-primary" />
                                    </div>
                                    <div>
                                        <h2 className="text-xl font-bold text-slate-800">{activeTask.service}</h2>
                                        <p className="text-xs text-slate-400">Task Detail & Evidence Locker</p>
                                    </div>
                                </div>
                                <button
                                    onClick={submitForReview}
                                    className="flex items-center gap-2 px-6 py-2.5 bg-primary text-white rounded-xl text-sm font-bold hover:bg-primary/90 transition-all hover:scale-[1.02] active:scale-95 shadow-lg shadow-primary/20"
                                >
                                    <Send className="w-4 h-4" />
                                    Submit for Review
                                </button>
                            </div>

                            <div className="flex-1 grid grid-cols-1 md:grid-cols-5 divide-y md:divide-y-0 md:divide-x divide-slate-50">
                                <div className="md:col-span-3 p-6 space-y-6">
                                    <div>
                                        <h4 className="text-xs font-black text-slate-400 uppercase tracking-widest mb-4 flex items-center gap-2">
                                            <ClipboardCheck className="w-4 h-4 text-primary" />
                                            Evidence Checklist
                                        </h4>
                                        <div className="space-y-3">
                                            {activeTask.checklist?.map((item) => (
                                                <button
                                                    key={item.id}
                                                    onClick={() => toggleCheck(item.id)}
                                                    className={cn(
                                                        "w-full flex items-center justify-between p-4 rounded-2xl border transition-all duration-200 group text-left",
                                                        item.completed ? "bg-green-50/30 border-green-100" : "bg-slate-50/50 border-slate-100 hover:border-slate-200"
                                                    )}
                                                >
                                                    <div className="flex items-center gap-4">
                                                        <div className={cn(
                                                            "w-5 h-5 rounded-md flex items-center justify-center transition-colors",
                                                            item.completed ? "bg-green-500 text-white" : "bg-white border-2 border-slate-200"
                                                        )}>
                                                            {item.completed && <CheckCircle2 className="w-3.5 h-3.5" />}
                                                        </div>
                                                        <span className={cn("text-xs font-bold transition-colors", item.completed ? "text-green-700" : "text-slate-600")}>
                                                            {item.label}
                                                        </span>
                                                    </div>
                                                    {!item.completed && (
                                                        <FileUp className="w-4 h-4 text-slate-300 group-hover:text-primary transition-colors" />
                                                    )}
                                                </button>
                                            ))}
                                        </div>
                                    </div>

                                    <div className="mt-8 pt-6 border-t border-slate-50 flex items-center justify-between">
                                        <div className="flex flex-col">
                                            <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Progress</span>
                                            <span className="text-lg font-black text-slate-800">
                                                {activeTask.checklist ? Math.round((activeTask.checklist.filter(c => c.completed).length / activeTask.checklist.length) * 100) : 0}%
                                            </span>
                                        </div>
                                    </div>
                                </div>

                                <div className="md:col-span-2 p-6 bg-slate-50/30">
                                    <h4 className="text-xs font-black text-slate-400 uppercase tracking-widest mb-6 flex items-center gap-2">
                                        <MessageSquare className="w-4 h-4 text-primary" />
                                        Internal Timeline
                                    </h4>
                                    <RequestTimeline request={activeTask} />
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
        </div>
    );
}
