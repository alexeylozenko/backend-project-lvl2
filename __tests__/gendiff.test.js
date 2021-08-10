import path from 'path';
import { readFileSync } from 'fs';
import { fileURLToPath } from 'url';
import genDiff from '../src/gendiff';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const getFixturesPath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);
const readFile = (filename) => readFileSync(filename, 'utf-8');

const nestedjson1 = getFixturesPath('nested-tree1.json');
const nestedyaml2 = getFixturesPath('nested-tree2.yaml');
const nestedyml2 = getFixturesPath('nested-tree2.yml');

const stylishResult = getFixturesPath('nested-stylish.txt');
const plainResult = getFixturesPath('nested-plain.txt');
const jsonResult = getFixturesPath('nested-json.txt');

test.each([
  {
    first: nestedjson1,
    second: nestedyaml2,
    formatter: 'stylish',
    expected: stylishResult,
  },
  {
    first: nestedjson1,
    second: nestedyml2,
    formatter: 'plain',
    expected: plainResult,
  },
  {
    first: nestedjson1,
    second: nestedyaml2,
    formatter: 'json',
    expected: jsonResult,
  }
])('$formatter', ({
  first, second, formatter, expected,
}) => {
	const expectedValue = readFile(expected);
  expect(genDiff(first, second, formatter)).toBe(expectedValue);
});
