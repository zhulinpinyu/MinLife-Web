import React, { Component } from 'react'
import { connect } from 'dva'
import { Row, Col } from 'antd'

import styles from './IndexPage.css'
import Layout from '../components/layout/Layout'
import Bills from '../components/bills/Bills'

class IndexPage extends Component {
  render() {
    const {
      location,
      dispatch,
      bills,
      accounts,
      categories,
      members
    } = this.props

    return (
      <Layout location={location}>
        <div className={styles.normal}>
          <Row>
            <Col span={4} />
            <Col span={16}>
              <Bills
                dispatch={dispatch}
                bills={bills}
                accounts={accounts}
                categories={categories}
                members={members}
              />
            </Col>
            <Col span={4} />
          </Row>
        </div>
      </Layout>
    );
  }
}

const mapStateToProps = ({ bills, categories, accounts, members }) => {
  return {
    bills: bills.list.map((bill) => {
      switch (bill.type) {
        case 'PAYMENT':
          return {
            ...bill,
            category: categories.list
              .find(cat => cat.id === bill.category_id[bill.category_id.length - 1]),
            account: accounts.list.find(acc => acc.id === bill.account_id),
            member: members.list.find(mem => mem.id === bill.member_id)
          }
        case 'INCOME':
          return {
            ...bill,
            account: accounts.list.find(acc => acc.id === bill.account_id),
            member: members.list.find(mem => mem.id === bill.member_id)
          }
        case 'TRANSFER':
          return {
            ...bill,
            payment_account: accounts.list.find(acc => acc.id === bill.payment_account_id),
            income_account: accounts.list.find(acc => acc.id === bill.income_account_id)
          }
        default:
          return bill
      }
    }),
    categories: categories.list,
    accounts: accounts.list,
    members: members.list
  }
}

export default connect(mapStateToProps)(IndexPage);
