import React from 'react';
import { connect } from 'dva';
import styles from './Account.css';

function Account() {
  return (
    <div className={styles.normal}>
      Route Component: Account
    </div>
  );
}

function mapStateToProps() {
  return {};
}

export default connect(mapStateToProps)(Account);
