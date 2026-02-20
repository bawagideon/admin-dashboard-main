import React from 'react';
import Joyride, { STATUS } from 'react-joyride';
import { useRole } from '../../lib/RoleContext';
import { useTourTrigger } from '../../hooks/useTourTrigger';

export default function OpsOrdersTour() {
    const { activeRole, roles } = useRole();
    const { isTourActive, endTour } = useTourTrigger('ops-orders');

    const steps = [
        {
            target: 'h1',
            content: (
                <div className="space-y-3 text-left">
                    <h3 className="font-bold text-slate-800 text-lg">The Pipeline</h3>
                    <p className="text-sm text-slate-600 leading-relaxed">
                        This is the <strong>live pulse</strong> of the company. It tracks every request from 'Awaiting Payment' to 'MD Approval,' ensuring no client is forgotten.
                    </p>
                </div>
            ),
            placement: 'bottom',
            disableBeacon: true,
        },
        {
            target: '.pipeline-stage-awaiting',
            content: (
                <div className="space-y-3 text-left">
                    <h3 className="font-bold text-slate-800 text-lg">Phase 2: Payment Hook</h3>
                    <p className="text-sm text-slate-600 leading-relaxed">
                        Notice the <strong>Stripe/PayPal</strong> integration. This fulfills the brief's requirement for automated updates back to the admin once a client pays.
                    </p>
                </div>
            ),
            placement: 'right',
        },
        {
            target: '#smart-assign-btn',
            content: (
                <div className="space-y-3 text-left">
                    <h3 className="font-bold text-slate-800 text-lg">Phase 3: Smart Assign</h3>
                    <p className="text-sm text-slate-600 leading-relaxed">
                        Once paid, the Ops Manager uses this <strong>Smart Assign</strong> tool to route the task. It ensures work is 'forwarded' to the correct execution team.
                    </p>
                </div>
            ),
            placement: 'top',
        },
        {
            target: '#perform-qa-btn',
            content: (
                <div className="space-y-3 text-left">
                    <h3 className="font-bold text-slate-800 text-lg">Phase 4: QA Review</h3>
                    <p className="text-sm text-slate-600 leading-relaxed">
                        The <strong>'Perform QA'</strong> button allows the Ops Manager to vet specialist evidence before the MD sees it. If not perfect, they can trigger a <strong>'Rework'</strong> with one click.
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
