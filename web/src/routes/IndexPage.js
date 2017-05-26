import React, { Component } from 'react'
import { connect } from 'dva'
import { Row, Col } from 'antd'

import styles from './IndexPage.css'
import Layout from '../components/layout/Layout'
import Bills from '../components/bills/Bills'

class IndexPage extends Component {
  render() {
    const { location, dispatch, bills } = this.props
    return (
      <Layout location={location}>
        <div className={styles.normal}>
          <Row>
            <Col span={4} />
            <Col span={16}>
              <Bills dispatch={dispatch} bills={bills} />
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
      return {
        ...bill,
        category: categories.list.find(cat => cat.id === bill.category_id),
        account: accounts.list.find(acc => acc.id === bill.account_id),
        member: members.list.find(mem => mem.id === bill.member_id)
      }
    })
  }
}

export default connect(mapStateToProps)(IndexPage);
