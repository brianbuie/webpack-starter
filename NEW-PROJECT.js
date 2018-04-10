// This script removes .git, this file, and new-project entry in package.json
import rimraf from 'rimraf';
import fs from 'fs';

const pathsToRemove = ['./.git', './CLEAN.js'];

function removePath(path, callback) {
  rimraf(path, error => {
    if (error) throw new Error(error);
    callback();
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
console.log(chalkSuccess('New Project ready. You should git init!'));
