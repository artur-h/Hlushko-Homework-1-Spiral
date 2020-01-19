'use strict';

let getInputValues = () => {
  let colsInput = document.getElementById('cols-input');
  let rowsInput = document.getElementById('rows-input');

  if (document.body.querySelector('table')) {
    document.body.querySelector('table').remove();
  }

  createArray(+colsInput.value, +rowsInput.value);
};

let createRandomParameters = () => {
  let randomCols = 1 + Math.random() * (20 + 1 - 1);
  let randomRows = 1 + Math.random() * (20 + 1 - 1);

  if (document.body.querySelector('table')) {
    document.body.querySelector('table').remove();
  }

  createArray(Math.floor(randomCols), Math.floor(randomRows));
};

let createArray = (cols, rows) => {
  let arr = [];

  for (let i = 0; i < rows; i++) {  // create two-dimensional array
    arr[i] = [];
  }

  for (let j = 0; j < rows; j++)    // fill the two-dimensional array with zeros, so then we could know where the borders of our array
    for (let i = 0; i < cols; i++)  // are, i.e. where the array starts and where the arrays ends.
      arr[j][i] = 0;

  for (let value = 1, column = -1, stepColumn = 1, row = 0, stepRow = 0; value <= cols * rows; value++) {  // loop for filling two-dimensional
                                                                                                           // array with values.
    column += stepColumn;    // make a step in predefined direction.
    row += stepRow;

    if (column < 0 || row < 0 || column === cols || row === rows || arr[row][column] !== 0) { // if we need to change direction,
      value--;                                                                                // firstly we decrease the value,
      column -= stepColumn;                                                                   // return step to the previous value
      row -= stepRow;

      let temporaryVariable = stepColumn;                                                     // and then change the direction.
      stepColumn = stepRow;
      stepRow = -temporaryVariable;

      continue;        // repeat the iteration with new direction applied.
    }

    arr[row][column] = value;
  }

  showArray(cols, rows, arr);
};

let showArray = (cols, rows, arr) => {
  let table = document.createElement('table');

  for (let i = 0; i < rows; i++) {
    let tr = document.createElement('tr');

    for (let j = 0; j < cols; j++) {
      let td = document.createElement('td');

      td.innerHTML = `${arr[i][j]}`;

      tr.append(td);
    }

    table.append(tr);
  }

  document.body.append(table);
};