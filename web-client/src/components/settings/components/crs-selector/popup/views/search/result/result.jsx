import CrsItem from '../item/item';

import './result.sass';

export default function Result ({state}){
    return(
        <div className='result'>
                <div className="result__inner">
                    {
                        state?.findCRS?.map((i, j)=><CrsItem key={j} element={i}/>)
                    }
                </div>
        </div>
    )
}