import yaml from 'js-yaml';

const parse = (data, extname) => ((extname === 'yaml' || extname === 'yml') ? yaml.load(data) : JSON.parse(data));

export default parse;
