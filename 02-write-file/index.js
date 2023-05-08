const fs = require('fs');
const path = require('path');
const { stdin, stdout, exit } = require('process');
const absPath = path.join(__dirname, 'text.txt');
const output = fs.createWriteStream(absPath);

stdout.write('Hello! Write something interesting :D\n');
stdin.on('data', data => {
    if (data.toString().trim() === 'exit') {
        exitFunc();
    }
    output.write(data);
})

function exitFunc() {
    stdout.write('See you next time!\n');
    exit();
}

process.on('SIGINT', exitFunc);