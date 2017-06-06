import React, { Component } from 'react'
import { Modal, Form, Input, Radio, Select, DatePicker } from 'antd'
import moment from 'moment'

import PaymentForm from './PaymentForm'
import IncomeForm from './IncomeForm'

class BillModal extends Component {
  state = {
    visible: false,
    type: '支出'
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
    // const { form, onOk } = this.props
    // form.validateFields((err, fieldsValue) => {
    //   if (err) return
    //   const values = {
    //     ...fieldsValue,
    //     money: parseFloat(fieldsValue.money),
    //     account_id: parseInt(fieldsValue.account_id, 10),
    //     member_id: parseInt(fieldsValue.member_id, 10),
    //     bill_date: fieldsValue.bill_date.format('YYYY-MM-DD HH:mm:ss')
    //   }
    //   onOk(values)
    //   this.hideModalHandler()
    // })
    this.props.onOk(values)
    this.hideModalHandler()
    console.log(values)
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
    const formItemLayout = {
      labelCol: { span: 6 },
      wrapperCol: { span: 14 }
    }
    const {
      accounts,
      form: { getFieldDecorator },
      record: {
        money,
        currency,
        bill_date,
        account_id,
        notes
      }
    } = this.props

    const prefixSelector = getFieldDecorator('currency', {
      initialValue: currency || '￥',
    })(
      <Select>
        <Select.Option value="￥">RMB(￥)</Select.Option>
        <Select.Option value="$">USD($)</Select.Option>
        <Select.Option value="HK$">HKD(HK$)</Select.Option>
      </Select>
    )

    return (
      <div>
        <Form.Item
          {...formItemLayout}
          label="金额"
        >
          {
            getFieldDecorator('money', {
              initialValue: money,
              rules: [{
                required: true,
                type: 'float',
                validator: (rule, value, callback) => {
                  if (value > 0) {
                    callback();
                    return;
                  }
                  callback('请正确填写金额');
                }
              }]
            })(<Input addonAfter={prefixSelector} />)
          }
        </Form.Item>
        <Form.Item
          {...formItemLayout}
          label="支出账户"
        >
          {
            getFieldDecorator('account_id', {
              initialValue: account_id ? `${account_id}` : null,
              rules: [{
                required: true,
                message: '选择账户'
              }]
            })(
              <Select>
                {
                  accounts.map((account) => {
                    return (
                      <Select.Option key={account.id} value={`${account.id}`}>
                        {account.title}
                      </Select.Option>
                    )
                  })
                }
              </Select>
          )}
        </Form.Item>
        <Form.Item
          {...formItemLayout}
          label="转入账户"
        >
          {
            getFieldDecorator('account_id', {
              initialValue: account_id ? `${account_id}` : null,
              rules: [{
                required: true,
                message: '选择账户'
              }]
            })(
              <Select>
                {
                  accounts.map((account) => {
                    return (
                      <Select.Option key={account.id} value={`${account.id}`}>
                        {account.title}
                      </Select.Option>
                    )
                  })
                }
              </Select>
          )}
        </Form.Item>
        <Form.Item
          {...formItemLayout}
          label="日期"
        >
          {
            getFieldDecorator('bill_date', {
              initialValue: moment(bill_date)
            })(<DatePicker
              allowClear={false}
              format="YYYY-MM-DD HH:mm:ss"
              showTime
            />)
          }
        </Form.Item>
        <Form.Item
          {...formItemLayout}
          label="备注"
        >
          {
            getFieldDecorator('notes', {
              initialValue: notes
            })(<Input type="textarea" />)
          }
        </Form.Item>
      </div>
    )
  }

  renderForm() {
    const { record: { type } } = this.props
    const billType = type || this.state.type
    // console.log(`record type: ${type}`)
    // console.log(`state type: ${this.state.type}`)
    // console.log(`billType: ${billType}`)
    switch (billType) {
      case '支出':
        return this.renderPaidForm()
      case '收入':
        return this.renderIncomeForm()
      case '转账':
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
