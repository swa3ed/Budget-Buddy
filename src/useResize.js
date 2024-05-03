// useResize.js

import { useState, useEffect } from 'react';

function useResize(breakpoint = 950) {
    const [sidebarState, setSidebarState] = useState(window.innerWidth > breakpoint);

    useEffect(() => {
        const handleResize = () => {
            setSidebarState(window.innerWidth > breakpoint);
        };

        window.addEventListener("resize", handleResize);
        return () => {
            window.removeEventListener("resize", handleResize);
        };
    }, [breakpoint]);

    return [sidebarState, setSidebarState];
}

export default useResize;
