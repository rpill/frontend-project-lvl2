import { test, expect } from '@jest/globals';
import fs from 'fs';
import path, { dirname } from 'path';
import { fileURLToPath } from 'url';
import genDiff from '../src/index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);
const readFile = (filename) => fs.readFileSync(getFixturePath(filename), 'utf-8');

describe('gendiff flat', () => {
  test('gendiff json', () => {
    const expected = readFile('result.txt');

    const actual = genDiff(getFixturePath('before.json'), getFixturePath('after.json'), 'stylish');
    expect(actual).toBe(expected);
  });

  test('gendiff yml', () => {
    const expected = readFile('result.txt');

    const actual = genDiff(getFixturePath('before.yml'), getFixturePath('after.yml'), 'stylish');
    expect(actual).toBe(expected);
  });
});

describe('gendiff complex', () => {
  test('gendiff json', () => {
    const expected = readFile('resultStylish.txt');

    const actual = genDiff(getFixturePath('beforeComplex.json'), getFixturePath('afterComplex.json'), 'stylish');
    expect(actual).toBe(expected);
  });

  test('gendiff yml', () => {
    const expected = readFile('resultStylish.txt');

    const actual = genDiff(getFixturePath('beforeComplex.yml'), getFixturePath('afterComplex.yml'), 'stylish');
    expect(actual).toBe(expected);
  });
});
