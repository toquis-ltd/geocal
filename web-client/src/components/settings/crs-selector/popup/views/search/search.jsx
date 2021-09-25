import SearchIcon from 'icons/search-icon';
import CloseIcon from 'icons/close-icon';

import useSearchBar from 'hooks/useSearchBar';

import './search.sass';

export default function Search() {
    const [qwery, qweryChange, handleResult] = useSearchBar();
    const clearQwery = () => qweryChange('');

    return (
        <div className='search'>
            <div className='search__inner'>
                <div className="search__bar">
                    <div className="search__bar-inner">
                        <input 
                            className='search__field' 
                            onChange={event=>qweryChange(event.target.value)} 
                            onKeyPress={e=> e.key==='Enter' && handleResult(qwery)}
                            value={qwery}/>
                        {qwery && <button className='search__btn search__btn-clear' onClick={clearQwery}><CloseIcon/></button> }
                        <button className='search__btn search__btn-find' onClick={()=>handleResult(qwery)}><SearchIcon/></button>
                    </div>
                </div>
                <div className="search__filters">
                    <div className="search__uom">
                    </div>
                </div>
            </div>
        </div>
    );
};
