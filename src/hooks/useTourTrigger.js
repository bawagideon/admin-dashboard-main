import { useState, useEffect } from 'react';

/**
 * Custom hook to trigger a tour based on a global 'restart-tour' event.
 * Useful for page-specific tours in a modular architecture.
 */
export function useTourTrigger() {
    const [run, setRun] = useState(false);

    useEffect(() => {
        const handleRestart = () => {
            setRun(false);
            // Small timeout to ensure the state change triggers a re-run
            setTimeout(() => setRun(true), 100);
        };

        window.addEventListener('restart-tour', handleRestart);

        // Optional: Auto-run if the user hasn't seen the overall tour yet
        const hasSeenTour = localStorage.getItem('hasSeenPresentationTour');
        if (!hasSeenTour) {
            // setRun(true); // Uncomment if you want auto-run on first visit
        }

        return () => window.removeEventListener('restart-tour', handleRestart);
    }, []);

    const stopTour = () => setRun(false);

    return { run, setRun, stopTour };
}
