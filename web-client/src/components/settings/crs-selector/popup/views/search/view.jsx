import {memo} from 'react';
import { useDispatch } from 'react-redux';

import {setCRS} from 'actions/settings'

import Search from './search';
import Result from './result/result';

import { fetchProj4 } from '../../api';

import './view.sass';

export default memo(function SearchView() {
    
    const dispatch = useDispatch();
    
    const selectHandle = element => {
        fetchProj4(element.code).then(res=>{
            dispatch(setCRS({
                name: element.name,
                code: element.code,
                uom: element.unityOfMeasure,
                proj4: res
            }));
        });
    };

    return (
        <div className="view__search">
            <Search />
            <Result onSelect={selectHandle} />
        </div>
    );
});