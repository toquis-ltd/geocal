import { useState, useLayoutEffect, useRef} from "react";

type Prop = {
    isRenderFinnished:Boolean, 
    width?: number, 
    height?: number,
}

export default function useCurrentSize() {

    const ref = useRef<HTMLInputElement>(null);
    const [container, sizeHandle] = useState<Prop>({isRenderFinnished:false});

    useLayoutEffect(() => {
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

    return [ref, container] as const;
}