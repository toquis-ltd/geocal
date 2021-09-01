import useCRSUnity from "hooks/useCRSUnity";

function Field({className, name, point, readOnly, placeholder, onChange}) {
    return (
        <input 
            className={`${className}-coordinate__field fields__item-field`}
            onChange={onChange}
            name={name}
            value={point[name] || ""}
            placeholder={placeholder}
            autoComplete="off"
            readOnly={readOnly}
            type='tel'/>

    )
};

export function Fields ({name, point, origin, onChange=()=>null}) {
    const unity = useCRSUnity(origin);
    const readOnly = name !== 'input'
    return (
        <div className={`${name}-fields__container fields__container`}>
            
            <Field className={name} name='x' onChange={onChange} point={point} readOnly={readOnly} placeholder={unity[0]}/>
            <Field className={name} name='y' onChange={onChange} point={point} readOnly={readOnly} placeholder={unity[1]}/>
            <Field className={name} name='z' onChange={onChange} point={point} readOnly={readOnly} placeholder={unity[2]}/>
        </div>
        )
}