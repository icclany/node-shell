// Require modules
var commands = require('./commands.js')

// Output a prompt
process.stdout.write('prompt > ');

// DONE function
var done = function(output) {
	process.stdout.write(output); // Shows the output
	process.stdout.write("\nprompt >"); // Shows the prompt
}

// The stdin 'data' event fires after a user types in a line
process.stdin.on('data', function (data) {
	var dataArray = data.toString().trim().split(" ");
	var cmd = dataArray[0];
	var file = dataArray.slice(1);
  // Execute the commands with functions stored in commands.js
  commands[cmd](file, done);
});

module.exports = function(output) {
	process.stdout.write(output); // Shows the output
	process.stdout.write("\nprompt >"); // Shows the prompt
}