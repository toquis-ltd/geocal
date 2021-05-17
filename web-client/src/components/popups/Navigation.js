import { useState } from 'react';

const tabState = (a, b) => (a === b) ? 'tabs__item--activate' : 'tabs__item--deactivate';

export function Navigation({tabs, children }) {
  const [tab, setTab] = useState(0);
  return (
    <>
      <nav className='tabs'>
        {tabs.map((item, index) => {
          return <button className={`tabs__item ${tabState(tab, index)}`} onClick={() => setTab(index)}>{item}</button>;
        })}
      </nav>
      {children[tab]}
    </>
  );
} 