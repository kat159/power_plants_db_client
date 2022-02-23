import React from 'react'
import MyNavLink from '../my_components/NavMenuItem'
import { Layout, Menu} from 'antd';
import './Header.css'

export default function NavHeader() {
  const { Header} = Layout;
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