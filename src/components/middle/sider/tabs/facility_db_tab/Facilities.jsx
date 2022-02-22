import React from 'react';
import { Layout, Menu, Breadcrumb } from 'antd';
import { UserOutlined, LaptopOutlined, NotificationOutlined, DatabaseOutlined, TableOutlined } from '@ant-design/icons';
import NavMenuItem from '../../../../my_components/NavMenuItem';

const { SubMenu } = Menu;
const { Header, Content, Sider } = Layout;
const tables = [
  { title: 'plants', to: '/db/facilities' },
  // { title: 'fuel usages', to: '/db/fuel-usages' },
  // { title: 'facility technologies', to: '/db/facility-techs' },
  // { title: 'regions', to: '/db/regions' },
  { title: 'fuels', to: '/db/fuels' },
  { title: 'plants_fuels', to: '/db/plants-fuels' },
  // { title: 'technologies', to: '/db/techs' },
]


export default function Facilities(props) {
  return (
    <SubMenu {...props} icon={<DatabaseOutlined />} title="Global Power Plants">
      {
        tables.map((table, index) => {
          return <NavMenuItem icon={<TableOutlined />} to={table.to} key={index + 1}>{table.title}</NavMenuItem>
        })
      }
    </SubMenu>
  )
}
