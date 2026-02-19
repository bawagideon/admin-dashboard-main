import React, { useState } from 'react';
import {
    CheckCircle2,
    ShieldCheck,
    Zap,
    X,
    Clock,
    FileText,
    Mail,
    Archive,
    ChevronRight,
    Search
} from 'lucide-react';
import { cn } from '../lib/utils';
import RequestTimeline from '../components/RequestTimeline';

const initialVettingTasks = [
    { id: 5, orderId: '#175', customer: 'Biliki Muhammed', service: 'Resource Allocation', assigned: 'Robert Fox', status: 'MD Approval', date: '2025-11-14 16:16:34 UTC' },
    { id: 7, orderId: '#173', customer: 'Lagos Energy', service: 'Grid Optimization', assigned: 'Team Alpha', status: 'MD Approval', date: '2025-11-15 08:30:12 UTC' },
    { id: 8, orderId: '#172', customer: 'Shell Nigeria', service: 'Compliance Audit', assigned: 'Team Gamma', status: 'MD Approval', date: '2025-11-15 11:45:55 UTC' },
];

export default function MDDashboard() {
    const [tasks, setTasks] = useState(initialVettingTasks);
    const [selectedTasks, setSelectedTasks] = useState([]);
    const [viewingTask, setViewingTask] = useState(null);
    const [isArchiving, setIsArchiving] = useState(false);

    const toggleSelect = (id) => {
        setSelectedTasks(prev =>
            prev.includes(id) ? prev.filter(t => t !== id) : [...prev, id]
        );
    };

    const handleBulkApprove = () => {
        if (selectedTasks.length === 0) return;
        const count = selectedTasks.length;
        setTasks(prev => prev.filter(t => !selectedTasks.includes(t.id)));
        setSelectedTasks([]);
        alert(`Governance complete: ${count} cases approved and moved to final closing simulation.`);
    };

    const handleCloseCase = (task) => {
        setIsArchiving(true);
        setTimeout(() => {
            setTasks(prev => prev.filter(t => t.id !== task.id));
            setViewingTask(null);
            setIsArchiving(false);
            alert(`Case ${task.orderId} Closed. Completion email auto-generated for ${task.customer}. Record archived.`);
        }, 1500);
    };

    return (
        <div className="space-y-6">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-slate-800 tracking-tight flex items-center gap-2">
                        <ShieldCheck className="w-7 h-7 text-primary" />
                        Executive Governance
                    </h1>
                    <p className="text-slate-500 text-sm">Vetting requests awaiting Managing Director final approval</p>
                </div>
                {selectedTasks.length > 0 && (
                    <button
                        onClick={handleBulkApprove}
                        className="flex items-center gap-2 px-6 py-3 bg-slate-900 text-white rounded-xl text-sm font-bold shadow-lg hover:bg-slate-800 transition-all animate-in slide-in-from-right-4"
                    >
                        <Zap className="w-4 h-4 text-primary fill-primary" />
                        Bulk Approve {selectedTasks.length} Cases
                    </button>
                )}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Pending Approvals List */}
                <div className="space-y-4">
                    <h3 className="text-xs font-black text-slate-400 uppercase tracking-widest pl-2">Pending Vetting</h3>
                    {tasks.map((task) => (
                        <div
                            key={task.id}
                            className={cn(
                                "bg-white rounded-2xl border transition-all duration-300 p-4 flex items-center gap-4 group cursor-pointer",
                                selectedTasks.includes(task.id) ? "border-primary ring-2 ring-primary/5 shadow-md" : "border-slate-100 hover:border-slate-200"
                            )}
                            onClick={() => setViewingTask(task)}
                        >
                            <div
                                onClick={(e) => {
                                    e.stopPropagation();
                                    toggleSelect(task.id);
                                }}
                                className={cn(
                                    "w-6 h-6 rounded-lg border-2 flex items-center justify-center transition-colors",
                                    selectedTasks.includes(task.id) ? "bg-primary border-primary text-white" : "bg-white border-slate-200 group-hover:border-primary/40"
                                )}
                            >
                                {selectedTasks.includes(task.id) && <CheckCircle2 className="w-4 h-4" />}
                            </div>

                            <div className="flex-1">
                                <div className="flex justify-between items-start mb-1">
                                    <span className="text-[10px] font-black uppercase text-primary tracking-widest">{task.orderId}</span>
                                    <span className="text-[10px] font-mono text-slate-400">{task.date.split(' ')[0]}</span>
                                </div>
                                <h4 className="text-sm font-bold text-slate-800">{task.service}</h4>
                                <p className="text-xs text-slate-500 mt-0.5">Executor: <span className="font-semibold text-slate-700">{task.assigned}</span> for {task.customer}</p>
                            </div>

                            <ChevronRight className="w-5 h-5 text-slate-300 group-hover:text-primary transition-colors" />
                        </div>
                    ))}
                    {tasks.length === 0 && (
                        <div className="bg-slate-50 border-2 border-dashed border-slate-200 rounded-2xl p-8 text-center">
                            <CheckCircle2 className="w-8 h-8 text-green-500 mx-auto mb-2" />
                            <p className="text-sm font-bold text-slate-600">All cases vetted for now!</p>
                            <p className="text-xs text-slate-400 mt-1">Check back later for new executions.</p>
                        </div>
                    )}
                </div>

                {/* Executive Detail View */}
                <div className="bg-white rounded-3xl border border-slate-100 shadow-sm overflow-hidden flex flex-col min-h-[500px]">
                    {viewingTask ? (
                        <>
                            <div className="p-6 border-b border-slate-50 space-y-4">
                                <div className="flex justify-between items-start">
                                    <div>
                                        <h2 className="text-xl font-bold text-slate-800">{viewingTask.service}</h2>
                                        <p className="text-xs text-slate-400 mt-1">Final Specialist Execution Review</p>
                                    </div>
                                    <div className="px-3 py-1 bg-primary/10 text-primary text-[10px] font-black uppercase rounded-lg tracking-widest">
                                        Ready for Closure
                                    </div>
                                </div>

                                <div className="grid grid-cols-2 gap-4">
                                    <div className="p-3 bg-slate-50 rounded-xl border border-slate-100">
                                        <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest block mb-1">Impact Score</span>
                                        <span className="text-sm font-bold text-slate-800">Operational Alpha</span>
                                    </div>
                                    <div className="p-3 bg-slate-50 rounded-xl border border-slate-100">
                                        <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest block mb-1">Closing Doc</span>
                                        <span className="text-sm font-bold text-primary flex items-center gap-1">
                                            <FileText className="w-3.5 h-3.5" />
                                            View Report
                                        </span>
                                    </div>
                                </div>
                            </div>

                            <div className="flex-1 p-6 bg-slate-50/30 overflow-y-auto">
                                <h3 className="text-xs font-black text-slate-400 uppercase tracking-widest mb-4 flex items-center gap-2">
                                    <Clock className="w-4 h-4 text-slate-400" />
                                    Execution Lifecycle
                                </h3>
                                <RequestTimeline request={viewingTask} />
                            </div>

                            <div className="p-6 bg-white border-t border-slate-50 flex items-center gap-3">
                                <button
                                    onClick={() => handleCloseCase(viewingTask)}
                                    disabled={isArchiving}
                                    className="flex-1 flex items-center justify-center gap-2 px-6 py-3 bg-primary text-white rounded-xl text-sm font-bold hover:bg-primary/90 transition-all shadow-lg shadow-primary/20 disabled:opacity-50"
                                >
                                    {isArchiving ? (
                                        <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                    ) : (
                                        <CheckCircle2 className="w-4 h-4" />
                                    )}
                                    Sign & Close Case
                                </button>
                                <button className="p-3 border border-slate-200 rounded-xl text-slate-400 hover:text-slate-600 hover:bg-slate-50 transition-colors">
                                    <Mail className="w-5 h-5" />
                                </button>
                                <button className="p-3 border border-slate-200 rounded-xl text-slate-400 hover:text-red-500 hover:bg-red-50 transition-colors">
                                    <Archive className="w-5 h-5" />
                                </button>
                            </div>
                        </>
                    ) : (
                        <div className="flex-1 flex flex-col items-center justify-center p-8 text-center opacity-40">
                            <FileText className="w-16 h-16 text-slate-300 mb-4" />
                            <h3 className="text-lg font-bold text-slate-400">Select a case for vetting</h3>
                            <p className="text-sm text-slate-400 max-w-xs mt-1">Examine the specialist evidence timeline before final closing.</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
