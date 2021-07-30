import _ from 'lodash';
import {
  getChildren, getKey, getType, getValue,
} from '../../tree-diff/diff-tree.js';

const formateValue = (data) => {
  if (_.isPlainObject(data)) {
    return '[complex value]';
  }
  if (typeof data === 'string') {
    return `'${data}'`;
  }
  return `${data}`;
};

const plainFormate = (tree) => {
  const iter = (data, pathKey) => {
    if (getType(data) === 'changed') {
      const [oldValue, newValue] = getValue(data);
      return `Property '${pathKey}' was updated. From ${formateValue(oldValue)} to ${formateValue(newValue)}`;
    }
    if (getType(data) === 'removed') {
      return `Property '${pathKey}' was removed`;
    }
    if (getType(data) === 'added') {
      const value = getValue(data);
      return `Property '${pathKey}' was added with value: ${formateValue(value)}`;
    }
    const children = getChildren(data).filter(({ type }) => type !== 'unchanged');
    return children.map((child) => {
      const key = getKey(child);
      const currentKey = (pathKey) ? `${pathKey}.${key}` : `${key}`;
      return `${iter(child, currentKey)}`;
    }).join('\n');
  };
  return iter(tree);
};

export default plainFormate;
