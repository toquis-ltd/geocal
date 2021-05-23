import { useState } from 'react';
import './navigation.css';

const tabState = (a, b) => (a===b) ? 'tabs__item--activate' :'tabs__item--deactivate';

function Navigation({children}) {
  const [tab, setTab] = useState(0);
  if (children === undefined) return null;
  if (!Array.isArray(children)) return children;
  return (
    <>
      <nav className='tabs'>
        {
        children.map((child, index) =>  
        <button 
          className={`tabs__item ${tabState(tab, index)}`}
          onClick={() => setTab(index)}
          key={index}
        >
          {child?.props?.name || `tab ${index}`}
        </button>)
        }
      </nav>
      {children[tab]}
    </>
  );
}

export default Navigation;