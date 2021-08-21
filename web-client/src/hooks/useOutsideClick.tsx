import {useState, useEffect} from 'react';

interface Div extends HTMLElement {
    current: {
        contains: Function
    }
};

export default function useOutsideClick(component:Div) {
    const [isActive, setActive] = useState<Boolean>(false);
    
    useEffect(() => {
        const handleClickOutside = (event:MouseEvent) => {
            if (isActive && component.current && !component.current.contains(event.target)) {
                    setActive(false);
                }
        }
        document.addEventListener('mouseup', handleClickOutside);

        return () => document.removeEventListener('mouseup', handleClickOutside);
    }, [isActive, component]);
  
    return [isActive, setActive] as const;
}