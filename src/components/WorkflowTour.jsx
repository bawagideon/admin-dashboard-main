import React, { useState, useEffect } from 'react';
import Joyride, { STATUS } from 'react-joyride';
import { useRole } from '../lib/RoleContext';

export default function WorkflowTour() {
    const { activeRole, roles } = useRole();
    const [run, setRun] = useState(false);

    // Initial check to see if tour should run
    useEffect(() => {
        const handleRestart = () => {
            setRun(false);
            setTimeout(() => setRun(true), 100);
        };

        window.addEventListener('restart-tour', handleRestart);

        const hasSeenTour = localStorage.getItem('hasSeenWorkflowTour');
        if (!hasSeenTour) {
            setRun(true);
        }

        return () => window.removeEventListener('restart-tour', handleRestart);
    }, []);

    const steps = [
        {
            target: '#overview-header',
            content: (
                <div className="text-left">
                    <p className="font-bold text-primary mb-2">Welcome to your Dashboard</p>
                    <p className="text-sm text-slate-600 leading-relaxed">
                        This is your central hub for managing the Dangote Service Fulfillment lifecycle.
                    </p>
                </div>
            ),
            placement: 'bottom',
            disableBeacon: true,
            role: [roles.ADMIN, roles.MD, roles.OPS_MANAGER, roles.TEAM_MEMBER]
        },
        {
            target: '#active-requests-card',
            content: (
                <div className="text-left">
                    <p className="font-bold text-primary mb-2">Real-time Pipeline</p>
                    <p className="text-sm text-slate-600 leading-relaxed">
                        Monitor the total volume of active service requests across all stages.
                    </p>
                </div>
            ),
            placement: 'right',
            role: [roles.ADMIN, roles.MD, roles.OPS_MANAGER]
        },
        {
            target: '#admin-verify-btn',
            content: (
                <div className="text-left">
                    <p className="font-bold text-primary mb-2">Start Phase 1: Intake</p>
                    <p className="text-sm text-slate-600">
                        "The request should normally drop first with the admin in charge..."
                    </p>
                    <p className="text-xs text-slate-400 mt-2">
                        Clicking this takes you to the <b>Admin Inbox</b> to verify details and send payment advice.
                    </p>
                </div>
            ),
            placement: 'top',
            role: [roles.ADMIN]
        },
        {
            target: '#admin-inbox-header',
            content: (
                <div className="text-left">
                    <p className="font-bold text-primary mb-2">Phase 1: Intelligent Intake</p>
                    <p className="text-sm text-slate-600 leading-relaxed">
                        Admin reviews AI-parsed documents and generates Payment Advice.
                    </p>
                </div>
            ),
            placement: 'bottom',
            role: [roles.ADMIN]
        },
        {
            target: '#approve-quote-btn',
            content: (
                <div className="text-left">
                    <p className="text-sm text-slate-600">
                        "They revert to the client with cost and payment advice..."
                    </p>
                    <p className="text-xs text-slate-400 mt-2 italic font-medium">
                        Clicking this fulfills Phase 1 of your brief.
                    </p>
                </div>
            ),
            placement: 'top',
            role: [roles.ADMIN]
        },
        {
            target: '.pipeline-stage-awaiting',
            content: (
                <div className="text-left">
                    <p className="font-bold text-primary mb-2">Phase 2: Payment Verification</p>
                    <p className="text-sm text-slate-600 leading-relaxed">
                        "When payment is made, the update comes back to the admin..."
                    </p>
                    <p className="text-xs text-slate-400 mt-2">
                        Step 2: Once payment is confirmed via webhook, requests move to 'Unassigned'.
                    </p>
                </div>
            ),
            placement: 'right',
            role: [roles.ADMIN, roles.MD, roles.OPS_MANAGER]
        },
        {
            target: '#smart-assign-btn',
            content: (
                <div className="text-left">
                    <p className="font-bold text-primary mb-2">Phase 3: Intelligent Routing</p>
                    <p className="text-sm text-slate-600 leading-relaxed">
                        "...who then forwards to the Operations Manager who assigns the task..."
                    </p>
                    <p className="text-xs text-slate-400 mt-2">
                        Step 3: Ops Manager uses 'Smart Assign' to route tasks based on team expertise.
                    </p>
                </div>
            ),
            placement: 'top',
            role: [roles.ADMIN, roles.OPS_MANAGER]
        },
        {
            target: '#evidence-locker',
            content: (
                <div className="text-left">
                    <p className="font-bold text-primary mb-2">Phase 4: Expert Execution</p>
                    <p className="text-sm text-slate-600 leading-relaxed">
                        "(There are two team members that execute). Then after the completion of tasks by team, they mark completed..."
                    </p>
                    <p className="text-xs text-slate-400 mt-2">
                        Step 4: Specialists complete the dynamic checklist specific to this service type.
                    </p>
                </div>
            ),
            placement: 'left',
            role: [roles.TEAM_MEMBER]
        },
        {
            target: '#md-approve-btn',
            content: (
                <div className="text-left">
                    <p className="font-bold text-primary mb-2">Phase 5: Executive Governance</p>
                    <p className="text-sm text-slate-600 leading-relaxed">
                        "MD to approve (Close if process is vetted as completed)"
                    </p>
                    <p className="text-xs text-slate-400 mt-2">
                        Step 5: MD performs final vetting and closes the case for archiving.
                    </p>
                </div>
            ),
            placement: 'top',
            role: [roles.MD]
        }
    ];

    // Filter steps based on active role
    const filteredSteps = steps.filter(step => step.role.includes(activeRole));

    const handleJoyrideCallback = (data) => {
        const { status } = data;
        const finishedStatuses = [STATUS.FINISHED, STATUS.SKIPPED];

        if (finishedStatuses.includes(status)) {
            setRun(false);
            localStorage.setItem('hasSeenWorkflowTour', 'true');
        }
    };

    return (
        <Joyride
            steps={filteredSteps}
            run={run}
            continuous
            showProgress
            showSkipButton
            callback={handleJoyrideCallback}
            styles={{
                options: {
                    primaryColor: '#7c3aed',
                    zIndex: 10000,
                },
                tooltipContainer: {
                    textAlign: 'left'
                },
                buttonNext: {
                    borderRadius: '8px',
                    fontWeight: 'bold',
                    padding: '10px 20px'
                },
                buttonBack: {
                    marginRight: '10px',
                    fontWeight: 'bold'
                }
            }}
        />
    );
}
