const path = require("path");
module.exports = {
    window: {
        width: 1600,
        height: 800,
        webPreferences: {
            preload: path.join(__dirname, '../preload.js'),
        }
    }
}
