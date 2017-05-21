import React, { Component } from 'react';
import { connect } from 'dva';
import styles from './Categories.css';
import Layout from '../components/Layout/Layout'
import CategoriesComponent from '../components/categories/Categories'

class Categories extends Component {
  render() {
    const { location, categories, dispatch } = this.props
    return (
      <Layout location={location}>
        <div className={styles.normal}>
          <CategoriesComponent dispatch={dispatch} categories={categories} />
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
