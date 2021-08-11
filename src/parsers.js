import yaml from 'js-yaml';

const isYamlFormat = (format) => (!!((format === 'yaml' || format === 'yml')));

const parse = (data, extname) => ((isYamlFormat(extname)) ? yaml.load(data) : JSON.parse(data));

export default parse;
