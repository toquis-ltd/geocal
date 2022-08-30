import {fetchTransfrom} from 'components/settings/crs-selector/popup/api'
import {convertToDecimal} from './format'

export default async function FetchConvertion(source:CRS, target:CRS, point:Point, proj:any) {
    const coordinate = Object.values(point)
                                            .filter(value=> value?.length > 0)
                                            .map(prop=>convertToDecimal(prop))
                                            .map(i => parseFloat(parseFloat(i).toFixed(8)))
    var response:Array<string> = ['','',''];
    await transform(source , target, coordinate, proj).then(res => response=res);
    let final = {x:response[0], y:response[1], z:response[2]}
    return final
}

async function transform(source:CRS, target:CRS, point:any, proj:any) {
    if ((point.length === 0) || (source.code === undefined)  || (target.code === undefined) ){
        return ['-', '-', '-'];
    }
    return Object.values(await fetchTransfrom(source.code, target.code, point, proj)).map((value) => value as string);
}