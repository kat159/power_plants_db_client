import React from 'react'
import { Layout, Menu} from 'antd';
import Facilities from './tabs/facility_db_tab/Facilities';

const { Sider } = Layout;

export default function NavSider() {
  return (
    <Sider width={'250px'} className="site-layout-background">
      {/* <Title style={{ marginLeft:15, marginTop:10 }}
       level={4}>Schemas</Title> */}
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
