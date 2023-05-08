const fs = require('fs');
const path = require('path');
const fsPromises = fs.promises;

fsPromises.readdir(path.join(__dirname, 'secret-folder'), {
    withFileTypes: true
}).then(data => {
    data.forEach(element => {
        if (!element.isDirectory()) {
            const filePath = path.join(__dirname, 'secret-folder', element.name);
            const fileName = path.basename(filePath);
            const ext = path.extname(filePath);
            fsPromises.stat(filePath).then(result => {
                console.log(`${fileName.replace(ext, '')} - ${ext.replace('.', '')} - ${Number(result.size / 1024).toFixed(3)}KB`);
            });
        }
    })
})