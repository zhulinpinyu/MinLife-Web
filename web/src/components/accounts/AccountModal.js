import React, { Component } from 'react'
import { Modal, Form, Input, Switch, Radio } from 'antd'

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
    form.validateFields((err, fieldsValue) => {
      if (err) return
      const values = {
        ...fieldsValue,
        balance: parseFloat(fieldsValue.balance)
      }
      onOk(values)
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
      record: { title, balance, debt, currency }
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
          maskClosable={false}
          onOk={this.handleSubmit.bind(this)}
          onCancel={this.hideModalHandler.bind(this)}
        >
          <Form layout="horizontal" onSubmit={this.handleSubmit.bind(this)}>
            <Form.Item
              {...formItemLayout}
              label="账户名称"
            >
              {
                getFieldDecorator('title', {
                  initialValue: title,
                  rules: [{ required: true }]
                })(<Input />)
              }
            </Form.Item>
            <Form.Item
              {...formItemLayout}
              label="金额"
            >
              {
                getFieldDecorator('balance', {
                  initialValue: balance,
                  rules: [{
                    required: true,
                    type: 'float',
                    validator: (rule, value, callback) => {
                      if (value >= 0) {
                        callback();
                        return;
                      }
                      callback('请正确填写金额');
                    }
                  }]
                })(<Input type="number" />)
              }
            </Form.Item>
            <Form.Item
              {...formItemLayout}
              label="币种"
            >
              {getFieldDecorator('currency', {
                initialValue: currency || '￥'
              })(
                <Radio.Group>
                  <Radio.Button value="￥">RMB(￥)</Radio.Button>
                  <Radio.Button value="$">USD($)</Radio.Button>
                  <Radio.Button value="HK$">HKD(HK$)</Radio.Button>
                </Radio.Group>
              )}
            </Form.Item>
            <Form.Item
              {...formItemLayout}
              label="债务账户?"
            >
              {
                getFieldDecorator('debt', {
                  initialValue: debt || false,
                  valuePropName: 'checked'
                })(<Switch />)
              }
            </Form.Item>
          </Form>
        </Modal>
      </span>
    )
  }
}

export default Form.create()(AccountModal)
