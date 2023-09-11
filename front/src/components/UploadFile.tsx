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
   .map(e => Math.floor(Math.random() * 255)
   .toString(16)
   .padStart(2,"0"))
   .join('')
}

const FileUploader : React.FC = () => {
  const state = React.useContext<SettingStateType>(SettingsContext)
  const [fileList, setFileList] = React.useState<UploadFile[]>([]);
  const [user_id, setID] = useStickyState(uuid(), 'userID');

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
  }

  return (
    <div className="upload__file" style={{textAlign:"center"}} onDragOver={(e) => e.preventDefault()}    >
      <Dragger  fileList={fileList} {...props} height={300}>
            <p className="ant-upload-drag-icon">
              <InboxOutlined />
            </p>
            <p className="ant-upload-text">Click or drag file to this area to upload</p>
      </Dragger>
      <div className="file-upload__container" style={{margin:'0 auto', width:'50vw', display:'flex', justifyContent:'center'}}>
            <Button 
              style={{margin:'5px'}}
              type="primary"
              onClick={onDelete}
              icon={<DeleteOutlined />}
              size={'large'}
              children={'Delete'}
            />
            <Button
            style={{margin:'5px'}}
            size={'large'}
            type="primary"
            icon={<RocketFilled />}
            onClick={onTransform}
            children={'Transform'}
          />
      </div>

  </div>
  )

}

export default FileUploader;