import React from 'react'
import { Layout, Menu, Breadcrumb } from 'antd';
import { UserOutlined, LaptopOutlined, NotificationOutlined } from '@ant-design/icons';
import Content from './content/Content'
import Sider from './sider/Sider'
import { Route, Routes, Navigate } from 'react-router-dom'
import HomeIntro from './HomeIntro';
import DBcontent from './DBcontent';

const { SubMenu } = Menu;
const { Header} = Layout;

export default function Middle() {
  return (
    <Routes>
      <Route path='/' element={HomeIntro()} />
      <Route path='/db/*' element={DBcontent()} />
      <Route path='*' element={<Navigate to='/' />} />
    </Routes>
  )
}
