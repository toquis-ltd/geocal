async function getRequest(app:String, key:String, parrams:String | number) {
    return (await fetch(`${process.env.REACT_APP_HOST}/api/${app}/?format=json&${key}=${parrams}`).catch()).json();
}

export async function fetchCRSList(quest:String){
    return await getRequest('search', 'q', quest);
}

export async function fetchProj4(code:number) {
    return await getRequest('proj4', 'crs',  code);
}