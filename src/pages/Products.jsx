import React, { useState } from 'react';
import { Package, Plus, Filter, MoreHorizontal, Edit2, Trash2 } from 'lucide-react';
import ProductModal from '../components/ProductModal';

const products = [
    { id: 1, name: 'Pallazo', price: '₦12,500', stock: 50, status: 'Active', category: 'Uncategorized' },
    { id: 2, name: 'Vintage Shirt', price: '₦8,000', stock: 20, status: 'Draft', category: 'Men' },
];

export default function Products() {
    const [isModalOpen, setIsModalOpen] = useState(false);

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <h1 className="text-2xl font-bold text-slate-800">Products</h1>
                <button
                    onClick={() => setIsModalOpen(true)}
                    className="bg-primary hover:bg-primary-hover text-white px-4 py-2 rounded-lg flex items-center gap-2 text-sm font-medium transition shadow-lg shadow-primary/20"
                >
                    <Plus className="w-4 h-4" />
                    Add Product
                </button>
            </div>

            <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse min-w-[700px]">
                        <thead>
                            <tr className="bg-gray-50 border-b border-gray-100">
                                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase">Product</th>
                                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase">Category</th>
                                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase">Price</th>
                                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase">Stock</th>
                                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase">Status</th>
                                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                            {products.map((product) => (
                                <tr key={product.id} className="hover:bg-gray-50 transition">
                                    <td className="px-6 py-4">
                                        <div className="flex items-center gap-3">
                                            <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center text-slate-400">
                                                <Package className="w-6 h-6" />
                                            </div>
                                            <span className="font-medium text-slate-800">{product.name}</span>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 text-sm text-slate-600">{product.category}</td>
                                    <td className="px-6 py-4 text-sm font-bold text-slate-800">{product.price}</td>
                                    <td className="px-6 py-4 text-sm text-slate-600">{product.stock}</td>
                                    <td className="px-6 py-4">
                                        <span className={`inline-flex items-center px-2 py-1 rounded text-xs font-bold ${product.status === 'Active' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
                                            }`}>
                                            {product.status}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 flex items-center gap-2">
                                        <button
                                            onClick={() => {
                                                setSelectedProduct(product);
                                                setIsModalOpen(true);
                                            }}
                                            className="p-2 hover:bg-blue-50 text-slate-400 hover:text-blue-600 rounded-lg transition"
                                        >
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

            {isModalOpen && <ProductModal onClose={() => { setIsModalOpen(false); setSelectedProduct(null); }} product={selectedProduct} />}
        </div>
    );
}
