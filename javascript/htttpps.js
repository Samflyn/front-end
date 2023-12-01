export function testing() {
  console.log('works');
}

export default class {
  //ignores name when default is used
  workss() {
    console.log('workss');
  }
}

var nameing = 'sam';

function sendRequest(method, url, data) {
  // const promise = new Promise((resolve, reject) => {
  // const xhr = new XMLHttpRequest();
  // xhr.setRequestHeader("Content-Type", "application/json");

  //   xhr.open(method, url);

  //   xhr.responseType = "json";

  //   xhr.onload = function () {
  //     if (xhr.status >= 200 && xhr.status < 300) {
  //       resolve(xhr.response);
  //     } else {
  //       reject(new Error("failed"));
  //     }
  //     // const dataList=JSON.parse(xhr.response);
  //     // const dataList = xhr.response;
  //   };

  //   xhr.onerror = function () {
  //     //only when request fails not for server fails, not internet
  //     reject("failed");
  //   };

  //   xhr.send(JSON.stringify(data));
  // });

  // return promise;

  return fetch(url, {
    method: method,
    // body: JSON.stringify(data),
    body: data,
    // headers: {
    //   "Content-Type": "application/json",
    // },
  })
    .then((response) => {
      if (response.status >= 200 && response.status < 300) {
        return response.json();
      } else {
        return response.json().then((error) => {
          console.log(error);
          throw new Error('server failed');
        });
      }
    })
    .catch((error) => {
      console.log(error);
      throw new Error('failed');
    });
}

async function getRequest() {
  try {
    const data = await sendRequest(
      'GET',
      'https://jsonplaceholder.typicode.com/posts'
    );
    console.log(data);
  } catch (error) {
    console.log(error);
  }
}

async function sendData(title, content) {
  const userId = Math.random();
  const post = {
    title: title,
    body: content,
    userId: userId,
  };
  const formData = new FormData();
  formData.append('title', title);
  formData.append('content', content);
  formData.append('userId', userId);
  sendRequest(
    'POST',
    'https://jsonplaceholder.typicode.com/posts',
    post,
    formData
  );
}

getRequest();

sendData('test', 'testing');

const btn = document.querySelector('section div ul li #\\31');

// btn.addEventListener("click", () => console.log("test"));
btn.addEventListener('click', (event) => {
  console.log(event.target);
});
