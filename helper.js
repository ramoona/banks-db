const chalk = require('chalk');

module.exports = {
  logError: (text) => {
    console.error(chalk.red(`✘ ${text}`));
  },
  logSuccess: (text) => {
    console.log(`${chalk.green('✓ ')}${chalk.white(text)}`);
  },
  logWarning: (text) => {
    console.error(chalk.yellow(`⚠ ${text}`));
  }
};
