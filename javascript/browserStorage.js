const userId = 1213;

let db;

// cannot save object to storage, can use json to store object

localStorage.setItem('uId', '1213');

sessionStorage.setItem('uId', '1213');

// cookies //
// will add to cookie list not replace,
// can only be added if page is served from server not file protocol

document.cookie = `uid=${userId}; max-age=5`;

// indexedDb //

const dbRequest = indexedDB.open('users', 1);

dbRequest.onsuccess = function (event) {
  db = event.target.result;
};

dbRequest.onupgradeneeded = function (event) {
  //onupgradeneeded will only run when the version changes or the db creation
  db = event.target.result;
  const objStore = db.createObjectStore('lists', { keyPath: 'id' }); //key which every item has and can be identified with
  objStore.transaction.complete = function (event) {
    const store = db.transaction('lists', 'readwrite').objStore('lists');
    store.add({ id: '1', title: 'first one' });
  };
};

dbRequest.onerror = function (event) {};

//to read the data

function read() {
  const store = db.transaction('lists', 'readwrite').objStore('lists');
  const request = store.get('1');
  request.onsuccess = function () {
    console.log(request.result);
  };
}

//or use IDB.js as third party api
