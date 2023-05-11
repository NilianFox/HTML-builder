const fs = require('fs');
const { copyFile } = require('fs/promises');
const { join, extname } = require('path');

const pathTargetDir = join(__dirname, 'project-dist');
const pathAssetsDir = join(__dirname, 'assets');
const pathTargetAssetsDir = join(__dirname, './project-dist/assets');
const pathStyles = join(__dirname, 'styles');
const pathBundleCSS = join(pathTargetDir, 'style.css');
const pathTemplateHtml = join(__dirname, 'template.html');
const pathComponentsDir = join(__dirname, 'components');
const pathMergedHtml = join(pathTargetDir, 'index.html');

function copyDir(pathDir, pathNewDir) {
  fs.rm(pathNewDir, { recursive: true, force: true }, () => {
    fs.readdir(pathDir, { withFileTypes: true }, (error, files) => {
      fs.mkdir(pathNewDir, { recursive: true }, () => null);
      for (const file of files) {
        if (file.isFile()) {
          copyFile(join(pathDir, file.name), join(pathNewDir, file.name));
        }
        else if (file.isDirectory()) {
          fs.mkdir(join(pathNewDir, file.name), { recursive: true }, () => null);
          copyDir(join(pathDir, file.name), join(pathNewDir, file.name));
        }
      }
    });
  });
};

function mergeCss(stylesDir, bundleDir) {
  fs.readdir(stylesDir, { withFileTypes: true }, (err1, files) => {
    fs.writeFile(bundleDir, '', () => null);
    for (const file of files) {
      if (file.isFile() && extname(file.name).toLowerCase() === '.css') {
        fs.readFile(join(stylesDir, file.name), 'utf-8', (err2, data) => {
          fs.appendFile(bundleDir, data + '\n', () => null);
        });
      }
    }
  });
}

function buildHTML() {
  let data = '';
  fs.readFile(pathTemplateHtml, 'utf-8', (err, dataTemplate) => {
    data = dataTemplate.toString();
    fs.readdir(pathComponentsDir, { withFileTypes: true }, (error, files) => {
      for (const file of files) {
        if (file.isFile() && extname(file.name).toLowerCase() === '.html') {
          fs.readFile(join(pathComponentsDir, file.name), 'utf-8', (err, dataComponent) => {
            const fileName = file.name.toLowerCase().replace('.html', '');
            data = data.replace(`{{${fileName}}}`, dataComponent);
            fs.writeFile(pathMergedHtml, data, () => null);
          });
        }
      }
    });
  });
}

async function buildProject() {
  fs.rm(pathTargetDir, { recursive: true, force: true }, () => {
    fs.mkdir(pathTargetDir, { recursive: true }, () => {
      copyDir(pathAssetsDir, pathTargetAssetsDir);
      mergeCss(pathStyles, pathBundleCSS);
      buildHTML();
    })
  })
}

buildProject();
