// backend/server.js

// Start a server to handle requests.
const express = require('express');
const app = express();
const port = 5000;

// Connect to a database where we will store to-do items.
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/todoapp', { useNewUrlParser: true, useUnifiedTopology: true });

// Allow our server to accept requests from other programs (CORS).
const cors = require('cors');
app.use(cors());

// Make our server understand and process data sent in JSON format.
app.use(express.json());

// Define a template for how to-do items will be stored in the database.
const TodoSchema = new mongoose.Schema({ text: String });
const Todo = mongoose.model('Todo', TodoSchema);

// Create a way to get all to-do items stored in the database and send them to the user.
app.get('/todos', async (req, res) => {
  const todos = await Todo.find();
  res.json(todos);
});

// Create a way to receive a new to-do item from the user and store it in the database.
app.post('/todos', async (req, res) => {
  const newTodo = new Todo({
    text: req.body.text
  });
  await newTodo.save();
  res.json(newTodo);
});

// Create a way to remove a specific to-do item from the database based on the user's request.
app.delete('/todos/:id', async (req, res) => {
  const result = await Todo.findByIdAndDelete(req.params.id);
  res.json(result);
});

// Make the server listen on a specific port to handle requests.
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});