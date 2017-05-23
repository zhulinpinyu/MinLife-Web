import React, { Component } from 'react'
import { Table, Popconfirm, Button } from 'antd'
import styles from './Accounts.css'

class Accounts extends Component {
  deleteHandler(id) {
    this.props.dispatch({
      type: 'accounts/remove',
      payload: id
    })
  }

  renderActions(text, { id }) {
    return (
      <span className={styles.action}>
        <Popconfirm title="要删除吗，这个类别可能已经在使用了？" onConfirm={this.deleteHandler.bind(this, id)} okText="删除" cancelText="算了">
          <a href="">删除</a>
        </Popconfirm>
        <a href="">编辑</a>
      </span>
    )
  }

  render() {
    const { accounts } = this.props
    const dataSource = accounts.map((a, i) => ({ ...a, sequence: i + 1 }))
    return (
      <div className={styles.normal}>
        <div className={styles.create}>
          <Button type="primary" icon="plus">
            添加账户
          </Button>
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
          />
          <Table.Column
            title="余额"
            key="action"
            render={this.renderActions.bind(this)}
          />
        </Table>
      </div>
    )
  }
}

export default Accounts
