import { Express } from 'express-serve-static-core';
import { Request, Response } from 'express';
import * as dao from './dao.js';
import { User } from '../types.js';
let currentUser: User | null = null;
export default function UserRoutes(app: Express) {
  const createUser = (req: Request, res: Response) => {};
  const deleteUser = (req: Request, res: Response) => {};
  const findAllUsers = (req: Request, res: Response) => {};
  const findUserById = (req: Request, res: Response) => {};
  const updateUser = (req: Request, res: Response) => {
    const userId = req.params.userId;
    const userUpdates = req.body;
    if (
      !userId ||
      userId === undefined ||
      !userUpdates ||
      userUpdates === undefined
    ) {
      res.status(400).json({ error: 'userId and userUpdates are required' });
      return;
    }
    dao.updateUser(userId, userUpdates);
    const foundUser = dao.findUserById(userId);
    if (!foundUser || foundUser === undefined) {
      res.status(401).json({ message: 'Invalid credentials' });
      return;
    }
    currentUser = foundUser;
    res.json(currentUser);
  };
  const signup = (req: Request, res: Response) => {
    const user = dao.findUserByUsername(req.body.username);
    if (user) {
      res.status(400).json({ message: 'Username already in use' });
      return;
    }
    currentUser = dao.createUser(req.body);
    res.json(currentUser);
  };
  const signin = (req: Request, res: Response) => {
    const { username, password } = req.body;
    const foundUser = dao.findUserByCredentials(username, password);
    if (!foundUser || foundUser === undefined) {
      res.status(401).json({ message: 'Invalid credentials' });
      return;
    }
    currentUser = foundUser;
    res.json(currentUser);
  };
  const signout = (req: Request, res: Response) => {
    currentUser = null;
    res.sendStatus(200);
  };
  const profile = (req: Request, res: Response) => {
    res.json(currentUser);
  };
  app.post('/api/users', createUser);
  app.get('/api/users', findAllUsers);
  app.get('/api/users/:userId', findUserById);
  app.put('/api/users/:userId', updateUser);
  app.delete('/api/users/:userId', deleteUser);
  app.post('/api/users/signup', signup);
  app.post('/api/users/signin', signin);
  app.post('/api/users/signout', signout);
  app.post('/api/users/profile', profile);
}