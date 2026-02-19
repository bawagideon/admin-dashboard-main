import React, { useState } from 'react';
import {
    ArrowLeft,
    CheckCircle,
    FileText,
    Sparkles,
    Send,
    AlertCircle,
    User,
    Mail,
    Phone,
    MapPin,
    Calendar,
    Download
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { cn } from '../lib/utils';

export default function AdminInbox() {
    const [isApproved, setIsApproved] = useState(false);

    // Mock Incoming Request Data
    const requestData = {
        client: 'Banner Vannessa',
        email: 'b.vannessa@enterprise.com',
        phone: '+234 801 234 5678',
        company: 'Vannessa Logistics Ltd',
        serviceRequested: 'Industrial Pipeline Audit & Maintenance',
        details: 'Looking for a comprehensive audit of our southern terminal pipelines. We have noticed some pressure fluctuations and need a certified inspection team to verify integrity and suggest a maintenance schedule for the next fiscal year.',
        submittedDate: 'Feb 19, 2026 10:15 AM',
        attachments: ['Terminal_Map_v2.pdf', 'Pressure_Logs_Jan.csv']
    };

    // AI Generated Insights (Simulated Parsing)
    const aiAnalysis = {
        recommendation: 'Priority Audit Level 3 + Corrosion Assessment',
        complexity: 'High',
        estimatedDuration: '14 Days',
        calculatedCost: '₦4,500,000.00',
        draftAdvice: `Dear ${requestData.client}, based on your request for ${requestData.serviceRequested}, we have prepared a comprehensive audit plan. This includes a Level 3 integrity check and a detailed corrosion assessment. The total estimated cost is ${'₦4,500,000.00'} which includes specialized equipment and resource allocation for 14 days.`
    };

    const handleApprove = () => {
        setIsApproved(true);
        // In a real app, this would trigger the actual email/notification
    };

    return (
        <div className="space-y-6 max-w-7xl mx-auto">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                    <Link to="/" className="p-2 hover:bg-gray-100 rounded-lg transition text-slate-500">
                        <ArrowLeft className="w-5 h-5" />
                    </Link>
                    <div>
                        <h1 className="text-2xl font-bold text-slate-800 flex items-center gap-2">
                            Intelligent Request Inbox
                            <span className="bg-primary/10 text-primary text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider">
                                Phase 1: Intake
                            </span>
                        </h1>
                        <p className="text-slate-500 text-sm">Reviewing request from {requestData.client}</p>
                    </div>
                </div>
            </div>

            {isApproved ? (
                <div className="bg-green-50 border border-green-200 rounded-2xl p-12 text-center animate-in fade-in zoom-in duration-300">
                    <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                        <CheckCircle className="w-10 h-10 text-green-600" />
                    </div>
                    <h2 className="text-2xl font-bold text-green-800 mb-2">Quote Sent Successfully!</h2>
                    <p className="text-green-700 mb-8 max-w-md mx-auto">
                        The AI-generated Payment Advice has been sent to {requestData.email}.
                        This request has been moved to 'Awaiting Payment' in the pipeline.
                    </p>
                    <Link to="/orders" className="bg-green-600 text-white px-8 py-3 rounded-xl font-bold hover:bg-green-700 transition shadow-lg shadow-green-200">
                        View Fulfillment Pipeline
                    </Link>
                </div>
            ) : (
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-stretch">
                    {/* Left Side: Client Intake Data */}
                    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden flex flex-col">
                        <div className="p-6 border-b border-gray-50 bg-gray-50/50 flex items-center justify-between">
                            <h3 className="font-bold text-slate-800 flex items-center gap-2">
                                <User className="w-4 h-4 text-slate-400" />
                                Form Submission Data
                            </h3>
                            <span className="text-xs text-slate-400 font-medium">{requestData.submittedDate}</span>
                        </div>
                        <div className="p-8 space-y-8 flex-1">
                            {/* Client Profile */}
                            <div className="flex items-start gap-4">
                                <div className="w-12 h-12 bg-slate-100 rounded-xl flex items-center justify-center text-slate-500 font-bold">
                                    {requestData.client.split(' ').map(n => n[0]).join('')}
                                </div>
                                <div>
                                    <h4 className="font-bold text-slate-800">{requestData.client}</h4>
                                    <p className="text-sm text-slate-500">{requestData.company}</p>
                                </div>
                            </div>

                            {/* Contact Details */}
                            <div className="grid grid-cols-2 gap-6">
                                <div className="space-y-1">
                                    <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Email Address</label>
                                    <div className="flex items-center gap-2 text-sm text-slate-700">
                                        <Mail className="w-4 h-4 text-slate-300" />
                                        {requestData.email}
                                    </div>
                                </div>
                                <div className="space-y-1">
                                    <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Phone Number</label>
                                    <div className="flex items-center gap-2 text-sm text-slate-700">
                                        <Phone className="w-4 h-4 text-slate-300" />
                                        {requestData.phone}
                                    </div>
                                </div>
                            </div>

                            {/* Request Details */}
                            <div className="space-y-3">
                                <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Request Narrative</label>
                                <div className="p-4 bg-slate-50 rounded-xl border border-slate-100 text-sm text-slate-600 leading-relaxed italic">
                                    "{requestData.details}"
                                </div>
                            </div>

                            {/* Attachments */}
                            <div className="space-y-3">
                                <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Verification Documents</label>
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                    {requestData.attachments.map((file, idx) => (
                                        <div key={idx} className="flex items-center justify-between p-3 bg-white border border-gray-100 rounded-lg text-xs font-medium text-slate-700 group hover:border-primary/30 transition">
                                            <div className="flex items-center gap-2">
                                                <FileText className="w-4 h-4 text-blue-500" />
                                                {file}
                                            </div>
                                            <Download className="w-4 h-4 text-slate-300 group-hover:text-primary transition cursor-pointer" />
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Right Side: AI Generated Advice */}
                    <div className="bg-slate-900 rounded-2xl border border-slate-800 shadow-2xl overflow-hidden flex flex-col transform hover:scale-[1.01] transition-transform duration-300">
                        <div className="p-6 border-b border-slate-800 bg-slate-800/50 flex items-center justify-between">
                            <h3 className="font-bold text-white flex items-center gap-2">
                                <Sparkles className="w-4 h-4 text-primary animate-pulse" />
                                AI Parsing & Prediction
                            </h3>
                            <span className="bg-primary text-white text-[10px] font-black px-2 py-0.5 rounded uppercase font-mono">
                                High Confidence 98%
                            </span>
                        </div>
                        <div className="p-8 space-y-8 flex-1">
                            {/* AI Recommendations */}
                            <div className="grid grid-cols-2 gap-4">
                                <div className="p-4 bg-slate-800 rounded-xl border border-slate-700">
                                    <label className="text-[10px] font-bold text-slate-500 uppercase">Service Match</label>
                                    <p className="text-white text-sm font-bold mt-1">{aiAnalysis.recommendation}</p>
                                </div>
                                <div className="p-4 bg-slate-800 rounded-xl border border-slate-700">
                                    <label className="text-[10px] font-bold text-slate-500 uppercase">Complexity Estimate</label>
                                    <p className="text-primary text-sm font-black mt-1 uppercase flex items-center gap-2">
                                        <AlertCircle className="w-4 h-4" />
                                        {aiAnalysis.complexity}
                                    </p>
                                </div>
                            </div>

                            {/* Costing Engine */}
                            <div className="p-6 bg-primary/10 rounded-2xl border border-primary/20">
                                <div className="flex justify-between items-center mb-4">
                                    <label className="text-[10px] font-bold text-primary uppercase">Draft Invoice Total</label>
                                    <span className="text-xs text-slate-400 font-mono italic">Duration: {aiAnalysis.estimatedDuration}</span>
                                </div>
                                <div className="text-4xl font-black text-white tracking-tight">
                                    {aiAnalysis.calculatedCost}
                                </div>
                            </div>

                            {/* Draft Payment Advice */}
                            <div className="space-y-3">
                                <label className="text-[10px] font-bold text-slate-500 uppercase flex items-center gap-2">
                                    Draft Payment Advice (Client Facing)
                                    <span className="text-[9px] text-slate-600 normal-case font-medium">Editable by Admin</span>
                                </label>
                                <textarea
                                    className="w-full h-40 bg-slate-800 border border-slate-700 rounded-xl p-4 text-xs text-slate-300 leading-relaxed outline-none focus:border-primary/50 transition"
                                    defaultValue={aiAnalysis.draftAdvice}
                                />
                            </div>

                            {/* Action Button */}
                            <button
                                onClick={handleApprove}
                                className="w-full bg-primary hover:bg-primary/90 text-white py-4 rounded-xl font-bold flex items-center justify-center gap-2 shadow-lg shadow-primary/20 transition-all active:scale-95 group"
                            >
                                <Send className="w-5 h-5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                                Approve & Send Payment Advice
                            </button>
                            <p className="text-center text-[10px] text-slate-500 mt-2 italic">
                                This will automatically update the client via Email and Slack notification.
                            </p>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
