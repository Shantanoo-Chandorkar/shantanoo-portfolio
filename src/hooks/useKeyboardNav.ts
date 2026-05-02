import { useEffect, type RefObject } from 'react';

interface UseKeyboardNavOptions {
    onPrev: () => void;
    onNext: () => void;
    enabled?: boolean;
}

/**
 * Attaches ArrowLeft / ArrowRight keydown listeners to the window.
 * Calls onPrev / onNext respectively. Cleans up on unmount.
 */
export function useKeyboardNav(
    _containerRef: RefObject<HTMLElement | null>,
    { onPrev, onNext, enabled = true }: UseKeyboardNavOptions
) {
    useEffect(() => {
        if (!enabled) return;

        function handleKeyDown(event: KeyboardEvent) {
            if (event.key === 'ArrowLeft') {
                event.preventDefault();
                onPrev();
            } else if (event.key === 'ArrowRight') {
                event.preventDefault();
                onNext();
            }
        }

        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [onPrev, onNext, enabled]);
}
