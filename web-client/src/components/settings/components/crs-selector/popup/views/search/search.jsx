import { memo } from 'react';

import { useSelector, useDispatch} from 'react-redux';
import { setQwery, setResult } from '../../../../../../../actions/popups';

import SearchIcon from '../../../../../../../icons/search-icon';
import CloseIcon from '../../../../../../../icons/close-icon';

import {getCRSList} from './api';

import './search.sass';

export default memo(function Search({}) {
    const qwery = useSelector(state => state.popups.qwery);
    const dispatch = useDispatch();

    const clearQwery = () => dispatch(setQwery(''));
    const handleChange = event => dispatch(setQwery(event.currentTarget?.value));
    const handleResult = () => {
        getCRSList(qwery).then(res => {
            dispatch(setResult(res));
        })
    }

    return (
        <div className='search'>
            <div className='search__inner'>
                <div className="search__bar">
                    <div className="search__bar-inner">
                        <input 
                            className='search__field' 
                            onChange={handleChange} 
                            onKeyPress={e=> e.key==='Enter' && handleResult()}
                            value={qwery}/>
                        {qwery && <button className='search__btn search__btn-clear' onClick={clearQwery}><CloseIcon/></button> }
                        <button className='search__btn search__btn-find' onClick={handleResult}><SearchIcon/></button>
                    </div>
                </div>
            </div>
        </div>
    );
});
