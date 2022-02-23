import React from 'react'
import { Layout, Menu} from 'antd';
import Content from './content/Content'
import Sider from './sider/Sider'


export default function DBcontent() {
  return (
    <Layout>
      <Sider />
      <Content />
    </Layout>
  )
}
