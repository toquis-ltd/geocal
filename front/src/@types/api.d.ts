import { FileFormatEnum } from "../enums/settings"

export interface FileDownloadProps {
    pipline:string[]
    pipe_ids:number[]
    file_format:FileFormatEnum
}