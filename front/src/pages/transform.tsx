import React from 'react';
import { InboxOutlined } from '@ant-design/icons';
import { message, Upload } from 'antd';

import type { UploadFile, UploadProps } from 'antd/es/upload/interface';

const { Dragger } = Upload;

const TransformPage : React.FC = () => {
  const [fileList, setFileList] = React.useState<UploadFile[]>([]);
  const props: UploadProps = {
    name: 'file',
    multiple: false,
    action: `${import.meta.env.VITE_server}/api/transform/upload`,
    method: "post",
    maxCount: 1,

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
      <Dragger  fileList={fileList}  {...props}>
        <p className="ant-upload-drag-icon">
          <InboxOutlined />
        </p>
        <p className="ant-upload-text">Click or drag file to this area to upload</p>
    </Dragger>
  )
}

export default TransformPage