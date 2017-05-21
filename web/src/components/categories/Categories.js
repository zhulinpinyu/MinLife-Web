import React, { Component } from 'react';
import { Table } from 'antd'
import styles from './Categories.css';

class Categories extends Component {

  expandedRowRender(category) {
    return (
      <Table
        dataSource={category.subCategories}
        rowKey={cat => cat.id}
        pagination={false}
      >
        <Table.Column
          title="ID"
          dataIndex="id"
          key="id"
        />
        <Table.Column
          title="类别名称"
          dataIndex="title"
          key="title"
        />
        <Table.Column
          title="操作"
          key="action"
        />
      </Table>
    )
  }

  render() {
    const { categories } = this.props

    return (
      <div className={styles.normal}>
        <Table
          dataSource={categories}
          rowKey={category => category.id}
          pagination={false}
          expandedRowRender={this.expandedRowRender.bind(this)}
        >
          <Table.Column
            title="ID"
            dataIndex="id"
            key="id"
          />
          <Table.Column
            title="类别名称"
            dataIndex="title"
            key="title"
          />
          <Table.Column
            title="操作"
            key="action"
          />
        </Table>
      </div>
    )
  }
}

export default Categories;
