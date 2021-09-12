import _ from 'lodash';

const indent = (depth, quantity = 4) => ' '.repeat(depth * quantity);

const stringify = (data, depth) => {
  const objectToString = (obj) => {
    const lines = Object.entries(obj)
      .map(([key, value]) => `${indent(depth)}${key}: ${stringify(value, depth + 1)}`);

    return ['{', ...lines, `${indent(depth - 1)}}`].join('\n');
  };
  if (_.isPlainObject(data)) {
    return `${objectToString(data, depth)}`;
  }
  return String(data);
};

const formatStylish = (diffTree) => {
  const format = (tree, depth) => {
    const lines = tree.map((node) => {
      switch (node.type) {
        case 'added':
          return `${indent(depth - 1)}  + ${node.key}: ${stringify(node.value2, depth + 1)}`;
        case 'removed':
          return `${indent(depth - 1)}  - ${node.key}: ${stringify(node.value1, depth + 1)}`;
        case 'changed':
          return `${indent(depth)}${node.key}: ${format(node.children, depth + 1)}`;
        case 'unchanged':
          return `${indent(depth)}${node.key}: ${stringify(node.value1, depth + 1)}`;
        case 'updated':
          return [
            `${indent(depth - 1)}  - ${node.key}: ${stringify(node.value1, depth + 1)}`,
            `${indent(depth - 1)}  + ${node.key}: ${stringify(node.value2, depth + 1)}`,
          ];
        default:
          throw new Error('invalid state data');
      }
    });
    return ['{', ..._.flatten(lines), `${indent(depth - 1)}}`].join('\n');
  };
  return format(diffTree, 1);
};

export default formatStylish;
