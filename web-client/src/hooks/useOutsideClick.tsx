import {useState, useEffect} from 'react';

interface Div extends HTMLElement {
    current: {
        contains: Function
    }
};

export default function useOutsideClick(component:Div, exception=false) {
    const [isActive, setActive] = useState<Boolean>(exception);
    
    useEffect(() => {
        const handleClickOutside = (event:MouseEvent) => {
            if ((isActive && component.current && !component.current.contains(event.target)) || !exception) {
                    setActive(false);
                }
        }
        document.addEventListener('mouseup', handleClickOutside);

        return () => document.removeEventListener('mouseup', handleClickOutside);
    }, [isActive, component, exception]);
   
    return [isActive, setActive] as const;
}