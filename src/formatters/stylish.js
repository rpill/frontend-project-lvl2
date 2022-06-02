import _ from 'lodash';

const indentSize = 4;
const prefixIndentSize = 2;

const spacer = ' ';
const separator = ':';

const frameChars = {
  initial: '{',
  final: '}',
};

const prefixChars = {
  default: ' ',
  minus: '-',
  plus: '+',
};

const getIndent = (depth) => spacer.repeat(indentSize * depth);
const getPrefix = (type) => spacer.repeat(prefixIndentSize) + prefixChars[type] + spacer;

const stringify = (data, depth, getString) => {
  if (!_.isObject(data)) return data;
  const newDepth = depth + 1;
  const entries = Object.entries(data);
  const strings = entries.flatMap(([key, value]) => [getString(key, stringify(value, newDepth, getString), newDepth, 'default')]);
  const framedStrings = [frameChars.initial, ...strings, getIndent(newDepth) + frameChars.final];
  return framedStrings.join('\n');
};

const getString = (key, value, depth, type) => `${getIndent(depth)}${getPrefix(type)}${key}${separator}${spacer}${stringify(value, depth, getString)}`;

const mapping = {
  unchanged: (node, depth) => getString(node.key, node.value, depth, 'default'),
  removed: (node, depth) => getString(node.key, node.value, depth, 'minus'),
  added: (node, depth) => getString(node.key, node.value, depth, 'plus'),
  updated: (node, depth) => [getString(node.key, node.oldValue, depth, 'minus'), getString(node.key, node.newValue, depth, 'plus')],
  nested: (node, depth, iterFormat) => getString(node.key, iterFormat(node.children, depth + 1), depth, 'default'),
};

export default (data) => {
  const iterFormat = (tree, depth) => {
    const strings = tree.flatMap((node) => mapping[node.type](node, depth, iterFormat));
    const framedStrings = [frameChars.initial, ...strings, getIndent(depth) + frameChars.final];
    return framedStrings.join('\n');
  };

  return iterFormat(data, 0);
};
