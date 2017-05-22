import React, { Component } from 'react'
import { connect } from 'dva'
import { Layout, Menu, Icon } from 'antd'

import styles from './User.css'
import MainLayout from '../components/Layout/Layout'

class User extends Component {
  render() {
    const { location } = this.props
    return (
      <MainLayout location={location}>
        <Layout className={styles.normal}>
          <Layout.Sider width={200} style={{ background: '#fff' }}>
            <Menu
              mode="inline"
              defaultSelectedKeys={['usergroup']}
              style={{ height: '100%' }}
            >
              <Menu.Item key="usergroup">
                <span><Icon type="usergroup-add" />Members</span>
              </Menu.Item>
              <Menu.Item key="categories">
                <span><Icon type="tags" />Category</span>
              </Menu.Item>
            </Menu>
          </Layout.Sider>
          <Layout style={{ padding: '24px' }}>
            <Layout.Content style={{ background: '#fff', padding: 24, margin: 0 }}>
              Content
            </Layout.Content>
          </Layout>
        </Layout>
      </MainLayout>
    )
  }
}

const mapStateToProps = () => {
  return {}
}

export default connect(mapStateToProps)(User)
