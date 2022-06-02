import fs from 'fs';
import path from 'path';
import parseData from './parsers.js';
import buildAST from './buildAST.js';
import render from './formatters/index.js';

const readFile = (filePath) => {
  const fullPath = path.resolve(process.cwd(), filePath);
  const data = fs.readFileSync(fullPath).toString();

  return data;
};

const getExt = (filePath) => path.extname(filePath).slice(1);

export default (filePathBefore, filePathAfter, formatName) => {
  const dataBefore = readFile(filePathBefore);
  const dataAfter = readFile(filePathAfter);

  const extBefore = getExt(filePathBefore);
  const extAfter = getExt(filePathAfter);

  const objBefore = parseData(dataBefore, extBefore);
  const objAfter = parseData(dataAfter, extAfter);

  const ast = buildAST(objBefore, objAfter);

  return render(ast, formatName);
};
