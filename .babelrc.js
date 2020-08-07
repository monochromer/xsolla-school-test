module.exports = (api) => {
  api.cache.using(() => process.env.NODE_ENV);

  return {
    "presets": [
      [
        "@babel/preset-env", {
          "modules": false
        }
      ],
      "@babel/preset-react"
    ],

    "plugins": [],

    "env": {
      "production": {},
      "development": {
        "plugins": [
          "react-refresh/babel"
        ]
      }
    }
  }
};