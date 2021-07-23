import {memo} from 'react'
import getCurrentList from '../../../../../../../core/search/search'
import SearchIcon from './search-icon';

import CrsItem from './item'
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
                    <input className='search__field' onChange={e=>setQwery(e.currentTarget?.value)} value={state.qwery}/>
                    <button className='search__btn' onClick={setResult}><SearchIcon/></button>
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
