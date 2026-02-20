import React from 'react';
import Joyride, { STATUS } from 'react-joyride';
import { useRole } from '../../lib/RoleContext';
import { useTourTrigger } from '../../hooks/useTourTrigger';
import { tourStyles } from './TourStyles';

export default function OpsOrdersTour() {
    const { activeRole, roles } = useRole();
    const { run, setRun } = useTourTrigger();

    const steps = [
        {
            target: '.pipeline-stage-awaiting',
            content: (
                <div className="text-left">
                    <p className="font-bold text-primary mb-2">Phase 2: Payment Verification</p>
                    <p className="text-sm text-slate-600 leading-relaxed">
                        "When payment is made, the update comes back to the admin..."
                    </p>
                    <p className="text-xs text-slate-400 mt-2">
                        Requests move to 'Unassigned' automatically once the Stripe/PayPal webhook is received.
                    </p>
                </div>
            ),
            placement: 'right',
            disableBeacon: true,
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
                    <p className="text-xs text-slate-400 mt-2 italic">
                        The Ops Manager uses 'Smart Assign' to route requests to the best available Specialist.
                    </p>
                </div>
            ),
            placement: 'top',
            disableBeacon: true,
            role: [roles.ADMIN, roles.OPS_MANAGER]
        },
        {
            target: '#perform-qa-btn', // Reuse this if present for QA
            content: (
                <div className="text-left">
                    <p className="font-bold text-primary mb-2">Phase 4: QA Review</p>
                    <p className="text-sm text-slate-600 leading-relaxed">
                        After Specialists upload evidence, the Ops Manager performs a final QA review before MD sign-off.
                    </p>
                </div>
            ),
            placement: 'top',
            disableBeacon: true,
            role: [roles.OPS_MANAGER]
        }
    ];

    const filteredSteps = steps.filter(step => step.role.includes(activeRole));

    const handleJoyrideCallback = (data) => {
        const { status } = data;
        const finishedStatuses = [STATUS.FINISHED, STATUS.SKIPPED];
        if (finishedStatuses.includes(status)) {
            setRun(false);
            localStorage.setItem('hasSeenPresentationTour', 'true');
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
            styles={tourStyles}
        />
    );
}
