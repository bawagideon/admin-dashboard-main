import React, { useState, useEffect } from 'react';
import { Search, Filter, MoreHorizontal, Download, Printer, CreditCard, Zap, CheckCircle2, X, AlertCircle, Clock, ClipboardCheck } from 'lucide-react';
import BulkActionsBar from '../components/BulkActionsBar';
import SmartAssignPopover from '../components/SmartAssignPopover';
import RequestTimeline from '../components/RequestTimeline';
import QAReviewModal from '../components/QAReviewModal';
import { cn } from '../lib/utils';
import { useRole } from '../lib/RoleContext';
import { useWorkflow } from '../lib/WorkflowContext';
import { SERVICE_STATUS } from '../lib/constants';
import OpsOrdersTour from '../components/tours/OpsOrdersTour';
import { toast } from 'sonner';

const initialOrders = [
    { id: 1, orderId: '#179', customer: 'Anne Guesser', email: 'anyiafavour@gmail.com', service: 'Pipeline Inspection', assigned: 'Unassigned', status: 'Unassigned', date: '2025-11-14 15:56:24 UTC', rework: false },
    { id: 2, orderId: '#178', customer: 'Anne Guesser', email: 'anyiafavour@gmail.com', service: 'Operational Audit', assigned: 'John Doe', status: 'In Progress', date: '2025-11-14 15:59:07 UTC', rework: true },
    { id: 3, orderId: '#177', customer: 'Anne Okocha', email: 'anyiafavour15@gmail.com', service: 'Strategic Planning', assigned: 'Jane Smith', status: 'Ops Review', date: '2025-11-14 16:02:51 UTC', rework: false },
    { id: 4, orderId: '#176', customer: 'Anne Okocha', email: 'anyiafavour15@gmail.com', service: 'Facility Maintenance', assigned: 'Unassigned', status: 'Awaiting Payment', date: '2025-11-14 16:14:42 UTC', rework: false },
    { id: 5, orderId: '#175', customer: 'Biliki Muhammed', email: 'gyjhdsjhd@gmail.com', service: 'Resource Allocation', assigned: 'Robert Fox', status: 'MD Approval', date: '2025-11-14 16:16:34 UTC', rework: false },
    { id: 6, orderId: '#174', customer: 'Dangote Corp', email: 'procurement@dangote.com', service: 'Energy Assessment', assigned: 'Sarah Jenkins', status: 'Closed', date: '2025-11-13 10:11:05 UTC', rework: false },
];

const SLATimer = ({ date, status }) => {
    const [timeLeft, setTimeLeft] = useState('');
    const [isOverdue, setIsOverdue] = useState(false);

    useEffect(() => {
        const calculate = () => {
            const now = new Date();
            const createdDate = new Date(date);
            const diffMs = now - createdDate;
            const diffHours = diffMs / (1000 * 60 * 60);

            // Check if in Awaiting Payment for > 24h
            if (status === SERVICE_STATUS.AWAITING_PAYMENT && diffHours > 24) {
                setIsOverdue(true);
            } else {
                setIsOverdue(false);
            }

            const totalSLA = 48 * 60 * 60 * 1000; // 48h Total SLA
            const remaining = totalSLA - diffMs;

            if (remaining <= 0) {
                setTimeLeft('EXPIRED');
            } else {
                const h = Math.floor(remaining / (1000 * 60 * 60));
                const m = Math.floor((remaining % (1000 * 60 * 60)) / (1000 * 60));
                setTimeLeft(`${h}h ${m}m`);
            }
        };

        calculate();
        const timer = setInterval(calculate, 60000);
        return () => clearInterval(timer);
    }, [date, status]);

    if (status === SERVICE_STATUS.CLOSED) return null;

    return (
        <div className="flex flex-col items-center gap-0.5 mt-1">
            <span className={cn(
                "text-[8px] font-black font-mono tracking-tighter uppercase",
                isOverdue ? "text-red-500 animate-pulse" : "text-slate-400"
            )}>
                {isOverdue ? 'SLA BREACH' : `SLA: ${timeLeft}`}
            </span>
        </div>
    );
};


