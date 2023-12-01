class people {
  constructor(name, status) {
    (this.name = name), (this.status = status);
  }
}

let peoples = [];

exports.getPosts = (request, response, next) => {
  return response.status(200).json(peoples);
};

exports.postPost = (request, response, next) => {
  const name = request.body.name;
  const status = request.body.status;
  peoples.push(new people(name, status));
  response.status(201).json({
    message: 'added to list',
    people: { name: name, status: status, time: new Date().toISOString() },
  });
};
