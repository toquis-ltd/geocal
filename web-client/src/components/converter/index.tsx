import { useEffect, useState } from 'react'
import { useMobileOnly } from 'hooks/useMobileOnly'
import useLimitedState from 'hooks/useLimitedState';
import { PointConverter } from './blocks'

import './index.sass'

export default function Converter () {
    const isMobile = useMobileOnly();
    const [converters, handleAddConverter] = useLimitedState(1, 4);
    const [isConvert, toggleConvert] = useState<boolean>(false);

    const handleConvert = () => toggleConvert(!isConvert);
    useEffect(()=>{
        if (isConvert) handleConvert()
    }, [isConvert])
    return (
        <div className='point-converter'>
            <h3 className="field-title">
                Point Converter
            </h3>
            <div className="point-converter__inner">
                <button className="base__button point-converter__display-btn" onClick={() => handleAddConverter(+1)}>+</button>
                <div className="point-converter__items">
                    { isMobile && <PointConverter state={isConvert} /> ||
                        [...Array(converters)].map( (_, i)=>
                            <PointConverter state={isConvert} key={i} />
                        )
                    }
                </div>
                <button className="base__button point-converter__display-btn" onClick={() => handleAddConverter(-1)}>-</button>
            </div>
            <div className="point-converter__buttons-list">
                <button className='base__button point-converter__button share-btn' > Donwload CSV </button>
                <button className='base__button point-converter__button convert-btn' onClick={handleConvert}> Convert </button>
                <button className='base__button point-converter__button share-btn' > Share link </button>
            </div>
        </div>
    )
}