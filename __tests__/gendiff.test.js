import genDiff from "../src/gendiff";

import path from 'path';
import { readFileSync } from 'fs';
import { fileURLToPath } from 'url';
import { file } from "@babel/types";
import { expect, test } from "@jest/globals";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const getFixturesPath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);
const readFile = (filename) => readFileSync(getFixturesPath(filename), 'utf-8');

describe('stylish', () => {

	test('flat json', () => {
		const filename1 = getFixturesPath('flat-tree1.json');
		const filename2 = getFixturesPath('flat-tree2.json');
		const result = readFile('flat-stylish.txt');
		expect(genDiff(filename1, filename2)).toBe(result);
	});

});