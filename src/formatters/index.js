import formatPlain from './plain.js';
import formatStylish from './stylish.js';

const format = (data, formatName) => {
  if (formatName === 'plain') {
    return formatPlain(data);
  }
  if (formatName === 'stylish') {
    return formatStylish(data);
  }
  return JSON.stringify(data);
};

export default format;
