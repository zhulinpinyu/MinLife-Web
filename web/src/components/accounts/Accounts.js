import React, { Component } from 'react'
import { Table } from 'antd'
import styles from './Accounts.css'

class Accounts extends Component {
  render() {
    const { accounts } = this.props
    const dataSource = accounts.map((a, i) => ({ ...a, sequence: i + 1 }))
    return (
      <div className={styles.normal}>
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
            title="余额"
            key="action"
          />
        </Table>
      </div>
    )
  }
}

export default Accounts
