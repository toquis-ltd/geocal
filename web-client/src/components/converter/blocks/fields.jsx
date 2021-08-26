import useCRSUnity from "hooks/useCRSUnity";

export function Fields ({name, point, origin, onChange=()=>null}) {
    const unity = useCRSUnity(origin);
    const readOnly = name !== 'input'
    return (
        <div className={`${name}-fields__container fields__container`}>
            <input 
                className={`${name}-coordinate__field fields__item-field`}
                onChange={onChange}
                
                name='x'
                value={point.x || ""}
                placeholder={unity[0]}
                autoComplete="off"
                readOnly={readOnly}
                type='tel'/>
            <input
                className={`${name}-coordinate__field fields__item-field`} 
                onChange={onChange}
                
                name='y'
                value={point.y || ""}
                placeholder={unity[1]}
                autoComplete="off"
                readOnly={readOnly}
                type='tel'/>  
            <input 
                className={`${name}-coordinate__field fields__item-field`}
                onChange={onChange}
                
                name='z'
                value={point.z || ""}
                placeholder={unity[2]}
                autoComplete="off"
                readOnly={readOnly}
                type='tel'/>    
        </div>
        )
}