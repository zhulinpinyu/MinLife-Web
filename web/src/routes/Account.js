import React, { Component } from 'react'
import { connect } from 'dva'
import styles from './Account.css'
import MainLayout from '../components/layout/Layout'
import AccountsComponent from '../components/accounts/Accounts'

class Account extends Component {
  render() {
    const { location, accounts } = this.props
    return (
      <MainLayout location={location}>
        <div className={styles.normal}>
          <AccountsComponent accounts={accounts} />
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
