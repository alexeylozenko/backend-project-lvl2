import path from 'path';
import { readFileSync } from 'fs';
import { fileURLToPath } from 'url';
import genDiff from '../src/gendiff';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const getFixturesPath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);
const readFile = (filename) => readFileSync(filename, 'utf-8');

test.each(['stylish', 'plain', 'json'])('%s', (formatter) => {
  const filepath1 = getFixturesPath('nested-tree1.json');
  const filepath2 = getFixturesPath('nested-tree2.yml');
  const expectedValue = readFile(getFixturesPath(`nested-${formatter}.txt`));
  expect(genDiff(filepath1, filepath2, formatter)).toBe(expectedValue);
});
