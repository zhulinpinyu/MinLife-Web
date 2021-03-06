import React, { Component } from 'react'
import { Menu, Icon } from 'antd'
import { Link } from 'dva/router'

class Header extends Component {
  render() {
    const { location } = this.props
    const selectedKey = location.pathname
    return (
      <Menu
        selectedKeys={[selectedKey]}
        theme="dark"
        mode="horizontal"
      >
        <Menu.Item key="/">
          <Link to="/"><Icon type="appstore" />主页</Link>
        </Menu.Item>
        <Menu.Item key="/account">
          <Link to="/account"><Icon type="credit-card" />账户</Link>
        </Menu.Item>
        <Menu.Item key="/statis">
          <Link to="/"><Icon type="area-chart" />统计分析</Link>
        </Menu.Item>
        <Menu.Item key="/user">
          <Link to="/user"><Icon type="user" />竹林品雨</Link>
        </Menu.Item>
      </Menu>
    )
  }
}


export default Header
