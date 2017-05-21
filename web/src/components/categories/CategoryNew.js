import React, { Component } from 'react';
import { Form, Input, Button, Select } from 'antd'
import styles from './Categories.css';

class CategoryNew extends Component {
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
        <Form layout="horizontal" onSubmit={() => console.log('submit')}>
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
            <Button style={{ marginLeft: 8 }} type="dashed">
              取消
            </Button>
          </Form.Item>
        </Form>
      </div>
    )
  }
}

export default Form.create()(CategoryNew)
