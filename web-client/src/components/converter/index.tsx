import { useState } from 'react'
import { useMobileOnly } from 'hooks/useMobileOnly'

import { PointConverter } from './blocks'

import './index.sass'

export default function Converter () {
    const isMobile = useMobileOnly();
    const [converters, setConverters] = useState<number>(1);
    const [max, min] = [4, 1];
    const handleClick = (value:number) => {
        if ((converters < max && value > 0) || (converters > min && value < 0))
            setConverters(prev => prev+value)
    } 

    return (
        <div className='point-converter'>
            <h3 className="field-title">
                Point Converter
            </h3>
            <div className="point-converter__inner">
                <button className="point-converter__btn" onClick={() => handleClick(+1)}>+</button>
                <div className="point-converter__items">
                    { isMobile && <PointConverter /> ||
                        [...Array(converters)].map(i =>
                            <PointConverter key={i} />
                        )
                    }
                </div>
                <button className="point-converter__btn" onClick={() => handleClick(-1)}>-</button>
            </div>
            <button className='convert-btn'> Convert </button>
        </div>
    )
}