import { memo } from 'react';

import SearchIcon from '../../../../../../../icons/search-icon';
import CloseIcon from '../../../../../../../icons/close-icon';

import {getCRSList} from './api';

import './search.sass';

export default memo(function Search({state, setState}) {
    const setQwery = (value) => {
        setState(prev => ({
                ...prev,
                qwery:value,
            })
        );
    }
    const setResult = () => {
        getCRSList(state.qwery)
        .then(res => {
            setState(prev => ({...prev, result:res}))
        });
    }
    return (
        <div className='search'>
            <div className='search__inner'>
                <div className="search__bar">
                    <div className="search__bar-inner">
                        <input 
                            className='search__field' 
                            onChange={e=>setQwery(e.currentTarget?.value)} 
                            onKeyPress={e=> e.key==='Enter' && setResult()}
                            value={state.qwery}/>
                        
                        { state.qwery && <button className='search__btn search__btn-clear' onClick={()=>setQwery('')}><CloseIcon/></button> }
                        
                        <button className='search__btn search__btn-find' onClick={setResult}><SearchIcon/></button>
                    </div>
                </div>
            </div>
        </div>
    );
});
