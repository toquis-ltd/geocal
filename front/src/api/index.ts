import { NumberOfTranfromationsEnum } from "../enums/settings";

const server = `${import.meta.env.VITE_server}`

export const TransformedFileDownloadRequest = (props:SettingStateType, id:string) => {
    let pipeline:string[];
    if (props.transformationsNumber == NumberOfTranfromationsEnum.One){
      pipeline = props.transformationsItems.slice(0, 2).map(e => e.code);
    } else {
      pipeline= props.transformationsItems.map(e => e.code);
    };

    fetch(`${server}/api/transform/file/${id}`, {
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
        window.open(`${server}/api/transform/download/${id}`)
      })
}

interface PointAPI {
  x:string
  y:string
  z?:string
};

export const TransformedPoint = async (coordinate:PointAPI, settings:SettingStateType) => {
  let input:PointAPI;
  let is2D:boolean = true;
  input =  {
    x: parseFloat(coordinate.x).toString(),
    y: parseFloat(coordinate.y).toString(),
  }

  if (coordinate?.z != undefined && !Number.isNaN(parseFloat(coordinate?.z))) {
    input.z = parseFloat(coordinate.z).toString()
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
          "pipe_ids": settings.pipeIds
        }
      })
    })
    .then(res => res.json())
    .then(res => {
      if (is2D) {
        return {
          x: parseFloat(res.point.x).toFixed(8),
          y: parseFloat(res.point.y).toFixed(8)
        } as PointAPI
      }
      return {
        x: parseFloat(res.point.x).toFixed(8),
        y: parseFloat(res.point.y).toFixed(8),
        z: parseFloat(res.point.z).toFixed(8)
      } as PointAPI
    })
}


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
      let response = ((res!.transformation_pipe) as [TransformationDefinition[], TransformationDefinition[]])
      return response
    })
}