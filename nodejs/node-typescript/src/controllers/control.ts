import { RequestHandler } from 'express';
import { User } from '../models/user';

const userList: User[] = [];

export const create: RequestHandler = (request, response, next) => {
  const addList = new User(
    (request.body as { name: string }).name,
    (request.body as { age: number }).age
  );
  userList.push(addList);

  response.status(201).json({ message: 'Created', user: addList });
};

export const getList: RequestHandler = (request, response, next) => {
  response.status(200).json(userList);
};

export const getOne: RequestHandler<{ name: string }> = (
  request,
  response,
  next
) => {
  const reqName = request.params.name;
  const i = userList.findIndex((list) => list.name === reqName);
  if (i) {
    return response.status(200).json(userList[i]);
  }
  return response
    .status(400)
    .json({ message: `cannot find user with name ${reqName}` });
};
