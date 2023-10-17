import { NumberOfTranfromationsEnum, ResultFormatEnum } from "../enums/settings";
import { PointAPI } from '../@types/api';

const server = `${import.meta.env.VITE_server}`

export const TransformedFileDownloadRequest = (props:SettingStateType, id:string) => {
    let pipeline:string[];
    if (props.transformationsNumber == NumberOfTranfromationsEnum.One){
      pipeline = props.transformationsItems.slice(0, 2).map(e => e.code);
    } else {
      pipeline= props.transformationsItems.map(e => e.code);
    };

    console.log(props.dataOutputFormat)
    fetch(`${server}/api/transform/file/${id}`, {
        method:'POST',
        headers: {
          'accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          "pipeline": pipeline,
          "pipe_ids": props.pipeIds,
          "file_format": props.outputFile,
          "result_form":ResultFormatEnum[props.dataOutputFormat as keyof typeof ResultFormatEnum],
        })
      }).then(()=>window.open(`${server}/api/transform/download/${id}`))
}

export const TransformedPoint = async (coordinate:PointAPI, settings:SettingStateType) => {
  let is2D:boolean = true;
  
  const input = {
    x: coordinate.x,
    y: coordinate.y,
  } as PointAPI;

  if (coordinate?.z != undefined && !Number.isNaN(parseFloat(coordinate?.z))) {
    input.z = parseFloat(coordinate.z).toString()
    is2D = false;
  }

  let pipeline:string[];
  
  switch(settings.transformationsNumber) {
    case NumberOfTranfromationsEnum.One:
      pipeline = settings.transformationsItems.slice(0, 2).map(e => e.code);
      break;
    case NumberOfTranfromationsEnum.Two:
    case NumberOfTranfromationsEnum.Three:
      pipeline= settings.transformationsItems.map(e => e.code);
      break;
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
          "pipe_ids": settings.pipeIds,
          "result_form":  ResultFormatEnum[settings.dataOutputFormat as keyof typeof ResultFormatEnum],
        }
      })
    })
    .then(res => res.json())
    .then(res => {
      if (is2D) {
        return {
          x: String(res.point.x),
          y: String(res.point.y)
        } as PointAPI
      }
      return {
        x: String(res.point.x),
        y: String(res.point.y),
        z: String(res.point.z)
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