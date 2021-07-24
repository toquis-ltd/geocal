import {memo} from 'react'
import getCurrentList from '../../../../../../../core/search/search'

import SearchIcon from './icons/search-icon';
import CloseIcon from './icons/close-icon';

import CrsItem from './item'

import './search.sass';
import './search.css';

export default memo(function SearchView({state, setState}) {
    const setQwery = (value) => {
        setState(prev => ({
                ...prev,
                qwery:value,
            })
        );
    }
    const setResult = () => {
        getCurrentList(state.qwery)
        .then(res => {
            setState(prev => ({...prev, result:res}))
        });
    }
    return (
        <div className='search'>
            <div className='search__header'>
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
            <div className='search__container result'>
                <div className="result__list">
                    {
                        state.result?.map((i, j)=><CrsItem key={j} element={i}/>)
                    }
                </div>
            </div>
        </div>
    );
});
