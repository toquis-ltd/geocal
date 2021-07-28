import { memo } from 'react';

import CrsItem from '../item/item';

import './result.sass';

export default memo(function Result ({state}){
    return(
        <div className='result'>
                <div className="result__inner">
                    {
                        state.result?.findCRS?.map((i, j)=><CrsItem key={j} element={i}/>)
                    }
                </div>
        </div>
    )
})