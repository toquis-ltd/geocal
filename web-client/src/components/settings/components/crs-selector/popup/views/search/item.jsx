import './item.css'

function CrsItem({element, i, onClick=()=>null}){
    return (
        <div className='result__item' onClick={() => {onClick(element)}}  key={i}>
            <h3 className='result__item-title'>{element.name}</h3>
            <h4 className='result__item-description result__item-description--area'>Area: {element.area}</h4>
            <h4 className='result__item-description result__item-description--code'>Code: {element.code}</h4>
        </div>
    );
}

export default CrsItem;