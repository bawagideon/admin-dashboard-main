import React, { useState } from 'react';
import { Search, Eye, Trash2, X, Mail } from 'lucide-react';
import { cn } from '../lib/utils';

const messages = [
    { id: 1, name: 'Anyia', email: 'anyiafavour15@gmail.com', message: 'HEY, I need help with my recent order, it says delivered but I haven\'t seen it yet.', date: 'Nov 14, 2025' },
    { id: 2, name: 'Favour', email: 'anyiafavour15@gmail.com', message: 'ndn, is the pallazo available in size XL? I can\'t select it on the site.', date: 'Nov 14, 2025' },
    { id: 3, name: 'Favour', email: 'anyiafavour15@gmail.com', message: 'hhd, just wanted to say I love the new collection!', date: 'Nov 13, 2025' },
    { id: 4, name: 'Anyia', email: 'anyiafavour23@gmail.com', message: 'nnn, when will the black vintage shirt be restocked?', date: 'Nov 12, 2025' },
];

export default function ContactMessages() {
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedMessage, setSelectedMessage] = useState(null);

    const filteredMessages = messages.filter(m =>
        m.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        m.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        m.message.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="space-y-6">
            <div className="flex flex-col gap-2">
                <h1 className="text-2xl font-bold text-slate-800">Contact Messages</h1>
            </div>

            <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
                <div className="p-4 md:p-6 border-b border-gray-100 flex flex-col md:flex-row justify-between items-center gap-4">
                    <div className="relative flex-1 w-full">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
                        <input
                            type="text"
                            placeholder="Search by name, email, message content..."
                            className="w-full pl-9 pr-4 py-3 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-primary/50 text-slate-600"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse min-w-[800px]">
                        <thead>
                            <tr className="bg-gray-50 border-b border-gray-100">
                                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase">Name</th>
                                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase">Email</th>
                                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase">Message</th>
                                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase">Date</th>
                                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                            {filteredMessages.map((msg) => (
                                <tr key={msg.id} className="hover:bg-gray-50 transition">
                                    <td className="px-6 py-4 font-medium text-slate-800">{msg.name}</td>
                                    <td className="px-6 py-4 text-sm text-slate-600">{msg.email}</td>
                                    <td className="px-6 py-4 text-sm text-slate-500 max-w-xs truncate">{msg.message}</td>
                                    <td className="px-6 py-4 text-sm text-slate-500">{msg.date}</td>
                                    <td className="px-6 py-4 flex items-center gap-2">
                                        <button
                                            onClick={() => setSelectedMessage(msg)}
                                            className="p-2 bg-gray-100 hover:bg-gray-200 text-slate-600 rounded-lg transition"
                                        >
                                            <Eye className="w-4 h-4" />
                                        </button>
                                        <button className="p-2 bg-red-50 hover:bg-red-100 text-red-500 rounded-lg transition">
                                            <Trash2 className="w-4 h-4" />
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* View Message Modal */}
            {selectedMessage && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 backdrop-blur-sm bg-black/20" onClick={() => setSelectedMessage(null)}>
                    <div
                        className="bg-white rounded-2xl shadow-2xl w-full max-w-lg p-6 animate-in fade-in zoom-in duration-200"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <div className="flex justify-between items-start mb-6">
                            <div>
                                <h2 className="text-xl font-bold text-slate-800">{selectedMessage.name}</h2>
                                <p className="text-slate-500 text-sm">{selectedMessage.email}</p>
                            </div>
                            <button onClick={() => setSelectedMessage(null)} className="p-2 hover:bg-gray-100 rounded-full">
                                <X className="w-5 h-5 text-slate-400" />
                            </button>
                        </div>

                        <div className="bg-gray-50 p-4 rounded-xl border border-gray-100 mb-6 max-h-[60vh] overflow-y-auto">
                            <p className="text-slate-700 leading-relaxed font-medium">
                                {selectedMessage.message}
                            </p>
                        </div>

                        <div className="flex gap-3">
                            <button className="flex-1 bg-primary text-white py-2.5 rounded-lg font-bold flex items-center justify-center gap-2 hover:bg-primary-hover transition">
                                <Mail className="w-4 h-4" />
                                Reply via Email
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
