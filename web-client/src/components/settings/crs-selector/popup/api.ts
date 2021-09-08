async function getRequest(app:String, key:String, parrams:string | number) {
    return (await fetch(`${process.env.REACT_APP_HOST}/api/${app}/?format=json&${key}=${parrams}`).catch()).json();
}

export async function fetchCRSList(quest:string){
    return await getRequest('search', 'q', quest);
}

export async function fetchAboutCRS(code:number) {
    return await getRequest('about', 'crs',  code);
}