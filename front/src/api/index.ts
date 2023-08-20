import { FileDownloadProps } from "../@types/api"

const server = `${import.meta.env.VITE_server}`

export const TransformedFileDownloadRequest = (props:FileDownloadProps) => {
    fetch(`${server}/api/transform/file`, {
        method:'POST',
        headers: {
          'accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          "pipeline": [4326],
          "pipe_ids": [0],
          "file_format": props.file_format
        })
      }).then(()=>{
        window.open(`${server}/api/transform/download`)
      })
}

export const GetCRSFromGeoPoint = async (coordinate:CRSArea) => {
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