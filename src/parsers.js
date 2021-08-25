import yaml from 'js-yaml';

const mapping = {
  'json': JSON.parse,
  'yaml': yaml.load,
  'yml': yaml.load,
};

const chooseParser = (extname) => mapping[extname];

const parse = (data, extname) => {
  const parseData = chooseParser(extname);
  return parseData(data);
};

export default parse;
