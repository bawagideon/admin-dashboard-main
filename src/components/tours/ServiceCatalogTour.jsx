import React from 'react';
import { useRole } from '../../lib/RoleContext';
import { useTourTrigger } from '../../hooks/useTourTrigger';
import ReactJoyride, { STATUS } from 'react-joyride';

export default function ServiceCatalogTour() {
    const { activeRole, roles } = useRole();
    const { isTourActive, endTour } = useTourTrigger('service-catalog');

    const steps = [
        {
            target: 'h1',
            content: (
                <div className="space-y-3">
                    <h3 className="font-bold text-slate-800 text-lg">Service Inventory</h3>
                    <p className="text-sm text-slate-600 leading-relaxed">
                        This is your <strong>Service Inventory</strong>. It centralizes every offering, ensuring pricing and service details are consistent across the entire organization.
                    </p>
                </div>
            ),
            placement: 'bottom',
            disableBeacon: true,
        },
        {
            target: '.grid',
            content: (
                <div className="space-y-3">
                    <h3 className="font-bold text-slate-800 text-lg">Standardized Costs</h3>
                    <p className="text-sm text-slate-600 leading-relaxed">
                        Each service contains pre-defined costs and timelines. When a client expresses interest, the Admin uses these details to generate the initial quote.
                    </p>
                </div>
            ),
            placement: 'top',
        },
        {
            target: 'button:contains("Add New Service")',
            content: (
                <div className="space-y-3">
                    <h3 className="font-bold text-slate-800 text-lg">Compliance Mapping</h3>
                    <p className="text-sm text-slate-600 leading-relaxed">
                        Crucially, each service here is linked to a specific <strong>'Evidence Checklist.'</strong> This ensures that when a specialist starts work, they are automatically given the correct compliance steps.
                    </p>
                </div>
            ),
            placement: 'left',
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
        <ReactJoyride
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
