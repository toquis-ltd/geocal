import { useSelector} from 'react-redux';
import { memo } from 'react';

import CrsItem from '../item/item';


import './result.sass';

export default memo(function Result () {
    const result = useSelector(state => state.popups.result);
    return(
        <div className='result'>
                <div className="result__inner">
                    {
                        result?.findCRS?.map( elem => <CrsItem element={elem}/> )
                    }
                </div>
        </div>
    )
});