# Generator differences
## The tool for finding differences in two configuraion files.
The tool compares two files and display differences in different formats(stylish, plain, json). The tool support files: .json, .yml, .yaml.

### Hexlet tests and linter status:
[![Actions Status](https://github.com/alexeylozenko/backend-project-lvl2/workflows/hexlet-check/badge.svg)](https://github.com/alexeylozenko/backend-project-lvl2/actions)
[![CI](https://github.com/alexeylozenko/backend-project-lvl2/actions/workflows/node.js.yml/badge.svg)](https://github.com/alexeylozenko/backend-project-lvl2/actions/workflows/node.js.yml)
[![Maintainability](https://api.codeclimate.com/v1/badges/66893661e8c6ac820e07/maintainability)](https://codeclimate.com/github/alexeylozenko/backend-project2/maintainability)
[![Test Coverage](https://api.codeclimate.com/v1/badges/66893661e8c6ac820e07/test_coverage)](https://codeclimate.com/github/alexeylozenko/backend-project2/test_coverage)

### Install
```console
make install
```
#### Example install:
[![asciicast](https://asciinema.org/a/428233.svg)](https://asciinema.org/a/428233)
### Usage
```console
gendiff -h
Usage: gendiff [option] <filepath1> <filepath2>

Compares two configuration files and shows a difference

Options:
  -V, --version        output the version number
  -f, --format [type]  output format
  -h, --help           output usage information
```
#### Expample
[![asciicast](https://asciinema.org/a/428238.svg)](https://asciinema.org/a/428238)
