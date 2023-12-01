const fs = require('fs');
const path = require('path');

class test {
  static fetch(cb) {
    const p = path.join(
      path.dirname(process.mainModule.filename),
      'data',
      'data.json'
    );
    fs.readFile(p, (error, data) => {
      //second part is registered in event loop and runs after reaching the log('finished)
      console.log('inside');
      if (error) cb([]);
      else cb([{ title: 'one' }, { title: 'two' }]);
    });
  }
}

test.fetch((data) => {
  //below callback runs when fetch return data
  console.log(data);
});

console.log('finished');

//simply put
function testing(params) {
  params('output to other');
}

testing((data) => {
  console.log(data);
});

const arrayList = [];

const id = 1;

const onlyId = arrayList.filter((f) => f.id === id);

const exceptId = arrayList.filter((f) => f.id !== id);
