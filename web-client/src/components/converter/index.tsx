import { useRef } from 'react'
import { PointConverter } from './block'
import './index.sass'

export default function Converter () {
    const onConvert = useRef<Function | null>(null);
    const onClick = () => (onConvert.current!==null) ? onConvert.current():null
    return (
        <div className='point-converter'>
            <h3 className="field-title">
                Point Converter
            </h3>
            <div className="point-converter__inner">
                <div className="point-converter__items">
                   <PointConverter onConvert={onConvert}/>
                </div>
            </div>
            <div className="point-converter__buttons-list">
                <button className='base__button point-converter__button share-btn' > Report </button>
                <button className='base__button point-converter__button convert-btn' onClick={onClick}> Convert </button>
                <button className='base__button point-converter__button share-btn' > Share link </button>
            </div>
        </div>
    )
}