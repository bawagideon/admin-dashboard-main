import React, { useState } from 'react';
import { Users, DollarSign, Star, Zap, Search, Filter, Eye, Trash2, Download } from 'lucide-react';
import StatCard from '../components/StatsCard';
import CustomerModal from '../components/CustomerModal';
import { useWorkflow } from '../lib/WorkflowContext';
import { SERVICE_CATALOG } from '../lib/constants';

export default function Customers() {
    const { orders } = useWorkflow();
    const [selectedCustomer, setSelectedCustomer] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');

    // Dynamic Customer Derivation from Service Orders
    const derivedCustomers = Object.values(orders.reduce((acc, order) => {
        const email = order.email || 'guest@example.com';
        if (!acc[email]) {
            acc[email] = {
                id: order.id,
                name: order.customer,
                email: email,
                phone: '+234 --- --- ----',
                orders: 0,
                totalSpentValue: 0,
                joinDate: order.date
            };
        }
        acc[email].orders += 1;

        // Find fee in catalog or default to 0
        const catalogItem = SERVICE_CATALOG.find(s => s.name === order.service);
        const feeStr = catalogItem ? catalogItem.fee : '₦0';
        const feeNum = parseInt(feeStr.replace(/[^\d]/g, '')) || 0;
        acc[email].totalSpentValue += feeNum;

        return acc;
    }, {})).map(c => ({
        ...c,
        totalSpent: `₦${c.totalSpentValue.toLocaleString()}`,
        status: c.orders >= 3 ? 'VIP' : c.orders === 1 ? 'New' : 'Active'
    }));

    const filteredCustomers = derivedCustomers.filter(c =>
        c.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        c.email.toLowerCase().includes(searchTerm.toLowerCase())
    );

    // Dynamic Summary Metrics
    const totalSpentAll = derivedCustomers.reduce((sum, c) => sum + c.totalSpentValue, 0);
    const vipCount = derivedCustomers.filter(c => c.status === 'VIP').length;
    const newCount = derivedCustomers.filter(c => c.status === 'New').length;

    return (
        <div className="space-y-8">
            {/* Dashboard Header */}
            <div className="flex flex-col gap-2">
                <h1 className="text-2xl font-bold text-slate-800">Customer Dashboard</h1>
            </div>

            {/* Metrics */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <StatCard title="Total Customers" value={derivedCustomers.length.toString()} subtext="With active/past requests" icon={Users} />
                <StatCard title="Total Spent (NGN)" value={`₦${(totalSpentAll / 1000000).toFixed(1)}M`} subtext="Aggregate revenue" icon={DollarSign} />
                <StatCard title="VIP Customers" value={vipCount.toString()} subtext="Clients with >= 3 orders" icon={Star} />
                <StatCard title="New Customers" value={newCount.toString()} subtext="Single-request clients" icon={Zap} />
            </div>

            {/* Directory Section */}
            <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
                <div className="p-4 md:p-6 border-b border-gray-100 flex flex-col md:flex-row justify-between items-center gap-4">
                    <h2 className="text-lg font-bold text-slate-800">Customer Directory</h2>
                    <div className="flex flex-col md:flex-row items-center gap-3 w-full md:w-auto">
                        <div className="relative w-full md:w-80">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
                            <input
                                type="text"
                                placeholder="Search by name, email, or ID..."
                                className="w-full pl-9 pr-4 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-primary/50 text-slate-600"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                        </div>
                        <div className="flex gap-2 w-full md:w-auto">
                            <button className="flex-1 md:flex-none flex items-center justify-center gap-2 px-4 py-2 bg-primary text-white rounded-lg text-sm font-medium hover:bg-primary-hover transition">
                                <Filter className="w-4 h-4" />
                                Search
                            </button>
                            <button className="flex-1 md:flex-none flex items-center justify-center gap-2 px-4 py-2 border border-primary text-primary rounded-lg text-sm font-medium hover:bg-primary/5 transition">
                                <Download className="w-4 h-4" />
                                <span className="hidden md:inline">Export</span>
                            </button>
                        </div>
                    </div>
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse min-w-[800px]">
                        <thead>
                            <tr className="bg-gray-50 border-b border-gray-100">
                                <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase">Customer</th>
                                <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase">Contact Details</th>
                                <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase">Orders</th>
                                <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase">Total Spent</th>
                                <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase">Status</th>
                                <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase">Join Date</th>
                                <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                            {filteredCustomers.map((customer) => (
                                <tr key={customer.id} className="hover:bg-gray-50 transition-colors group">
                                    <td className="px-6 py-4">
                                        <div className="flex items-center gap-3">
                                            <div className="w-8 h-8 rounded-full bg-primary/10 text-primary flex items-center justify-center font-bold text-xs">
                                                {customer.name.charAt(0)}
                                            </div>
                                            <span className="font-medium text-slate-800 text-sm">{customer.name}</span>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="flex flex-col">
                                            <span className="text-sm text-slate-600">{customer.email}</span>
                                            <span className="text-xs text-slate-400">{customer.phone}</span>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 text-sm text-slate-600">{customer.orders}</td>
                                    <td className="px-6 py-4 text-sm font-semibold text-slate-800">{customer.totalSpent}</td>
                                    <td className="px-6 py-4">
                                        <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${customer.status === 'VIP' ? 'bg-purple-100 text-purple-700' :
                                            customer.status === 'New' ? 'bg-blue-100 text-blue-700' :
                                                'bg-green-100 text-green-700'
                                            }`}>
                                            {customer.status}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 text-sm text-slate-500">{customer.joinDate}</td>
                                    <td className="px-6 py-4">
                                        <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                            <button
                                                onClick={() => setSelectedCustomer(customer)}
                                                className="p-1.5 hover:bg-gray-200 rounded text-slate-500 hover:text-primary transition"
                                            >
                                                <Eye className="w-4 h-4" />
                                            </button>
                                            <button className="p-1.5 hover:bg-red-50 rounded text-slate-500 hover:text-red-500 transition">
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

            <CustomerModal customer={selectedCustomer} onClose={() => setSelectedCustomer(null)} />
        </div>
    );
}
