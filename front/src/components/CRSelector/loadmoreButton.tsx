import React from "react";
import {Button} from 'antd';

interface Props {
    isLoading:boolean
    data: CRSModelType[]
    viewData: CRSModelType[]
    setViewData: React.Dispatch<CRSModelType[]>
    onLoad: React.Dispatch<boolean>
}

const LoadMoreButton:React.FC<Props> = ({isLoading, data, viewData, setViewData,  onLoad}) => {

    const onLoadMore = () => {
      onLoad(true);
      setViewData(data.slice(0, viewData.length + 30));
      onLoad(false);
    };

    return ( (!isLoading && viewData.length < data.length) ? (
    <div
      style={{
        textAlign: 'center',
        marginTop: 12,
        height: 32,
        lineHeight: '32px',
      }}
    >
      <Button onClick={onLoadMore}>Load more</Button>
    </div>
  ) : null)
}

export default LoadMoreButton;