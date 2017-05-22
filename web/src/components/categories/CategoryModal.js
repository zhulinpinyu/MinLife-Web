import React, { Component } from 'react';
import { Form, Input, Select, Modal, message } from 'antd'

class CategoryModal extends Component {
  state = {
    visible: false
  }

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
        message.success('添加成功')
        this.hideModalHandler()
      }
    })
  }

  showModalHandler(e) {
    if (e) e.preventDefault()
    this.setState({ visible: true })
  }

  hideModalHandler() {
    this.setState({ visible: false })
  }

  render() {
    const formItemLayout = {
      labelCol: { span: 6 },
      wrapperCol: { span: 12 }
    }

    const {
      children,
      categories,
      form: { getFieldDecorator },
      record: { title, parent_id }
    } = this.props

    console.log(this.props.record);
    return (
      <span>
        <span onClick={this.showModalHandler.bind(this)}>
          { children }
        </span>
        <Modal
          title="添加新类别"
          visible={this.state.visible}
          onOk={this.handleSubmit.bind(this)}
          onCancel={this.hideModalHandler.bind(this)}
        >
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
          </Form>
        </Modal>
      </span>
    )
  }
}

export default Form.create()(CategoryModal)
