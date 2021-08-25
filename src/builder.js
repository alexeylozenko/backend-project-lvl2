import _ from 'lodash';

const buildTree = (data1, data2) => {
  const keys = _.union(Object.keys(data1), Object.keys(data2));
  return _.sortBy(keys)
    .map((key) => {
      if (!_.has(data2, key)) {
        return {
          type: 'removed', key, value1: data1[key],
        };
      }
      if (!_.has(data1, key)) {
        return {
          type: 'added', key, value2: data2[key],
        };
      }
      if (_.isPlainObject(data1[key]) && _.isPlainObject(data2[key])) {
        return {
          type: 'changed', key, value1: data1[key], value2: data2[key], children: buildTree(data1[key], data2[key]),
        };
      }
      if (!_.isEqual(data1[key], data2[key])) {
        return {
          type: 'updated', key, value1: data1[key], value2: data2[key],
        };
      }
      return {
        type: 'unchanged', key, value1: data1[key], value2: data2[key],
      };
    });
};

export default buildTree;
