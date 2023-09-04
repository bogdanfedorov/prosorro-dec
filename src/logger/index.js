class Logger {
    name

    constructor(name) {
        this.name = name;
    }

    message(...args) {
        console.log(`[${this.name}] `, ...args)
    }

    error(...args) {
        console.error(`[${this.name}]`, ...args)
    }

}

module.exports = Logger;
