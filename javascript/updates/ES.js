///////////////////////////// ------ES12---------///////////////////////////

// private methods
class Person {
  #setType() {
    console.log('I am Private');
  }

  show() {
    this.#setType();
  }
}

const personObj = new Person();
personObj.show();
personObj.setType();

// Promise.any() and AggregateError
// whichever resolves first is taken
// if none of the promises resolve it throws an AggregateError exception
const p1 = new Promise((resolve, reject) => {
  setTimeout(() => resolve('A'), Math.floor(Math.random() * 1000));
});
const p2 = new Promise((resolve, reject) => {
  setTimeout(() => resolve('B'), Math.floor(Math.random() * 1000));
});
const p3 = new Promise((resolve, reject) => {
  setTimeout(() => resolve('C'), Math.floor(Math.random() * 1000));
});

const p = new Promise((resolve, reject) => reject());

try {
  (async function () {
    const result = await Promise.any([p]);
    console.log(result);
  })();
} catch (error) {
  console.log(error.errors);
}

// Logical Assignment Operator
// x && (x = y)
// if x is a truthy value, it is assigned with the value of y
var x = 1;
var y = 2;
x &&= y;
console.log(x);

// x || (x = y)
// if assignment operation happens only if x is a falsy value
var x = 1;
var y = 2;
x ||= y;
console.log(x);

// x = x ?? (x = y)
// if the value of a is null or undefined
// the right hand side of ?? is evaluated and assigned to b
var x;
var y = 2;
x ??= y;
console.log(x);

///////////////////////////// ------ES11---------///////////////////////////

// private feilds
class car {
  #body = 'aluminium';
  type() {
    console.log(this.#body);
  }
}

// this wont fail if one of the promises are rejected
const promiseOne = new Promise((resolve, reject) => setTimeout(resolve, 3000));
const promiseTwo = new Promise((resolve, reject) => setTimeout(reject, 3000));
Promise.allSettled([promiseOne, promiseTwo]).then((data) => console.log(data));

let test = {};
// Optional Chaining Operator wont throw error when there is no property
// instead returns undefined
let data = test.name?.test;
console.log(data);

// dynamic imports
// import('./greetingsModule.js').then((greet) => {
//   greet.hello();
// });

///////////////////////////// ------ES10---------///////////////////////////

// can also set depth
let array1 = ['a', 'b', [1, 2, 3, [1, 1, 1, 1]]];
console.log(array1.flat(Infinity));

// with flat and map with depth of 1
let array2 = [1, 2, 3, 4];
console.log(array2.flatMap((x) => [x + 1]));

// creates object from iteerableu
const obj = { a: 1, b: 2, c: 3 };
console.log(Object.entries(obj));
