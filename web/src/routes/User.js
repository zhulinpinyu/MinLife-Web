import React, { Component } from 'react'
import { connect } from 'dva'
import { Layout, Menu, Icon } from 'antd'

import styles from './User.css'
import MainLayout from '../components/layout/Layout'
import Categories from '../components/categories/Categories'
import Members from '../components/members/Members'

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
    const { dispatch, categories, members } = this.props
    switch (selectedKey) {
      case 'usergroup':
        return (<Members data={members} />)
      case 'categories':
        return (<Categories dispatch={dispatch} categories={categories} />)
      default:
        return (<Members data={members} />)
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
    categories: state.categories.list,
    members: state.members.list
  }
}

export default connect(mapStateToProps)(User)
