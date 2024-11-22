export default function QueryParameters(app) {
  app.get('/lab5/calculator', (req, res) => {
    const { a, b, operation } = req.query
    let result = 0;
    try {
      switch (operation) {
        case 'add':
          result = parseInt(a) + parseInt(b);
          break;
        case 'subtract':
          result = parseInt(a) - parseInt(b);
          break;
        case 'multiply':
          result = parseInt(a) * parseInt(b);
          break;
        case 'divide':
          if (parseInt(b) === 0) {
            throw new Error('Cannot divide by 0');
          }
          result = parseInt(a) / parseInt(b);
          break;
        default:
          throw new Error('Invalid operation');
      }
    } catch (error) {
      if (error instanceof Error) {
        res.send(`An error occurred: ${error.message}`);
      } else {
        res.send('An error occurred');
      }
    }
    res.send(result.toString());
  });
}
