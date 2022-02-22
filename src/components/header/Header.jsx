import React from 'react'
import MyNavLink from '../my_components/NavMenuItem'
import { Layout, Menu, Breadcrumb } from 'antd';
import { UserOutlined, LaptopOutlined, NotificationOutlined } from '@ant-design/icons';
import './Header.css'

export default function NavHeader() {
  const { Header, Footer, Sider, Content } = Layout;
  const { SubMenu } = Menu;
  const  headers  = [
    {name:'Home', to:'/'},
    {name:'Global Power Plants Database', to:'/db'}
  ]
  return (
    <div>
      <Layout>
        <Header>
          <div className="logo" />
          <Menu selectedKeys={['3']}  theme="dark" mode="horizontal" defaultSelectedKeys={['2']}>
            {
                headers.map((header, i) => <MyNavLink key={i + 1} to={header.to} >{header.name}</MyNavLink>)
            }
          </Menu>
        </Header>
      </Layout>
    </div>
  )
}