const OrderActions = ({
    order,
    activeRole,
    roles,
    processingPaymentId,
    simulatePayment,
    assigningId,
    setAssigningId,
    handleAssign,
    setReviewingOrder,
    isMobile = false
}) => {
    return (
        <div className={cn("flex items-center gap-2", isMobile ? "w-full justify-end" : "relative")}>
            {order.status === SERVICE_STATUS.AWAITING_PAYMENT && (activeRole === roles.ADMIN || activeRole === roles.MD) && (
                <button
                    onClick={(e) => {
                        e.stopPropagation();
                        simulatePayment(order.id);
                    }}
                    disabled={processingPaymentId === order.id}
                    className="px-3 py-1 bg-yellow-500 text-white text-[10px] font-bold rounded-md hover:bg-yellow-600 transition flex items-center gap-1 disabled:opacity-50"
                >
                    {processingPaymentId === order.id ? (
                        <div className="w-3 h-3 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    ) : (
                        <CreditCard className="w-3 h-3" />
                    )}
                    {isMobile ? 'Pay' : 'Stripe/PayPal Hook'}
                </button>
            )}

            {order.status === SERVICE_STATUS.UNASSIGNED && (activeRole === roles.OPS_MANAGER || activeRole === roles.ADMIN) && (
                <div className="relative">
                    <button
                        id="smart-assign-btn"
                        onClick={(e) => {
                            e.stopPropagation();
                            setAssigningId(assigningId === order.id ? null : order.id);
                        }}
                        className="px-3 py-1 bg-primary text-white text-[10px] font-bold rounded-md hover:bg-primary/90 transition flex items-center gap-1"
                    >
                        <Zap className="w-3 h-3" />
                        {isMobile ? 'Assign' : 'Smart Assign'}
                    </button>
                    {assigningId === order.id && (
                        <SmartAssignPopover
                            request={order}
                            onAssign={(team) => handleAssign(order.id, team)}
                            onClose={() => setAssigningId(null)}
                        />
                    )}
                </div>
            )}

            {order.status === SERVICE_STATUS.OPS_REVIEW && (activeRole === roles.OPS_MANAGER || activeRole === roles.ADMIN) && (
                <button
                    id="perform-qa-btn"
                    onClick={(e) => {
                        e.stopPropagation();
                        setReviewingOrder(order);
                    }}
                    className="px-3 py-1 bg-purple-600 text-white text-[10px] font-bold rounded-md hover:bg-purple-700 transition flex items-center gap-1 shadow-sm"
                >
                    <ClipboardCheck className="w-3 h-3" />
                    {isMobile ? 'QA' : 'Perform QA Review'}
                </button>
            )}
        </div>
    );
};

