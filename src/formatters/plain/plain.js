import _ from 'lodash';

const formateValue = (data) => {
  if (_.isPlainObject(data)) {
    return '[complex value]';
  }
  if (typeof data === 'string') {
    return `'${data}'`;
  }
  return data;
};

const plainFormate = (tree, nestedKeys = []) => tree
  .map((node) => {
    const str = `Property '${[...nestedKeys, node.key].join('.')}'`;
    switch(node.type) {
      case 'changed':
        return plainFormate(node.children, [...nestedKeys, node.key]);
      case 'removed':
        return `${str} was removed`;
      case 'added':
        return `${str} was added with value: ${formateValue(node.newValue)}`;
      case 'updated':
        return `${str} was updated. From ${formateValue(node.oldValue)} to ${formateValue(node.newValue)}`;
      case 'unchanged':
        return null;
      default:
        throw new Error('invalid state data');
    }
  }).filter((line) => line !== null).join('\n');

export default plainFormate;
