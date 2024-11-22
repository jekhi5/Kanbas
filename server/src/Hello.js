import { Express } from 'express-serve-static-core';
import { Request, Response } from 'express';

export default function Hello(app) {
  app.get('/hello', (req, res) => {
    res.send('Life is good!');
  });
  app.get('/', (req, res) => {
    res.send('Welcome to Full Stack Development!');
  });
}
