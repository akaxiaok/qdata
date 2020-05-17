#! /usr/bin/env node
const xlxs = require('xlsx');
const _ = require('lodash');
const { readFile, writeFile } = require('fs').promises;
const params = process.argv.splice(2);

const [fileName, sheetNumber, value, key, start = 1, end = 100, type] = params;

if (!fileName) {
  throw new Error(`please give file name`);
}

if (!sheetNumber) {
  throw new Error(`please give value sheet number, start is 0`);
}

if (!value) {
  throw new Error(`please give value column`);
}

if (!key) {
  throw new Error(`please give key column`);
}

const dataType = {
  string: 'string',
  number: 'number',
  date: 'date',
  email: 'email'
};

(async function(params) {
  const excelBuffer = await readFile(fileName);

  const workbook = xlxs.read(excelBuffer, {
    type: 'buffer',
    cellHTML: false,
  });
  const sheetName = workbook.SheetNames[sheetNumber];

  const worksheet = workbook.Sheets[sheetName];

  const result = {};
  const asProp = [];
  const mock = {};
  for (let i = parseInt(start, 10); i < parseInt(end, 10) + 1; i++) {

    var keyCell = worksheet[key + i];
    var valueCell = worksheet[value + i];
    var typeCell = worksheet[type + i];

    var keyValue = _.camelCase((keyCell ? keyCell.v : ''));
    var valueValue = (valueCell ? valueCell.v : '');

    result[keyValue] = valueValue;
    asProp.push({ label: valueValue, prop: keyValue });

    if (typeCell && typeCell.v) {
      switch (typeCell.v.toLowerCase()) {
        case dataType.number:
          mock[keyValue + '|1-100'] = 1;
          break;
        case dataType.date:
          mock[keyValue] = '@date("yyyy-MM-dd")';
          break;
        case dataType.email:
          mock[keyValue] = '@email';
          break;
        case dataType.string:
        default:
          mock[keyValue] = '@word(3,8)';
          break;
      }

    }
  }

  writeFile('./prop.json', JSON.stringify(asProp,null,2));
  writeFile('./obj.json', JSON.stringify(result,null,2));
  writeFile('./mock.json', JSON.stringify(mock,null,2));
}());
