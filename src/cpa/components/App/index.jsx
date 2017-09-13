import React, { PureComponent } from 'react';

import Version from '../Version';

import styles from './index.less';

export default class App extends PureComponent {
  render() {
    return (
      <div className={styles.container}>
        <h1>Welcome to cdn-pub-automation</h1>
        <Version />
        <div>
          For more details, please visit&nbsp;
          <a href="https://zhuanlan.zhihu.com/p/29231319/edit">https://zhuanlan.zhihu.com/p/29231319/edit</a>
        </div>
      </div>
    );
  }
}
