import useCRSUnity from "hooks/useCRSUnity";

export function Input ({point, onChange}) {
    const handleChange = event => {
      onChange(prev => ({...prev, source:{...point, [event.target.name]:event.target.value}}));
    }
    const unity = useCRSUnity('source');
    return (
      <div className="input-fields">
        <div className="input-fields__header">
        </div>
        <div className="input-fields__container fields__container">
          
            <input 
                  className='input-coordinate__field fields__item-field' 
                  onChange={handleChange}
                  name='x'
                  value={point.x}
                  placeholder={unity[0]}
                  autoComplete="off"
                  type='text'/>

            <input
                  className='input-coordinate__field fields__item-field' 
                  onChange={handleChange}
                  name='y'
                  value={point.y}
                  placeholder={unity[1]}
                  autoComplete="off"
                  type='text'/>
                  
            <input 
                  className='input-coordinate__field fields__item-field' 
                  onChange={handleChange}
                  name='z'
                  value={point.z}
                  placeholder={unity[2]}
                  autoComplete="off"
                  type='text'/>
        </div>
      </div>
    )
}