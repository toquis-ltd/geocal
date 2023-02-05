import { useState, useEffect } from "react";

export function useMobileOnly () {
    const size = 1024; // this is the limit of screen size for a desktop
    const [isMobile, toggleMobile] =  useState(window.innerWidth <= size);
    const handleScreen = () => toggleMobile(window.innerWidth <= size);

    useEffect(() => {
            window.addEventListener('resize', handleScreen);
            return () => window.removeEventListener('resize', handleScreen);
    }, []);

    return isMobile
}