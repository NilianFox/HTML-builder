
const { copyFile, readdir, mkdir, unlink } = require('fs/promises');
const path = require('path');

const pathSourceFolder = path.join(__dirname, 'files');
const pathCopyFolder = path.join(__dirname, 'files-copy');

async function copyDir() {
    await mkdir(pathCopyFolder, { recursive: true });

    const sourceFiles = await readdir(pathSourceFolder);
    const copyFiles = await readdir(pathCopyFolder);

    copyFiles.forEach(async file => {
        if (sourceFiles.indexOf(file) === -1) {
            await unlink(path.join(pathCopyFolder, file));
        }
    });

    sourceFiles.forEach(async file => {
        await copyFile(path.join(pathSourceFolder, file), path.join(pathCopyFolder, file));
    });
}

copyDir();