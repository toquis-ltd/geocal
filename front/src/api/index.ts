import { NumberOfTranfromationsEnum } from "../enums/settings";

const server = `${import.meta.env.VITE_server}`

export const TransformedFileDownloadRequest = (props:SettingStateType) => {
    const pipeline:string[] = props.transformationsItems.map(e => e.code);
    fetch(`${server}/api/transform/file`, {
        method:'POST',
        headers: {
          'accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          "pipeline": pipeline,
          "pipe_ids": [0],
          "file_format": props.outputFile
        })
      }).then(()=>{
        window.open(`${server}/api/transform/download`)
      })
}

export const GetCRSFromGeoPoint = async (coordinate:PointCoordinate) => {
    let response:CRSModelType[];
    return await await fetch(`${server}/api/search/crs?lat=${coordinate.lat}&long=${coordinate.long}`, {
        method:'GET',
        headers: {
          'Accept': 'application/json',
        },
      })
      .then(res => res.json())
      .then(res => {
        response = (res.content as CRSModelType[])
        return response
      })
    
}
interface PointAPI {
  x:string
  y:string
  z?:string
}

export const TransformedPoint = async (coordinate:PointAPI, settings:SettingStateType) => {
  let input:PointAPI;
  let is2D:boolean = true;

  input =  {
    x: parseFloat(coordinate.x).toFixed(12),
    y: parseFloat(coordinate.y).toFixed(12),
  }

  if (coordinate?.z != undefined && !Number.isNaN(parseFloat(coordinate?.z))) {
    input.z = parseFloat(coordinate.z).toFixed(12)
    is2D = false;
  }

  let pipeline:string[];
  if (settings.transformationsNumber == NumberOfTranfromationsEnum.One){
    pipeline = settings.transformationsItems.slice(0, 2).map(e => e.code);
  } else {
    pipeline= settings.transformationsItems.map(e => e.code);
  }

  return await await fetch(`${server}/api/transform/point`, {
      method:'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        point: input,
        "transformation": {
          "pipeline": pipeline,
          "pipe_ids": [
            0
          ]
        }
      })
    })
    .then(res => res.json())
    .then(res => {
      if (is2D) {
        return {
          x: parseFloat(res.point.x).toFixed(12),
          y: parseFloat(res.point.y).toFixed(12)
        } as PointAPI
      }
      return {
        x: parseFloat(res.point.x).toFixed(12),
        y: parseFloat(res.point.y).toFixed(12),
        z: parseFloat(res.point.z).toFixed(12)
      } as PointAPI
    })
}