import React, {useEffect} from "react";
import {Button} from 'antd';

interface Props {
    isLoading:boolean
    data: CRSModelType[]
    viewData: CRSModelType[]
    setViewData: VoidFunction
    onLoad: VoidFunction
}

const LoadMoreButton:React.FC = (props:Props) => {

    const onLoadMore = () => {
      props.onLoad(true);
      props.setViewData(props.data.slice(0, props.viewData.length + 30));
      props.onLoad(false);
    };

    return ( (!props.isLoading && props.viewData.length < props.data.length) ? (
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