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

// Mock data for specialist
const assignedTasks = [
    {
        id: 2,
        orderId: '#178',
        customer: 'Anne Guesser',
        service: 'Operational Audit',
        status: 'In Progress',
        priority: 'High',
        rework: true,
        reworkComment: 'Evidence for Section 4.2 is blurry. Please re-upload.',
        checklist: [
            { id: 1, label: 'Standard Operating Procedures Review', completed: true },
            { id: 2, label: 'Safety Compliance Evidence', completed: false },
            { id: 3, label: 'Financial Discrepancy Log', completed: false },
            { id: 4, label: 'Final Audit Summary Document', completed: false },
        ]
    }
];

export default function SpecialistWorkspace() {
    const [tasks, setTasks] = useState(assignedTasks);
    const [selectedTaskIdx, setSelectedTaskIdx] = useState(0);
    const activeTask = tasks[selectedTaskIdx];

    const toggleCheck = (itemId) => {
        setTasks(prev => prev.map((t, idx) =>
            idx === selectedTaskIdx ? {
                ...t,
                checklist: t.checklist.map(c => c.id === itemId ? { ...c, completed: !c.completed } : c)
            } : t
        ));
    };

    const submitForReview = () => {
        // In a real app, this would be an API call
        alert('Mission complete! Task submitted to Ops Manager for review.');
    };

    return (
        <div className="space-y-6">
            <div className="flex flex-col gap-2">
                <h1 className="text-2xl font-bold text-slate-800 tracking-tight">Specialist Mission Control</h1>
                <p className="text-slate-500 text-sm">Active Assignments: {tasks.length}</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Left: Task Navigator */}
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

                {/* Right: Task Workspace */}
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
                            {/* Checklist Section */}
                            <div className="md:col-span-3 p-6 space-y-6">
                                <div>
                                    <h4 className="text-xs font-black text-slate-400 uppercase tracking-widest mb-4 flex items-center gap-2">
                                        <ClipboardCheck className="w-4 h-4 text-primary" />
                                        Evidence Checklist
                                    </h4>
                                    <div className="space-y-3">
                                        {activeTask.checklist.map((item) => (
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
                                            {Math.round((activeTask.checklist.filter(c => c.completed).length / activeTask.checklist.length) * 100)}%
                                        </span>
                                    </div>
                                    <div className="flex -space-x-2">
                                        {[1, 2, 3].map(i => (
                                            <div key={i} className="w-8 h-8 rounded-full border-2 border-white bg-slate-100 flex items-center justify-center text-[8px] font-bold text-slate-400">
                                                SP
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>

                            {/* Timeline/History Section */}
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
        </div>
    );
}
