const fs = require('fs');
const minify = require('html-minifier').minify;
const mkdirp = require('mkdirp');
const path = require('path');

function noop() { }

exports.transform = (sourcePath, targetPath, publicPath, callback = noop) => {
  mkdirp(path.dirname(targetPath), (mkdirErr) => {
    if (!mkdirErr) {
      fs.readFile(sourcePath, (readingError, data) => {
        if (!readingError) {
          const content = data.toString().replace(/\{PUBLIC_PATH\}\//g, publicPath);
          const minifiedContent = minify(content, {
            collapseWhitespace: true,
            minifyCSS: true,
            minifyJS: true,
            removeComments: true
          });
          fs.writeFile(targetPath, minifiedContent, (writingError) => {
            callback(writingError);
          });
        } else {
          callback(readingError);
        }
      });
    } else {
      callback(mkdirErr);
    }
  });
};
