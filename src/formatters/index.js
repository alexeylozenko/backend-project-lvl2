import plainFormate from './plain.js';
import stylishFormate from './stylish.js';

const format = (data, formatName) => {
  if (formatName === 'plain') {
    return plainFormate(data);
  }
  if (formatName === 'stylish') {
    return stylishFormate(data);
  }
  return JSON.stringify(data);
};

export default format;
