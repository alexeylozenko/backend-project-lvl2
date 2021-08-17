import { readFileSync } from 'fs';
import path from 'path';
import format from './formatters/index.js';
import parse from './parsers.js';
import buildTree from './builder.js';

const buildPath = (filename) => path.resolve(process.cwd(), filename);

const extractFormat = (filename) => path.extname(filename);

const genDiff = (filename1, filename2, formatter = 'stylish') => {
  const fileContent1 = readFileSync(buildPath(filename1), 'utf-8');
  const fileContent2 = readFileSync(buildPath(filename2), 'utf-8');
  const data1 = parse(fileContent1, extractFormat(filename1));
  const data2 = parse(fileContent2, extractFormat(filename2));
  const difftree = buildTree(data1, data2);
  return format(difftree, formatter);
};

export default genDiff;
