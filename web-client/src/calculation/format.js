 export function convertToDMS (value, m = 0, s = 0)  {
    value = value.toString();
    if (value.length === 0) return "0°0'0"  
    if (/'|"/.test(value) === true) return value
    
    let d = value.split(".")[0];
    if (value.split(".").length>1)
    {
      m = parseInt(("."+(value.split(".")[1]))*60);
      s = Number(("."+(value.split(".")[1])-m/60)*3600).toFixed(6).replace(/(\.0+|0+)$/, '');
    }
    return `${d}°${m}'${s}"`
};

export function convertToDecimal (value)  {
    
    // exception case  
    if (value.length === 0) return '0'; // if value is empty
    if (/'|"/.test(value) === false) return value; // if value doesn't contain any separator
    
    //prepare value
    value.replace('"', ''); // 
    value = value.toLowerCase(); //

    //if 'w' or 's' char in value
    //then remove it and transform to oposit digit
    const extract = (re, marker) => {
      try{ 
        return value.match(re)[0].replace(marker, '')
      }catch{
        return 0
      }
    }

    const reSign = /^-|w|e/g
    const sign = (reSign.test(value)) ? -1:1
    
    const reDegree = /\d+°/
    const degree = extract(reDegree, '°')
    
    const reMinute = /\d+'/
    const minute = extract(reMinute, "'")
    
    const reSecond = /\d+"/
    const second = extract(reSecond, '"')
    
    const d = parseFloat(degree);
    const m = parseFloat(minute/60);
    const s = (second !== undefined) ? parseFloat(second/3600):0;
    
    return Number((d+m+s)*sign).toFixed(10).replace(/(\.0+|0+)$/, '').toString();
}