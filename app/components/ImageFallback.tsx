'use client'
import React from "react";

export default function FallbackImage({ src, alt, fallback = "/Images/HPlaceholder.png", ...props }: React.ImgHTMLAttributes<HTMLImageElement> & { fallback?: string }) {
    const [error, setError] = React.useState(false);

    return (
        <img
            src={error ? fallback : src}
            alt={alt}
            onError={() => setError(true)}
            {...props}
        />
    );
}