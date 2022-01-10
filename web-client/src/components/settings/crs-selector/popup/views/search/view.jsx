import Search from './search';
import ResultCRS from './result/result';

import './view.sass';

export default function SearchView() {
    return (
        <div className="view__search">
            <Search />
            <ResultCRS />
        </div>
    );
};