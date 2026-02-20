import React from 'react';
import Joyride, { STATUS } from 'react-joyride';
import { useRole } from '../../lib/RoleContext';
import { useTourTrigger } from '../../hooks/useTourTrigger';
import { tourStyles } from './TourStyles';

export default function AdminInboxTour() {
    const { activeRole, roles } = useRole();
    const { run, setRun } = useTourTrigger();

    const steps = [
        {
            target: '#admin-inbox-header',
            content: (
                <div className="text-left">
                    <p className="font-bold text-primary mb-2">Phase 1: Intelligent Intake</p>
                    <p className="text-sm text-slate-600 leading-relaxed">
                        This is where all service requests land. Our AI has already begun parsing the documents for key information.
                    </p>
                </div>
            ),
            placement: 'bottom',
            disableBeacon: true,
            role: [roles.ADMIN]
        },
        {
            target: '#parsing-simulation',
            content: (
                <div className="text-left">
                    <p className="font-bold text-primary mb-2">AI Extraction</p>
                    <p className="text-sm text-slate-600">
                        The system extracts names, dates, and service types automatically, reducing manual entry errors by 85%.
                    </p>
                </div>
            ),
            placement: 'top',
            disableBeacon: true,
            role: [roles.ADMIN]
        },
        {
            target: '#approve-quote-btn',
            content: (
                <div className="text-left">
                    <p className="font-bold text-primary mb-2">Cost & Payment Advice</p>
                    <p className="text-sm text-slate-600">
                        "They revert to the client with cost and payment advice..."
                    </p>
                    <p className="text-xs text-slate-400 mt-2 font-medium">
                        Clicking this fulfills Phase 1 and moves the request to the payment pipeline.
                    </p>
                </div>
            ),
            placement: 'left',
            disableBeacon: true,
            role: [roles.ADMIN]
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
