import React, { Component } from 'react'
import { Modal, Form, Input } from 'antd'

class AccountModal extends Component {
  state = {
    visible: false
  }

  showModalHandler(e) {
    if (e) e.preventDefault()
    this.setState({ visible: true })
  }

  hideModalHandler() {
    this.setState({ visible: false })
  }

  handleSubmit(e) {
    e.preventDefault()
    const { form, onOk } = this.props
    form.validateFields((err, values) => {
      if (!err) {
        onOk(values)
      }
      this.hideModalHandler()
    })
  }

  render() {
    const formItemLayout = {
      labelCol: { span: 6 },
      wrapperCol: { span: 14 }
    }
    const {
      children,
      modalKey,
      title: modalTitle,
      form: { getFieldDecorator },
      record: { title, balance }
    } = this.props
    return (
      <span>
        <span onClick={this.showModalHandler.bind(this)}>
          {children}
        </span>
        <Modal
          key={modalKey}
          title={modalTitle}
          visible={this.state.visible}
          onOk={this.handleSubmit.bind(this)}
          onCancel={this.hideModalHandler.bind(this)}
        >
          <Form layout="horizontal" onSubmit={this.handleSubmit.bind(this)}>
            <Form.Item
              {...formItemLayout}
              label="账户"
            >
              {
                getFieldDecorator('title', {
                  initialValue: title
                })(<Input />)
              }
            </Form.Item>
            <Form.Item
              {...formItemLayout}
              label="余额"
            >
              {
                getFieldDecorator('balance', {
                  initialValue: balance
                })(<Input type="number" />)
              }
            </Form.Item>
          </Form>
        </Modal>
      </span>
    )
  }
}

export default Form.create()(AccountModal)
