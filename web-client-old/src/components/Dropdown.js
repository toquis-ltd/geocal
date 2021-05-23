import React, { useState } from 'react';
import onClickOutside from "react-onclickoutside";

function Dropdown({title, link}){
    const [open, setOpen] = useState(false);
    const toggle = () => setOpen(!open);
    Dropdown.handleClickOutside = () => setOpen(false);
    function handleOnClick(item) {}

    return(
        <div className = "dd-wrapper">
             <div
        tabIndex={0}
        className="dd-header"
        role="button"
        onKeyPress={() => toggle(!open)}
        onClick={() => toggle(!open)}
      >
        <div className="dd-header__title">
          <p className="dd-header__title--bold">{title}</p>
        </div>
      </div>
      {open && (
        <ul className="dd-list">
            <li className="dd-list-item">
                <button onClick={() => {navigator.clipboard.writeText(link)
                alert("Link Coppied!")}}>Copy Link</button>
            </li>
        </ul>
      )}
        </div>
    )
}
const clickOutsideConfig = {
    handleClickOutside: () => Dropdown.handleClickOutside,
  };

export default onClickOutside(Dropdown, clickOutsideConfig);