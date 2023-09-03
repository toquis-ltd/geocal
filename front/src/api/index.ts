import { NumberOfTranfromationsEnum } from "../enums/settings";

const server = `${import.meta.env.VITE_server}`

export const TransformedFileDownloadRequest = (props:SettingStateType) => {
    let pipeline:string[];
    if (props.transformationsNumber == NumberOfTranfromationsEnum.One){
      pipeline = props.transformationsItems.slice(0, 2).map(e => e.code);
    } else {
      pipeline= props.transformationsItems.map(e => e.code);
    };

    fetch(`${server}/api/transform/file`, {
        method:'POST',
        headers: {
          'accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          "pipeline": pipeline,
          "pipe_ids": props.pipeIds,
          "file_format": props.outputFile
        })
      }).then(()=>{
        window.open(`${server}/api/transform/download`)
      })
}

export const GetCRSFromGeoPoint = async (coordinate:PointCoordinate) => {
    let response:CRSModelType[];
    return await await fetch(`${server}/api/search/area/crs?lat=${coordinate.lat}&long=${coordinate.long}`, {
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
  const precision = 20
  const n = new BigNumber("123.16516");
  console.log(n.toString())
  input =  {
    x: parseFloat(coordinate.x).toFixed(precision),
    y: parseFloat(coordinate.y).toFixed(precision),
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
  console.log('feieifojzoijfezoizjeiozjfoi')
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
          "pipe_ids": settings.pipeIds
        }
      })
    })
    .then(res => res.json())
    .then(res => {
      if (is2D) {
        return {
          x: parseFloat(res.point.x).toFixed(precision),
          y: parseFloat(res.point.y).toFixed(precision)
        } as PointAPI
      }
      return {
        x: parseFloat(res.point.x).toFixed(precision),
        y: parseFloat(res.point.y).toFixed(precision),
        z: parseFloat(res.point.z).toFixed(precision)
      } as PointAPI
    })
}

type pipesList = [string[], string[]]

export const TransformationsList = async (props:SettingStateType) => {
  const pipeline:string[] = props.transformationsItems.slice(0, 2+Number(props.transformationsNumber)).map(e => e.code);
  return await await fetch(`${server}/api/search/transformation`, {
      method:'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(pipeline)
    })
    .then(res => res.json())
    .then(res => {
      let response = ((res!.transformation_pipe) as pipesList)
      return response
    })
}