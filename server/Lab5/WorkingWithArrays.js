let todos = [
  { id: 1, title: 'Task 1', completed: false, description: '' },
  { id: 2, title: 'Task 2', completed: true, description: '' },
  { id: 3, title: 'Task 3', completed: false, description: '' },
  { id: 4, title: 'Task 4', completed: true, description: '' },
];
export default function WorkingWithArrays(app) {
  app.get('/lab5/todos/create', (req, res) => {
    const newTodo = {
      id: new Date().getTime(),
      title: 'New Task',
      completed: false,
      description: '',
    };
    todos.push(newTodo);
    res.json(todos);
  });
  app.get('/lab5/todos', (req, res) => {
    const { completed } = req.query;
    if (completed !== undefined) {
      const completedBool = completed === 'true';
      const completedTodos = todos.filter((t) => t.completed === completedBool);
      res.json(completedTodos);
      return;
    }
    res.json(todos);
  });
  app.get('/lab5/todos/:id', (req, res) => {
    const { id } = req.params;
    if (!id || id === undefined) {
      res.status(400).json({ error: 'ID is required' });
      return;
    }
    const todo = todos.find((t) => t.id === parseInt(id));
    if (!todo) {
      res.send(`Could not find element with given id: ${id}`);
    }
    res.json(todo);
  });
  app.get('/lab5/todos/:id/delete', (req, res) => {
    const { id } = req.params;
    if (!id || id === undefined) {
      res.status(400).json({ error: 'ID is required' });
      return;
    }
    const todoIndex = todos.findIndex((t) => t.id === parseInt(id));
    todos.splice(todoIndex, 1);
    res.json(todos);
  });
  app.get('/lab5/todos/:id/title/:title', (req, res) => {
    const { id, title } = req.params;
    if (!id || id === undefined) {
      res.status(400).json({ error: 'ID is required' });
      return;
    } else if (!title || title === undefined) {
      res.status(400).json({ error: 'Title is required' });
      return;
    }
    const todo = todos.find((t) => t.id === parseInt(id));
    if (!todo || todo === undefined) {
      res.json({ error: 'Could not find element with given id' });
    } else {
      todo.title = title;
      res.json(todos);
    }
  });
  app.get(
    '/lab5/todos/:id/description/:description',
    (req, res) => {
      const { id, description } = req.params;
      if (!id || id === undefined) {
        res.status(400).json({ error: 'ID is required' });
        return;
      } else if (!description || description === undefined) {
        res.status(400).json({ error: 'Description is required' });
        return;
      }
      const todo = todos.find((t) => t.id === parseInt(id));
      if (!todo || todo === undefined) {
        res.json({ error: 'Could not find element with given id' });
      } else {
        todo.description = description;
        res.json(todos);
      }
    }
  );
  app.get(
    '/lab5/todos/:id/completed/:completed',
    (req, res) => {
      const { id, completed } = req.params;
      if (!id || id === undefined) {
        res.status(400).json({ error: 'ID is required' });
        return;
      } else if (!completed || completed === undefined) {
        res.status(400).json({ error: 'Completed is required' });
        return;
      }
      const todo = todos.find((t) => t.id === parseInt(id));
      if (!todo || todo === undefined) {
        res.json({ error: 'Could not find element with given id' });
      } else {
        todo.completed = completed === 'true';
        res.json(todos);
      }
    }
  );
  app.post('/lab5/todos', (req, res) => {
    const newTodo = { ...req.body, id: new Date().getTime() };
    todos.push(newTodo);
    res.json(newTodo);
  });
  app.delete('/lab5/todos/:id', (req, res) => {
    const { id } = req.params;
    if (!id || id === undefined) {
      res.status(400).json({ error: 'ID is required' });
      return;
    }
    const todoIndex = todos.findIndex((t) => t.id === parseInt(id));
    if (todoIndex === -1) {
      res.status(404).json({ message: `Unable to delete Todo with ID ${id}` });
      return;
    }
    todos.splice(todoIndex, 1);
    res.sendStatus(200);
  });
  app.put('/lab5/todos/:id', (req, res) => {
    const { id } = req.params;
    if (!id || id === undefined) {
      res.status(400).json({ error: 'ID is required' });
      return;
    }
    const todoIndex = todos.findIndex((t) => t.id === parseInt(id));
    if (todoIndex === -1) {
      res.status(404).json({ message: `Unable to update Todo with ID ${id}` });
      return;
    }
    todos = todos.map((t) => {
      if (t.id === parseInt(id)) {
        return { ...t, ...req.body };
      }
      return t;
    });
    res.sendStatus(200);
  });
}
