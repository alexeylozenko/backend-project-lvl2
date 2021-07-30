import { 
	getValue, 
	getKey, 
	getType,
	getChildren
} from "../../tree-diff/diff-tree.js";

import _ from 'lodash';

const stringify = (data, depth) => {
	const replacer = '  ';
	if (typeof data !== 'object') {
		return `${data}`;
	}
	const currentIndent = replacer.repeat(depth)
	const bracketIndent = replacer.repeat(depth - 2);
	const lines = Object.entries(data)
		.map(([key, value]) => `${currentIndent}${key}: ${stringify(value, depth + 2)}`);
	return ['{', ...lines, `${bracketIndent}}`].join('\n');
};

const stylishFormate = (tree) => {
	const replacer = '  ';
	const iter = (data, depth) => {
		if (!_.isPlainObject(data)) {
			return `${data}`;
		}
		if (getType(data) !== 'tree') {
			return `${stringify(data, depth)}`;
		}

		const currentIndent = replacer.repeat(depth);
		const indentWithMark = replacer.repeat(depth - 1);
		const bracketIndent = replacer.repeat(depth - 2);
		const children = getChildren(data);
		const lines = children.map((child) => {
			const key = getKey(child);
			if (getType(child) === 'tree') {
				return `${currentIndent}${key}: ${iter(child, depth + 2)}`;
			}
			if (getType(child) === 'changed') {
				const [oldValue, newValue] = getValue(child);
				return `${indentWithMark}- ${key}: ${iter(oldValue, depth + 2)}\n${indentWithMark}+ ${key}: ${iter(newValue, depth + 2)}`;
			}
			const value = getValue(child);
			if (getType(child) === 'removed') {
				return `${indentWithMark}- ${key}: ${iter(value, depth + 2)}`;
			}
			if (getType(child) === 'added') {
				return `${indentWithMark}+ ${key}: ${iter(value, depth + 2)}`;
			}
			if (getType(child) === 'unchanged') {
				return `${currentIndent}${key}: ${iter(value, depth + 2)}`;
			}
		});

		return ['{', ...lines, `${bracketIndent}}`].join('\n');
	};
	return iter(tree, 2);
};

export default stylishFormate;
