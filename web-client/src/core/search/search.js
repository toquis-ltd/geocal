import {getCRSList} from '../api/api'

var CRSs = {};

async function getCurrentList(q) {
    if (q.length === 0) return []
    let currentList = [];
    q = q.toLowerCase();
    if (q in CRSs) {
        currentList = CRSs[[q]];
        return currentList;
    }
    await getCRSList(q).then((res)=> { 
        CRSs={...CRSs, [q]:res.findCRS};
        currentList = res.findCRS;
    });
    return currentList;
}

export default getCurrentList;