import PropTypes from 'prop-types';
import React, { PureComponent } from 'react';

import BuildInfo from '../BuildInfo';

import styles from './index.less';

export default class App extends PureComponent {
  static propTypes = {
    lastBuild: PropTypes.shape().isRequired
  }

  renderBuildSection() {
    const lastBuild = this.props.lastBuild;
    return (
      <section>
        <h3>Build Info</h3>
        <BuildInfo build={lastBuild} />
      </section>
    );
  }

  render() {
    return (
      <div className={styles.container}>
        <h1>Welcome to cdn-pub-automation</h1>
        {this.renderBuildSection()}
        <section>
          <h3>About</h3>
          <div>
            For more details, please visit&nbsp;
            <a href="https://zhuanlan.zhihu.com/p/29231319/edit">https://zhuanlan.zhihu.com/p/29231319/edit</a>
          </div>
        </section>
      </div>
    );
  }
}
