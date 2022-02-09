import React from 'react';
import { Layout, Menu, Breadcrumb } from 'antd';
import { UserOutlined, LaptopOutlined, NotificationOutlined, DatabaseOutlined, TableOutlined } from '@ant-design/icons';
import NavMenuItem from '../../../../my_components/NavMenuItem';

const { SubMenu } = Menu;
const { Header, Content, Sider } = Layout;
const tables = [
  { title: 'facilities', to: '/facilities' },
  { title: 'fuel usages', to: '/fuel-usages' },
  { title: 'facility technologies', to: '/facility-techs' },
  { title: 'regions', to: '/regions' },
  { title: 'fuel types', to: '/fuel-types' },
  { title: 'technologies', to: '/techs' },
]


export default function Facilities(props) {
  return (
    <SubMenu {...props} icon={<DatabaseOutlined />} title="facility">
      {
        tables.map((table, index) => {
          return <NavMenuItem icon={<TableOutlined />} to={table.to} key={index + 1}>{table.title}</NavMenuItem>
        })
      }
    </SubMenu>
  )
}
