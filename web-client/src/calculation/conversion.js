import proj4 from 'proj4';


export default function FetchConvertion(source, target, point) {
    let response;
    try {
        const coordinate = Object.values(point).map(i => parseFloat(parseFloat(i).toFixed(8)))
        response = proj4(source, target, coordinate).map(item => item.toFixed(7).toString());
    } catch (error) {
        response = ['-', '-', '-'];
    }
    return {x:response[0], y:response[1], z:response[2]}
}