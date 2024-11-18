import { Express } from 'express-serve-static-core';
import { Request, Response } from 'express';
export default function PathParameters(app: Express) {
  app.get('/lab5/add/:a/:b', (req: Request, res: Response) => {
    const { a, b } = req.params;
    if (!a || a === undefined || !b || b === undefined) {
      res.status(400).json({ error: 'a and b are required' });
      return;
    }
    const sum = parseInt(a) + parseInt(b);
    res.send(sum.toString());
  });
  app.get('/lab5/subtract/:a/:b', (req: Request, res: Response) => {
    const { a, b } = req.params;
    if (!a || a === undefined || !b || b === undefined) {
      res.status(400).json({ error: 'a and b are required' });
      return;
    }
    const sum = parseInt(a) - parseInt(b);
    res.send(sum.toString());
  });
  app.get('/lab5/multiply/:a/:b', (req: Request, res: Response) => {
    const { a, b } = req.params;
    if (!a || a === undefined || !b || b === undefined) {
      res.status(400).json({ error: 'a and b are required' });
      return;
    }
    const product = parseInt(a) * parseInt(b);
    res.send(product.toString());
  });
  app.get('/lab5/divide/:a/:b', (req: Request, res: Response) => {
    const { a, b } = req.params;
    if (!a || a === undefined || !b || b === undefined) {
      res.status(400).json({ error: 'a and b are required' });
      return;
    }
    if (parseInt(b) === 0) {
      res.send('Cannot divide by zero');
      return;
    }
    const quotient = parseInt(a) / parseInt(b);
    res.send(quotient.toString());
  });
}
