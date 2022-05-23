import { useRef, useState } from 'react'
import { useDispatch } from 'react-redux';

import { toggleRepport } from 'actions/popups'

import ConverterPropretiesBtn from 'components/settings/button/global';

import { PointConverter } from './block'
import RepportPopup from './popup';

import './index.sass'

export default function Converter () {
    const dispatch = useDispatch();
    const onClick = () => (onConvert.current!==null) ? onConvert.current():null
    const onConvert = useRef<Function | null>(null);
    const [stateLocal, handleChange] = useState(false)
    const startRepporting = () => {
        handleChange(!stateLocal);
        dispatch(toggleRepport(stateLocal));
    }
    return (
        <>
        <div className='point-converter'>
            <h3 className="field-title">
                Point Converter
            </h3>
            
            <div className="point-converter__settings">
                <ConverterPropretiesBtn/>
            </div>

            <div className="point-converter__inner">
                <div className="point-converter__items">
                   <PointConverter onConvert={onConvert}/>
                </div>
            </div>

            <div className="point-converter__buttons-list">
                <button className='base__button point-converter__button report-btn' onClick={startRepporting}> Report </button>
                <button className='base__button point-converter__button convert-btn' onClick={onClick}> Convert </button>
                <button className='base__button point-converter__button share-btn' > Share link </button>
            </div>
        </div>
            <RepportPopup onClose={startRepporting}/>
        </>

    )
}