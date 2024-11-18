const assignment = {
  id: 1,
  title: 'NodeJS Assignment',
  description: 'Create a NodeJS server with ExpressJS',
  due: '2021-10-10',
  completed: false,
  score: 0,
};
const module = {
  id: 1,
  name: 'NodeJS Module',
  description: 'Learn NodeJS',
  course: 'Web Development',
};
import { Request, Response } from 'express';
import { Express } from 'express-serve-static-core';

export default function WorkingWithObjects(app: Express) {
  app.get('/lab5/assignment', (req: Request, res: Response) => {
    res.json(assignment);
  });
  app.get('/lab5/assignment/title', (req: Request, res: Response) => {
    res.json(assignment.title);
  });
  app.get('/lab5/assignment/title/:newTitle', (req: Request, res: Response) => {
    const { newTitle } = req.params;
    if (!newTitle || newTitle === undefined) {
      res.status(400).json({ error: 'Title is required' });
      return;
    }
    assignment.title = newTitle;
    res.json(assignment);
  });
  app.get('/lab5/assignment/score/:newScore', (req: Request, res: Response) => {
    const { newScore } = req.params;
    assignment.score = Number(newScore);
    res.json(assignment);
  });
  app.get(
    '/lab5/assignment/completed/:newCompleted',
    (req: Request, res: Response) => {
      const { newCompleted } = req.params;
      assignment.completed = Boolean(newCompleted);
      res.json(assignment);
    }
  );

  app.get('/lab5/module', (req: Request, res: Response) => {
    res.json(module);
  });
  app.get('/lab5/module/name', (req: Request, res: Response) => {
    res.json(module.name);
  });
  app.get('/lab5/module/name/:newName', (req: Request, res: Response) => {
    const { newName } = req.params;
    if (!newName || newName === undefined) {
      res.status(400).json({ error: 'Name is required' });
      return;
    }
    module.name = newName;
    res.json(module);
  });
  app.get(
    '/lab5/module/description/:newDescription',
    (req: Request, res: Response) => {
      const { newDescription } = req.params;
      if (!newDescription || newDescription === undefined) {
        res.status(400).json({ error: 'Description is required' });
        return;
      }
      module.description = newDescription;
      res.json(module);
    }
  );
}
