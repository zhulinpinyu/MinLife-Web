import React, { Component } from 'react'
import { Table, Button, Popconfirm, Icon, Tag } from 'antd'
import styles from './Bills.css'
import BillModal from './BillModal'

class Bills extends Component {

  deleteHandler(id) {
    this.props.dispatch({
      type: 'bills/remove',
      payload: id
    })
  }

  createHandler(values) {
    this.props.dispatch({
      type: 'bills/create',
      payload: values
    })
  }

  editHandler(id, values) {
    this.props.dispatch({
      type: 'bills/patch',
      payload: { id, values }
    })
  }

  renderActions(text, record) {
    const { accounts, categories, members } = this.props
    return (
      <span className={styles.action}>
        <Popconfirm title="要删除吗，这个类别可能已经在使用了？" onConfirm={this.deleteHandler.bind(this, record.id)} okText="删除" cancelText="算了">
          <a href="">删除</a>
        </Popconfirm>
        <BillModal
          modalKey={Math.random()}
          title="修正该笔记录"
          record={record}
          accounts={accounts}
          categories={categories}
          members={members}
          onOk={this.editHandler.bind(this, record.id)}
        >
          <a href="">编辑</a>
        </BillModal>
      </span>
    )
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
            <Button size="large" type="primary" icon="plus">
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
            render={(text) => {
              switch (text) {
                case 'PAYMENT':
                  return (
                    <Tag color="#ff0000">支出</Tag>
                  )
                case 'INCOME':
                  return (
                    <Tag color="#87d068">收入</Tag>
                  )
                case 'TRANSFER':
                  return (
                    <Tag color="#2db7f5">转账</Tag>
                  )
                default:
              }
            }}
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
            render={(text, { payment_account, income_account, type }) => {
              if (type === 'TRANSFER') {
                return (
                  <span>
                    {payment_account.title}
                    <Icon type="swap" style={{ fontSize: 16, color: '#2db7f5' }} />
                    {income_account.title}
                  </span>
                )
              }
              return text
            }}
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
            render={this.renderActions.bind(this)}
          />
        </Table>
      </div>
    )
  }
}

export default Bills
