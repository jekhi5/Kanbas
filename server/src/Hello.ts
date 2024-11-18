import { Express } from 'express-serve-static-core';
import { Request, Response } from 'express';

export default function Hello(app: Express) {
  app.get('/hello', (req: Request, res: Response) => {
    res.send('Life is good!');
  });
  app.get('/', (req: Request, res: Response) => {
    res.send('Welcome to Full Stack Development!');
  });
}
