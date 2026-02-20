import React from 'react';
import Joyride, { STATUS } from 'react-joyride';
import { useRole } from '../../lib/RoleContext';
import { useTourTrigger } from '../../hooks/useTourTrigger';
import { tourStyles } from './TourStyles';

export default function OverviewTour() {
    const { activeRole, roles } = useRole();
    const { run, setRun } = useTourTrigger();

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
            disableBeacon: true,
            role: [roles.ADMIN, roles.MD, roles.OPS_MANAGER]
        },
        // Role-specific CTA
        ...(activeRole === roles.ADMIN ? [{
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
            disableBeacon: true,
            role: [roles.ADMIN]
        }] : [])
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
