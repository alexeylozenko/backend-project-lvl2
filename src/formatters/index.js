import plainFormate from './plain/plain.js';
import stylishFormate from './stylish/stylish.js';

const formate = (data, formater) => {
  if (formater === 'plain') {
    return plainFormate(data);
  }
  if (formater === 'stylish') {
    return stylishFormate(data);
  }
  return JSON.stringify(data);
};

export default formate;
