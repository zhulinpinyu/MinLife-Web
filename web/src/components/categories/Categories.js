import React, { Component } from 'react';
import { Table, Collapse } from 'antd'
import styles from './Categories.css';

class Categories extends Component {

  renderSubCategories(category) {
    const dataSource = category.subCategories.map((cat, index) => ({ ...cat, sequence: index + 1 }))
    return (
      <Table
        dataSource={dataSource}
        rowKey={cat => cat.id}
        pagination={false}
        size="small"
        bordered
      >
        <Table.Column
          title="序号"
          dataIndex="sequence"
          key="sequence"
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
        <Collapse>
          {
            categories.map((category) => {
              return (
                <Collapse.Panel key={category.id} header={category.title}>
                  {this.renderSubCategories(category)}
                </Collapse.Panel>
              )
            })
          }
        </Collapse>
      </div>
    )
  }
}

export default Categories;
