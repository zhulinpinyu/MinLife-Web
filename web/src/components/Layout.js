import React, { Component } from 'react';
import styles from './Layout.css';

import Header from './Header'

class Layout extends Component {
  render() {
    const { children, location } = this.props
    return (
      <div className={styles.normal}>
        <Header location={location} />
        <div className={styles.content}>
          <div className={styles.main}>
            { children }
          </div>
        </div>
      </div>
    );
  }
}

export default Layout;
