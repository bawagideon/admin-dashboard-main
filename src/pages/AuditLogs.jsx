import React, { useState } from 'react';
import { Search, Filter, Shield, Clock, MapPin } from 'lucide-react';

const logs = [
    { id: 1, user: 'Admin User', action: 'Modified Order #127', time: '2026-01-11 14:30:22', ip: '192.168.1.1', context: 'Order value changed' },
    { id: 2, user: 'Sales Rep', action: 'Created Coupon "DGD"', time: '2026-01-11 12:15:00', ip: '10.0.0.5', context: 'Promo campaign' },
    { id: 3, user: 'Admin User', action: 'Deleted Product "Old Shirt"', time: '2026-01-10 09:45:11', ip: '192.168.1.1', context: 'Inventory cleanup' },
    { id: 4, user: 'System', action: 'Backup Completed', time: '2026-01-10 00:00:00', ip: 'localhost', context: 'Daily automated backup' },
    { id: 5, user: 'Sales Rep', action: 'Exported Customer List', time: '2026-01-09 16:20:45', ip: '10.0.0.5', context: 'Marketing review' },
];

export default function AuditLogs() {
    return (
        <div className="space-y-6">
            <div className="flex flex-col gap-2">
                <h1 className="text-2xl font-bold text-slate-800 flex items-center gap-2">
                    <Shield className="w-6 h-6 text-primary" />
                    Audit Logs
                </h1>
                <p className="text-slate-500 text-sm">Security and activity monitoring.</p>
            </div>

            <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
                <div className="p-4 md:p-6 border-b border-gray-100 flex flex-col md:flex-row justify-between items-center gap-4">
                    <div className="relative flex-1 w-full md:max-w-md">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
                        <input
                            type="text"
                            placeholder="Search logs..."
                            className="w-full pl-9 pr-4 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-primary/50 text-slate-600"
                        />
                    </div>
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse min-w-[800px]">
                        <thead>
                            <tr className="bg-gray-50 border-b border-gray-100">
                                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase">User</th>
                                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase">Action</th>
                                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase">Time</th>
                                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase">IP Address</th>
                                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase">Context</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                            {logs.map((log) => (
                                <tr key={log.id} className="hover:bg-gray-50 transition">
                                    <td className="px-6 py-4 font-medium text-slate-800">{log.user}</td>
                                    <td className="px-6 py-4 text-sm text-slate-600">{log.action}</td>
                                    <td className="px-6 py-4 text-xs text-slate-500 font-mono flex items-center gap-2">
                                        <Clock className="w-3 h-3" />
                                        {log.time}
                                    </td>
                                    <td className="px-6 py-4 text-xs text-slate-500 font-mono">
                                        <div className="flex items-center gap-2">
                                            <MapPin className="w-3 h-3" />
                                            {log.ip}
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 text-xs text-slate-500 italic">{log.context}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
