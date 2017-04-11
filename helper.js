const chalk = require('chalk');

module.exports = {
  error: (text) => {
    console.error(chalk.red(`✘ ${text}`));
  },
  success: (text) => {
    console.log(`${chalk.green('✓ ')}${chalk.white(text)}`);
  },
  warn: (text) => {
    console.error(chalk.yellow(`⚠ ${text}`));
  }
};
