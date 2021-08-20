import _ from 'lodash';

const getIndent = (depth) => '    '.repeat(depth);

const stringify = (data, depth) => {
  const currentIndent = getIndent(depth);
  const newIndent = getIndent(depth + 1);
  const arrToString = (arr) => arr.map((el) => stringify(el, depth)).join(', ');
  const objectToString = (obj) => {
    const lines = Object.entries(obj)
      .map(([key, value]) => {
        if (typeof value === 'object') {
          return `${newIndent}${key}: ${stringify(value, depth + 1)}`;
        }
        return `${newIndent}${key}: ${value}`;
      });

    return ['{', ...lines, `${currentIndent}}`].join('\n');
  };

  if (Array.isArray(data)) {
    return `[${arrToString(data)}]`;
  }
  if (_.isPlainObject(data)) {
    return `${objectToString(data, depth)}`;
  }
  return `${data}`;
};

const formatStylish = (diffTree) => {
  const format = (tree, depth) => {
    const currentIndent = getIndent(depth);
    const newIndent = getIndent(depth + 1);
    const indentWithMark = newIndent.slice(2);
    const lines = tree.map((node) => {
      switch (node.type) {
        case 'added':
          return `${indentWithMark}+ ${node.key}: ${stringify(node.value2, depth + 1)}`;
        case 'removed':
          return `${indentWithMark}- ${node.key}: ${stringify(node.value1, depth + 1)}`;
        case 'changed':
          return `${newIndent}${node.key}: ${format(node.children, depth + 1)}`;
        case 'unchanged':
          return `${newIndent}${node.key}: ${stringify(node.value1, depth + 1)}`;
        case 'updated':
          return [
            `${indentWithMark}- ${node.key}: ${stringify(node.value1, depth + 1)}`,
            `${indentWithMark}+ ${node.key}: ${stringify(node.value2, depth + 1)}`,
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
