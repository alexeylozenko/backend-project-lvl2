import { readFileSync } from 'fs';
import path from 'path';
import _ from 'lodash';
import format from './formatters/index.js';
import parse from './parsers/index.js';

const makeNode = (type, key, value1, value2 = null, children = null) => ({
  type, key, value1, value2, children,
});

const buildTree = (data1, data2) => {
  const keys = _.union(Object.keys(data1), Object.keys(data2));
  return _.sortBy(keys, (el) => el)
    .map((key) => {
      if (!_.has(data2, key)) {
        return makeNode('removed', key, data1[key]);
      }
      if (!_.has(data1, key)) {
        return makeNode('added', key, null, data2[key]);
      }
      if (_.isEqual(data1[key], data2[key])) {
        return makeNode('unchanged', key, data1[key], data2[key]);
      }
      if (_.isPlainObject(data1[key]) && _.isPlainObject(data2[key])) {
        return makeNode('changed', key, data1[key], data2[key], buildTree(data1[key], data2[key]));
      }
      return makeNode('updated', key, data1[key], data2[key]);
    });
};

const buildPath = (filename) => path.resolve(process.cwd(), filename);

const getParseFormat = (filename) => {
  const extName = path.extname(filename);
  return (extName === '.yml' || extName === '.yaml') ? 'yaml' : 'json';
};

const genDiff = (filename1, filename2, formatter = 'stylish') => {
  const fileContent1 = readFileSync(buildPath(filename1), 'utf-8');
  const fileContent2 = readFileSync(buildPath(filename2), 'utf-8');
  const data1 = parse(fileContent1, getParseFormat(filename1));
  const data2 = parse(fileContent2, getParseFormat(filename2));
  const difftree = buildTree(data1, data2);
  return format(difftree, formatter);
};

export default genDiff;
