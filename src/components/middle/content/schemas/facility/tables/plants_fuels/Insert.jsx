import React, { useState } from 'react';
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

axios.defaults.baseURL = 'http://flip3.engr.oregonstate.edu:9417'

export default function Insert() {
  
  const navigate = useNavigate();
  const onFinish = values => {
    console.log('Received values of form: ', values);
    axios({
      method: 'post',
      url: '/fuels',
      data: values,
    }).then(
      res => {
        const results = res.data;
        if (results.err_code === 0) {
          message.success(results.message);
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
    navigate('fuels')
  }
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
        <Input placeholder='gas' style={{ width: '50%' }} />
      </Form.Item>
      <Form.Item  wrapperCol={{ offset: 4, span: 16 }}>
        <Space size={[8, 16]} wrap>
          <Button type="primary" htmlType="submit">
            Insert
          </Button>
          <Button style={{ marginLeft: 130 }} onClick={handleClickBack}>
            Back
          </Button>
        </Space>
      </Form.Item>
    </Form>
  );
};