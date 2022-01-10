import { useDispatch } from 'react-redux';

import {setTransform} from 'actions/settings';

export default function Item({transformation, onSelect, isSelected=false}) {
    const dispatch = useDispatch();
    const handleSelect = () => {
        dispatch(setTransform(transformation));
        onSelect()
    };
    return (
        <div className={`result__item`} onClick={handleSelect}>
            <div className="result__item-about" >
                <h3 className='result__item-title'>Name: {transformation.name}</h3>
                <h4 className='result__item-description'>Accuracy: {transformation.accuracy}</h4>
                <h4 className='result__item-description'>Area: {transformation.area}</h4>
                {isSelected && <span style={{"color":"red"}}>Selected</span>}
            </div>
        </div > 
    );
};