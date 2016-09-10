module.exports = {
    //"env": {
    //    "browser": true,
    //    "es6": true
    //},
    //"extends": "eslint:recommended",
    //"rules": {
    //    "indent": [
    //        "error",
    //        "tab"
    //    ],
    //    "linebreak-style": [
    //        "error",
    //        "windows"
    //    ],
    //    "quotes": [
    //        "error",
    //        "single"
    //    ],
    //    "semi": [
    //        "error",
    //        "always"
    //    ]
    //},
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
