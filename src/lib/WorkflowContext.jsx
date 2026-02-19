import React, { createContext, useContext, useState, useCallback, useEffect } from 'react';
import { SERVICE_STATUS, SERVICE_CHECKLISTS } from './constants';

const WorkflowContext = createContext();

const initialOrders = [
    {
        id: 1,
        orderId: '#179',
        customer: 'Anne Guesser',
        email: 'anyiafavour@gmail.com',
        service: 'Standard EB-1A Analysis',
        assigned: 'Unassigned',
        status: SERVICE_STATUS.UNASSIGNED,
        date: '2025-11-14 15:56:24 UTC',
        rework: false,
        priority: 'Medium'
    }
];

export function WorkflowProvider({ children }) {
    const [orders, setOrders] = useState(initialOrders);

    const addOrder = useCallback((newOrder) => {
        setOrders(prev => [{
            ...newOrder,
            id: Date.now(),
            status: SERVICE_STATUS.AWAITING_PAYMENT,
            date: new Date().toISOString().replace('T', ' ').substring(0, 19) + ' UTC',
            rework: false,
            isSessionAction: true
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
                const updated = { ...o, status: nextStatus, isSessionAction: true };

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
