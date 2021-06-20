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
    return `${d}°${m}'${s}`
};

export function convertToDecimal (value)  {
    
    // exception case  
    if (value.length === 0) return '0'; // if value is empty
    if (/'|"/.test(value) === false) return value; // if value doesn't contain any separator
    
    //prepare value
    value.replace('"', ''); // 
    value = value.toLowerCase(); //

    //if 'w' or 'e' char in value
    //when remove it and transform to oposit digit
    const chartRe = /w|e/g;
    let  dms_list = value.split(/°|'|"/);
    let sign = Math.sign(Math.sign(dms_list[0])*2+1);

    if (chartRe.test(value)){
      value = value.replace(/w|e/g, '');
      dms_list = value.split(/°|'|"/);
      sign*=-1;
    }

    //convert 
    const d = Math.abs(dms_list[0]);
    const m = parseFloat(dms_list[1]/60);
    const s = parseFloat(dms_list[2]/3600);
    return Number((d+m+s)*sign).toFixed(10).replace(/(\.0+|0+)$/, '').toString();
};