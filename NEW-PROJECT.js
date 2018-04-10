// This script removes .git, this file, and new-project entry in package.json
const rimraf = require('rimraf');
const fs = require('fs');

const pathsToRemove = ['./.git', './NEW-PROJECT.js'];

function removePath(path) {
  rimraf(path, error => {
    if (error) throw new Error(error);
  });
}

function removePackageJsonScriptEntry(scriptName) {
  const packageJsonPath = './package.json';
  let fileData = fs.readFileSync(packageJsonPath);
  let content = JSON.parse(fileData);
  delete content.scripts[scriptName];
  fs.writeFileSync(packageJsonPath, JSON.stringify(content, null, 2) + '\n');
}

pathsToRemove.map(path => removePath(path));
removePackageJsonScriptEntry('new-project');
console.log('New Project ready. You should git init!');
