import React from 'react'
import { Table, Input, Button, Popconfirm, Form, message, Space, InputNumber, Typography } from 'antd';
import { useState, useEffect, } from 'react';
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import Update from './Update';

axios.defaults.baseURL = 'http://flip3.engr.oregonstate.edu:9417'

export default function DataRow() {
    const navigate = useNavigate();
    useEffect(() => {
        axios({
            method: 'GET',
            url: '/fuels',
        }).then(
            res => {
                const data = res.data.results;
                setDataSource(data);
                console.log(data);
            },
            err => {
                console.error(err);
            }
        )
    }, [])

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
                    url: '/fuels/' + rowKey,
                })
            }
        }
        helper().then(
            res => {
                console.log(res);
                setDataSource(dataSource.filter(data => {
                    return !selectedRowKeys.includes(data.fuel_id);
                }))
                setSelectedRowKeys([]);
                setLoading(false)
            }
        )
    }

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
                            <Popconfirm title="Sure to delete?" onConfirm={() => handleDelete(record.fuel_id)}>
                                <a>Delete</a>
                            </Popconfirm>
                            <a onClick={() => handleUpdate(record.fuel_id)} >Update</a>
                        </Space>

                    </div>


                ) : null,
        },
    ];

    const handleDelete = (fuel_id) => {
        axios({
            method: 'DELETE',
            url: '/fuels/' + fuel_id
        }).then(
            res => {
                console.log('DELETE RESULT:', res);
                if (res.data.err_code === 0) {
                    message.success(res.data.message);
                    console.log('dataSource:', dataSource);
                    const newDataSource = dataSource.filter((item) => item.fuel_id !== fuel_id);
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
        navigate('fuels/insert');
    }

    const handleUpdate = (fuel_id) => {
        const data = dataSource.filter(data => {
            return data.fuel_id === fuel_id;
        })[0]
        console.log(22222, data);
        setUpdaingData(data);
        setUpdating(true);     
    }

    const hasSelected = selectedRowKeys.length > 0;
    return (
        <div>
            {
                updating ? <Update data={updatingData} setDataSource={setDataSource} setUpdating={setUpdating} /> :
                    <div>
                        <div style={{ marginBottom: 16 }}>
                            <Button style={{ marginBottom: 10 }} type="primary" onClick={handleInsert} >
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
                        <Table size='middle' rowSelection={rowSelection} columns={columns} dataSource={dataSource} rowKey={(record) => record.fuel_id} scroll={{}} />
                    </div>
            }

        </div>

    )
}
