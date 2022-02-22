import React from 'react'
import { Tag, Table, Input, Button, Popconfirm, Form, message, Space, InputNumber, Typography, Select } from 'antd';
import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import Update from './Update';
import ReferralInput from '../../../../../../my_components/ReferralInput';

const {Option} = Select;
axios.defaults.baseURL = 'http://flip3.engr.oregonstate.edu:9417'
const paramsData = ['name', 'country', 'latitude', 'longitude', 'data_of_construct', 'fuel'];
const compareOpsData = {
    name: ['match exactly', 'contains', 'starts at'],
    country: ['='],
    latitude: ['=', '<=', '>='],
    longitude: ['=', '<=', '>='],
    data_of_construct: ['=', '<=', '>='],
    fuel: ['='],
}
export default function DataRow() {
    const navigate = useNavigate();
    const [, forceUpdate] = useState();
    // for filter
    const [filter, setFilter] = useState({
        name_vague: undefined, 
        name: undefined, 
        name_vague_tail: undefined, 
        country: undefined, 
        latitude: undefined, 
        latitude_upper: undefined, 
        latitude_lower: undefined, 
        longitude: undefined, 
        longitude_upper: undefined, 
        longitude_lower: undefined, 
        date_of_construction: undefined, 
        date_of_construction_upper: undefined, 
        date_of_construction_lower: undefined, 
        fuel: undefined, 
        limit: undefined,
    });
    const inputP1 = useRef(null);
    const [curParam, setCurParam] = useState('name');
    const [paramsUsed, setParamsUsed] = useState({
        name: false, country: false, latitude: false, longitude: false, date_of_construction: false, fuel: false, 
    });
    const [filterTags, setFilterTags] = useState([]);
    const [compareOps, setCompareOps] = React.useState(compareOpsData[paramsData[0]]);
    const [currentOp, setCurrentOp] = React.useState(compareOpsData[paramsData[0]][0]);

    const [selectedRowKeys, setSelectedRowKeys] = useState([]);
    const [loading, setLoading] = useState(false);
    const [dataSource, setDataSource] = useState([]);
    const [updating, setUpdating] = useState(false);
    const [updatingData, setUpdaingData] = useState(-1);
    const onDeleteSelected = () => {
        setLoading(true);
        // AJAX 请求
        console.log(selectedRowKeys);
        const helper = async () => {
            for (const rowKey of selectedRowKeys) {
                axios({
                    method: 'DELETE',
                    url: '/plants/' + rowKey,
                })
            }
        }
        helper().then(
            res => {
                console.log(res);
                setDataSource(dataSource.filter(data => {
                    return !selectedRowKeys.includes(data.plant_id);
                }))
                setSelectedRowKeys([]);
                setLoading(false)
            }
        )
    }
    useEffect(() => {
        console.log(axios.defaults.baseURL)
        axios({
            method: 'GET',
            url: '/plants',
            params: filter
        }).then(
            res => {
                const data = res.data.results;
                setDataSource(data);
                console.log('dataSource:', data);
            },
            err => {
                console.error(err);
            }
        )
    }, [])
    const EditableCell = ({
        editing,
        dataIndex,
        title,
        inputType,
        record,
        index,
        children,
        ...restProps
    }) => {
        const inputNode = inputType === 'number' ? <InputNumber /> : <Input />;
        return (
            <td {...restProps}>
                {editing ? (
                    <Form.Item
                        name={dataIndex}
                        style={{
                            margin: 0,
                        }}
                        rules={[
                            {
                                required: true,
                                message: `Please Input ${title}!`,
                            },
                        ]}
                    >
                        {inputNode}
                    </Form.Item>
                ) : (
                    children
                )}
            </td>
        );
    };
    const columns = [
        {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
            fixed: 'left',
            sorter: {
                compare: (a, b) => a.name > b.name ? 1 : a.name < b.name ? -1 : 0,
                multiple: 5,
              },
        },
        {
            title: 'Country',
            dataIndex: 'country',
            key: 'country',
            sorter: {
                compare: (a, b) => a.country > b.country ? 1 : a.country < b.country ? -1 : 0,
                multiple: 4,
              },
        },
        {
            title: 'Latitude',
            dataIndex: 'latitude',
            key: '1',
            sorter: {
                compare: (a, b) => a.latitude - b.latitude,
                multiple: 3,
              },
        },
        {
            title: 'Longitude',
            dataIndex: 'longitude',
            key: '2',
            sorter: {
                compare: (a, b) => a.longitude - b.longitude,
                multiple: 2,
              },
        },
        {
            title: 'Date of Construction',
            dataIndex: 'date_of_construction',
            key: '3',
            sorter: {
                compare: (a, b) => a.date_of_construction - b.date_of_construction,
                multiple: 1,
              },
        },
        {
            title:"Fuels",
            dataIndex:"fuels",
            key:"fuels",
            render: fuels => (
                <>
                {fuels.map(tag => (
                    <Tag color="blue" key={tag}>
                      {tag}
                    </Tag>
                  ))}
                </>
                
            )
        },
        {
            title: 'Action',
            key: 'action',
            fixed: 'right',
            width: 150,
            render: (_, record) =>
                dataSource.length >= 1 ? (
                    <div>
                        <Space>
                            <Popconfirm title="Sure to delete?" onConfirm={() => handleDelete(record.plant_id)}>
                                <a>Delete</a>
                            </Popconfirm>
                            <a onClick={() => handleUpdate(record.plant_id)} >Update</a>
                        </Space>

                    </div>


                ) : null,
        },
    ];

    const handleDelete = (plant_id) => {
        axios({
            method: 'DELETE',
            url: '/plants/' + plant_id
        }).then(
            res => {
                console.log('DELETE RESULT:', res);
                if (res.data.err_code === 0) {
                    message.success(res.data.message);
                    console.log('dataSource:', dataSource);
                    const newDataSource = dataSource.filter((item) => item.plant_id !== plant_id);
                    console.log('newDataSource:', newDataSource);
                    setDataSource(newDataSource);
                } else {
                    message.error(res.data.message);
                }

            },
            err => {

            }
        )
    };

    const onSelectChange = selectedRowKeys => {
        console.log('selectedRowKeys changed: ', selectedRowKeys);
        setSelectedRowKeys(selectedRowKeys);
    }
    const rowSelection = {
        selectedRowKeys,
        onChange: onSelectChange,
    };

    const handleInsert = () => {
        navigate('facilities/insert');
    }

    const handleUpdate = (plant_id) => {
        const data = dataSource.filter(data => {
            return data.plant_id === plant_id;
        })[0]
        console.log(22222, data);
        setUpdaingData(data);
        setUpdating(true);     
    }

    const handleParamChange = value => {
        setCurParam(value)
        setCompareOps(compareOpsData[value]);
        setCurrentOp(compareOpsData[value][0]);
    }
    const onCompareOpsChange = value => {
        setCurrentOp(value);
      };
    const onAddFilter = () => {
        /*
            name_vague: undefined, 
            name: undefined, 
            name_vague_tail: undefined, 
            country: undefined, 
            latitude: undefined, 
            latitude_upper: undefined, 
            latitude_lower: undefined, 
            longitude: undefined, 
            longitude_upper: undefined, 
            longitude_lower: undefined, 
            date_of_construction: undefined, 
            date_of_construction_upper: undefined, 
            date_of_construction_lower: undefined, 
            fuel: undefined, 
            limit: undefined,

            name: ['match exactly', 'contains', 'starts at'],
            country: ['='],
            latitude: ['=', '<=', '>='],
            longitude: ['=', '<=', '>='],
            data_of_construct: ['=', '<=', '>='],
            fuel: ['='],
        */
        const value = inputP1.current.state.value
        if (value === undefined) {
            message.error('Input value can not be empty')
            return
        }
        console.log('value:', value);
        let param = curParam;
        if (param === 'name') {
            param = currentOp === 'match exactly' ? 'name' : currentOp === 'contains' ? 'name_vague' : 'name_vague_tail';
        } else if (param === 'country') {
            ;
        } else if (param === 'latitude') {
            param = currentOp === '=' ? 'latitude' : currentOp === '<=' ? 'latitude_upper' : 'latitude_lower' ;
        } else if (param === 'longitude') {
            param = currentOp === '=' ? 'longitude' : currentOp === '<=' ? 'longitude_upper' : 'longitude_lower' ;
        } else if (param === 'date_of_construction') {
            param = currentOp === '=' ? 'date_of_construction' : currentOp === '<=' ? 'date_of_construction_upper' : 'date_of_construction_lower' ;
        } else if (param === 'fuel') {
            ;
        }
        // change filter
        if (filter[param] !== undefined) {
            message.error('Only support one instance for each condition at present');
            return;
        }
        const tmp1 = {...filter}
        tmp1[param] = value;
        setFilter(tmp1);
        console.log('Current filter=', tmp1)

        // renew data
        axios({
            method: 'GET',
            url: '/plants',
            params: tmp1
        }).then(
            res => {
                const data = res.data.results;
                setDataSource(data);
                console.log('dataSource:', data);
            },
            err => {
                console.error(err);
            }
        )

        // change tags
        const tmp2 = [...filterTags];
        const tagVal = [curParam + ' ' + currentOp + ' ' + value, param]
        tmp2.push(tagVal);
        setFilterTags(tmp2)
    }
    const onRemoveFilter = (removedTag) => {
        const filterTmp = {...filter}
        const tagTmp = filterTags.filter(tag => {
            console.log('removing tag', removedTag, tag);
            if (tag[0] === removedTag[0]) {
                
                filterTmp[tag[1]] = undefined;
                console.log('FILTER:', filterTmp)
                
                return false;
            } else {
                return true;
            }
        })
        setFilter(filterTmp);
        setFilterTags(tagTmp);
        console.log('tags after removing', tagTmp);
        axios({
            method: 'GET',
            url: '/plants',
            params: filterTmp
        }).then(
            res => {
                const data = res.data.results;
                setDataSource(data);
                console.log('dataSource:', data);
            },
            err => {
                console.error(err);
            }
        )

    }
    const hasSelected = selectedRowKeys.length > 0;
    return (
        <div>
            <ReferralInput />
            {
                updating ? <Update data={updatingData} setDataSource={setDataSource} setUpdating={setUpdating} /> :
                    <div>
                        <Space style={{marginBottom:10}}>
                            <Select defaultValue={paramsData[0]} style={{width: 200}} onChange={handleParamChange}>
                            {paramsData.map(province => (
                                <Option key={province}>{province}</Option>
                            ))}
                            </Select>
                            <Select style={{ width: 150 }} value={currentOp} onChange={onCompareOpsChange}>
                                {compareOps.map(compareOp => (
                                <Option key={compareOp}>{compareOp}</Option>
                                ))}
                            </Select>
                            <Input ref={inputP1} />
                            <Button onClick={onAddFilter} >Add filter</Button>
                        </Space>
                        <br/>
                        {filterTags.map(tag => {
                            return (
                                <Tag key={tag} closable onClose={e => {
                                    e.preventDefault();
                                    onRemoveFilter(tag);
                                }} >{tag[0]}</Tag>
                            )
                        })}
                        
                        <div style={{ marginBottom: 16 }}>
                            <Button style={{ marginBottom: 10, marginTop: 10 }} type="primary" onClick={handleInsert} >
                                Insert
                            </Button>
                            <br />
                            <Space>
                                <Button type="primary" onClick={onDeleteSelected} disabled={!hasSelected} loading={loading}>
                                    Delete
                                </Button>
                            </Space>

                            <span style={{ marginLeft: 8 }}>
                                {hasSelected ? `Selected ${selectedRowKeys.length} items` : ''}
                            </span>
                        </div>
                        <Table size='middle' rowSelection={rowSelection} columns={columns} dataSource={dataSource} rowKey={(record) => record.plant_id} scroll={{x: 800}} />
                    </div>
            }

        </div>

    )
}
