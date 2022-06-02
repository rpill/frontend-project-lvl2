import yml from 'js-yaml';

const parsers = {
  json: JSON.parse,
  yml: yml.load,
  yaml: yml.load,
};

export default (data, type) => parsers[type](data);
