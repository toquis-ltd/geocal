import {fetchTransfrom} from 'components/settings/crs-selector/popup/api'
import {convertToDecimal} from './format'

export default async function FetchConvertion(source, target, point, proj) {
    const coordinate = Object.values(point)
                                            .filter(value=> value.length > 0)
                                            .map(prop=>convertToDecimal(prop))
                                            .map(i => parseFloat(parseFloat(i).toFixed(8)))
    var response;
    await transform(source, target, coordinate, proj).then(res => response=res);
    return {x:response[0], y:response[1], z:response[2]}
}

async function transform(source, target, coordinate, proj) {
    if (coordinate.length === 0) {
        return ['-', '-', '-'];
    }
    return Object.values(await fetchTransfrom(source.code, target.code, coordinate, proj)).map(value => value.toString());
}