'use strict';

test = 'test';
let test1;
const test2 = 1;
var test;

let ame = new Function('a', 'b', 'return a * b;');

console.log(ame(1, 2));

var test = document.getElementById('add');

test.addEventListener('click', add);

var testt = [1, 2, 2];

function add() {
  console.log('inside add');
}

const t = () => {
  console.log('t');
};

var bbody = document.body;

var data = [bbody.querySelectorAll('li')];

const numbers = [1, 2, 3, 4, 5];

var news = numbers.map((num, index, numbers) => (num += 10));

class something {
  static t;
  static init() {
    this.t = 'on class';
  }
}

function Something() {
  this.a = 'a';
  this.b = 'b';
}

const aa = new Something();
