const express = require('express');
const router = express.Router();
const Task = require('../models/task');

// Create a new task
router.post('/', async (req, res) => {
  try {
    const { title, description } = req.body;
    const task = new Task({ title, description });
    await task.save();
    res.status(201).json(task);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Get all tasks
router.get('/', async (req, res) => {
  try {
    const tasks = await Task.find();
    res.json(tasks);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Get a specific task by ID
router.get('/:taskId', async (req, res) => {
  const { taskId } = req.params;
  try {
    const task = await Task.findById(taskId);
    if (!task) {
      return res.status(404).json({ error: 'Task not found' });
    }
    res.json(task);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Update a task by ID
router.put('/:taskId', async (req, res) => {
  const { taskId } = req.params;
  const { title, description } = req.body;
  try {
    const task = await Task.findByIdAndUpdate(
      taskId,
      { title, description },
      { new: true }
    );
    if (!task) {
      return res.status(404).json({ error: 'Task not found' });
    }
    res.json(task);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Delete a task by ID
router.delete('/:taskId', async (req, res) => {
  const { taskId } = req.params;
  try {
    const task = await Task.findByIdAndRemove(taskId);
    if (!task) {
      return res.status(404).json({ error: 'Task not found' });
    }
    res.json({ message: 'Task deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

module.exports = router;
