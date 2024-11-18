import { Express } from 'express-serve-static-core';
import PathParameters from './PathParameters.js';
import QueryParameters from './QueryParameters.js';
import WorkingWithArrays from './WorkingWithArrays.js';
import WorkingWithObjects from './WorkingWithObjects.js';

export default function Lab5(app: Express) {
  app.get('/lab5/welcome', (req, res) => {
    res.send('Welcome to Lab 5');
  });
  PathParameters(app);
  QueryParameters(app);
  WorkingWithObjects(app);
  WorkingWithArrays(app);
}