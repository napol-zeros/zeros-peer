const inquirer = require('inquirer');

module.exports = {
  askCommand: () => {
    const questions = [
      {
        name: '0',
        type: 'input',
        message: '',
        validate: function( value ) {
          if (value.length) {
            return true;
          } else {
            return 'Please enter command.';
          }
        }
      }
    ]
    return inquirer.prompt(questions);
  },
}