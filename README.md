# Generator differences
### Hexlet tests and linter status:
[![Actions Status](https://github.com/alexeylozenko/backend-project-lvl2/workflows/hexlet-check/badge.svg)](https://github.com/alexeylozenko/backend-project-lvl2/actions)
[![CI](https://github.com/alexeylozenko/backend-project-lvl2/actions/workflows/node.js.yml/badge.svg)](https://github.com/alexeylozenko/backend-project-lvl2/actions/workflows/node.js.yml)
[![Maintainability](https://api.codeclimate.com/v1/badges/66893661e8c6ac820e07/maintainability)](https://codeclimate.com/github/alexeylozenko/backend-project2/maintainability)
[![Test Coverage](https://api.codeclimate.com/v1/badges/66893661e8c6ac820e07/test_coverage)](https://codeclimate.com/github/alexeylozenko/backend-project2/test_coverage)

## The tool for finding differences in two configuraion files.
The tool compares two files and display differences in some formats(**stylish**, **plain**, **json**). The tool supports files: **.json**, **.yml**, **.yaml**.

### **Install**
#### **Requirements**:
- Nodejs lts version >= 14
- npm
- make
```console
make install
```

### **Usage**
Tool has some formatters: **stylish**, **plain**, **json** (**default: stylish**).Tool supports some formats of file: **.json**, **.yml**, **.yaml**. Examples are [here](https://github.com/alexeylozenko/backend-project2#Expample)
```console
gendiff -h
Usage: gendiff [options] <filepath1> <filepath2>

Compares two configuration files and shows a difference

Options:
  -V, --version                        output the version number
  -f, --format [stylish, plain, json]  output format (default: "stylish")
  -h, --help                           output usage information
```
#### Expample
[![asciicast](https://asciinema.org/a/428238.svg)](https://asciinema.org/a/428238)
