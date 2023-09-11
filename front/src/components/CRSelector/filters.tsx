import React from 'react'

import {
    Row,
    Col,
    Divider,
    Cascader,
    Input,
    Button,
   } from 'antd';

import {isMobile} from 'react-device-detect';

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

const search = (value:string, apply:React.Dispatch<CRSModelType[]>) => {
      const res = DATA.filter(item => item.name.toLowerCase().includes(value.toLowerCase()) || 
                                    item.code.includes(value) ||
                                    item.area_of_use_name.toLowerCase().includes(value.toLowerCase()));      
      apply(res);
};

const Filters:React.FC<Props> = ({dataLength, onFilter, onSearch }) => {
  const [isAreaSelectorOpen, setAreaSelectorState] = React.useState<boolean>(false);
  return (
            <Row gutter={[12, 6]}>
                <Col xl={6} xs={8}>
                    <Cascader
                              style={{width:'100%'}}
                              placeholder="Filters"
                              options={filterOptions}
                              maxTagCount="responsive"
                              onChange={onFilter}
                            />
                </Col>
                <Col xl={2} xs={4}>
                  <Button type="primary" onClick={() => setAreaSelectorState(true)}>
                      Area
                  </Button>
                  <AreaSelector state={isAreaSelectorOpen} setViewState={setAreaSelectorState} />
                </Col>
                <Col xl={10} xs={12}>
                      <Input.Search placeholder="Search for CRS"  onSearch={(e)=> search(e, onSearch)}/>
                </Col>
                {
                  (isMobile) ? null:
                  <Col xl={6} xs={0} style={{display:'flex', alignItems:'center'}} >
                      <b>Data lenght:  </b>  {dataLength}
                  </Col>
                }
                <Divider />
            </Row >
    )
}

export default Filters;