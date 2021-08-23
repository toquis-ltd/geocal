import { useState } from "react"

export default function useLimitedState (min:number, max:number) {
    const [state, setConverters] = useState<number>(1);
    const handleChange = (value:number) => {
        if ((state < max && value > 0) || (state > min && value < 0))
            setConverters(prev => prev+value)
    } 
    return [state, handleChange] as const
}