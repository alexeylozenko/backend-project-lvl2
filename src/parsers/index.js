import path from 'path';
import yaml from 'js-yaml';

const parse = (data, filename) => {
  if (path.extname(filename) === '.yaml' || path.extname(filename) === '.yml') {
    return yaml.load(data);
  }
  return JSON.parse(data);
};

export default parse;
