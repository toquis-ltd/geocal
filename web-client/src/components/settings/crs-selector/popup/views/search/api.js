async function getRequest(app, key, parrams){
    return (await fetch(`${process.env.REACT_APP_HOST}/api/${app}/?format=json&${key}=${parrams}`).catch()).json();
}

export async function fetchCRSList(quest){
    return await getRequest('search', 'q', quest);
}

export async function fetchProj4(code){
    return await getRequest('proj4', 'crs',  code);
}