import { memo, useEffect, useState } from 'react';
import { useSelector} from 'react-redux';

import CrsItem from '../item/item';


import './result.sass';

export default memo(function Result ({onSelect}) {
    const result = useSelector(state => state.popups.result);
    const origin = useSelector(state => state.settings.modifiedCRS);
    const source = useSelector(state => state.settings.source);
    const [find, handleFind] = useState(result?.findCRS)

    useEffect(()=>{
        const data = (origin === 'target' && result?.findCRS?.lenght > 1) ? 
                    result?.findCRS?.filter(item => item.code !== source.code) : result?.findCRS
        handleFind(data);
    }, [result]);

    return(
        <div className='result'>
                <div className="result__inner">
                    {
                        find?.map( elem => <CrsItem element={elem} onSelect={onSelect}/> )
                    }
                </div>
        </div>
    )
});