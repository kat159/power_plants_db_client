import React from 'react';
import { Button } from 'antd';
import './App.css';

import { Layout, Menu, Breadcrumb } from 'antd';
import { UserOutlined, LaptopOutlined, NotificationOutlined } from '@ant-design/icons';
import Home from './pages/Home';

const { SubMenu } = Menu;
const { Header, Content, Sider } = Layout;


const App = () => (
  <Home />
);

export default App;