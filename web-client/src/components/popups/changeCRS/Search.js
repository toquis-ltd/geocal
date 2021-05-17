import { useState } from 'react';
import Globe from '../../globe/Globe';
import { getCRSList } from '../../../tools/parse';
import { Item } from './Item';

const CRSSelector = ({findCRS, onClick}) => {
    return (
      <div className='result'>
        <div className='result__container'>
          <div className='result__list'>
            {findCRS.map((element, i)=>Item(element, i, onClick))}
          </div>
        </div>
        <div className='result__footer'>
            <p>
              There are no more CRS
            </p>
        </div>
      </div>
    );
}

export function Search({ onSave }) {
  const [quest, setQuest] = useState('');
  const [findCRS, setFindCRS] = useState([]);
  const search = (q) => getCRSList(q).then((e) => setFindCRS(e.findCRS));
  const onGlobeClick = getCountry => {
    const country = getCountry();
    setQuest(country);
    search(country);
  };

  return (
    <>
      <div className='search'>
        <div className='search__header'>
          <input className='search__bar' onChange={(event) => setQuest(event.target.value)} value={quest} />
          <button className='search__btn' onClick={() => search(quest)}>search</button>
        </div>
        <div className='search__container'>
          <CRSSelector findCRS={findCRS} onClick={(e) => onSave(e)} />
        </div>
      </div>
      <div className='complimentary_tool_container'>
        <Globe onClick={(e) => onGlobeClick(e)} />
      </div>
    </>
  );
}
