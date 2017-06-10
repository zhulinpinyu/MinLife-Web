import React, { Component } from 'react'
import {
  Table,
  Popconfirm,
  Button,
  Row,
  Col,
  Card
} from 'antd'
import _ from 'lodash'
import styles from './Accounts.css'
import AccountModal from './AccountModal'

class Accounts extends Component {
  deleteHandler(id) {
    this.props.dispatch({
      type: 'accounts/remove',
      payload: id
    })
  }

  createHandler(values) {
    this.props.dispatch({
      type: 'accounts/create',
      payload: values
    })
  }

  editHandler(id, values) {
    this.props.dispatch({
      type: 'accounts/patch',
      payload: { id, values }
    })
  }

  renderActions(text, record) {
    return (
      <span className={styles.action}>
        <Popconfirm title="要删除这个账户吗？" onConfirm={this.deleteHandler.bind(this, record.id)} okText="删除" cancelText="算了">
          <a href="">删除</a>
        </Popconfirm>
        <AccountModal
          modalKey={Math.random()}
          title="修改账户信息"
          record={record}
          onOk={this.editHandler.bind(this, record.id)}
        >
          <a href="">编辑</a>
        </AccountModal>
      </span>
    )
  }

  renderAccountSummary() {
    const { accounts } = this.props
    const debitBalance = accounts
      .filter(a => !a.debt)
      .map(a => a.balance)
      .reduce(((v1, v2) => v1 + v2), 0)
    const debtBalance = accounts
      .filter(a => a.debt)
      .map(a => a.balance)
      .reduce(((v1, v2) => v1 + v2), 0)
    const netasset = debitBalance - debtBalance
    return (
      <div className={styles.summary}>
        <Row>
          <Col span="8" className={styles.summaryCard}>
            <Card>
               净资产: <span className={styles.accountText}>{netasset}</span>
            </Card>
          </Col>
          <Col span="8" className={styles.summaryCard}>
            <Card>
              总资产: <span className={styles.accountText}>{debitBalance}</span>
            </Card>
          </Col>
          <Col span="8" className={styles.summaryCard}>
            <Card>
              总负债: <span className={styles.accountText}>{debtBalance}</span>
            </Card>
          </Col>
        </Row>
      </div>
    )
  }

  renderDebtAccounts(dataSource) {
    const debtBalance = !_.isEmpty(dataSource) && dataSource
      .map(acc => acc.balance)
      .reduce(((v1, v2) => v1 + v2), 0)
    return (
      <div className={styles.accountsBox}>
        <div className={styles.accountLabel}>
          <span className={styles.accountText}>
            债务账户
          </span>
          (负债: {debtBalance})
        </div>
        <Table
          dataSource={dataSource}
          rowKey={item => item.id}
          pagination={false}
        >
          <Table.Column
            title="序号"
            dataIndex="sequence"
            key="sequence"
          />
          <Table.Column
            title="账户"
            dataIndex="title"
            key="title"
          />
          <Table.Column
            title="债务"
            dataIndex="balance"
            key="balance"
            render={(text, { currency }) => `${Math.round(text * 100) / 100} (${currency})`}
          />
          <Table.Column
            title="操作"
            key="action"
            render={this.renderActions.bind(this)}
          />
        </Table>
      </div>
    )
  }

  renderDebitAccounts(dataSource) {
    const debitBalance = !_.isEmpty(dataSource) && dataSource
      .map(acc => acc.balance)
      .reduce(((v1, v2) => v1 + v2), 0)
    return (
      <div className={styles.accountsBox}>
        <div className={styles.accountLabel}>
          <span className={styles.accountText}>
            储蓄账户
          </span>
          (余额: {debitBalance})
        </div>
        <Table
          dataSource={dataSource}
          rowKey={item => item.id}
          pagination={false}
        >
          <Table.Column
            title="序号"
            dataIndex="sequence"
            key="sequence"
          />
          <Table.Column
            title="账户"
            dataIndex="title"
            key="title"
          />
          <Table.Column
            title="余额"
            dataIndex="balance"
            key="balance"
            render={(text, { currency }) => `${Math.round(text * 100) / 100} (${currency})`}
          />
          <Table.Column
            title="操作"
            key="action"
            render={this.renderActions.bind(this)}
          />
        </Table>
      </div>
    )
  }

  render() {
    const { accounts } = this.props
    const debtData = accounts.filter(a => a.debt).map((a, i) => ({ ...a, sequence: i + 1 }))
    const debitData = accounts.filter(a => !a.debt).map((a, i) => ({ ...a, sequence: i + 1 }))
    return (
      <div className={styles.normal}>
        <div className={styles.create}>
          <AccountModal
            modalKey={Math.random()}
            title="添加新账户"
            onOk={this.createHandler.bind(this)}
            record={{}}
          >
            <Button type="primary" icon="plus">
              添加账户
            </Button>
          </AccountModal>
        </div>
        {this.renderAccountSummary()}
        {this.renderDebitAccounts(debitData)}
        {this.renderDebtAccounts(debtData)}
      </div>
    )
  }
}

export default Accounts
