import React from 'react';
import { TrendingUp } from 'lucide-react';

export default function StatCard({ title, value, subtext, icon: Icon, trend }) {
    return (
        <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
            <div className="flex justify-between items-start mb-4">
                <h3 className="text-slate-500 font-medium text-sm">{title}</h3>
                {Icon && <Icon className="w-5 h-5 text-slate-400" />}
            </div>
            <div className="flex flex-col gap-1">
                <span className="text-2xl font-bold text-slate-800">{value}</span>
                {subtext && (
                    <p className={`text-xs font-semibold ${trend === 'up' ? 'text-green-500' : 'text-slate-400'}`}>
                        {subtext}
                    </p>
                )}
            </div>
        </div>
    );
}
