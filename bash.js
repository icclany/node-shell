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
	var cmdString = data.toString().trim();
	var cmdList = cmdString.split(/\s*\|\s*/g)
	var dataArray = cmdString.split(" ");
	var cmd = cmdList[0];
	var file = cmdList.slice(1);
	var stdin = ""



  // Execute the commands with functions stored in commands.js
  commands[cmd](stdin, file, done);

});

module.exports = function(output) {
	process.stdout.write(output); // Shows the output
	process.stdout.write("\nprompt >"); // Shows the prompt
}