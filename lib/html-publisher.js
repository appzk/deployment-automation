const fs = require('fs');
const minify = require('html-minifier').minify;
const mkdirp = require('mkdirp');
const path = require('path');

function noop() { }

function compressHTML(html) {
  return minify(html, {
    collapseWhitespace: true,
    minifyCSS: true,
    minifyJS: true,
    removeComments: true
  });
}

function replaceWithVariables(text, { HASH, PUBLIC_PATH, TIME }) {
  return text
    .replace(/\{HASH\}/g, HASH)
    .replace(/\{PUBLIC_PATH\}\//g, PUBLIC_PATH)
    .replace(/\{TIME\}/g, TIME);
}

exports.transform = (sourcePath, targetPath, publicPath, hash, callback = noop) => {
  mkdirp(path.dirname(targetPath), (mkdirErr) => {
    if (!mkdirErr) {
      fs.readFile(sourcePath, (readingError, data) => {
        if (!readingError) {
          const content = replaceWithVariables(
            data.toString(),
            {
              HASH: hash,
              PUBLIC_PATH: publicPath.replace(/\[hash\]/g, hash),
              TIME: new Date().toString()
            }
          );
          const minifiedContent = compressHTML(content);
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
