import React, { useState } from 'react';
import { X, ClipboardList, Clock, ShieldCheck, Zap } from 'lucide-react';

export default function ProductModal({ onClose, service }) {
    const isEditing = !!service;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 backdrop-blur-sm bg-black/40 animate-in fade-in duration-200" onClick={onClose}>
            <div
                className="bg-white rounded-[32px] shadow-2xl w-full max-w-2xl overflow-hidden flex flex-col animate-in zoom-in-95 duration-200"
                onClick={(e) => e.stopPropagation()}
            >
                <div className="p-8 border-b border-slate-50 flex justify-between items-center bg-slate-50/50">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-primary text-white rounded-xl flex items-center justify-center">
                            <Zap className="w-5 h-5 fill-current" />
                        </div>
                        <h2 className="text-xl font-black text-slate-800 tracking-tight">
                            {isEditing ? 'Configure Service Offering' : 'New Service Offering'}
                        </h2>
                    </div>
                    <button onClick={onClose} className="p-2 hover:bg-white rounded-xl transition shadow-sm border border-transparent hover:border-slate-100">
                        <X className="w-6 h-6 text-slate-400" />
                    </button>
                </div>

                <div className="p-8 overflow-y-auto max-h-[70vh] space-y-8">
                    {/* Basic Info */}
                    <div className="grid grid-cols-2 gap-6">
                        <div className="col-span-2">
                            <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">Service Name</label>
                            <input
                                type="text"
                                defaultValue={service?.name}
                                className="w-full border border-slate-200 rounded-2xl p-4 outline-none focus:border-primary/50 bg-slate-50/30 text-slate-800 font-bold placeholder:font-medium transition-all"
                                placeholder="e.g. Premium EB-1A Analysis"
                            />
                        </div>
                        <div>
                            <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">Base Service Fee (NGN)</label>
                            <div className="relative">
                                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 font-bold">₦</span>
                                <input
                                    type="text"
                                    defaultValue={service?.fee?.replace('₦', '')}
                                    className="w-full border border-slate-200 rounded-2xl p-4 pl-8 outline-none focus:border-primary/50 bg-slate-50/30 text-slate-800 font-bold transition-all"
                                    placeholder="0.00"
                                />
                            </div>
                        </div>
                        <div>
                            <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">Lead Time</label>
                            <div className="relative">
                                <Clock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 w-4 h-4" />
                                <input
                                    type="text"
                                    defaultValue={service?.leadTime}
                                    className="w-full border border-slate-200 rounded-2xl p-4 pl-10 outline-none focus:border-primary/50 bg-slate-50/30 text-slate-800 font-bold transition-all"
                                    placeholder="e.g. 14-21 Days"
                                />
                            </div>
                        </div>
                        <div className="col-span-2">
                            <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">Specialist Availability</label>
                            <div className="relative">
                                <ShieldCheck className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5" />
                                <input
                                    type="text"
                                    defaultValue={service?.availability}
                                    className="w-full border border-slate-200 rounded-2xl p-4 pl-12 outline-none focus:border-primary/50 bg-slate-50/30 text-slate-800 font-bold transition-all"
                                    placeholder="e.g. 5 Specialists Available"
                                />
                            </div>
                        </div>
                    </div>

                    {/* Operational Note */}
                    <div className="p-5 bg-blue-50/50 rounded-2xl border border-blue-100 flex gap-4">
                        <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center text-blue-500 shadow-sm shrink-0">
                            <ClipboardList className="w-5 h-5" />
                        </div>
                        <div>
                            <h4 className="text-sm font-bold text-blue-900">Operational Capacity Note</h4>
                            <p className="text-xs text-blue-700/80 mt-1 leading-relaxed">
                                Updating service availability affects the "Smart Assign" engine. Ensure team headcount is aligned with these numbers.
                            </p>
                        </div>
                    </div>
                </div>

                <div className="p-8 border-t border-slate-50 bg-slate-50/30 flex justify-end gap-3">
                    <button onClick={onClose} className="px-8 py-3.5 text-slate-600 font-bold hover:bg-white rounded-2xl transition border border-transparent hover:border-slate-100">Discard</button>
                    <button className="px-8 py-3.5 bg-slate-900 text-white font-black rounded-2xl hover:bg-slate-800 shadow-xl shadow-slate-200 transition-all active:scale-95">
                        {isEditing ? 'Update Service' : 'Authorize Service'}
                    </button>
                </div>
            </div>
        </div>
    );
}
