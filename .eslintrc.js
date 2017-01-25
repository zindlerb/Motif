module.exports = {
  "extends": "airbnb",
  "installedESLint": true,
  "plugins": [
    "react",
    "jsx-a11y",
    "import"
  ],
  "globals": {
    "window": false
  },
  "rules": {
    "no-restricted-properties": [0, {
      "object": "Math",
      "property": "Pow"
    }],
    "prefer-template": 0,
    "no-underscore-dangle": 0,
    "no-param-reassign": 0,
    "func-names": 0,
    "no-unreachable": 0,
    "no-else-return": 0,
    "prefer-arrow-callback": 0,
    "quotes": [2, "single", { "avoidEscape": true }],
    "one-var": 0,
    "one-var-declaration-per-line": 0,
    "react/prefer-es6-class": 0,
    "no-shadow": 0,
    "react/jsx-filename-extension": 0,
    "react/no-multi-comp": 0,
    "jsx-a11y/no-static-element-interactions": 0,
    "react/jsx-indent-props": 0,
    // Remove later
    "jsx-a11y/img-has-alt": 0,
    "prefer-const": 0,
    "comma-dangle": 0,
    "no-plusplus": 0,
    "no-unused-expressions": 0,
    "react/jsx-closing-bracket-location": 0,

    // Possibly add back in later
    "react/prefer-stateless-function": 0,
    "indent": 0,
    "react/jsx-indent-props": 0,
    "react/prop-types": 1,
    "react/no-children-prop": 0,
    "react/jsx-indent": 0,
    "arrow-body-style": 0,
    "spaced-comment": 0,

    // Def add back in later
    "semi": 0
  },
  "env": {
    "browser": true,
    "node": true
  }
};
