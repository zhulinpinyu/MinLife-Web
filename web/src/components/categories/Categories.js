import React, { Component } from 'react';
import { Table, Collapse, Popconfirm, message, Button } from 'antd'
import _ from 'lodash'
import styles from './Categories.css';

import CategoryModal from './CategoryModal'

class Categories extends Component {
  deleteHandler(id) {
    this.props.dispatch({
      type: 'categories/remove',
      payload: id
    })
    message.success('删除成功。')
  }

  renderActions(text, { id }) {
    return (
      <span className={styles.action}>
        <Popconfirm title="要删除吗，这个类别可能已经在使用了？" onConfirm={this.deleteHandler.bind(this, id)} okText="删除" cancelText="算了">
          <a href="">删除</a>
        </Popconfirm>
      </span>
    )
  }

  renderSubCategories(category) {
    const dataSource = category.subCategories.map((cat, index) => ({ ...cat, sequence: index + 1 }))
    if (_.isEmpty(dataSource)) {
      return (
        <Popconfirm title="那就删了？" onConfirm={this.deleteHandler.bind(this, category.id)} okText="删除" cancelText="算了">
          <Button icon="close-circle" type="danger">
            删了我吧
          </Button>
        </Popconfirm>
      )
    }
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
          render={this.renderActions.bind(this)}
        />
      </Table>
    )
  }

  render() {
    const { categories, dispatch } = this.props

    return (
      <div className={styles.normal}>
        <div className={styles.create}>
          <CategoryModal dispatch={dispatch} record={{}} categories={categories}>
            <Button
              type="primary"
              icon="plus"
            >
              添加类别
            </Button>
          </CategoryModal>
        </div>
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
