var fs = require('fs');
var request = require('request')

module.exports.pwd = function(file) {
	return process.cwd();
}
module.exports.date = function(file) {
	return Date(); // returns date in String format
}

module.exports.ls = function(stdin, file, callback) {
	fs.readdir('.', function(err, files) {
		var output = "";
		if (err) throw err;
		files.forEach(function(file) {
			output += file.toString() + "\n";
		})
		callback(output)
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

module.exports.head = function(stdin, file, callback) {
	file.forEach(function(elem) {
		fs.readFile(elem.toString(), 'utf8', function(err, text) {
			if (err) throw err;
			var output = text.split("\n"); // Split the text by new lines
			process.stdout.write(output.slice(0,5).join("\n")); // Print the text with new lines
			prompt();
		});
	});
}

module.exports.tail = function(stdin, file, callback) {
	file.forEach(function(elem) {
		fs.readFile(elem.toString(), 'utf8', function(err, text) {
			if (err) throw err;
			var output = text.split("\n"); // Split the text by new lines
			process.stdout.write(output.slice(-5).join("\n")); // Print the text with new lines
			prompt();
		});
	});
}

module.exports.sort = function(stdin, file, callback) {
	file.forEach(function(elem) {
		fs.readFile(elem.toString(), 'utf8', function(err, text) {
			if (err) throw err;
			var output = text.split("\n"); // Split the text by new lines
			process.stdout.write(output.sort().join("\n")); // Print the text with new lines
			prompt();
		});
	});
}

module.exports.wc = function(stdin, file, callback) {
	file.forEach(function(elem) {
		fs.readFile(elem.toString(), 'utf8', function(err, text) {
			if (err) throw err;
			var output = text.split("\n"); // Split the text by new lines
			process.stdout.write(output.length.toString()); // Print the text with new lines
			prompt();
		});
	});
}

module.exports.uniq = function(stdin, file, callback) {
	//var result;
	file.forEach(function(elem) {
		fs.readFile(elem.toString(), 'utf8', function(err, text) {
			if (err) throw err;
			var output = text.split("\n"); // Split the text by new lines
			output = output.filter(function(elem, index, array) {
				return elem !== array[index-1];
			})
			callback(output.join("\n")); // Print the text with new lines
		});
	});
	//callback(result);
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