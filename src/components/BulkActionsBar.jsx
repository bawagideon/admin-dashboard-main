import React from 'react';
import { Download, FileText, CheckCircle, Trash2 } from 'lucide-react';
import { cn } from '../lib/utils';

export default function BulkActionsBar({ selectedCount, onClear, actions }) {
    if (selectedCount === 0) return null;

    return (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-40 bg-slate-900 text-white px-6 py-4 rounded-2xl shadow-2xl flex items-center gap-6 animate-in slide-in-from-bottom-5 duration-300 w-[95%] md:w-auto">
            <div className="flex items-center gap-3 border-r border-slate-700 pr-6">
                <div className="bg-primary text-white w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold">
                    {selectedCount}
                </div>
                <span className="font-medium text-sm">Selected</span>
            </div>

            <div className="flex items-center gap-2 md:gap-4 overflow-x-auto">
                <button className="flex items-center gap-2 hover:bg-slate-800 px-3 py-2 rounded-lg transition text-sm">
                    <CheckCircle className="w-4 h-4 text-green-400" />
                    <span className="whitespace-nowrap">Mark Completed</span>
                </button>
                <button className="flex items-center gap-2 hover:bg-slate-800 px-3 py-2 rounded-lg transition text-sm">
                    <FileText className="w-4 h-4 text-blue-400" />
                    <span className="whitespace-nowrap">Invoice</span>
                </button>
                <button className="flex items-center gap-2 hover:bg-slate-800 px-3 py-2 rounded-lg transition text-sm text-red-300 hover:text-red-200">
                    <Trash2 className="w-4 h-4" />
                    <span className="whitespace-nowrap">Delete</span>
                </button>
            </div>
        </div>
    );
}
