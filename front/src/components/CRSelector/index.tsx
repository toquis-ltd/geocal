import React from 'react'

import {
         Modal,
         Row,
         Col,
         Button,
         List,
         Divider
        } from 'antd';

import {CRSContext} from '../../context/crs';

import LoadMoreButton from './loadmoreButton'
import Filter from './filters'

interface Props{
    state:boolean
    setViewState:React.Dispatch<boolean>
    onSelect:React.Dispatch<CRSModelType>
}

const CRSelector : React.FC<Props> = (prop:Props) => {
  const CRState = React.useContext<CRSListStateType>(CRSContext)
  const [data, setData] = React.useState<CRSModelType[]>([])
  const [viewData, setViewData] = React.useState<CRSModelType[]>([])
  const [isLoading, setLoading] = React.useState<boolean>(false);


  const OnApply = (crs:CRSModelType) => {
    setViewData(data.slice(0, 30));
    prop.onSelect(crs);
    prop.setViewState(false)
  };

  const onFilter = (value: (string | number)[] | undefined) => {
    if (value === undefined) {
      setData(CRState.CRSList)
      return
    }

    if (value.length < 2 ) {
      setData(CRState.CRSList.slice(0, 30))
      return
    }
    
    let db = CRState.CRSList
    switch (value[0]) {
        case 'type':
          db = db.filter(item => value[1] === item.type.toString())
          break
    }
    setData(db)
  }

  const onSearch = (value:CRSModelType[]) => {
    CRState.setCRSList({...CRState, CRSList:value})
  }

  React.useEffect(() => {
    setData(CRState.CRSList)
  }, [CRState.CRSList])

  React.useEffect(() => {
    setViewData(data.slice(0, 50))
  }, [data])

  return (
    <Modal
        title="Select coordinate referance area"
        centered
        open={prop.state}
        onCancel={() => prop.setViewState(false)}
        footer={[]}
        width={800}
        >
        <Filter 
                dataLength={`${data.length} / ${CRState.CRSList.length}`}
                onFilter={onFilter}
                onSearch={onSearch}
                />
        <List
          style={{maxHeight:'50vh', overflow:'auto', overflowX:'hidden' }}
          dataSource={viewData}
          loadMore={<LoadMoreButton isLoading={isLoading} data={data} viewData={viewData} onLoad={setLoading} setViewData={setViewData}/>}
          renderItem={(item) => (
            <Row>
            <Col span={20}>
            <List.Item key={item.auth_name + item.code}>
              <div className="item">
                <p><b>Name: </b> {item.name}</p>
                <p><b>Authority: </b> {item.auth_name}</p>
                <p><b>ID Code: </b> {item.code}</p>
                <p><b>Type:</b> {item.type}</p>
                <p><b>Area of use:</b> {item.area_of_use_name}</p>
                {(item?.projection_method_name) ? <p><b>Projection:</b> {item.projection_method_name}</p> : null}
              </div>
            </List.Item>
            </ Col>
            <Col span={4} >
              <Button
                      style={{marginTop:'50%'}}
                      size='large'
                      type="primary"
                      onClick={()=>OnApply(item)}
                      >Select</Button>
            </Col>
            <Divider />
           </Row >
          )}
        />
    </Modal>
  );
}

export default React.memo(CRSelector)