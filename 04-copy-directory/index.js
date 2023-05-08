
const fs = require('fs');
const path = require('path');
const fsPromises = fs.promises;
const copyFile = fsPromises.copyFile;

(function copyDir() {
    fs.mkdir(path.join(__dirname, 'files-copy'), {
        recursive: true,
    }, err => {
        if (err) {
            throw new Error('Folder already exists!')
        }
        console.log('Folder created!');
    });

    fsPromises.readdir(path.join(__dirname, 'files'))
        .then(files => {
            files.forEach(file => {
                const filePath = path.join(__dirname, 'files', file);
                const copyPath = path.join(__dirname, 'files-copy', file);
                copyFile(filePath, copyPath);
                console.log(file);
            });
        });
})();