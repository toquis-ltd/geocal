import './button.sass';


function AdvancedSelectBtn ({onClick}) {
    return <button className='selector__btn selector__btn--advanced' onClick={onClick}>advanced search</button>
}

export default AdvancedSelectBtn;