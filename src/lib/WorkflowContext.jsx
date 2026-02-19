import React, { createContext, useContext, useState, useCallback, useEffect } from 'react';
import { SERVICE_STATUS, SERVICE_CHECKLISTS } from './constants';

const WorkflowContext = createContext();

const initialOrders = [
    {
        id: 1,
        orderId: '#179',
        customer: 'Anne Guesser',
        email: 'anyiafavour@gmail.com',
        service: 'Pipeline Inspection',
        assigned: 'Unassigned',
        status: SERVICE_STATUS.UNASSIGNED,
        date: '2025-11-14 15:56:24 UTC',
        rework: false,
        priority: 'Medium'
    },
    {
        id: 2,
        orderId: '#178',
        customer: 'Anne Guesser',
        email: 'anyiafavour@gmail.com',
        service: 'Operational Audit',
        assigned: 'Team Alpha (Special Ops)',
        status: SERVICE_STATUS.IN_PROGRESS,
        date: '2025-11-14 15:59:07 UTC',
        rework: true,
        reworkComment: 'Evidence for Section 4.2 is blurry. Please re-upload.',
        priority: 'High',
        checklist: [
            { id: 1, label: 'Standard Operating Procedures Review', completed: true },
            { id: 2, label: 'Safety Compliance Evidence', completed: false },
            { id: 3, label: 'Financial Discrepancy Log', completed: false },
            { id: 4, label: 'Final Audit Summary Document', completed: false },
        ]
    },
    {
        id: 3,
        orderId: '#177',
        customer: 'Anne Okocha',
        email: 'anyiafavour15@gmail.com',
        service: 'Strategic Planning',
        assigned: 'Team Gamma',
        status: SERVICE_STATUS.OPS_REVIEW,
        date: '2025-11-14 16:02:51 UTC',
        rework: false,
        priority: 'Low'
    },
    {
        id: 5,
        orderId: '#175',
        customer: 'Biliki Muhammed',
        email: 'gyjhdsjhd@gmail.com',
        service: 'Resource Allocation',
        assigned: 'Team Beta',
        status: SERVICE_STATUS.MD_APPROVAL,
        date: '2025-11-14 16:16:34 UTC',
        rework: false,
        priority: 'Medium'
    }
];

export function WorkflowProvider({ children }) {
    const [orders, setOrders] = useState(initialOrders);

    const addOrder = useCallback((newOrder) => {
        setOrders(prev => [{
            ...newOrder,
            id: prev.length + 1,
            status: SERVICE_STATUS.AWAITING_PAYMENT,
            date: new Date().toISOString().replace('T', ' ').substring(0, 19) + ' UTC',
            rework: false
        }, ...prev]);
    }, []);

    const updateOrder = useCallback((id, updates) => {
        setOrders(prev => prev.map(o => {
            if (o.id === id) {
                const updated = { ...o, ...updates };
                // Initialize checklist if moving to In Progress and doesn't have one
                if (updated.status === SERVICE_STATUS.IN_PROGRESS && !updated.checklist) {
                    updated.checklist = SERVICE_CHECKLISTS[updated.service] || SERVICE_CHECKLISTS['default'];
                }
                return updated;
            }
            return o;
        }));
    }, []);

    const transitionOrder = useCallback((id, nextStatus) => {
        setOrders(prev => prev.map(o => {
            if (o.id === id) {
                const updated = { ...o, status: nextStatus };

                // [Notification Integration] Simulate Slack/Gmail API calls
                console.log(`%c[NOTIFICATION ENGINE] Status Change for ${o.orderId}: ${o.status} -> ${nextStatus}`, 'color: #7c3aed; font-weight: bold;');
                console.log(` > Mocking Slack API: "Attention @ops-team, Case ${o.orderId} moved to ${nextStatus}"`);
                console.log(` > Mocking Gmail API: "To: ${o.email}, Subject: Your request is now ${nextStatus}"`);

                // Initialize checklist if moving to In Progress and doesn't have one
                if (nextStatus === SERVICE_STATUS.IN_PROGRESS && !updated.checklist) {
                    updated.checklist = SERVICE_CHECKLISTS[updated.service] || SERVICE_CHECKLISTS['default'];
                }
                return updated;
            }
            return o;
        }));
    }, []);

    const setRework = useCallback((id, comment) => {
        setOrders(prev => prev.map(o => o.id === id ? {
            ...o,
            status: SERVICE_STATUS.IN_PROGRESS,
            rework: true,
            reworkComment: comment || 'Manager requested updates.'
        } : o));
    }, []);

    const closeOrder = useCallback((id) => {
        setOrders(prev => prev.map(o => o.id === id ? { ...o, status: SERVICE_STATUS.CLOSED } : o));
    }, []);

    const bulkClose = useCallback((ids) => {
        setOrders(prev => prev.map(o => ids.includes(o.id) ? { ...o, status: SERVICE_STATUS.CLOSED } : o));
    }, []);

    return (
        <WorkflowContext.Provider value={{
            orders,
            addOrder,
            updateOrder,
            transitionOrder,
            setRework,
            closeOrder,
            bulkClose
        }}>
            {children}
        </WorkflowContext.Provider>
    );
}

export function useWorkflow() {
    const context = useContext(WorkflowContext);
    if (!context) {
        throw new Error('useWorkflow must be used within a WorkflowProvider');
    }
    return context;
}
