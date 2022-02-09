import React from 'react'
import { Layout, Menu, Breadcrumb } from 'antd';
import { UserOutlined, LaptopOutlined, NotificationOutlined } from '@ant-design/icons';
import Content from './content/Content'
import Sider from './sider/Sider'

const { SubMenu } = Menu;
const { Header} = Layout;

export default function Middle() {
  return (
    <Layout>
      <Sider />
      <Content />
    </Layout>
  )
}
