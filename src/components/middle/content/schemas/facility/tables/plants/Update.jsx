import React, { useEffect, useState } from 'react';
import {
    Form,
    Input,
    Button,
    Radio,
    Select,
    Cascader,
    DatePicker,
    InputNumber,
    TreeSelect,
    Switch,
    Space,
    message
} from 'antd';
import axios from 'axios'
import moment from 'moment'
import { useNavigate } from 'react-router-dom';

axios.defaults.baseURL = 'http://flip3.engr.oregonstate.edu:9417';

export default function Update(props) {
    
    const navigate = useNavigate();
    const onFinish = values => {
        console.log('Received values of form: ', values);
        values.date_of_construction = values.date_of_construction.format('YYYY-MM-DD')
        console.log('Received values of form: ', values);
        axios({
            method: 'put',
            url: '/plants/' + props.data.plant_id,
            data: values,
        }).then(
            res => {
                const results = res.data;
                if (results.err_code === 0) {
                    message.success(results.message);
                    axios({
                        method: 'GET',
                        url: '/plants',
                    }).then(
                        res => props.setDataSource(res.data.results)
                    )
                    props.setUpdating(false);
                } else {
                    message.error(results.message);
                }
            },
            err => {
                console.log(err);
            }
        )
    }
    
    const handleClickBack = () => {
        props.setUpdating(false);
        
    }
    const strs = window.location.pathname.split('/');
    const id = strs[strs.length - 1]
    // console.log('ID:', id);
    return (
        <Form
            onFinish={onFinish}
            labelCol={{
                span: 4,
            }}
            wrapperCol={{
                span: 14,
            }}
            layout="horizontal"
        >
            <Form.Item rules={[{ required: true, message: 'Name is required' }]} name={'name'} label="name">
                <Input placeholder='plant1' style={{ width: '50%' }} />
            </Form.Item>
            <Form.Item rules={[{ required: true, message: 'Country is required' }]} name={'country'} label="country">
                <Input placeholder='U.S.' style={{ width: '50%' }} />
            </Form.Item>
            <Form.Item rules={[{ required: true, message: 'Latitude is required' }]} name='latitude' label="latitude">
                <Input placeholder='10.1' type='number' style={{ width: '50%' }} />
            </Form.Item  >
            <Form.Item rules={[{ required: true, message: 'Longitude is required' }]} name='longitude' label="longitude">
                <Input placeholder='20.5' type='number' style={{ width: '50%' }} />
            </Form.Item>
            <Form.Item rules={[{ required: true, message: 'Date of construction is required' }]} name='date_of_construction' label="date of construction">
                <DatePicker placeholder='2020-02-19' format='YYYY-MM-DD' style={{ width: '50%' }} />
            </Form.Item>
            {/* <Form.Item rules={[{ required: true, message: 'Fuel is required' }]} name='fuel' label="fuel">
                <div><Input value={props.data.fuel} placeholder='gas' style={{ width: '50%' }} /></div>
            </Form.Item> */}
            <Form.Item wrapperCol={{ offset: 4, span: 16 }}>
                <Space size={[8, 16]} wrap>
                    <Button type="primary" htmlType="submit">
                        Update
                    </Button>
                    <Button style={{ marginLeft: 130 }} onClick={handleClickBack}>
                        Back
                    </Button>
                </Space>
            </Form.Item>
        </Form>
    );
};