import React, { Component } from 'react'
import { connect } from 'dva'
import { Row, Col } from 'antd'
import styles from './Account.css'
import MainLayout from '../components/layout/Layout'
import AccountsComponent from '../components/accounts/Accounts'

class Account extends Component {
  render() {
    const { location, accounts, dispatch } = this.props
    return (
      <MainLayout location={location}>
        <div className={styles.normal}>
          <Row>
            <Col span={4} />
            <Col span={16}>
              <AccountsComponent dispatch={dispatch} accounts={accounts} />
            </Col>
            <Col span={4} />
          </Row>
        </div>
      </MainLayout>
    )
  }
}

function mapStateToProps(state) {
  return {
    accounts: state.accounts.list
  }
}

export default connect(mapStateToProps)(Account)
