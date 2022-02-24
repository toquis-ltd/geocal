export async function fetchTransformationPropreties(source:any, target:any) {
    let res = await (
              await fetch(`${process.env.REACT_APP_HOST}/api/deftransform/?format=json&source=${source}&target=${target}`)
              .catch()).json();
    return res;
}

export async function fetchTransformationList(source:any, target:any) {
    if (source !== undefined && target !== undefined) {
    let res = await (
              await fetch(`${process.env.REACT_APP_HOST}/api/enumtransform/?format=json&source=${source}&target=${target}`)
              .catch()).json();
    return res;
    }
}