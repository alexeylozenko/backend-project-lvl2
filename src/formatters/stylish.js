import _ from 'lodash';

const stringify = (data, indent) => {
  const arrToString = (arr) => arr.map((el) => stringify(el, indent, true)).join(', ');
  const objectToString = (obj) => {
    const lines = Object.entries(obj)
      .map(([key, value]) => {
        if (typeof value === 'object') {
          return `${' '.repeat(indent + 4)}${key}: ${stringify(value, indent + 4)}`;
        }
        return `${' '.repeat(indent + 4)}${key}: ${value}`;
      });

    return ['{', ...lines, `${' '.repeat(indent)}}`].join('\n');
  };

  if (Array.isArray(data)) {
    return `[${arrToString(data)}]`;
  }
  if (_.isPlainObject(data)) {
    return objectToString(data, indent);
  }
  return data;
};

const formatStylish = (diffTree, indent = 0) => {
  const lines = diffTree.map((node) => {
    switch (node.type) {
      case 'added':
        return `${' '.repeat(indent + 2)}+ ${node.key}: ${stringify(node.value2, indent + 4)}`;
      case 'removed':
        return `${' '.repeat(indent + 2)}- ${node.key}: ${stringify(node.value1, indent + 4)}`;
      case 'changed':
        return `${' '.repeat(indent + 2)}  ${node.key}: ${formatStylish(node.children, indent + 4)}`;
      case 'unchanged':
        return `${' '.repeat(indent + 2)}  ${node.key}: ${stringify(node.value1, indent + 4)}`;
      case 'updated':
        return [
          `${' '.repeat(indent + 2)}- ${node.key}: ${stringify(node.value1, indent + 4)}`,
          `${' '.repeat(indent + 2)}+ ${node.key}: ${stringify(node.value2, indent + 4)}`,
        ];
      default:
        throw new Error('invalid state data');
    }
  });
  return ['{', ..._.flatten(lines), `${' '.repeat(indent)}}`].join('\n');
};

export default formatStylish;
