import { readFileSync } from 'fs';
import path from 'path';
import _ from 'lodash';
import { makeNode, makeTree } from './tree-diff/diff-tree.js';
import formate from './formatters/index.js';

const compareTrees = (leftTree, rightTree) => {
	const iter = (leftData, rightData) => {
		const leftKey = Object.keys(leftData);
		const rightKey = Object.keys(rightData);
		const keys = _.sortedUniq([...leftKey, ...rightKey].sort())
		const children = keys.map((key) => {
			const leftValue = leftData[key];
			const rightValue = rightData[key];
	
			if (!_.has(leftData, key)) {
				return makeNode(key, rightValue, 'added');
			}
			if (!_.has(rightData, key)) {
				return makeNode(key, leftValue, 'removed');
			}
			if (JSON.stringify(leftValue) === JSON.stringify(rightValue)) {
				return makeNode(key, leftValue, 'unchanged');
			}
			if(typeof leftValue === 'object' && typeof rightValue === 'object') {
				return makeTree(key, iter(leftValue, rightValue));
			}
			return makeNode(key, [leftValue, rightValue], 'changed');
		});
		return children;
	};
	return makeTree('', iter(leftTree, rightTree));
};

const genDiff = (filename1, filename2, formatter = 'stylish') => {
	const leftData = readFileSync(path.resolve(filename1), 'utf-8');
	const rightData = readFileSync(path.resolve(filename2), 'utf-8');
	const leftTree = JSON.parse(leftData);
	const rightTree = JSON.parse(rightData);
	const difftree = compareTrees(leftTree, rightTree);
	return formate(difftree, formatter);
};

export default genDiff;
