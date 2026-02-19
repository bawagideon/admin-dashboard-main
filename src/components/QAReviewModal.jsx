import React from 'react';
import { X, CheckCircle2, AlertCircle, ClipboardCheck, FileText, User } from 'lucide-react';
import { cn } from '../lib/utils';
import { SERVICE_STATUS } from '../lib/constants';

export default function QAReviewModal({ order, onApprove, onReject, onClose }) {
    if (!order) return null;

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 animate-in fade-in duration-200">
            <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm" onClick={onClose} />

            <div className="relative bg-white rounded-3xl shadow-2xl w-full max-w-2xl overflow-hidden animate-in zoom-in-95 duration-300">
                {/* Header */}
                <div className="p-6 bg-slate-50 border-b border-slate-100 flex justify-between items-center">
                    <div className="flex items-center gap-3">
                        <div className="p-2 bg-purple-100 rounded-xl text-purple-600">
                            <ClipboardCheck className="w-6 h-6" />
                        </div>
                        <div>
                            <h2 className="text-xl font-bold text-slate-800">Operational QA Review</h2>
                            <p className="text-xs text-slate-500">Case ID: {order.orderId} • Vetting before MD Closure</p>
                        </div>
                    </div>
                    <button onClick={onClose} className="p-2 hover:bg-white rounded-full transition-colors text-slate-400">
                        <X className="w-6 h-6" />
                    </button>
                </div>

                <div className="p-8 space-y-8">
                    {/* Execution Details */}
                    <div className="grid grid-cols-2 gap-6">
                        <div className="space-y-1">
                            <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest flex items-center gap-1">
                                <User className="w-3 h-3" /> Specialist Team
                            </span>
                            <p className="text-sm font-bold text-slate-700">{order.assigned}</p>
                        </div>
                        <div className="space-y-1">
                            <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest flex items-center gap-1">
                                <FileText className="w-3 h-3" /> Service Type
                            </span>
                            <p className="text-sm font-bold text-slate-700">{order.service}</p>
                        </div>
                    </div>

                    {/* Evidence Checklist Display */}
                    <div className="bg-slate-50 rounded-2xl p-6 border border-slate-100">
                        <h3 className="text-sm font-bold text-slate-800 mb-4 flex items-center gap-2">
                            Completed Evidence Checklist
                            <CheckCircle2 className="w-4 h-4 text-green-500" />
                        </h3>
                        <div className="space-y-3">
                            {(order.checklist || []).map((item) => (
                                <div key={item.id} className="flex items-center gap-3 bg-white p-3 rounded-xl border border-slate-100 shadow-sm">
                                    <div className="w-5 h-5 rounded-full bg-green-100 text-green-600 flex items-center justify-center">
                                        <CheckCircle2 className="w-3.5 h-3.5" />
                                    </div>
                                    <span className="text-sm font-medium text-slate-600">{item.label}</span>
                                    <span className="ml-auto text-[10px] font-bold text-green-600 bg-green-50 px-2 py-0.5 rounded">VERIFIED</span>
                                </div>
                            ))}
                            {(!order.checklist || order.checklist.length === 0) && (
                                <p className="text-sm text-slate-400 italic text-center py-4">No specific evidence records found for this service.</p>
                            )}
                        </div>
                    </div>

                    {/* Quality Memo (Simulated) */}
                    <div className="bg-purple-50 rounded-2xl p-6 border border-purple-100/50">
                        <p className="text-xs text-purple-700 leading-relaxed italic">
                            "Specialist has provided sufficient evidence for profiling and document integrity. No discrepancies noted in financial audit logs. Case is ready for MD vetting."
                        </p>
                    </div>

                    {/* Actions */}
                    <div className="flex flex-col sm:flex-row gap-4 pt-4">
                        <button
                            onClick={onReject}
                            className="flex-1 flex items-center justify-center gap-2 px-6 py-4 bg-red-50 text-red-600 rounded-2xl font-bold hover:bg-red-100 transition-all border border-red-100"
                        >
                            <AlertCircle className="w-5 h-5" />
                            Reject & Request Rework
                        </button>
                        <button
                            onClick={onApprove}
                            className="flex-1 flex items-center justify-center gap-2 px-6 py-4 bg-purple-600 text-white rounded-2xl font-bold hover:bg-purple-700 transition-all shadow-xl shadow-purple-200"
                        >
                            <CheckCircle2 className="w-5 h-5" />
                            Approve for MD Final Vetting
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
