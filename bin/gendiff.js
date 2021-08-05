#!/usr/bin/env node

import { Command } from 'commander';

import genDiff from '../src/gendiff.js';

const program = new Command();

program
  .version('1.0.0')
  .description('Compares two configuration files and shows a difference')
  .arguments('<filepath1> <filepath2>')
  .helpOption('-h, --help', 'output usage information')
  .option('-f, --format [stylish, plain, json]', 'output format', 'stylish')
  .action((filepath1, filepath2, formater) => {
    console.log(genDiff(filepath1, filepath2, formater.format));
  })
  .parse();
