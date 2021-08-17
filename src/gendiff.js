import { readFileSync } from 'fs';
import path from 'path';
import _ from 'lodash';
import format from './formatters/index.js';
import parse from './parsers.js';

const buildTree = (data1, data2) => {
  const keys = _.union(Object.keys(data1), Object.keys(data2));
  return _.sortBy(keys, (el) => el)
    .map((key) => {
      if (!_.has(data2, key)) {
        return {
          type: 'removed', key, value1: data1[key], value2: null, children: null,
        };
      }
      if (!_.has(data1, key)) {
        return {
          type: 'added', key, value1: null, value2: data2[key], children: null,
        };
      }
      if (_.isPlainObject(data1[key]) && _.isPlainObject(data2[key])) {
        return {
          type: 'changed', key, value1: data1[key], value2: data2[key], children: buildTree(data1[key], data2[key]),
        };
      }
      if (data1[key] !== data2[key]) {
        return {
          type: 'updated', key, value1: data1[key], value2: data2[key], children: null,
        };
      }
      return {
        type: 'unchanged', key, value1: data1[key], value2: data2[key], children: null,
      };
    });
};

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
