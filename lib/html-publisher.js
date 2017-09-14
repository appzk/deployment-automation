const fs = require('fs');
const mkdirp = require('mkdirp');
const path = require('path');

function noop() { }

exports.transform = (sourcePath, targetPath, publicPath, callback = noop) => {
  mkdirp(path.dirname(targetPath), (mkdirErr) => {
    if (!mkdirErr) {
      fs.readFile(sourcePath, (readingError, data) => {
        if (!readingError) {
          const content = data.toString().replace(/\{PUBLIC_PATH\}\//g, publicPath);
          fs.writeFile(targetPath, content, (writingError) => {
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