export default function Orders() {
    const { activeRole, roles } = useRole();
    const { orders, updateOrder, transitionOrder, setRework } = useWorkflow();
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedOrders, setSelectedOrders] = useState([]);
    const [assigningId, setAssigningId] = useState(null);
    const [processingPaymentId, setProcessingPaymentId] = useState(null);
    const [viewingRequest, setViewingRequest] = useState(null);
    const [reviewingOrder, setReviewingOrder] = useState(null);

    const filteredOrders = orders.filter(order =>
        order.customer.toLowerCase().includes(searchTerm.toLowerCase()) ||
        order.orderId.toLowerCase().includes(searchTerm.toLowerCase()) ||
        order.service.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const toggleSelect = (id) => {
        setSelectedOrders(prev =>
            prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]
        );
    };

    const toggleSelectAll = () => {
        if (selectedOrders.length === filteredOrders.length) {
            setSelectedOrders([]);
        } else {
            setSelectedOrders(filteredOrders.map(o => o.id));
        }
    };

    // Simulate Payment Webhook (Phase 2)
    const simulatePayment = (id) => {
        setProcessingPaymentId(id);
        setTimeout(() => {
            transitionOrder(id, SERVICE_STATUS.UNASSIGNED);
            setProcessingPaymentId(null);
            toast.success('Payment Verified', {
                description: 'Webhook confirmed. Request moved to Unassigned.',
            });
        }, 1500);
    };

    const handleAssign = (id, teamName) => {
        updateOrder(id, {
            assigned: teamName,
            status: SERVICE_STATUS.IN_PROGRESS
        });
        setAssigningId(null);
        toast.success('Team Assigned', {
            description: `Request successfully routed to ${teamName}.`,
        });
    };

    const handleRework = (id) => {
        setRework(id, 'Manager requested rework after quality check.');
        toast.error('Rework Requested', {
            description: 'Specialist notified. Request sent back to Mission Control.',
        });
    };

    return (
        <div className="space-y-6">
            <div className="flex flex-col gap-2">
                <h1 className="text-2xl font-bold text-slate-800">Service Fulfillment Pipeline</h1>
                <p className="text-slate-500 text-sm">Active Requests: {orders.length}</p>
            </div>

            <div className="bg-white rounded-xl border border-gray-100 shadow-sm">
                <div className="p-4 md:p-6 border-b border-gray-100 flex flex-col md:flex-row justify-between items-center gap-4">
                    <div className="relative flex-1 w-full md:max-w-md">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
                        <input
                            type="text"
                            placeholder="Search requests, clients, services..."
                            className="w-full pl-9 pr-4 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-primary/50 text-slate-600"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>

                    <div className="flex items-center gap-2 w-full md:w-auto">
                        <button className="flex-1 md:flex-none flex items-center justify-center gap-2 px-4 py-2 border border-gray-200 rounded-lg text-sm font-medium text-slate-600 hover:bg-gray-50 transition">
                            <Filter className="w-4 h-4" />
                            Filter
                        </button>
                        <button className="flex-1 md:flex-none flex items-center justify-center gap-2 px-4 py-2 border border-primary text-primary rounded-lg text-sm font-medium hover:bg-primary/5 transition">
                            <Download className="w-4 h-4" />
                            Export Pipeline
                        </button>
                    </div>
                </div>

                <div className="hidden md:block">
                    <table className="w-full text-left border-collapse min-w-[800px]">
                        <thead>
                            <tr className="bg-gray-50/50 border-b border-gray-100">
                                <th className="px-6 py-4 w-10">
                                    <input
                                        type="checkbox"
                                        className="rounded border-gray-300 text-primary focus:ring-primary h-4 w-4"
                                        checked={selectedOrders.length === filteredOrders.length && filteredOrders.length > 0}
                                        onChange={toggleSelectAll}
                                    />
                                </th>
                                <th className="px-6 py-4 text-xs font-bold text-slate-700 uppercase">#</th>
                                <th className="px-6 py-4 text-xs font-bold text-slate-700 uppercase">Client</th>
                                <th className="px-6 py-4 text-xs font-bold text-slate-700 uppercase">Service Type</th>
                                <th className="px-6 py-4 text-xs font-bold text-slate-700 uppercase">Assigned To</th>
                                <th className="px-6 py-4 text-xs font-bold text-slate-700 uppercase">Pipeline Stage</th>
                                <th className="px-6 py-4 text-xs font-bold text-slate-700 uppercase">Request Date</th>
                                <th className="px-6 py-4 text-xs font-bold text-slate-700 uppercase"></th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-50">
                            {filteredOrders.map((order) => (
                                <tr
                                    key={order.id}
                                    onClick={() => setViewingRequest(order)}
                                    className={cn("hover:bg-gray-50 transition-colors cursor-pointer group", selectedOrders.includes(order.id) && "bg-primary/5")}
                                >
                                    <td className="px-6 py-4" onClick={(e) => e.stopPropagation()}>
                                        <input
                                            type="checkbox"
                                            className="rounded border-gray-300 text-primary focus:ring-primary h-4 w-4"
                                            checked={selectedOrders.includes(order.id)}
                                            onChange={() => toggleSelect(order.id)}
                                        />
                                    </td>
                                    <td className="px-6 py-4 text-sm font-medium text-primary">{order.id}</td>
                                    <td className="px-6 py-4">
                                        <div className="flex flex-col">
                                            <span className="font-semibold text-slate-800 text-sm">{order.customer}</span>
                                            <span className="text-xs text-slate-400">{order.email}</span>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 text-sm text-slate-600">{order.service}</td>
                                    <td className="px-6 py-4 text-sm font-medium text-slate-800">
                                        <div className="flex items-center gap-2">
                                            <div className="w-6 h-6 rounded-full bg-gray-100 flex items-center justify-center text-[10px] font-bold text-slate-500">
                                                {order.assigned === 'Unassigned' ? '?' : order.assigned.split(' ').map(n => n[0]).join('')}
                                            </div>
                                            {order.assigned}
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="flex flex-col items-center">
                                            <span className={cn(
                                                "inline-flex items-center gap-1.5 px-3 py-1 rounded-md text-[10px] font-bold border uppercase tracking-wider",
                                                order.status === SERVICE_STATUS.AWAITING_PAYMENT ? 'bg-yellow-50 border-yellow-200 text-yellow-700 pipeline-stage-awaiting' :
                                                    order.status === SERVICE_STATUS.UNASSIGNED ? 'bg-red-50 border-red-200 text-red-700' :
                                                        order.status === SERVICE_STATUS.IN_PROGRESS ? 'bg-blue-50 border-blue-200 text-blue-700' :
                                                            order.status === SERVICE_STATUS.OPS_REVIEW ? 'bg-purple-50 border-purple-200 text-purple-700' :
                                                                order.status === SERVICE_STATUS.MD_APPROVAL ? 'bg-orange-50 border-orange-200 text-orange-700' :
                                                                    'bg-green-50 border-green-200 text-green-700'
                                            )}>
                                                {order.status}
                                            </span>
                                            <SLATimer date={order.date} status={order.status} />
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 text-xs text-slate-500 font-mono">{order.date}</td>
                                    <td className="px-6 py-4" onClick={(e) => e.stopPropagation()}>
                                        <div className="flex items-center gap-2 relative">
                                            <OrderActions
                                                order={order}
                                                activeRole={activeRole}
                                                roles={roles}
                                                processingPaymentId={processingPaymentId}
                                                simulatePayment={simulatePayment}
                                                assigningId={assigningId}
                                                setAssigningId={setAssigningId}
                                                handleAssign={handleAssign}
                                                setReviewingOrder={setReviewingOrder}
                                            />
                                            <button className="text-slate-400 hover:text-primary transition">
                                                <MoreHorizontal className="w-5 h-5" />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {/* Mobile Card View */}
                <div className="md:hidden divide-y divide-gray-100">
                    {filteredOrders.map((order) => (
                        <div
                            key={order.id}
                            className={cn(
                                "p-4 space-y-4 active:bg-gray-50 transition-colors",
                                selectedOrders.includes(order.id) && "bg-primary/5"
                            )}
                            onClick={() => setViewingRequest(order)}
                        >
                            <div className="flex justify-between items-start">
                                <div className="flex items-center gap-3">
                                    <input
                                        type="checkbox"
                                        className="rounded border-gray-300 text-primary h-4 w-4"
                                        checked={selectedOrders.includes(order.id)}
                                        onChange={(e) => {
                                            e.stopPropagation();
                                            toggleSelect(order.id);
                                        }}
                                    />
                                    <div>
                                        <span className="text-[10px] font-black text-primary uppercase tracking-widest">{order.orderId}</span>
                                        <h4 className="text-sm font-bold text-slate-800">{order.customer}</h4>
                                    </div>
                                </div>
                                <span className={cn(
                                    "px-2 py-0.5 rounded text-[9px] font-black uppercase tracking-wider border",
                                    order.status === SERVICE_STATUS.AWAITING_PAYMENT ? 'bg-yellow-50 border-yellow-200 text-yellow-700' :
                                        order.status === SERVICE_STATUS.UNASSIGNED ? 'bg-red-50 border-red-200 text-red-700' :
                                            order.status === SERVICE_STATUS.IN_PROGRESS ? 'bg-blue-50 border-blue-200 text-blue-700' :
                                                order.status === SERVICE_STATUS.OPS_REVIEW ? 'bg-purple-50 border-purple-200 text-purple-700' :
                                                    order.status === SERVICE_STATUS.MD_APPROVAL ? 'bg-orange-50 border-orange-200 text-orange-700' :
                                                        'bg-green-50 border-green-200 text-green-700'
                                )}>
                                    {order.status}
                                </span>
                            </div>

                            <div className="space-y-2 pl-7">
                                <div className="flex items-center gap-2 text-xs text-slate-600">
                                    <Zap className="w-3 h-3 text-slate-400" />
                                    {order.service}
                                </div>
                                <div className="flex items-center gap-2 text-xs text-slate-600">
                                    <div className="w-5 h-5 rounded-full bg-gray-100 flex items-center justify-center text-[8px] font-bold text-slate-500">
                                        {order.assigned === 'Unassigned' ? '?' : order.assigned.split(' ').map(n => n[0]).join('')}
                                    </div>
                                    <span className="font-medium">{order.assigned}</span>
                                </div>
                                <div className="flex items-center justify-between pt-2">
                                    <SLATimer date={order.date} status={order.status} />
                                    <div className="flex items-center gap-2" onClick={(e) => e.stopPropagation()}>
                                        <OrderActions
                                            order={order}
                                            activeRole={activeRole}
                                            roles={roles}
                                            processingPaymentId={processingPaymentId}
                                            simulatePayment={simulatePayment}
                                            assigningId={assigningId}
                                            setAssigningId={setAssigningId}
                                            handleAssign={handleAssign}
                                            setReviewingOrder={setReviewingOrder}
                                            isMobile
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            <BulkActionsBar selectedCount={selectedOrders.length} />

            {/* Request Detail Overlay */}
            {viewingRequest && (
                <div className="fixed inset-0 z-50 flex justify-end animate-in fade-in duration-300">
                    <div className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm" onClick={() => setViewingRequest(null)} />
                    <div className="relative w-full max-w-lg bg-white h-full shadow-2xl animate-in slide-in-from-right duration-500 overflow-y-auto">
                        <div className="p-6 border-b border-gray-100 flex items-center justify-between sticky top-0 bg-white z-10">
                            <div>
                                <h2 className="text-xl font-bold text-slate-800 flex items-center gap-2">
                                    {viewingRequest.orderId}
                                    <span className="text-xs font-normal text-slate-400">/ Details</span>
                                </h2>
                                <p className="text-xs text-slate-500 mt-1">{viewingRequest.service}</p>
                            </div>
                            <button
                                onClick={() => setViewingRequest(null)}
                                className="p-2 hover:bg-gray-100 rounded-full transition-colors text-slate-400 hover:text-slate-600"
                            >
                                <X className="w-6 h-6" />
                            </button>
                        </div>

                        <div className="p-6">
                            {/* Stats Grid */}
                            <div className="grid grid-cols-2 gap-4 mb-8">
                                <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100">
                                    <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Client</span>
                                    <h4 className="text-sm font-bold text-slate-800 mt-1">{viewingRequest.customer}</h4>
                                </div>
                                <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100">
                                    <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Team</span>
                                    <h4 className="text-sm font-bold text-slate-800 mt-1">{viewingRequest.assigned}</h4>
                                </div>
                            </div>

                            <div className="space-y-6">
                                <h3 className="text-xs font-black text-slate-400 uppercase tracking-widest flex items-center gap-2">
                                    <Clock className="w-4 h-4 text-primary" />
                                    Execution Timeline & SLA
                                </h3>
                                <RequestTimeline request={viewingRequest} />
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* QA Review Modal */}
            {reviewingOrder && (
                <QAReviewModal
                    order={reviewingOrder}
                    onApprove={() => {
                        transitionOrder(reviewingOrder.id, SERVICE_STATUS.MD_APPROVAL);
                        setReviewingOrder(null);
                        toast.info('QA Approved', {
                            description: 'Request moving to Executive Governance.',
                        });
                    }}
                    onReject={() => {
                        handleRework(reviewingOrder.id);
                        setReviewingOrder(null);
                    }}
                    onClose={() => setReviewingOrder(null)}
                />
            )}
            <OpsOrdersTour />
        </div>
    );
}
