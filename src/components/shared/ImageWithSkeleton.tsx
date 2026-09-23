'use client';

import { useState } from 'react';
import Image, { ImageProps } from 'next/image';
import { clsx } from 'clsx';

type ImageWithSkeletonProps = Omit<ImageProps, 'onLoad' | 'onError'> & {
    skeletonClassName?: string;
};

/**
 * next/image wrapper with a pulsing skeleton while loading and a themed fallback on error.
 * Keyed by `src` so switching images (e.g. slider prev/next) remounts the element instead of
 * reusing the old one, which stops the previous image from lingering on screen while the new one loads.
 */
export function ImageWithSkeleton({ src, className, skeletonClassName, alt, ...rest }: ImageWithSkeletonProps) {
    const [loaded, setLoaded] = useState(false);
    const [errored, setErrored] = useState(false);

    return (
        <>
            {!loaded && (
                <div
                    className={clsx('absolute inset-0 animate-pulse', skeletonClassName)}
                    style={{ background: 'var(--border)' }}
                />
            )}
            <Image
                key={typeof src === 'string' ? src : undefined}
                src={errored ? '/placeholder.svg' : src}
                alt={alt}
                className={clsx(className, 'transition-opacity duration-300', loaded ? 'opacity-100' : 'opacity-0')}
                onLoad={() => setLoaded(true)}
                onError={() => {
                    setErrored(true);
                    setLoaded(true);
                }}
                {...rest}
            />
        </>
    );
}
