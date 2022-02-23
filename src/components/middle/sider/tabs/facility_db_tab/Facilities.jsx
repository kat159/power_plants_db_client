import React from 'react';
import { Menu } from 'antd';
import { DatabaseOutlined, TableOutlined } from '@ant-design/icons';
import NavMenuItem from '../../../../my_components/NavMenuItem';

const { SubMenu } = Menu;
const tables = [
  { title: 'plants', to: '/db/facilities' },
  { title: 'fuels', to: '/db/fuels' },
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
