import React, { Component } from 'react';
import { Table } from 'antd'
import styles from './Categories.css';

class Categories extends Component {
  render() {
    const { categories } = this.props
    const columns = [
      {
        title: 'ID',
        dataIndex: 'id',
        key: 'id'
      },
      {
        title: 'Title',
        dataIndex: 'title',
        key: 'title'
      },
      {
        title: 'ParentID',
        dataIndex: 'parent_id',
        key: 'parent_id'
      },
      {
        title: 'Action',
        key: 'action'
      }
    ]
    return (
      <div className={styles.normal}>
        <Table
          columns={columns}
          dataSource={categories}
          rowKey={category => category.id}
          pagination={false}
        />
      </div>
    )
  }
}

export default Categories;
