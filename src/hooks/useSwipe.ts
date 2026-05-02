import { useEffect, type RefObject } from 'react';

interface UseSwipeOptions {
    onSwipeLeft: () => void;
    onSwipeRight: () => void;
    threshold?: number;
    enabled?: boolean;
}

/**
 * Tracks pointer events on the container ref.
 * Fires onSwipeLeft / onSwipeRight when horizontal delta exceeds threshold (default 50px).
 */
export function useSwipe(
    containerRef: RefObject<HTMLElement | null>,
    { onSwipeLeft, onSwipeRight, threshold = 50, enabled = true }: UseSwipeOptions
) {
    useEffect(() => {
        const el = containerRef.current;
        if (!el || !enabled) return;

        let startX = 0;

        function handlePointerDown(event: PointerEvent) {
            startX = event.clientX;
        }

        function handlePointerUp(event: PointerEvent) {
            const delta = event.clientX - startX;
            if (Math.abs(delta) < threshold) return;
            if (delta < 0) {
                onSwipeLeft();
            } else {
                onSwipeRight();
            }
        }

        el.addEventListener('pointerdown', handlePointerDown);
        el.addEventListener('pointerup', handlePointerUp);

        return () => {
            el.removeEventListener('pointerdown', handlePointerDown);
            el.removeEventListener('pointerup', handlePointerUp);
        };
    }, [containerRef, onSwipeLeft, onSwipeRight, threshold, enabled]);
}
