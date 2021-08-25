import _ from 'lodash';

const indent = (depth, mark = '  ') => ((depth !== 0)
  ? '  '.repeat(depth * 2 - 1) + mark
  : '');

const stringify = (data, depth) => {
  const currentIndent = indent(depth);
  const newIndent = indent(depth + 1);
  const objectToString = (obj) => {
    const lines = Object.entries(obj)
      .map(([key, value]) => `${newIndent}${key}: ${stringify(value, depth + 1)}`);

    return ['{', ...lines, `${currentIndent}}`].join('\n');
  };
  if (_.isPlainObject(data)) {
    return `${objectToString(data, depth)}`;
  }
  return String(data);
};

const formatStylish = (diffTree) => {
  const format = (tree, depth) => {
    const currentIndent = indent(depth);
    const lines = tree.map((node) => {
      switch (node.type) {
        case 'added':
          return `${indent(depth + 1, '+ ')}${node.key}: ${stringify(node.value2, depth + 1)}`;
        case 'removed':
          return `${indent(depth + 1, '- ')}${node.key}: ${stringify(node.value1, depth + 1)}`;
        case 'changed':
          return `${indent(depth + 1)}${node.key}: ${format(node.children, depth + 1)}`;
        case 'unchanged':
          return `${indent(depth + 1)}${node.key}: ${stringify(node.value1, depth + 1)}`;
        case 'updated':
          return [
            `${indent(depth + 1, '- ')}${node.key}: ${stringify(node.value1, depth + 1)}`,
            `${indent(depth + 1, '+ ')}${node.key}: ${stringify(node.value2, depth + 1)}`,
          ];
        default:
          throw new Error('invalid state data');
      }
    });
    return ['{', ..._.flatten(lines), `${currentIndent}}`].join('\n');
  };
  return format(diffTree, 0);
};

export default formatStylish;
