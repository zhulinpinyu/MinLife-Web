import React, { Component } from 'react'
import { Form, Input, Select, Cascader, DatePicker, Button } from 'antd'
import moment from 'moment'

class PaymentForm extends Component {

  handleSubmit(e) {
    e.preventDefault()
    const { form, onOk } = this.props
    form.validateFields((err, fieldsValue) => {
      if (err) return
      const values = {
        ...fieldsValue,
        type: '支出',
        money: parseFloat(fieldsValue.money),
        account_id: parseInt(fieldsValue.account_id, 10),
        member_id: parseInt(fieldsValue.member_id, 10),
        bill_date: fieldsValue.bill_date.format('YYYY-MM-DD HH:mm:ss')
      }
      onOk(values)
    })
  }

  render() {
    const formItemLayout = {
      labelCol: { span: 6 },
      wrapperCol: { span: 14 }
    }
    const {
      accounts,
      members,
      categories,
      form: { getFieldDecorator },
      record: {
        money,
        currency,
        bill_date,
        category_id,
        account_id,
        member_id,
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
    );

    const options = categories
      .filter(category => !category.parent_id)
      .map((cat) => {
        return {
          value: cat.id,
          label: cat.title,
          children: categories
            .filter(c => cat.id === c.parent_id)
            .map(subCat => ({ value: subCat.id, label: subCat.title }))
        }
      })

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
          label="类别"
        >
          {
            getFieldDecorator('category_id', {
              initialValue: category_id,
              rules: [{
                required: true,
                message: '选择类别'
              }]
            })(<Cascader placeholder="选择支出类别" expandTrigger="hover" options={options} />)
          }
        </Form.Item>
        <Form.Item
          {...formItemLayout}
          label="账户"
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
          label="成员"
        >
          {
            getFieldDecorator('member_id', {
              initialValue: member_id ? `${member_id}` : null,
              rules: [{
                required: true,
                message: '选择成员'
              }]
            })(
              <Select>
                {
                  members.map((member) => {
                    return (
                      <Select.Option key={member.id} value={`${member.id}`}>
                        {member.title}
                      </Select.Option>
                    )
                  })
                }
              </Select>
            )
          }
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
          <Button type="primary" htmlType="submit">Submit</Button>
        </Form.Item>
      </Form>
    )
  }
}

export default Form.create()(PaymentForm)
