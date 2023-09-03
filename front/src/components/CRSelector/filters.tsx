import React from 'react'

import {
    Row,
    Col,
    Divider,
    Cascader,
    Input,
    Button,
   } from 'antd';

import AreaSelector from '../AreaSelector'

import data from '../../data/crs.json'

interface Option {
  value: string;
  label: string;
  children?: Option[];
}
interface Props{
  dataLength:string;
  onSearch: React.Dispatch<CRSModelType[]>;
  onFilter: (value: (string | number)[] | undefined) => void;
}



const filterOptions: Option[] = [
    {
      value: 'type',
      label: 'Type',
      children: [
        {
          value: 'PROJECTED_CRS',
          label: 'PROJECTED CRS',
        },
        {
          value: 'GEOGRAPHIC_2D_CRS',
          label: 'GEOGRAPHIC 2D CRS',
        },
        {
          value: 'GEOGRAPHIC_3D_CRS',
          label: 'GEOGRAPHIC 3D CRS',
        },
        {
          value: 'VERTICAL_CRS',
          label: 'VERTICAL CRS',
        },
        {
          value:'COMPOUND_CRS',
          label:'COMPOUND CRS',
        }
      ],
    },
]


const DATA = data as CRSModelType[];

const Filters:React.FC<Props> = ({dataLength, onFilter, onSearch }) => {
  const [isAreaSelectorOpen, setAreaSelectorState] = React.useState<boolean>(false);
  const search = (value:string) => {
      let res = DATA.filter(item => item.name.toLowerCase().includes(value.toLowerCase()) || 
                                    item.code.includes(value) ||
                                    item.area_of_use_name.toLowerCase().includes(value.toLowerCase()));      
      onSearch(res);
    };

  return (
            <Row>
                <Col span={8} >
                    <b>Filters: </b> 
                    <Cascader
                              options={filterOptions}
                              style={{width:"80%"}}
                              maxTagCount="responsive"
                              onChange={onFilter}
                            />
                </Col>
                <Col span={8} >
                      <Input.Search placeholder="Search for CRS"  onSearch={search}/>
                </Col>                
                <Col span={2} >
                <div>
                  <Button type="primary" onClick={() => setAreaSelectorState(true)}>
                      Area
                  </Button>
                  <AreaSelector state={isAreaSelectorOpen} setViewState={setAreaSelectorState} />
                </div>
                </Col>
                <Col span={5}  >
                    <b>Data lenght: </b>  {dataLength} 
                </Col>
                <Divider />
            </Row >
    )
}

export default Filters;