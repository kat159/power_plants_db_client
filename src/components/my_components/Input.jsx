import React, { Component } from 'react'
import { NavLink } from 'react-router-dom'
import { Input, Layout, Menu, Breadcrumb } from 'antd';
import { UserOutlined, LaptopOutlined, NotificationOutlined, DatabaseOutlined, TableOutlined } from '@ant-design/icons';

export default class NavMenuItem extends Component {
    render() {
        return (
            // 相比函数组件更复杂， 不用括号引入全部属性的话，Menu的主题不会继承到这个子组件这,组件内容也不会继承            
            <div>
                {this.title}: &nbsp <Input showCount maxLength={20} />
            </div>
                
            
        )
    }
}

