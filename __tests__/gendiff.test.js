import path from 'path';
import { readFileSync } from 'fs';
import { fileURLToPath } from 'url';
import genDiff from '../src/gendiff';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const getFixturesPath = (filename) => path.join(__dirname, '..', '__tests__/__fixtures__', filename);
const readFile = (filename) => readFileSync(getFixturesPath(filename), 'utf-8');

const flatjson1 = getFixturesPath('flat-tree1.json');
const flatjson2 = getFixturesPath('flat-tree2.json');

const nestedjson1 = getFixturesPath('nested-tree1.json');
const nestedjson2 = getFixturesPath('nested-tree2.json');

const flatyaml1 = getFixturesPath('flat-tree1.yaml');
const flatyaml2 = getFixturesPath('flat-tree2.yml');

const nestedyaml1 = getFixturesPath('nested-tree1.yaml');
const nestedyaml2 = getFixturesPath('nested-tree2.yml');

describe('stylish', () => {
  test('flat json', () => {
    const result = readFile('flat-stylish.txt');
    expect(genDiff(flatjson1, flatjson2)).toBe(result);
  });

  test('nested json', () => {
    const result = readFile('nested-stylish.txt');
    expect(genDiff(nestedjson1, nestedjson2)).toBe(result);
  });

  test('flat yaml', () => {
    const result = readFile('flat-stylish.txt');
    expect(genDiff(flatyaml1, flatyaml2)).toBe(result);
  });

  test('nested yaml', () => {
    const result = readFile('nested-stylish.txt');
    expect(genDiff(nestedyaml1, nestedyaml2)).toBe(result);
  });
});

describe('plain', () => {
  test('flat json', () => {
    const result = readFile('flat-plain.txt');
    expect(genDiff(flatjson1, flatjson2, 'plain')).toBe(result);
  });

  test('nested json', () => {
    const result = readFile('nested-plain.txt');
    expect(genDiff(nestedjson1, nestedjson2, 'plain')).toBe(result);
  });

  test('flat yaml', () => {
    const result = readFile('flat-plain.txt');
    expect(genDiff(flatyaml1, flatyaml2, 'plain')).toBe(result);
  });

  test('nested yaml', () => {
    const result = readFile('nested-plain.txt');
    expect(genDiff(nestedyaml1, nestedyaml2, 'plain')).toBe(result);
  });
});

describe('json', () => {
  test('flat json', () => {
    const result = readFile('flat-json.txt');
    expect(genDiff(flatjson1, flatjson2, 'json')).toBe(result);
  });

  test('nested json', () => {
    const result = readFile('nested-json.txt');
    expect(genDiff(nestedjson1, nestedjson2, 'json')).toBe(result);
  });

  test('flat yaml', () => {
    const result = readFile('flat-json.txt');
    expect(genDiff(flatyaml1, flatyaml2, 'json')).toBe(result);
  });

  test('nested yaml', () => {
    const result = readFile('nested-json.txt');
    expect(genDiff(nestedyaml1, nestedyaml2, 'json')).toBe(result);
  });
});
