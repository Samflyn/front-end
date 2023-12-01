import axios from 'axios';

// for partial global axios configs
// import this and call as the same thing
// the global interceptors won't work on this, as this is a seperate instance from the global one
const instance = axios.create({
  baseURL: 'https://jsonplaceholder.typicode.com',
});

instance.headers.common['Authorization'] = 'Token';

export default instance;
