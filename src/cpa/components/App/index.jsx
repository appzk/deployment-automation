import PropTypes from 'prop-types';
import React, { PureComponent } from 'react';

import styles from './index.less';

export default class App extends PureComponent {
  static propTypes = {
    lastBuildHash: PropTypes.string.isRequired,
    lastBuildTime: PropTypes.string.isRequired
  }

  render() {
    const {
      lastBuildHash,
      lastBuildTime
    } = this.props;
    return (
      <div className={styles.container}>
        <h1>Welcome to cdn-pub-automation</h1>
        <h3>Last build time: {lastBuildTime}</h3>
        <h3>Last build hash: {lastBuildHash}</h3>
        <div>
          For more details, please visit&nbsp;
          <a href="https://zhuanlan.zhihu.com/p/29231319/edit">https://zhuanlan.zhihu.com/p/29231319/edit</a>
        </div>
      </div>
    );
  }
}
