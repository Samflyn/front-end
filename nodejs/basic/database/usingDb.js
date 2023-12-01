const db = require('./mysql');
const { response } = require('express');

db.execute('SELECT * FROM PRODUCTS')
  .then((result) => {
    console.log(result[0], result[1]); //data and metadata
    return result;
  })
  .then(([rows, metaData]) => {
    console.log(rows);
  })
  .catch((error) => {
    console.log(error);
  });

//mysql2 removes sql queries in input values

db.execute('INSERT INTO PRODUCTS (title, price, quantity) VALUES (?, ?, ?)', [
  title,
  price,
  quantity,
])
  .then(() => {
    response.redirect('/');
  })
  .catch((error) => {
    console.log(error);
  });
