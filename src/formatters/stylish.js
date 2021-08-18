import _ from 'lodash';

const stringify = (data, depth) => {
  const arrToString = (arr) => arr.map((el) => stringify(el, depth)).join(', ');
  const objectToString = (obj) => {
    const lines = Object.entries(obj)
      .map(([key, value]) => {
        if (typeof value === 'object') {
          return `${' '.repeat(depth + 4)}${key}: ${stringify(value, depth + 4)}`;
        }
        return `${' '.repeat(depth + 4)}${key}: ${value}`;
      });

    return ['{', ...lines, `${' '.repeat(depth)}}`].join('\n');
  };

  if (Array.isArray(data)) {
    return `[${arrToString(data)}]`;
  }
  if (_.isPlainObject(data)) {
    return objectToString(data, depth);
  }
  return data;
};

const formatStylish = (diffTree) => {
  const format = (tree, depth) => {
    const lines = tree.map((node) => {
      switch (node.type) {
        case 'added':
          return `${' '.repeat(depth + 2)}+ ${node.key}: ${stringify(node.value2, depth + 4)}`;
        case 'removed':
          return `${' '.repeat(depth + 2)}- ${node.key}: ${stringify(node.value1, depth + 4)}`;
        case 'changed':
          return `${' '.repeat(depth + 2)}  ${node.key}: ${format(node.children, depth + 4)}`;
        case 'unchanged':
          return `${' '.repeat(depth + 2)}  ${node.key}: ${stringify(node.value1, depth + 4)}`;
        case 'updated':
          return [
            `${' '.repeat(depth + 2)}- ${node.key}: ${stringify(node.value1, depth + 4)}`,
            `${' '.repeat(depth + 2)}+ ${node.key}: ${stringify(node.value2, depth + 4)}`,
          ];
        default:
          throw new Error('invalid state data');
      }
    });
    return ['{', ..._.flatten(lines), `${' '.repeat(depth)}}`].join('\n');
  };
  return format(diffTree, 0);
};

export default formatStylish;
