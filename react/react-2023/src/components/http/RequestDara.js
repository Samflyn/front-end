const RequestData = () => {
//   function fetchMoviesHandler(params) {
//     fetch('http://localhost:8080')
//       .then((response) => response.json())
//       .then((data) => console.log(data))
//       .catch(console.log('error'));
//   }

  try {
    async function fetchMoviesHandlerAsync(params) {
      const response = await fetch('http://localhost:8080');
      const data = await response.json();
      console.log(data);
    }
  } catch (error) {}

  return <></>;
};

export default RequestData;
