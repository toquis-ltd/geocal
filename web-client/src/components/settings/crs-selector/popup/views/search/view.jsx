import {memo} from 'react';

import Search from './search';
import Result from './result/result';

import './view.sass';

export default function SearchView() {
    return (
        <div className="view__search">
            <Search />
            <Result />
        </div>
    );
};