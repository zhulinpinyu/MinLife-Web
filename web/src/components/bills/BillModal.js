import React, { Component } from 'react'
import { Modal, Form, Input, Radio, Select, Cascader, DatePicker } from 'antd'
import moment from 'moment'

class BillModal extends Component {
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
      accounts,
      members,
      categories,
      modalKey,
      title: modalTitle,
      form: { getFieldDecorator },
      record: {
        type,
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
              wrapperCol={{ offset: 6, span: 18 }}
            >
              {getFieldDecorator('type', {
                initialValue: type || '支出'
              })(
                <Radio.Group>
                  <Radio.Button value="支出">支出</Radio.Button>
                  <Radio.Button value="收入">收入</Radio.Button>
                  <Radio.Button value="转账">转账</Radio.Button>
                </Radio.Group>
              )}
            </Form.Item>
            <Form.Item
              {...formItemLayout}
              label="金额"
            >
              {
                getFieldDecorator('money', {
                  initialValue: money
                })(<Input type="number" addonAfter={prefixSelector} />)
              }
            </Form.Item>
            <Form.Item
              {...formItemLayout}
              label="类别"
            >
              {
                getFieldDecorator('category_id', {
                  initialValue: category_id
                })(<Cascader expandTrigger="hover" options={options} />)
              }
            </Form.Item>
            <Form.Item
              {...formItemLayout}
              label="账户"
            >
              {
                getFieldDecorator('account_id', {
                  initialValue: account_id
                })(
                  <Select>
                    {
                      accounts.map((category) => {
                        return (
                          <Select.Option key={category.id} value={`${category.id}`}>
                            {category.title}
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
                  initialValue: member_id
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
                  initialValue: bill_date || moment(Date.now())
                })(<DatePicker
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
          </Form>
        </Modal>
      </span>
    )
  }
}

export default Form.create()(BillModal)
