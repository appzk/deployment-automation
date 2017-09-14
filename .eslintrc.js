// 这是一份基于 airbnb 的 eslint 配置，仅在其基础上关闭（off）了部分不必要的 rules。
// 在开发过程中，可以允许有 warns，而在发布前应做到完全没有 error 和 warns。

module.exports = {
  "parser": "babel-eslint",
  "extends": [
    "airbnb-base",
    "airbnb-base/rules/strict",
    "airbnb/rules/react"
  ],
  "env": {
    "browser": true,
    "node": true
  },
  "rules": {
    "comma-dangle": "off",
    "global-require": "off",
    "import/no-dynamic-require": "off",
    "import/no-extraneous-dependencies": "off",
    "import/prefer-default-export": "off",
    "react/prefer-stateless-function": "off",

    // 为了调试时方便，以下 rules 设置为 warn
    "class-methods-use-this": "warn",
    "max-len": "warn",
    "no-unused-vars": "warn",
    "no-use-before-define": "warn",
    "react/forbid-prop-types": "warn",
    "react/no-unused-prop-types": "warn",
    "react/prop-types": "warn",
    "react/self-closing-comp": "warn",

    "no-console": [
      "warn",
      {
        "allow": [
          "warn",
          "error"
        ]
      }
    ],
    "no-underscore-dangle": "off",
  }
};
