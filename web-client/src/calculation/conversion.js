import proj4 from 'proj4';


export default function FetchConvertion(source, target, point) {
    let response;
    try {
        const x = parseFloat(parseFloat(point?.x).toFixed(8));
        const y = parseFloat(parseFloat(point?.y).toFixed(8));
        response = proj4(source, target, [x, y]).map(item => item.toString());
    } catch (error) {

        response = ['-', '-'];
    }

    return {x:response[0], y:response[1]}
}