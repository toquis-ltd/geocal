import React from 'react'

import { InboxOutlined, DeleteOutlined, RocketFilled} from '@ant-design/icons';
import { message, Upload, Button } from 'antd';

import type { UploadFile, UploadProps } from 'antd/es/upload/interface';

import { TransformedFileDownloadRequest } from '../api';
import { SettingsContext } from '../context/settings';
import { useStickyState } from '../hooks';

const { Dragger } = Upload;

const uuid = () => {
  return Array
   .from(Array(16))
   .map(() => Math.floor(Math.random() * 255)
   .toString(16)
   .padStart(2,"0"))
   .join('')
}

const styleUpload = {margin:'0 auto', width:'100%', display:'flex', justifyContent:'center'};

const FileUploader : React.FC = () => {
  const state = React.useContext<SettingStateType>(SettingsContext)
  const [fileList, setFileList] = React.useState<UploadFile[]>([]);
  const [user_id, ] = useStickyState(uuid(), 'userID');

  const props: UploadProps = {
    name: 'file',
    action: `${import.meta.env.VITE_server}/api/transform/upload/${user_id}`,
    maxCount: 1,
    multiple: false,
    
    onChange({file, fileList}) {
      const { status, response } = file;
      if (status === 'done') {
        if (response.status_code > 299) {
          message.error(`${response.detail}`);
          setFileList([]);
          return
        }
        message.success(`${file.name} file uploaded successfully.`);
      } else if (status === 'error') {
        message.error(`${file.name} file upload failed.`);
        setFileList([]);
      }
      setFileList(fileList)
    },
  };

  const onDelete = () => {
    setFileList([]);
  }

  const onTransform = () => {
    TransformedFileDownloadRequest(state, user_id);
    onDelete()
  }

  return (
    <form id='transform_file' className="upload__file" style={{textAlign:"center"}} onDragOver={(e) => e.preventDefault()}    >
      <Dragger  fileList={fileList} {...props} height={150}>
            <p className="ant-upload-drag-icon">
              <InboxOutlined />
            </p>
            <p className="ant-upload-text">Click or drag file to this area to upload</p>
      </Dragger>

      <div className="file-upload__container" style={styleUpload}>
            <Button 
              style={{margin:'5px'}}
              type="primary"
              onClick={onDelete}
              icon={<DeleteOutlined />}
              size={'large'}
              children={'Delete'}
            />
            <Button
            disabled={fileList.length<1}
            style={{margin:'5px'}}
            size={'large'}
            type="primary"
            icon={<RocketFilled />}
            onClick={onTransform}
            children={'Transform'}
          />
      </div>
  </form>
  )

}

export default FileUploader;