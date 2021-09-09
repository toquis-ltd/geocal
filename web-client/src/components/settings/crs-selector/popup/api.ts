async function getRequest(app:String, key:String, parrams:string | number) {
    return (await fetch(`${process.env.REACT_APP_HOST}/api/${app}/?format=json&${key}=${parrams}`).catch()).json();
}

export async function fetchCRSList(quest:string){
    return await getRequest('search', 'q', quest);
}

export async function fetchAboutCRS(code:number) {
    return await getRequest('about', 'crs',  code);
}

export async function fetchTransfrom(source:number, target:number, point:Array<any>) {
    const parrameters = `?format=json&s_crs=${source}&t_crs=${target}&x=${point[0]}&y=${point[1]}&z=${point[2]}`;
    return await (await fetch(`${process.env.REACT_APP_HOST}/api/transform/${parrameters}`).catch()).json();
}