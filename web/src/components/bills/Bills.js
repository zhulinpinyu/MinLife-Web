import React, { Component } from 'react'
import { Table, Button } from 'antd'
import styles from './Bills.css'
import BillModal from './BillModal'

class Bills extends Component {
  createHandler(values) {
    console.log(values)
  }

  render() {
    const { bills, accounts, categories, members } = this.props
    return (
      <div className={styles.normal}>
        <div className={styles.create}>
          <BillModal
            modalKey={Math.random()}
            title="记一笔"
            onOk={this.createHandler.bind(this)}
            record={{}}
            accounts={accounts}
            categories={categories}
            members={members}
          >
            <Button type="primary" icon="plus">
               记一笔
            </Button>
          </BillModal>
        </div>
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
