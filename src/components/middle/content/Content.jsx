import React from 'react'
import { Layout, Menu } from 'antd';
import { UserOutlined, LaptopOutlined, NotificationOutlined } from '@ant-design/icons';
import Breadcrumb from './breadcrumb/BreadCrumb'
import Facilities from './schemas/facility/tables/plants/Insert';
import FuelUsages from './schemas/facility/tables/crud/FuelUsages'
import { Route, Routes, Navigate } from 'react-router-dom'
import FacilityTech from './schemas/facility/tables/crud/FacilityTechs';
import FuelTypes from './schemas/facility/tables/fuels/FuelTypes';
import Techs from './schemas/facility/tables/crud/Techs';
import Regions from './schemas/facility/tables/crud/Regions';
import FacilityHome from './schemas/facility/tables/plants/Home'
import Fuels from './schemas/facility/tables/fuels/Home'
import Plants_Fuels from './schemas/facility/tables/plants_fuels/Home'

const { SubMenu } = Menu;
const { Header, Content, Sider } = Layout;

export default function NavContent() {
  return (
    <Layout style={{ padding: '0 24px 24px' }}>
      {/* <Breadcrumb /> */}
      <Content
        className="site-layout-background"
        style={{
          padding: 24,
          margin: 0,
          minHeight: 280,
        }}
      >
        
        <Routes>
          <Route path="/" />
          <Route path='/facilities/*' element={FacilityHome()} />
          {/* <Route path='/fuel-usages' element={FuelUsages()} /> */}
          {/* <Route path='/facility-techs' element={FacilityTech()} /> */}
          <Route path='/fuels/*' element={Fuels()} />
          {/* <Route path='/plants-fuels/*' element={Plants_Fuels()} /> */}
          {/* <Route path='/techs' element={Techs()} /> */}
          {/* <Route path='/regions' element={Regions()} /> */}
        </Routes>
      </Content>
      {/* <Facilities /> */}
      
    </Layout>
  )
}
