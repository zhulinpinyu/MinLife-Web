import React, { Component } from 'react'
import { Table } from 'antd'
import styles from './Bills.css'

class Bills extends Component {
  render() {
    const { bills } = this.props
    return (
      <div className={styles.normal}>
        <Table
          dataSource={bills}
          rowKey={item => item.id}
          pagination={false}
        >
          <Table.Column
            title="日期"
            dataIndex="bill_date"
            key="bill_date"
          />
          <Table.Column
            title="类型"
            dataIndex="type"
            key="type"
          />
          <Table.Column
            title="金额"
            dataIndex="money"
            key="money"
          />
          <Table.Column
            title="账户"
            dataIndex="account.title"
            key="account"
          />
          <Table.Column
            title="类别"
            dataIndex="category.title"
            key="category"
          />
          <Table.Column
            title="成员"
            dataIndex="member.title"
            key="member"
          />
          <Table.Column
            title="备注"
            dataIndex="notes"
            key="notes"
          />
          <Table.Column
            title="操作"
            key="actions"
          />
        </Table>
      </div>
    )
  }
}

export default Bills
