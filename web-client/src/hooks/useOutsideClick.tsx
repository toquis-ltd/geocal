import {useState, useEffect} from 'react';

export default function useOutsideClick(component, eventName) {
    const [isActive, setActive] = useState<Boolean>(false);
    
    useEffect(() => {
        const handleClickOutside = event => {
            if (isActive && component.current && !component.current.contains(event.target)) {
                    setActive(false);
                }
        }
        document.addEventListener(eventName, handleClickOutside);

        return () => document.removeEventListener(eventName, handleClickOutside);
    }, [isActive, component, eventName]);
  
    return [isActive, setActive] as const;
}