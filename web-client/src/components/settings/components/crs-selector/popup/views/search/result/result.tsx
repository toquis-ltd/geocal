import CrsItem from '../item/item';

import { useSelector, useDispatch} from 'react-redux';

import './result.sass';

export default function Result (){
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
}