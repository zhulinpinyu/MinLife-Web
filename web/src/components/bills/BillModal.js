import React, { Component } from 'react'
import { Modal, Form, Radio } from 'antd'

import PaymentForm from './PaymentForm'
import IncomeForm from './IncomeForm'
import TransferForm from './TransferForm'

class BillModal extends Component {
  state = {
    visible: false,
    type: 'PAYMENT'
  }

  handleBillTypeChange = (e) => {
    this.setState({
      ...this.state,
      type: e.target.value
    })
  }

  showModalHandler(e) {
    if (e) e.preventDefault()
    this.setState({ visible: true })
  }

  hideModalHandler() {
    this.setState({ visible: false })
  }

  handleSubmit(values) {
    this.props.onOk(values)
    this.hideModalHandler()
  }

  renderPaidForm() {
    const { accounts, categories, members, record } = this.props
    return (
      <PaymentForm
        accounts={accounts}
        categories={categories}
        members={members}
        onOk={this.handleSubmit.bind(this)}
        record={record}
      />
    )
  }

  renderIncomeForm() {
    const { accounts, members, record } = this.props
    return (
      <IncomeForm
        accounts={accounts}
        members={members}
        onOk={this.handleSubmit.bind(this)}
        record={record}
      />
    )
  }

  renderTransferForm() {
    const { accounts, record } = this.props
    return (
      <TransferForm
        accounts={accounts}
        onOk={this.handleSubmit.bind(this)}
        record={record}
      />
    )
  }

  renderForm() {
    const { record: { type } } = this.props
    const billType = type || this.state.type
    switch (billType) {
      case 'PAYMENT':
        return this.renderPaidForm()
      case 'INCOME':
        return this.renderIncomeForm()
      case 'TRANSFER':
        return this.renderTransferForm()
      default:
        return this.renderPaidForm()
    }
  }

  render() {
    const {
      children,
      modalKey,
      title: modalTitle,
      form: { getFieldDecorator },
      record: {
        type
      }
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
          footer={null}
          onCancel={this.hideModalHandler.bind(this)}
        >
          <Form.Item
            wrapperCol={{ offset: 6, span: 18 }}
          >
            {getFieldDecorator('type', {
              initialValue: type || this.state.type
            })(
              <Radio.Group onChange={this.handleBillTypeChange}>
                <Radio.Button value="支出">支出</Radio.Button>
                <Radio.Button value="收入">收入</Radio.Button>
                <Radio.Button value="转账">转账</Radio.Button>
              </Radio.Group>
            )}
          </Form.Item>
          {this.renderForm()}
        </Modal>
      </span>
    )
  }
}

export default Form.create()(BillModal)
