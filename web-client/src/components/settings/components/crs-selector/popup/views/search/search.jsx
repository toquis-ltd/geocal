import {useState, useEffect} from 'react';

import getCurrentList from '../../../../../../../core/search/search'

import CrsItem from './item'
import './search.css';

function SearchView({qwest}) {
    const [list, setList] = useState([]);
    const update = () => getCurrentList(qwest.get()).then((res)=>setList(res));
    useEffect(()=>{
        if (list.length === 0 && qwest.get().length !== 0){
            update()
        }
    })
    return (
        <div className='search'>
            <div className='search__header'>
                <input className='search__bar' onChange={e=>qwest.set(e.currentTarget.value)} value={qwest.get()}/>
                <button className='search__btn' onClick={()=>update()}>search</button>
            </div>
            <div className='search__container result'>
                <div className="result__list">
                    {
                        list.map((i, j)=><CrsItem key={j} element={i}/>)
                    }
                </div>
            </div>
        </div>
    );
}

export default SearchView;