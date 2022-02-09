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
  Space
} from 'antd';

export default function Regions()  {
  
  return (
    <Form
      labelCol={{
        span: 4,
      }}
      wrapperCol={{
        span: 14,
      }}
      layout="horizontal"
    >
      <Form.Item label="id">
        <Input style={{ width: '50%' }} />
      </Form.Item>
      <Form.Item label="name">
        <Input style={{ width: '50%' }} />
      </Form.Item>
      <Form.Item label="geographical size">
        <Input style={{ width: '50%' }} />
      </Form.Item>
      <Form.Item label="population">
        <Input style={{ width: '50%' }} />
      </Form.Item>
      <Form.Item label="electricity requirement">
        <Input style={{ width: '50%' }} />
      </Form.Item>
      <Form.Item label="heat requirement">
        <Input style={{ width: '50%' }} />
      </Form.Item>
      <Form.Item wrapperCol={{ offset: 4, span: 16 }}>
        <Space size={[8, 16]} wrap>
          <Button type="primary" htmlType="submit">
            Search
          </Button>
          <Button type="primary" htmlType="submit">
            Update
          </Button>
          <Button type="primary" htmlType="submit">
            Delete
          </Button>
          <Button type="primary" htmlType="submit">
            Insert
          </Button>
        </Space>
      </Form.Item>
    </Form>
  );
};