import React from 'react';
import Joyride, { STATUS } from 'react-joyride';
import { useRole } from '../../lib/RoleContext';
import { useTourTrigger } from '../../hooks/useTourTrigger';
import { tourStyles } from './TourStyles';

export default function MissionControlTour() {
    const { activeRole, roles } = useRole();
    const { run, setRun } = useTourTrigger();

    const steps = [
        {
            target: '#evidence-locker',
            content: (
                <div className="text-left">
                    <p className="font-bold text-primary mb-2">Phase 4: Expert Execution</p>
                    <p className="text-sm text-slate-600 leading-relaxed">
                        "(There are two team members that execute). Then after the completion of tasks by team, they mark completed..."
                    </p>
                    <p className="text-xs text-slate-400 mt-2 italic font-medium">
                        Secure profiling documents and evidence here to ensure compliance.
                    </p>
                </div>
            ),
            placement: 'left',
            disableBeacon: true,
            role: [roles.TEAM_MEMBER]
        },
        {
            target: '.mission-control-header', // Adjust selector if needed
            content: (
                <div className="text-left">
                    <p className="font-bold text-primary mb-2">Submit for Approval</p>
                    <p className="text-sm text-slate-600">
                        Once all items are checked, use this primary action to trigger the Ops Manager review flow.
                    </p>
                </div>
            ),
            placement: 'bottom',
            disableBeacon: true,
            role: [roles.TEAM_MEMBER]
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
