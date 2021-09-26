import { toggleZAxe } from "actions/settings";
import { useDispatch, useSelector } from "react-redux";

export default function ConverterPropretiesBtn(){
    const dispatch = useDispatch();
    const zAxe = useSelector(({settings}) => settings.zAxe);
    const onClick = () => dispatch(toggleZAxe(!zAxe));

    return (
        <div className='global-settings  selector__btn'>
            Settings
            <div className="global-settings__inner">
                <ul className="propreties__list">
                    <li>Z axe: <input onClick={onClick} onChange={()=>null} checked={zAxe} type='checkbox'/></li>
                </ul>
            </div>
        </div>
    )
}