import React from 'react';
import Joyride, { STATUS } from 'react-joyride';
import { useRole } from '../../lib/RoleContext';
import { useTourTrigger } from '../../hooks/useTourTrigger';

export default function TeamWorkloadTour() {
    const { activeRole, roles } = useRole();
    const { isTourActive, endTour } = useTourTrigger('team-workload');

    const steps = [
        {
            target: 'h1',
            content: (
                <div className="space-y-3 text-left">
                    <h3 className="font-bold text-slate-800 text-lg">Capacity Management</h3>
                    <p className="text-sm text-slate-600 leading-relaxed">
                        This view manages your <strong>'two team members'</strong> and any future specialists. It prevents bottlenecks by showing exactly who is over-capacity.
                    </p>
                </div>
            ),
            placement: 'bottom',
            disableBeacon: true,
        },
        {
            target: '.grid', // Assuming the stats grid or first card
            content: (
                <div className="space-y-3 text-left">
                    <h3 className="font-bold text-slate-800 text-lg">Performance Metrics</h3>
                    <p className="text-sm text-slate-600 leading-relaxed">
                        Track <strong>'SLA Compliance'</strong> and <strong>'Rework Rates.'</strong> This data proves which specialists are providing the highest quality evidence, helping you make better assignment decisions.
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
    if (activeRole !== roles.ADMIN && activeRole !== roles.OPS_MANAGER) return null;

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
