import { readFileSync } from 'fs';
import path from 'path';
import _ from 'lodash';
import { makeNode } from './tree-diff/diff-tree.js';
import formate from './formatters/index.js';
import parse from './parsers/index.js';

const compareTrees = (before, after) => (
  _.union(Object.keys(before), Object.keys(after))
    .sort()
    .map((key) => {
      if (!_.has(after, key)) {
        return makeNode('removed', key, before[key]);
      }
      if (!_.has(before, key)) {
        return makeNode('added', key, null, after[key]);
      }
      if (_.isEqual(before[key], after[key])) {
        return makeNode('unchanged', key, before[key], after[key]);
      }
      if (_.isPlainObject(before[key]) && _.isPlainObject(after[key])) {
        return makeNode('changed', key, before[key], after[key], compareTrees(before[key], after[key]));
      }
      return makeNode('updated', key, before[key], after[key]);
    })
);

const genDiff = (filename1, filename2, formatter = 'stylish') => {
  const leftData = readFileSync(path.resolve(filename1), 'utf-8');
  const rightData = readFileSync(path.resolve(filename2), 'utf-8');
  const leftTree = parse(leftData, filename1);
  const rightTree = parse(rightData, filename2);
  const difftree = compareTrees(leftTree, rightTree);
  return formate(difftree, formatter);
};

export default genDiff;
