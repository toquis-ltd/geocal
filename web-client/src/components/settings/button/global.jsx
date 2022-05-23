import { toggleZAxe, toggleDMS, toggleST } from "actions/settings";
import { useDispatch, useSelector } from "react-redux";

export default function ConverterPropretiesBtn(){
    const dispatch = useDispatch();
    const settings = useSelector(({settings}) => settings);
    const zAxeChange = () => dispatch(toggleZAxe(!settings.zAxe));
    const DmsChange = () => dispatch(toggleDMS(!settings.DMS));
    const StChange = () => dispatch(toggleST(!settings.ST));

    return (
        <div className='global-settings  selector__btn'>
            Settings
            <div className="global-settings__inner">
                <ul className="propreties__list">
                    <li>Z axe: <input onClick={zAxeChange} onChange={()=>null} checked={settings.zAxe} type='checkbox'/></li>
                    <li>DMS result: <input onClick={DmsChange} onChange={()=>null} checked={settings.DMS} type='checkbox'/></li>
                    <li>Second Transformation: <input onClick={StChange} onChange={()=>null} checked={settings.ST} type='checkbox'/></li>
                </ul>
            </div>
        </div>
    )
}