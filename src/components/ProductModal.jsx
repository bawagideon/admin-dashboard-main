import React, { useState } from 'react';
import { X, Upload, Plus } from 'lucide-react';

export default function ProductModal({ onClose }) {
    const [colors, setColors] = useState(['Blue', 'White', 'Black']);
    const [sizes, setSizes] = useState([]);

    // Mock size options
    const sizeOptions = ['XS', 'S', 'M', 'L', 'XL', 'XXL'];

    const handleAddSize = (e) => {
        const val = e.target.value;
        if (val && !sizes.includes(val)) {
            setSizes([...sizes, val]);
        }
        e.target.value = ""; // Reset select
    };

    const removeSize = (size) => {
        setSizes(sizes.filter(s => s !== size));
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 backdrop-blur-sm bg-black/20" onClick={onClose}>
            <div
                className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl overflow-hidden flex flex-col animate-in fade-in zoom-in duration-200"
                onClick={(e) => e.stopPropagation()}
            >
                <div className="p-6 border-b border-gray-100 flex justify-between items-center">
                    <h2 className="text-xl font-bold text-slate-800">Add New Product</h2>
                    <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-full transition">
                        <X className="w-6 h-6 text-slate-400" />
                    </button>
                </div>

                <div className="p-6 overflow-y-auto max-h-[70vh] space-y-6">
                    {/* Basic Info */}
                    <div className="grid grid-cols-2 gap-4">
                        <div className="col-span-2">
                            <label className="block text-sm font-medium text-slate-700 mb-1">Product Name</label>
                            <input type="text" className="w-full border border-gray-200 rounded-lg p-2.5 outline-none focus:border-primary/50" placeholder="e.g. Summer Pallazo" />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-slate-700 mb-1">Price (NGN)</label>
                            <input type="number" className="w-full border border-gray-200 rounded-lg p-2.5 outline-none focus:border-primary/50" placeholder="0.00" />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-slate-700 mb-1">Stock</label>
                            <input type="number" className="w-full border border-gray-200 rounded-lg p-2.5 outline-none focus:border-primary/50" placeholder="0" />
                        </div>
                    </div>

                    {/* Attributes */}
                    <div className="space-y-4 border-t border-gray-100 pt-4">
                        <h3 className="font-bold text-slate-800">Product Attributes</h3>

                        <div>
                            <label className="block text-sm font-medium text-slate-700 mb-2">Colors (Tags)</label>
                            <div className="flex flex-wrap gap-2 mb-2">
                                {colors.map(color => (
                                    <span key={color} className="bg-gray-100 text-slate-700 px-3 py-1 rounded-lg text-sm flex items-center gap-2">
                                        {color} <button className="hover:text-red-500 font-bold">×</button>
                                    </span>
                                ))}
                                <button className="bg-primary/10 text-primary px-3 py-1 rounded-lg text-sm font-medium hover:bg-primary/20 transition flex items-center gap-1">
                                    <Plus className="w-3 h-3" /> Add
                                </button>
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-slate-700 mb-2">Sizes (Multi-select)</label>
                            <div className="relative">
                                <select
                                    className="w-full border border-gray-200 rounded-lg p-2.5 outline-none focus:border-primary/50 appearance-none bg-white"
                                    onChange={handleAddSize}
                                >
                                    <option value="">Select sizes...</option>
                                    {sizeOptions.map(s => <option key={s} value={s}>{s}</option>)}
                                </select>
                            </div>
                            {sizes.length > 0 && (
                                <div className="flex flex-wrap gap-2 mt-2">
                                    {sizes.map(size => (
                                        <span key={size} className="bg-blue-50 text-blue-700 px-3 py-1 rounded-lg text-sm flex items-center gap-2 border border-blue-100">
                                            {size} <button onClick={() => removeSize(size)} className="hover:text-blue-900 font-bold">×</button>
                                        </span>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                <div className="p-6 border-t border-gray-100 bg-gray-50 flex justify-end gap-3">
                    <button onClick={onClose} className="px-6 py-2.5 text-slate-600 font-medium hover:bg-gray-200 rounded-lg transition">Cancel</button>
                    <button className="px-6 py-2.5 bg-primary text-white font-bold rounded-lg hover:bg-primary-hover shadow-lg shadow-primary/30 transition">Save Product</button>
                </div>
            </div>
        </div>
    );
}
