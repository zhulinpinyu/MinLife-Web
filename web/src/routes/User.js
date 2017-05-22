import React, { Component } from 'react'
import { connect } from 'dva'
import { Layout, Menu, Icon } from 'antd'

import styles from './User.css'
import MainLayout from '../components/Layout/Layout'
import Categories from '../components/categories/Categories'

class User extends Component {
  state = {
    selectedKey: 'usergroup'
  }

  selectHandler({ key }) {
    this.setState({
      selectedKey: key
    })
  }

  renderContent() {
    const { selectedKey } = this.state
    const { dispatch, categories } = this.props
    switch (selectedKey) {
      case 'usergroup':
        return <span>家庭成员管理</span>
      case 'categories':
        return (<Categories dispatch={dispatch} categories={categories} />)
      default:
        return <span>家庭成员管理</span>
    }
  }

  render() {
    const { location } = this.props
    return (
      <MainLayout location={location}>
        <Layout className={styles.normal}>
          <Layout.Sider width={200} style={{ background: '#fff' }}>
            <Menu
              mode="inline"
              defaultSelectedKeys={[this.state.selectedKey]}
              style={{ height: '100%' }}
              onSelect={this.selectHandler.bind(this)}
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
              {this.renderContent()}
            </Layout.Content>
          </Layout>
        </Layout>
      </MainLayout>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    categories: state.categories.list
  }
}

export default connect(mapStateToProps)(User)
