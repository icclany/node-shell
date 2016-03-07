var fs = require('fs');
var request = require('request')

module.exports.pwd = function(file) {
	return process.cwd();
}
module.exports.date = function(file) {
	var newDate = new Date();
	process.stdout.write(newDate.toString());
	prompt();
}

module.exports.ls = function(file) {
	fs.readdir('.', function(err, files) {
		if (err) throw err;
		files.forEach(function(file) {
			process.stdout.write(file.toString() + "\n");
		})
		prompt();
	});
}

module.exports.echo = function(file) {
	file.forEach(function(elem) {process.stdout.write(elem+" ")})
	prompt();
}

module.exports.cat = function(file) {
	file.forEach(function(elem) {
		fs.readFile(elem.toString(), 'utf8', function(err, text) {
			if (err) throw err;
			process.stdout.write(text);
			prompt();
		});
	});
}

module.exports.head = function(file) {
	file.forEach(function(elem) {
		fs.readFile(elem.toString(), 'utf8', function(err, text) {
			if (err) throw err;
			var output = text.split("\n"); // Split the text by new lines
			process.stdout.write(output.slice(0,5).join("\n")); // Print the text with new lines
			prompt();
		});
	});
}

module.exports.tail = function(file) {
	file.forEach(function(elem) {
		fs.readFile(elem.toString(), 'utf8', function(err, text) {
			if (err) throw err;
			var output = text.split("\n"); // Split the text by new lines
			process.stdout.write(output.slice(-5).join("\n")); // Print the text with new lines
			prompt();
		});
	});
}

module.exports.sort = function(file) {
	file.forEach(function(elem) {
		fs.readFile(elem.toString(), 'utf8', function(err, text) {
			if (err) throw err;
			var output = text.split("\n"); // Split the text by new lines
			process.stdout.write(output.sort().join("\n")); // Print the text with new lines
			prompt();
		});
	});
}

module.exports.wc = function(file) {
	file.forEach(function(elem) {
		fs.readFile(elem.toString(), 'utf8', function(err, text) {
			if (err) throw err;
			var output = text.split("\n"); // Split the text by new lines
			process.stdout.write(output.length.toString()); // Print the text with new lines
			prompt();
		});
	});
}

module.exports.uniq = function(file) {
	file.forEach(function(elem) {
		fs.readFile(elem.toString(), 'utf8', function(err, text) {
			if (err) throw err;
			var output = text.split("\n"); // Split the text by new lines
			output = output.filter(function(elem, index, array) {
				return elem !== array[index-1];
			})
			process.stdout.write(output.join("\n")); // Print the text with new lines
			prompt();
		});
	});
}

module.exports.curl = function(file) {
	var url = file[0];
	if (url.indexOf("http") === -1) {url = "http://" + url};
	request(url, function(err,response,body) {
		if (err) throw err;
		process.stdout.write(body);
		prompt();
	});
}

function prompt() {
	process.stdout.write("\nprompt >");
}