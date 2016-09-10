module.exports = {
    "rules": {
        "quotes": [
            "error",
            "single"
        ],
        "semi": [
            "error",
            "always"
        ]
    },
    "env": {
        "browser": true,
        "es6": true
    },
    "scripts": {
        "lint": "eslint .",
        "pretest": "npm run lint --silent"
    },
    "eslintConfig": {
        "parser": "babel-eslint",
        "parserOptions": {
            "allowImportExportEverywhere": true
        },
        "plugins": [
            "meteor"
        ],
        "extends": [
            "airbnb",
            "plugin:meteor/recommended"
        ],
        "settings": {
            "import/resolver": "meteor"
        },
        "rules": {}
    }
};
