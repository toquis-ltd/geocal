import proj4 from 'proj4';
import {fetchTransfrom} from 'components/settings/crs-selector/popup/api'
import {convertToDecimal} from './format'

export default async function FetchConvertion(source, target, point) {
    const coordinate = Object.values(point)
                                            .filter(value=> value.length > 0)
                                            .map(prop=>convertToDecimal(prop))
                                            .map(i => parseFloat(parseFloat(i).toFixed(8)))
    var response;
    await transform(source, target, coordinate).then(res => response=res);
    return {x:response[0], y:response[1], z:response[2]}
}

async function transform(source, target, coordinate) {
    let response;
    switch (coordinate.length) {
        default:
            response = ['-', '-', '-'];
            break
        case (3):
            response = Object.values(await fetchTransfrom(source.code, target.code, coordinate)).map(value => value.toString())
            break
        case (2):
            response = proj4(source.proj4, target.proj4, coordinate).map(item => item.toFixed(8).toString());
            break
    }
    return response;
}