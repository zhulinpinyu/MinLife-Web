import React, { Component } from 'react'
import { Table, Popconfirm, Button } from 'antd'
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
        <Popconfirm title="要删除吗，这个类别可能已经在使用了？" onConfirm={this.deleteHandler.bind(this, record.id)} okText="删除" cancelText="算了">
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

  renderDebtAccounts(dataSource) {
    return (
      <div className={styles.accountsBox}>
        <h2 className={styles.accountLabel}><span>债务账户</span></h2>
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
    return (
      <div className={styles.accountsBox}>
        <h2 className={styles.accountLabel}><span>储蓄账户</span></h2>
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
        {this.renderDebitAccounts(debitData)}
        {this.renderDebtAccounts(debtData)}
      </div>
    )
  }
}

export default Accounts
