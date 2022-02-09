import React from 'react'
import { Layout, Menu, Breadcrumb, Typography, } from 'antd';
import { UserOutlined, LaptopOutlined, NotificationOutlined,   } from '@ant-design/icons';
import Facilities from './tabs/facility_db_tab/Facilities';

const { SubMenu } = Menu;
const { Header, Content, Sider } = Layout;
const {Title} = Typography

export default function NavSider() {
  return (
    <Sider width={'200px'} className="site-layout-background">
      <Title style={{ marginLeft:15, marginTop:10 }}
       level={4}>Schemas</Title>
      <Menu
        mode="inline"
        defaultSelectedKeys={['1']}
        defaultOpenKeys={['sub1']}
        style={{ height: '100%', borderRight: 0, }}
      >
        <Facilities key='sub1' />
      </Menu>
      
    </Sider>
  )
}
