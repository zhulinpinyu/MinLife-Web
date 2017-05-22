import React, { Component } from 'react';
import { Form, Input, Button, Select } from 'antd'
import { routerRedux } from 'dva/router'
import styles from './Categories.css';

class CategoryNew extends Component {
  handleSubmit(e) {
    e.preventDefault()
    this.props.form.validateFields((err, values) => {
      if (!err) {
        this.props.dispatch({
          type: 'categories/create',
          payload: {
            ...values,
            parent_id: parseInt(values.parent_id, 10)
          }
        })
        this.handleCancel()
      }
    })
  }

  handleCancel() {
    this.props.dispatch(routerRedux.push({
      pathname: '/categories'
    }))
  }

  render() {
    const formItemLayout = {
      labelCol: { span: 6 },
      wrapperCol: { span: 12 }
    }
    const tailFormItemLayout = {
      wrapperCol: { span: 14, offset: 6 }
    }

    const {
      categories,
      form: { getFieldDecorator },
      record: { title, parent_id }
    } = this.props

    return (
      <div className={styles.normal}>
        <Form layout="horizontal" onSubmit={this.handleSubmit.bind(this)}>
          <Form.Item
            {...formItemLayout}
            label="类别名称"
          >
            {
              getFieldDecorator('title', {
                initialValue: title
              })(<Input />)
            }
          </Form.Item>
          <Form.Item
            {...formItemLayout}
            label="父类别"
          >
            {
              getFieldDecorator('parent_id', {
                initialValue: parent_id
              })(
                <Select allowClear placeholder="选择父类别，留空则表示当前添加类别为父类别">
                  {
                    categories.map((category) => {
                      return (
                        <Select.Option key={category.id} value={`${category.id}`}>
                          {category.title}
                        </Select.Option>
                      )
                    })
                  }
                </Select>
              )
            }
          </Form.Item>
          <Form.Item
            {...tailFormItemLayout}
          >
            <Button type="primary" htmlType="submit">
              保存
            </Button>
            <Button
              style={{ marginLeft: 8 }}
              type="dashed"
              onClick={this.handleCancel.bind(this)}
            >
              取消
            </Button>
          </Form.Item>
        </Form>
      </div>
    )
  }
}

export default Form.create()(CategoryNew)
