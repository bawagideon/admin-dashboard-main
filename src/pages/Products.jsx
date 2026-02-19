import React, { useState } from 'react';
import { ClipboardList, Plus, Filter, MoreHorizontal, Edit2, Trash2, Clock } from 'lucide-react';
import ProductModal from '../components/ProductModal';
import { SERVICE_CATALOG } from '../lib/constants';
import { cn } from '../lib/utils';

export default function Products() {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedService, setSelectedService] = useState(null);

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-primary/10 rounded-2xl flex items-center justify-center text-primary">
                        <ClipboardList className="w-6 h-6" />
                    </div>
                    <div>
                        <h1 className="text-2xl font-bold text-slate-800 tracking-tight">Service Catalog</h1>
                        <p className="text-slate-500 text-sm">Manage immigration consulting offerings and specialist capacity</p>
                    </div>
                </div>
                <button
                    onClick={() => setIsModalOpen(true)}
                    className="bg-primary hover:bg-primary-hover text-white px-5 py-3 rounded-2xl flex items-center gap-2 text-sm font-bold transition shadow-lg shadow-primary/20"
                >
                    <Plus className="w-4 h-4" />
                    New Service Offering
                </button>
            </div>

            <div className="bg-white rounded-3xl border border-slate-100 shadow-sm overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse min-w-[800px]">
                        <thead>
                            <tr className="bg-slate-50 border-b border-slate-100">
                                <th className="px-6 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">Service Item</th>
                                <th className="px-6 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">Lead Time</th>
                                <th className="px-6 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">Service Fee (NGN)</th>
                                <th className="px-6 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">Specialist Availability</th>
                                <th className="px-6 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">Market Status</th>
                                <th className="px-6 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-50">
                            {SERVICE_CATALOG.map((service) => (
                                <tr key={service.id} className="hover:bg-slate-50/50 transition-colors group">
                                    <td className="px-6 py-4">
                                        <div className="flex items-center gap-3">
                                            <div className="w-10 h-10 bg-slate-100 rounded-xl flex items-center justify-center text-slate-500 group-hover:bg-primary/10 group-hover:text-primary transition-colors">
                                                <ClipboardList className="w-5 h-5" />
                                            </div>
                                            <span className="font-bold text-slate-700">{service.name}</span>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="flex items-center gap-2 text-slate-600">
                                            <Clock className="w-4 h-4 text-slate-400" />
                                            <span className="text-sm font-medium">{service.leadTime}</span>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 text-sm font-bold text-slate-800">{service.fee}</td>
                                    <td className="px-6 py-4">
                                        <span className="text-sm text-slate-600 font-medium">{service.availability}</span>
                                    </td>
                                    <td className="px-6 py-4">
                                        <span className={cn(
                                            "inline-flex items-center px-3 py-1 rounded-lg text-[10px] font-black uppercase tracking-widest",
                                            service.status === 'Active' ? 'bg-green-50 text-green-600' : 'bg-orange-50 text-orange-600'
                                        )}>
                                            {service.status}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                                            <button
                                                onClick={() => {
                                                    setSelectedService(service);
                                                    setIsModalOpen(true);
                                                }}
                                                className="p-2 hover:bg-primary/10 text-slate-400 hover:text-primary rounded-xl transition-all"
                                            >
                                                <Edit2 className="w-4 h-4" />
                                            </button>
                                            <button className="p-2 hover:bg-red-50 text-slate-400 hover:text-red-600 rounded-xl transition-all">
                                                <Trash2 className="w-4 h-4" />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            {isModalOpen && (
                <ProductModal
                    onClose={() => {
                        setIsModalOpen(false);
                        setSelectedService(null);
                    }}
                    service={selectedService}
                />
            )}
        </div>
    );
}
