import PropTypes from 'prop-types';
import React, { PureComponent } from 'react';

import styles from './index.less';

export default class BuildInfo extends PureComponent {
  static propTypes = {
    build: PropTypes.shape({
      hash: PropTypes.string,
      time: PropTypes.objectOf(Date)
    }).isRequired
  }

  render() {
    const {
      build: {
        hash,
        time
      }
    } = this.props;
    return (
      <table
        className={styles.container}
        cellPadding={0}
        cellSpacing={0}
      >
        <tbody>
          <tr>
            <td>Last Built Time</td>
            <td>{time.toString()}</td>
          </tr>
          <tr>
            <td>Last Built Hash</td>
            <td>{hash}</td>
          </tr>
        </tbody>
      </table>
    );
  }
}
