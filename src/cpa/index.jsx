import { AppContainer } from 'react-hot-loader';
import React from 'react';
import ReactDom from 'react-dom';

import App from './components/App';

import './index.less';

function renderMountPoint() {
  ReactDom.render(
    (
      <AppContainer>
        <App
          lastBuildHash={window.LAST_BUILT_HASH}
          lastBuildTime={window.LAST_BUILT_TIME}
        />
      </AppContainer>
    ),
    document.getElementById('mount-point')
  );
}

if (module.hot) {
  // 请参考 https://github.com/gaearon/react-hot-loader/tree/master/docs#migration-to-30
  module.hot.accept('./components/App', () => {
    renderMountPoint();
  });
}

renderMountPoint();
