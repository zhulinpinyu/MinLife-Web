import React, { Component } from 'react';
import { Table } from 'antd'

class Members extends Component {
  render() {
    const dataSource = this.props.data.map((m, i) => ({ ...m, sequence: i + 1 }))
    return (
      <Table
        dataSource={dataSource}
        rowKey={m => m.id}
        pagination={false}
        bordered
      >
        <Table.Column
          title="序号"
          key="sequence"
          dataIndex="sequence"
        />
        <Table.Column
          title="成员"
          key="title"
          dataIndex="title"
        />
        <Table.Column
          title="Action"
          key="action"
        />
      </Table>
    )
  }
}

export default Members
