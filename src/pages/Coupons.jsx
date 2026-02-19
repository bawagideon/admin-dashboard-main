import React, { useState } from 'react';
import { Tag, Plus, Edit2, Trash2, ToggleRight, ToggleLeft, Download } from 'lucide-react';
import BulkActionsBar from '../components/BulkActionsBar';
import { cn } from '../lib/utils';

const coupons = [
    { id: 1, code: 'Dangote20', type: 'Percentage', value: '20%', minOrder: '₦50,000', limit: 100, expiry: '2025-12-31', status: 'Active' },
    { id: 2, code: 'WELCOME10', type: 'Fixed', value: '₦10,000', minOrder: '₦30,000', limit: 50, expiry: '2025-06-30', status: 'Active' },
    { id: 3, code: 'FLASH50', type: 'Percentage', value: '50%', minOrder: '₦100,000', limit: 10, expiry: '2025-02-14', status: 'Inactive' },
];

export default function Coupons() {
    const [selectedCoupons, setSelectedCoupons] = useState([]);

    const toggleSelect = (id) => {
        setSelectedCoupons(prev =>
            prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]
        );
    };

    const toggleSelectAll = () => {
        if (selectedCoupons.length === coupons.length) {
            setSelectedCoupons([]);
        } else {
            setSelectedCoupons(coupons.map(c => c.id));
        }
    };

    return (
        <div className="space-y-6">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <h1 className="text-2xl font-bold text-slate-800">Coupon Management</h1>
                <div className="flex gap-2">
                    <button className="bg-white border border-primary text-primary px-4 py-2 rounded-lg flex items-center gap-2 text-sm font-medium transition hover:bg-primary/5">
                        <Download className="w-4 h-4" />
                        Export
                    </button>
                    <button className="bg-primary hover:bg-primary-hover text-white px-4 py-2 rounded-lg flex items-center gap-2 text-sm font-medium transition">
                        <Plus className="w-4 h-4" />
                        Add Coupon
                    </button>
                </div>
            </div>

            <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse min-w-[900px]">
                        <thead>
                            <tr className="bg-gray-50 border-b border-gray-100">
                                <th className="px-6 py-4 w-10">
                                    <input
                                        type="checkbox"
                                        className="rounded border-gray-300 text-primary focus:ring-primary h-4 w-4"
                                        checked={selectedCoupons.length === coupons.length && coupons.length > 0}
                                        onChange={toggleSelectAll}
                                    />
                                </th>
                                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase">Code</th>
                                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase">Type</th>
                                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase">Value</th>
                                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase">Min Order</th>
                                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase">Usage Limit</th>
                                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase">Expiry</th>
                                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase">Status</th>
                                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                            {coupons.map((coupon) => (
                                <tr key={coupon.id} className={cn("hover:bg-gray-50 transition", selectedCoupons.includes(coupon.id) && "bg-primary/5")}>
                                    <td className="px-6 py-4">
                                        <input
                                            type="checkbox"
                                            className="rounded border-gray-300 text-primary focus:ring-primary h-4 w-4"
                                            checked={selectedCoupons.includes(coupon.id)}
                                            onChange={() => toggleSelect(coupon.id)}
                                        />
                                    </td>
                                    <td className="px-6 py-4 font-mono font-medium text-slate-800">{coupon.code}</td>
                                    <td className="px-6 py-4 text-sm text-slate-600">{coupon.type}</td>
                                    <td className="px-6 py-4 text-sm font-bold text-slate-800">{coupon.value}</td>
                                    <td className="px-6 py-4 text-sm text-slate-600">{coupon.minOrder}</td>
                                    <td className="px-6 py-4 text-sm text-slate-600">{coupon.limit}</td>
                                    <td className="px-6 py-4 text-sm text-slate-600">{coupon.expiry}</td>
                                    <td className="px-6 py-4">
                                        <button className={`${coupon.status === 'Active' ? 'text-green-500' : 'text-slate-300'} hover:opacity-80 transition`}>
                                            {coupon.status === 'Active' ? <ToggleRight className="w-8 h-8" /> : <ToggleLeft className="w-8 h-8" />}
                                        </button>
                                    </td>
                                    <td className="px-6 py-4 flex items-center gap-2">
                                        <button className="p-2 hover:bg-blue-50 text-slate-400 hover:text-blue-600 rounded-lg transition">
                                            <Edit2 className="w-4 h-4" />
                                        </button>
                                        <button className="p-2 hover:bg-red-50 text-slate-400 hover:text-red-600 rounded-lg transition">
                                            <Trash2 className="w-4 h-4" />
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            <BulkActionsBar selectedCount={selectedCoupons.length} />
        </div>
    );
}
