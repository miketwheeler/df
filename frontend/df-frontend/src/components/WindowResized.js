import { useState, useEffect } from 'react';


export function useWindowResize() {
    const [windowSizeX, setWindowSizeX] = useState({ width: undefined })

    useEffect(() => {
        function handleResize() {
            setWindowSizeX({
                width: window.innerWidth,
            })
        }
        window.addEventListener("resize", handleResize);
        handleResize();

        return () => window.removeEventListener("resize", handleResize)
    }, []);
    
    return windowSizeX

}
