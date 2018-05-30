module.exports = {
    extends: [
        "airbnb",
        "../../.eslintrc.js"
    ],
    globals: {
        "describe": false,
        "it": false
    },
    rules: {
        "func-names": "off",
        "no-underscore-dangle": "warn",
        "prefer-arrow-callback": "off"
    }
}