import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { setTransform } from 'actions/settings';

import './view.sass';

export default function CustomeTransformationView({onClose, onImport}) {
    const dispatch = useDispatch();
    const sourceName = useSelector(({settings}) => settings.transform.name)
    const sourceWKT = useSelector(({settings}) => settings.transform.wkt)

    const [name, setName] = useState(sourceName);
    const [wkt, setWKT] = useState(sourceWKT);

    const handleSelect = () => {
        dispatch(setTransform({name:name, wkt:wkt}));
        onClose();
    };

    const clear = () => {
        setName('');
        setWKT('');
    };

    return (
        <div className="transform">
            <div className="transform__inner">
                <label>Name:</label>
                <input type="text" name="" id=""  className='transform__wkt-name' value={name} onChange={e => setName(e.target.value)}/>
                <textarea className='transform__wkt-text' placeholder='Place your wkt or proj' value={wkt} onChange={e => setWKT(e.target.value)}></textarea>
                <div className="transform__menu">
                    <button className='transformation__btn transform__clear' onClick={onImport}>Back</button>
                    <button className='transformation__btn transform__clear' onClick={clear}>Clear</button>
                    <button className='transformation__btn transform__import' onClick={handleSelect}>Load</button>
                </div>
            </div>
        </div>
    );
};