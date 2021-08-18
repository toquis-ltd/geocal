import { memo, useEffect, useState } from 'react';
import { useSelector} from 'react-redux';

import CrsItem from '../item/item';


import './result.sass';

export default memo(function Result () {
    const result = useSelector(state => state.popups.result);
    const origin = useSelector(state => state.settings.modifiedCRS);
    const source = useSelector(state => state.settings.source);
    const [find, handleFind] = useState(result?.findCRS)

    useEffect(()=>{
        if (origin === 'target') {
            handleFind(result?.findCRS?.filter(item => item.code !== source.code))
        };
    }, []);

    return(
        <div className='result'>
                <div className="result__inner">
                    {
                        find?.map( elem => <CrsItem element={elem}/> )
                    }
                </div>
        </div>
    )
});