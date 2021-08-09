import { useState, useEffect, useRef} from "react";

export default function useCurrentSize() {

    const ref = useRef(null);
    const [container, sizeHandle] = useState({});

    useEffect(() => {
        const handleResize = () => sizeHandle({
                                                isRenderFinnished:true, 
                                                width: ref?.current?.offsetWidth, 
                                                height:ref?.current?.offsetHeight
                                            });        
        handleResize();
        window.addEventListener('resize', handleResize, false);
        return () => {
            window.removeEventListener('resize', handleResize, false);
        }
    }, [])

    return [ref, container];
}