import { Express } from 'express-serve-static-core';
import { Request, Response } from 'express';
import * as dao from './dao.js';
import { User } from '../types.js';

declare module 'express-session' {
  interface SessionData {
    currentUser: any; // You can replace 'any' with a more specific type if you have one
  }
}
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
    const currentUser = dao.findUserById(userId);
    if (!currentUser || currentUser === undefined) {
      res.status(401).json({ message: 'Invalid credentials' });
      return;
    }
    req.session['currentUser'] = currentUser;
    res.json(currentUser);
  };
  const signup = (req: Request, res: Response) => {
    const user = dao.findUserByUsername(req.body.username);
    if (user) {
      res.status(400).json({ message: 'Username already in use' });
      return;
    }
    const currentUser = dao.createUser(req.body);
    req.session['currentUser'] = currentUser;
    res.json(currentUser);
  };
  const signin = (req: Request, res: Response) => {
    const { username, password } = req.body;
    const currentUser = dao.findUserByCredentials(username, password);
    if (currentUser) {
      req.session['currentUser'] = currentUser;
      res.json(currentUser);
    } else {
      res.status(401).json({ message: 'Unable to login. Try again later.' });
    }
  };
  const signout = (req: Request, res: Response) => {
    req.session.destroy((err) => {
      if (err) {
        res
          .status(500)
          .json({ message: 'Unable to sign out. Try again later.' });
      } else {
        res.sendStatus(200);
      }
    });
  };
  const profile = (req: Request, res: Response) => {
    const currentUser = req.session['currentUser'];
    if (!currentUser) {
      res.sendStatus(401);
      return;
    }
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
