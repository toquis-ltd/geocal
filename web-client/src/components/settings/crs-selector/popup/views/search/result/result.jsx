import { useEffect, useState} from 'react';
import { useSelector } from 'react-redux';
import _ from 'underscore';

import CrsItem from '../item/item';

import './result.sass';

export default function Result () {
    const settings = useSelector(state => state.settings);
    const result = useSelector(state => state.popups.result );
    const [find, setFind] = useState(result?.findCRS);

    useEffect(() => {
        if (settings?.modifiedCRS === 'target' && result?.findCRS?.length > 1) {
            const data = find?.filter(item => item.code !== settings.source.code);
            setFind(data);
            return
        }
        setFind(result?.findCRS)
        
    }, [result?.findCRS, settings?.modifiedCRS])

    return(
        <div className='result'>
                <div className="result__inner">
                    {
                        find?.map( (elem, index) => <CrsItem element={elem} key={index}/> )
                    }
                </div>
        </div>
    )
}