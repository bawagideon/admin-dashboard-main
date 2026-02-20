import React from 'react';
import Joyride, { STATUS } from 'react-joyride';
import { useRole } from '../../lib/RoleContext';
import { useTourTrigger } from '../../hooks/useTourTrigger';
import { tourStyles } from './TourStyles';

export default function GovernanceTour() {
    const { activeRole, roles } = useRole();
    const { run, setRun } = useTourTrigger();

    const steps = [
        {
            target: '#md-approve-btn',
            content: (
                <div className="text-left">
                    <p className="font-bold text-primary mb-2">Phase 5: Executive Governance</p>
                    <p className="text-sm text-slate-600 leading-relaxed">
                        "MD to approve (Close if process is vetted as completed)"
                    </p>
                    <p className="text-xs text-slate-400 mt-2 italic font-medium">
                        As the Managing Director, you perform the final vetting of all evidence before closing and archiving the request.
                    </p>
                </div>
            ),
            placement: 'top',
            disableBeacon: true,
            role: [roles.MD]
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
