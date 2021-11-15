export async function fetchTransformationPropreties(source:any, target:any) {
    let res = await (
              await fetch(`${process.env.REACT_APP_HOST}/api/deftransform/?format=json&source=${source}&target=${target}`).catch()).json();
    return res;
}