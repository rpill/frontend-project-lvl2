import stylish from './stylish.js';

const formatters = {
  stylish,
};

export default (data, formatName) => formatters[formatName](data);
