import React, { Component } from 'react';
import { connect } from 'dva';
import styles from './Categories.css';
import Layout from '../components/Layout/Layout'
import CategoriesComponent from '../components/categories/Categories'
import CategoryNewComponent from '../components/categories/CategoryNew'

class Categories extends Component {
  renderComponent() {
    const { location, categories, dispatch } = this.props
    if (location.pathname === '/categories/new') {
      return (
        <CategoryNewComponent dispatch={dispatch} record={{}} categories={categories} />
      )
    }
    return (
      <CategoriesComponent dispatch={dispatch} categories={categories} />
    )
  }

  render() {
    return (
      <Layout location={this.props.location}>
        <div className={styles.normal}>
          { this.renderComponent() }
        </div>
      </Layout>
    )
  }
}

function mapStateToProps(state) {
  return {
    categories: state.categories.list
  }
}

export default connect(mapStateToProps)(Categories);
