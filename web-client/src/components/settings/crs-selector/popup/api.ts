async function getRequest(app:String, key:String, parrams:string | number) {
    return (await fetch(`${process.env.REACT_APP_HOST}/api/${app}/?format=json&${key}=${parrams}`).catch()).json();
}

export async function fetchCRSList(quest:string){
    return await getRequest('search', 'q', quest);
}

export async function fetchAboutCRS(code:number) {
    return await getRequest('about', 'crs',  code);
}

export async function fetchTransfrom(source:number, target:number, point:Array<any>, proj:any) {
    const getCookie = (name: string) => {
        let cookieValue = '';
        if (document.cookie && document.cookie !== '') {
            const cookies = document.cookie.split(';');
            for (let i = 0; i < cookies.length; i++) {
                const cookie = cookies[i].trim();
                if (cookie.substring(0, name.length + 1) === (name + '=')) {
                    cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                    break;
                }
            }
        }
        return cookieValue;
    }
    const data = {
        s_crs:source,
        t_crs:target,
        x:point[0],
        y:point[1],
        z:point[2],
        proj:proj,
    }

    return await (
        await fetch(`${process.env.REACT_APP_HOST}/api/transform/`, {
            method: 'POST',
            headers: {
                'Content-type': 'application/json',
                'X-CSRFToken': getCookie('csrftoken'),
            },
            body: JSON.stringify(data)

        }).catch()).json();
}