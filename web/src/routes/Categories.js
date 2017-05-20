import React, { Component } from 'react';
import { connect } from 'dva';
import styles from './Categories.css';
import Layout from '../components/Layout/Layout'

class Categories extends Component {
  render() {
    const { location } = this.props
    return (
      <Layout location={location}>
        <div className={styles.normal}>
          Route Component: Categories
        </div>
      </Layout>
    )
  }
}

function mapStateToProps() {
  return {};
}

export default connect(mapStateToProps)(Categories);
