import plainFormate from './plain.js';
import stylishFormate from './stylish.js';

const format = (data, formater) => {
  if (formater === 'plain') {
    return plainFormate(data);
  }
  if (formater === 'stylish') {
    return stylishFormate(data);
  }
  return JSON.stringify(data);
};

export default format;
