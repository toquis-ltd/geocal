export async function getInformationAboutCode(code){
    return await (await fetch(`${process.env.REACT_APP_HOST}/api/epsg/?code=${code}&format=json`).catch()).json();
}

export async function convert(s_crs, t_crs, x, y, z){
    const url = `${process.env.REACT_APP_HOST}/api/transform/?format=json`;
    const parameters = `&s_crs=${s_crs}&t_crs=${t_crs}&source_x=${x}&source_y=${y}&source_z=${z}`;
    return await (await fetch(url+parameters).catch()).json();
}

export async function getCRSList(quest){
    return await (await fetch(`${process.env.REACT_APP_HOST}/api/search/?format=json&q=${quest}`).catch()).json();
}

export async function getPopular(){
    return await (await fetch(`${process.env.REACT_APP_HOST}/api/popular/?format=json`).catch()).json();
}