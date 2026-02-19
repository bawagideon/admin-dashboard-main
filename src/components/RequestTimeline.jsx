import React from 'react';
import { CheckCircle2, Circle, Clock, AlertCircle, MessageCircle } from 'lucide-react';
import { cn } from '../lib/utils';

export default function RequestTimeline({ request }) {
    // Mock history based on request status
    const history = [
        { status: 'Intake', date: '2025-11-14 15:56', actor: 'System', comment: 'Google Form Submission received.' },
        { status: 'Verified', date: '2025-11-14 16:10', actor: 'Admin', comment: 'AI parsing confirmed. Payment advice sent.' },
        ...(request.status !== 'Awaiting Payment' ? [{ status: 'Paid', date: '2025-11-14 17:05', actor: 'Client', comment: 'Payment confirmed via Stripe.' }] : []),
        ...(request.assigned !== 'Unassigned' ? [{ status: 'Assigned', date: '2025-11-15 09:00', actor: 'Ops Manager', comment: `Assigned to ${request.assigned} (Smart Allocation).` }] : []),
        ...(request.status === 'Ops Review' || request.status === 'MD Approval' || request.status === 'Closed' ? [{ status: 'Execution', date: '2025-11-16 10:30', actor: request.assigned, comment: 'Technical evidence uploaded for review.' }] : []),
    ];

    const sla = {
        total: 72, // 72 hours SLA
        spent: 48, // 48 hours spent
    };

    const slaPercent = Math.min((sla.spent / sla.total) * 100, 100);

    return (
        <div className="space-y-8 py-4">
            {/* SLA Tracker */}
            <div className="bg-slate-50 rounded-2xl p-4 border border-slate-100">
                <div className="flex justify-between items-end mb-2">
                    <div className="flex items-center gap-2">
                        <Clock className={cn("w-4 h-4", slaPercent > 80 ? "text-red-500" : "text-blue-500")} />
                        <span className="text-sm font-bold text-slate-700">SLA Progress</span>
                    </div>
                    <span className="text-[10px] font-mono text-slate-500 uppercase tracking-wider">
                        {sla.spent}h spent / {sla.total}h target
                    </span>
                </div>
                <div className="h-2 w-full bg-gray-200 rounded-full overflow-hidden">
                    <div
                        className={cn(
                            "h-full transition-all duration-1000",
                            slaPercent > 80 ? "bg-red-500" : slaPercent > 50 ? "bg-yellow-500" : "bg-blue-500"
                        )}
                        style={{ width: `${slaPercent}%` }}
                    />
                </div>
                {slaPercent > 80 && (
                    <div className="mt-2 flex items-center gap-1.5 text-red-600">
                        <AlertCircle className="w-3 h-3" />
                        <span className="text-[10px] font-bold uppercase tracking-tight">Critical: SLA breech imminent</span>
                    </div>
                )}
            </div>

            {/* Steps */}
            <div className="relative pl-8 space-y-8 before:absolute before:left-[11px] before:top-2 before:bottom-2 before:w-0.5 before:bg-slate-100">
                {history.map((step, idx) => (
                    <div key={idx} className="relative">
                        <div className={cn(
                            "absolute -left-10 top-0 w-6 h-6 rounded-full border-4 border-white flex items-center justify-center z-10",
                            idx === history.length - 1 ? "bg-primary text-white" : "bg-green-500 text-white"
                        )}>
                            <CheckCircle2 className="w-3 h-3" />
                        </div>

                        <div className="flex flex-col">
                            <div className="flex justify-between items-center mb-1">
                                <span className="text-sm font-bold text-slate-800">{step.status}</span>
                                <span className="text-[10px] font-mono text-slate-400">{step.date}</span>
                            </div>
                            <div className="bg-white rounded-xl p-3 border border-slate-100 shadow-sm">
                                <p className="text-xs text-slate-600 leading-relaxed italic">"{step.comment}"</p>
                                <div className="mt-2 text-[10px] text-slate-400 flex items-center gap-1">
                                    <MessageCircle className="w-3 h-3" />
                                    Updated by <span className="font-bold text-slate-500">{step.actor}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}

                {/* Future Steps */}
                {request.status !== 'Closed' && (
                    <div className="relative opacity-40 grayscale">
                        <div className="absolute -left-10 top-0 w-6 h-6 rounded-full border-4 border-white bg-slate-200 flex items-center justify-center z-10">
                            <Circle className="w-3 h-3 text-slate-400" />
                        </div>
                        <div className="flex flex-col">
                            <span className="text-sm font-bold text-slate-400 italic">Next Stage: Final Closing</span>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
