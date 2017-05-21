import React, { Component } from 'react';
import { Form, Input, Button, Cascader } from 'antd'
import styles from './Categories.css';

class CategoryNew extends Component {
  render() {
    const formItemLayout = {
      labelCol: { span: 6 },
      wrapperCol: { span: 14 }
    }
    const tailFormItemLayout = {
      wrapperCol: { span: 14, offset: 6 }
    }

    const {
      categories,
      form: { getFieldDecorator },
      record: { title, parent_id }
    } = this.props

    const options = categories.map((category) => {
      return {
        value: category.id,
        label: category.title,
        children: category.subCategories.map(subCat => ({ value: subCat.id, label: subCat.title }))
      }
    })

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
              })(<Cascader options={options} />)
            }
          </Form.Item>
          <Form.Item
            {...tailFormItemLayout}
          >
            <Button type="primary" htmlType="submit">
              Save
            </Button>
          </Form.Item>
        </Form>
      </div>
    )
  }
}

export default Form.create()(CategoryNew)
