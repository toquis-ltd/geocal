import { useState } from 'react'
import { PointConverter } from './block'

import './index.sass'

export default function Converter () {
    const [isConvert, toggleConvert] = useState(false);
    const handleConvert = () => toggleConvert(true);
    const endConvertion = () => toggleConvert(false);

    return (
        <div className='point-converter'>
            <h3 className="field-title">
                Point Converter
            </h3>
            <div className="point-converter__inner">
                <div className="point-converter__items">
                   <PointConverter isConvert={isConvert} onConvert={endConvertion} />
                </div>
            </div>
            <div className="point-converter__buttons-list">
                <button className='base__button point-converter__button share-btn' > Donwload CSV </button>
                <button className='base__button point-converter__button convert-btn' onClick={handleConvert}> Convert </button>
                <button className='base__button point-converter__button share-btn' > Share link </button>
            </div>
        </div>
    )
}