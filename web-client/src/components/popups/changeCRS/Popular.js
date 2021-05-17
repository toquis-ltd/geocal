import { useState, useEffect} from "react";
import { getPopular } from "../../../tools/parse";
import { Item }  from './Item'


function Popular ({onSave}) {
    const [listOfpopular, setList] = useState([]);

    useEffect(() => { 
        getPopular().then(e=>{setList(e[0])});
    }, []);
    
    return (
        <div className='popular'>
            <div className='popular__grid'>
                {listOfpopular.map((element, i) => Item(element, i, onSave))}
            </div>
        </div>
    )
}

export default Popular;