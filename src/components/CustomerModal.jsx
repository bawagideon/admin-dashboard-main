import React from 'react';
import { X, Search } from 'lucide-react';

export default function CustomerModal({ customer, onClose }) {
    if (!customer) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 backdrop-blur-sm bg-black/20" onClick={onClose}>
            <div
                className="bg-white rounded-2xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-hidden flex flex-col md:flex-row animate-in fade-in zoom-in duration-200"
                onClick={(e) => e.stopPropagation()}
            >
                {/* Left Side: Profile */}
                <div className="w-full md:w-1/3 bg-gray-50 p-8 border-r border-gray-100 flex flex-col items-center text-center">
                    <div className="w-24 h-24 bg-primary/20 rounded-full flex items-center justify-center text-primary text-3xl font-bold mb-4">
                        {customer.name.charAt(0)}
                    </div>
                    <h2 className="text-xl font-bold text-slate-800">{customer.name}</h2>
                    <p className="text-slate-500 text-sm mb-6">{customer.email}</p>

                    <div className="w-full space-y-4">
                        <div className="flex justify-between text-sm">
                            <span className="text-slate-500">Phone</span>
                            <span className="font-medium text-slate-800">{customer.phone || 'N/A'}</span>
                        </div>
                        <div className="flex justify-between text-sm">
                            <span className="text-slate-500">Total Spent</span>
                            <span className="font-medium text-slate-800">{customer.totalSpent}</span>
                        </div>
                        <div className="flex justify-between text-sm">
                            <span className="text-slate-500">Status</span>
                            <span className={`font-medium px-2 py-0.5 rounded-full text-xs ${customer.status === 'VIP' ? 'bg-purple-100 text-purple-700' : 'bg-gray-200 text-gray-700'}`}>
                                {customer.status}
                            </span>
                        </div>
                    </div>
                </div>

                {/* Right Side: Order History */}
                <div className="flex-1 p-8 flex flex-col">
                    <div className="flex justify-between items-center mb-6">
                        <h3 className="text-lg font-bold text-slate-800">Order History</h3>
                        <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-full transition">
                            <X className="w-6 h-6 text-slate-400" />
                        </button>
                    </div>

                    <div className="flex-1 overflow-y-auto pr-2">
                        {/* Mock Order History List */}
                        <div className="space-y-4">
                            {[1, 2, 3, 4, 5].map((i) => (
                                <div key={i} className="flex items-center justify-between p-4 border border-gray-100 rounded-xl hover:bg-gray-50 transition">
                                    <div className="flex items-center gap-4">
                                        <div className="w-10 h-10 bg-blue-50 text-blue-600 rounded-lg flex items-center justify-center">
                                            <span className="font-bold text-sm">#{179 - i}</span>
                                        </div>
                                        <div>
                                            <p className="text-sm font-semibold text-slate-800">Order #{179 - i}</p>
                                            <p className="text-xs text-slate-500">24 Oct, 2025</p>
                                        </div>
                                    </div>
                                    <span className="font-bold text-slate-800">₦25,000</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
