import React from 'react'
import { Layout,  } from 'antd';
import { Route, Routes } from 'react-router-dom'
import FacilityHome from './schemas/facility/tables/plants/Home'
import Fuels from './schemas/facility/tables/fuels/Home'


const { Content} = Layout;

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
          <Route path="/" element={FacilityHome()}/>
          <Route path='/facilities/*' element={FacilityHome()} />
          <Route path='/fuels/*' element={Fuels()} />
        </Routes>
      </Content>
      
    </Layout>
  )
}
