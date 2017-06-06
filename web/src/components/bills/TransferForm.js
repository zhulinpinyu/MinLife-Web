import React, { Component } from 'react'
import { Form, Input, Select, DatePicker, Button } from 'antd'
import moment from 'moment'

class TransferForm extends Component {

  handleSubmit(e) {
    e.preventDefault()
    // const { form, onOk } = this.props
    // form.validateFields((err, fieldsValue) => {
    //   if (err) return
    //   const values = {
    //     ...fieldsValue,
    //     type: '转账',
    //     money: parseFloat(fieldsValue.money),
    //     account_id: parseInt(fieldsValue.account_id, 10),
    //     bill_date: fieldsValue.bill_date.format('YYYY-MM-DD HH:mm:ss')
    //   }
    //   onOk(values)
    // })
  }

  render() {
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
        payment_account_id,
        income_account_id,
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
      <Form layout="horizontal" onSubmit={this.handleSubmit.bind(this)}>
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
            getFieldDecorator('payment_account_id', {
              initialValue: payment_account_id ? `${payment_account_id}` : null,
              rules: [{
                required: true,
                message: '选择账户'
              }]
            })(
              <Select>
                {
                  // 支出账户只能是debit账户而非debt账户
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
            getFieldDecorator('income_account_id', {
              initialValue: income_account_id ? `${income_account_id}` : null,
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
        <Form.Item
          wrapperCol={{ span: 12, offset: 6 }}
        >
          <Button type="primary" htmlType="submit">Save</Button>
        </Form.Item>
      </Form>
    )
  }
}

export default Form.create()(TransferForm)
