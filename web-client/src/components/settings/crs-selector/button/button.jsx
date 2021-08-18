import './button.css';


function SelectBtn ({onClick}) {
    return (
        <button className='selector__btn' onClick={onClick}>
            {'Click to select CRS' }
        </button>
    );
}

export default SelectBtn;