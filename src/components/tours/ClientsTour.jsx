import React from 'react';
import Joyride, { STATUS } from 'react-joyride';
import { useRole } from '../../lib/RoleContext';
import { useTourTrigger } from '../../hooks/useTourTrigger';

export default function ClientsTour() {
    const { activeRole, roles } = useRole();
    const { isTourActive, endTour } = useTourTrigger('clients');

    const steps = [
        {
            target: 'h1',
            content: (
                <div className="space-y-3 text-left">
                    <h3 className="font-bold text-slate-800 text-lg">Client Relationships</h3>
                    <p className="text-sm text-slate-600 leading-relaxed">
                        This is the <strong>Executive View</strong> of your client base. It maps every client to their historical requests and lifetime value.
                    </p>
                </div>
            ),
            placement: 'bottom',
            disableBeacon: true,
        },
        {
            target: 'table', // Assuming client directory table
            content: (
                <div className="space-y-3 text-left">
                    <h3 className="font-bold text-slate-800 text-lg">Archive & Governance</h3>
                    <p className="text-sm text-slate-600 leading-relaxed">
                        Once the MD 'Closes' a process, the final vetted documents are <strong>archived here</strong> under the client's profile for long-term governance and auditing.
                    </p>
                </div>
            ),
            placement: 'top',
        }
    ];

    const handleJoyrideCallback = (data) => {
        const { status } = data;
        if ([STATUS.FINISHED, STATUS.SKIPPED].includes(status)) {
            endTour();
        }
    };

    if (!isTourActive) return null;
    if (activeRole !== roles.ADMIN && activeRole !== roles.MD) return null;

    return (
        <Joyride
            steps={steps}
            run={isTourActive}
            continuous
            showProgress
            showSkipButton
            callback={handleJoyrideCallback}
            styles={{
                options: {
                    primaryColor: '#000000',
                    zIndex: 1000,
                    borderRadius: 12,
                },
                tooltipContainer: {
                    textAlign: 'left',
                }
            }}
        />
    );
}
