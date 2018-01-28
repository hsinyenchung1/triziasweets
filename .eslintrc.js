module.exports = {
    "extends": "airbnb",
    "plugins": [
        "react", 
        "jsx-ally",
        "import"
    ],
    "rules": {
        "indent": [
          "error",
          2
        ],
        "linebreak-style": 0,
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
        "node": true
    }
};