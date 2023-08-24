import React from 'react'
import { Col, Row } from 'antd';

import { InboxOutlined, DeleteOutlined, RocketFilled} from '@ant-design/icons';
import { message, Upload, Button } from 'antd';

import type { UploadFile, UploadProps } from 'antd/es/upload/interface';

import { TransformedFileDownloadRequest } from '../api';
import { SettingsContext } from '../context/settings';

const { Dragger } = Upload;

const FileUploader : React.FC = () => {
  const state = React.useContext<SettingStateType>(SettingsContext)
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

  const onDelete = () => {
    setFileList([]);
  }

  const onTransform = () => {
    TransformedFileDownloadRequest(state);
  }

  return (
    <div className="upload__file" style={{textAlign:"center"}}>
      <Dragger  fileList={fileList} {...props} height={300}>
            <p className="ant-upload-drag-icon">
              <InboxOutlined />
            </p>
            <p className="ant-upload-text">Click or drag file to this area to upload</p>
      </Dragger>
      <Row style={{marginTop: '10px'}}>
        <Col span={6}>
        </Col>
        <Col span={6}>
          <Button 
            type="primary"
            onClick={onDelete}
            icon={<DeleteOutlined />}
            size={'large'}
            children={'Delete'}
          />
        </Col>
        <Col span={6}>
          <Button
          size={'large'}
          type="primary"
          icon={<RocketFilled />}
          onClick={onTransform}
          children={'Transform'}
        />
        </Col>
        <Col span={6}>
        </Col>
      </Row>
  </div>
  )

}

export default FileUploader;