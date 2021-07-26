export async function getCRSList(quest){
    return await (await fetch(`${process.env.REACT_APP_HOST}/api/search/?format=json&q=${quest}`).catch()).json();
}