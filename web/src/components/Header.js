import React, { Component } from 'react'
import { Menu, Icon } from 'antd'
import { Link } from 'dva/router'

class Header extends Component {
  render() {
    const { location } = this.props
    return (
      <Menu
        selectedKeys={[location.pathname]}
        theme="light"
        mode="horizontal"
      >
        <Menu.Item key="/">
          <Link to="/"><Icon type="appstore" />Home</Link>
        </Menu.Item>
        <Menu.Item key="/antd">
          <a href="https://github.com/dvajs/dva" target="_blank">
            <Icon type="star" />dva
          </a>
        </Menu.Item>
      </Menu>
    )
  }
}


export default Header
