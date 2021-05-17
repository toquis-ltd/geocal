import { useState } from "react";
import { Classic } from '../Interfaces'
import Popup  from '../Popups';

import { Navigation } from '../Navigation';
import { Search } from './Search';
import { getInformationAboutCode } from '../../../tools/parse';
import { setBounds } from '../../globe/D3';

import Popular  from './Popular';

export function ChangeCRS({ isOpen, onClose, onSave }) {
  const [crs, setCRS] = useState()
  const OnApply = () => onSave(crs);
  const tabs = ['Search', 'Popular'];
  let isSaving = false;
  const selectFindCRS = async (e) => {
    if (!isSaving) {
      isSaving = true;
      getInformationAboutCode(e.code)
      .then(e => {
        setCRS(e.message)
        setBounds(e.message.bounds)
      });
    }
  };
  return (
    <Popup isOpen={isOpen} className='crs-selector' interface={()=>Classic(onClose, OnApply, 'apply')}>
      <Navigation tabs={tabs}>
        <Search onSave={(e) => selectFindCRS(e)}/>
        <Popular onSave={e => selectFindCRS(e)} />
      </Navigation>
    </Popup>
  );
}