import { toggleZAxe } from "actions/settings";
import { useDispatch, useSelector } from "react-redux";

export default function ConverterPropretiesBtn(){
    const dispatch = useDispatch();
    const zAxe = useSelector(({settings}) => settings.zAxe);
    const zAxeChange = () => dispatch(toggleZAxe(!zAxe));

    return (
        <div className='global-settings  selector__btn'>
            Settings
            <div className="global-settings__inner">
                <ul className="propreties__list">
                    <li>Z axe: <input onClick={zAxeChange} onChange={()=>null} checked={zAxe} type='checkbox'/></li>
                    <li>DMS result: <input onChange={()=>null} checked={false} type='checkbox'/></li>
                </ul>
            </div>
        </div>
    )
}