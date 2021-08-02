import {memo} from 'react';

import Search from './search';
import Result from './result/result';

import './view.sass';

export default memo(function SearchView({state, setState}) {
    return (
        <div className="view">
            <Search state={state?.qwery} setState={setState} />
            <Result state={state?.result} />
        </div>
    );
});