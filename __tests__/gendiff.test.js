import path from 'path';
import { readFileSync } from 'fs';
import { fileURLToPath } from 'url';
import genDiff from '../src/gendiff';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const getFixturesPath = (filename) => path.join(__dirname, '..', '/__fixtures__', filename);
const readFile = (filename) => readFileSync(getFixturesPath(filename), 'utf-8');

const nestedjson1 = getFixturesPath('nested-tree1.json');
const nestedjson2 = getFixturesPath('nested-tree2.json');

const nestedyaml1 = getFixturesPath('nested-tree1.yaml');
const nestedyaml2 = getFixturesPath('nested-tree2.yml');

const stylishResult = readFile('nested-stylish.txt');
const plainResult = readFile('nested-plain.txt');
const jsonResult = readFile('nested-json.txt');

test.each([
  {
    first: nestedjson1,
    second: nestedjson2,
    formatter: 'stylish',
    expected: stylishResult,
  },
  {
    first: nestedyaml1,
    second: nestedyaml2,
    formatter: 'stylish',
    expected: stylishResult,
  },
  {
    first: nestedjson1,
    second: nestedjson2,
    formatter: 'plain',
    expected: plainResult,
  },
  {
    first: nestedyaml1,
    second: nestedyaml2,
    formatter: 'plain',
    expected: plainResult,
  },
  {
    first: nestedjson1,
    second: nestedjson2,
    formatter: 'json',
    expected: jsonResult,
  },
  {
    first: nestedyaml1,
    second: nestedyaml2,
    formatter: 'json',
    expected: jsonResult,
  },
])('$formatter', ({
  first, second, formatter, expected,
}) => {
  expect(genDiff(first, second, formatter)).toBe(expected);
});
