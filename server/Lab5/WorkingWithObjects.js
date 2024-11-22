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

export default function WorkingWithObjects(app) {
  app.get('/lab5/assignment', (req, res) => {
    res.json(assignment);
  });
  app.get('/lab5/assignment/title', (req, res) => {
    res.json(assignment.title);
  });
  app.get('/lab5/assignment/title/:newTitle', (req, res) => {
    const { newTitle } = req.params;
    if (!newTitle || newTitle === undefined) {
      res.status(400).json({ error: 'Title is required' });
      return;
    }
    assignment.title = newTitle;
    res.json(assignment);
  });
  app.get('/lab5/assignment/score/:newScore', (req, res) => {
    const { newScore } = req.params;
    assignment.score = Number(newScore);
    res.json(assignment);
  });
  app.get(
    '/lab5/assignment/completed/:newCompleted',
    (req, res) => {
      const { newCompleted } = req.params;
      assignment.completed = Boolean(newCompleted);
      res.json(assignment);
    }
  );

  app.get('/lab5/module', (req, res) => {
    res.json(module);
  });
  app.get('/lab5/module/name', (req, res) => {
    res.json(module.name);
  });
  app.get('/lab5/module/name/:newName', (req, res) => {
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
    (req, res) => {
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
