import React from 'react'
import { useNavigate } from 'react-router-dom';

import { InboxOutlined, DeleteOutlined} from '@ant-design/icons';
import { message, Upload, Button } from 'antd';

import type { UploadFile, UploadProps } from 'antd/es/upload/interface';

const { Dragger } = Upload;

const FileUploader : React.FC = () => {
  const [fileList, setFileList] = React.useState<UploadFile[]>([]);
  const props: UploadProps = {
    name: 'file',
    action: `${import.meta.env.VITE_server}/api/transform/upload`,
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
  return (
    <div className="upload__file" style={{textAlign:"center"}}>
      <Dragger  fileList={fileList} {...props} style={{height:'200px'}}>
            <p className="ant-upload-drag-icon">
              <InboxOutlined />
            </p>
            <p className="ant-upload-text">Click or drag file to this area to upload</p>
      </Dragger>
      <div style={{marginTop: '10px'}}>
        <Button type="primary" onClick={()=>setFileList([])} icon={<DeleteOutlined />} size={'large'} children={'Delete'}/>
      </div>
  </div>
  )

}

export default FileUploader;