const chalk = require('chalk');

module.exports = {
    success: (message) => console.log(chalk.green(message)),
    error: (message) => console.error(chalk.red(message)),
    info: (message) => console.info(chalk.cyan(message)),
    debug: (message) => console.debug(chalk.magenta(message)),
};
