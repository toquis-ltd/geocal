import { ResultFormatEnum } from "../enums/settings";
import { PointAPI } from '../@types/api';
import {getLastVisibleSelectedCRSIndex} from '../outils';

const server = `${import.meta.env.VITE_server}`

export const TransformedFileDownloadRequest = (props:SettingStateType, id:string) => {
    const pipeline:string[] = props.transformationsItems.slice(0, getLastVisibleSelectedCRSIndex(props)+1).map(e => e.code);
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

export const TransformedPoint = async (coordinate:PointAPI, props:SettingStateType) => {
  
  const input = {
    x: coordinate.x,
    y: coordinate.y,
  } as PointAPI;

  if (coordinate?.z != undefined && !Number.isNaN(parseFloat(coordinate?.z))) {
    input.z = parseFloat(coordinate.z).toString()
  }

  const pipeline:string[] = props.transformationsItems.slice(0, getLastVisibleSelectedCRSIndex(props)+1).map(e => e.code);

  return (await (
    await fetch(`${server}/api/transform/point`, {
      method:'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        point: input,
        "transformation": {
          "pipeline": pipeline,
          "pipe_ids": props.pipeIds,
          "result_form":  ResultFormatEnum[props.dataOutputFormat as keyof typeof ResultFormatEnum],
        }
      })
    })).json())!.point as PointAPI
}

export const TransformationsList = async (props:SettingStateType) => {
  const pipeline:string[] = props.transformationsItems.slice(0, 2+Number(props.transformationsNumber)+1).map(e => e.code);
  return (await (
    await fetch(`${server}/api/search/transformation`, {
      method:'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(pipeline)
    })).json())!.transformation_pipe as [TransformationDefinition[], TransformationDefinition[]]
}