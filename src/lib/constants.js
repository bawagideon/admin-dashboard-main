export const SERVICE_STATUS = {
    INTAKE: 'Intake',               // Phase 1: Seen in Admin Inbox
    AWAITING_PAYMENT: 'Awaiting Payment', // Phase 1 -> 2
    UNASSIGNED: 'Unassigned',       // Phase 2: Needs Ops Assignment
    IN_PROGRESS: 'In Progress',     // Phase 3: In Specialist Workspace
    OPS_REVIEW: 'Ops Review',       // Phase 3 -> 4: Back to Ops Manager
    MD_APPROVAL: 'MD Approval',     // Phase 4: In MD Dashboard
    CLOSED: 'Closed'                // Final Archive
};

export const TEAM_SUGGESTIONS = [
    { id: 1, name: 'Team Alpha (Special Ops)', lead: 'Tunde Bakare', workload: 45, status: 'Optimal', expertise: 'High-Risk Inspection' },
    { id: 2, name: 'Team Beta', lead: 'Sarah Jenkins', workload: 85, status: 'Overloaded', expertise: 'General Logistics' },
    { id: 3, name: 'Team Gamma', lead: 'Robert Fox', workload: 12, status: 'Underutilized', expertise: 'Strategic Planning' },
];

export const SERVICE_CHECKLISTS = {
    'Pipeline Inspection': [
        { id: 1, label: 'Physical Integrity Walkthrough', completed: false },
        { id: 2, label: 'Ultrasonic Thickness Measurement', completed: false },
        { id: 3, label: 'Corrosion Point Documentation', completed: false },
        { id: 4, label: 'High-Res Photo Evidence Upload', completed: false },
    ],
    'Operational Audit': [
        { id: 1, label: 'Standard Operating Procedures Review', completed: false },
        { id: 2, label: 'Safety Compliance Evidence', completed: false },
        { id: 3, label: 'Financial Discrepancy Log', completed: false },
        { id: 4, label: 'Final Audit Summary Document', completed: false },
    ],
    'Strategic Planning': [
        { id: 1, label: 'SWOT Analysis Model', completed: false },
        { id: 2, label: 'Resource Gap Assessment', completed: false },
        { id: 3, label: '5-Year Roadmap Draft', completed: false },
    ],
    'default': [
        { id: 1, label: 'Initial Site Survey', completed: false },
        { id: 2, label: 'Execution Evidence', completed: false },
        { id: 3, label: 'Quality Sign-off', completed: false },
    ]
};

export const SERVICE_CATALOG = [
    { id: 1, name: 'Standard EB-1A Analysis', fee: '₦150,000', availability: '12 Specialists', leadTime: '3-5 Days', status: 'Active' },
    { id: 2, name: 'Premium O-1A Filing', fee: '₦450,000', availability: '5 Specialists', leadTime: '14-21 Days', status: 'Active' },
    { id: 3, name: 'Corporate Green Card Audit', fee: '₦850,000', availability: '2 Specialists', leadTime: '30 Days', status: 'In Demand' },
];
