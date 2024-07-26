const fs = require('fs');

// first argument - path of the file including the filename.
// secong argument - content to be written in the file.
fs.writeFileSync('hello.txt', 'I am writing to the file.');
