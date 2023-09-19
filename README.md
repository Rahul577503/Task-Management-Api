# Task-Management-Api

This is a simple Task Management API built with Node.js, Express.js, and MongoDB. It allows you to create, read, update, and delete tasks.
---

# Task Management API

This Node.js API manages tasks using MongoDB.

## Installation

1. **Clone** the project:

   ```bash
   git clone https://github.com/Rahul577503/Task-Management-Api.git
   ```

2. **Install** dependencies:

   ```bash
   cd TaskManagement
   npm install
   ```

3. **Configure MongoDB** by adding your URI to a `.env` file:

   ```
   MONGO_URI=your-mongodb-uri
   ```

4. **Start** the server:

   ```bash
   node index.js
   ```

## Usage

- The API runs at `http://localhost:4000`.
- Contribute by forking and opening PRs.


## Here are step-by-step notes explaining each part of the code.


# folder Structure

![Screenshot from 2023-09-19 10-57-39](https://github.com/Rahul577503/Task-Management-Api/assets/82811506/87a504d0-8b4e-40db-b157-2199c06ed901)


**Step 1: Import Dependencies and Set Up Environment Variables**

```javascript
const express = require('express'); // Import the Express.js framework
const mongoose = require('mongoose'); // Import Mongoose for MongoDB interaction
const cors = require('cors'); // Import the CORS middleware for handling cross-origin requests
const dotenv = require('dotenv'); // Import dotenv to load environment variables from a .env file
```

**Step 2: Define the Port**

```javascript
const PORT = process.env.PORT || 4000; // Set the port for your server (default to 4000 if not specified in environment variables)
```

**Step 3: Load Environment Variables**

```javascript
dotenv.config(); // Load environment variables from the .env file
```

**Step 4: Create an Express Application**

```javascript
const app = express(); // Create an instance of the Express application
```

**Step 5: Set Up Middleware**

```javascript
app.use(cors()); // Enable CORS for your server
app.use(express.json()); // Parse incoming JSON data in requests
```

**Step 6: Connect to MongoDB**

```javascript
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
```

- You connect to a MongoDB database using the URI specified in the `.env` file.
- The `useNewUrlParser` and `useUnifiedTopology` options are set to true for compatibility with MongoDB's latest features.

**Step 7: Define MongoDB Connection Handling**

```javascript
const db = mongoose.connection;

db.on('error', (error) => {
  console.error('MongoDB connection error:', error);
});

db.once('open', () => {
  console.log('Connected to MongoDB');
});
```

- Here, you set up event handlers for MongoDB connection errors and successful connections.

**Step 8: Define a Basic Route**

```javascript
app.get('/', (req, res) => {
  res.send('Hello world');
});
```

- This sets up a basic route at the root path that responds with "Hello world" when you access it in a browser or make a GET request.

**Step 9: Start the Express Server**

```javascript
app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});
```

- This starts the Express server, and it listens on the port you defined earlier (4000 by default).

# models/test.js
The `models/task.js` file  project is defines a Mongoose model for handling tasks in your Task Management API. Let's break down each part of the code and explain its purpose:

1. **Import Mongoose**:
   ```javascript
   const mongoose = require('mongoose');
   ```
   - This line imports the Mongoose library, which is a popular Node.js library for interacting with MongoDB databases.

2. **Define the Task Schema**:
   ```javascript
   const TaskSchema = new mongoose.Schema({
       title: {
           type: String,
           required: true
       },
       description: {
           type: String,
       }
   });
   ```
   -  define the schema for a task using `mongoose.Schema`. A schema defines the structure of your data.
   - The `TaskSchema` object describes the fields that a task document can have in the MongoDB collection. In this case, a task has two fields:
     - `title`: A string field that is required (must be provided).
     - `description`: A string field that is optional.

3. **Create a Task Model**:
   ```javascript
   const Task = mongoose.model('Task', TaskSchema);
   ```
   - This line creates a Mongoose model called `Task`. A model is a constructor function that allows you to interact with a specific MongoDB collection (in this case, the "tasks" collection).
   - The first argument `'Task'` is the name of the model, and the second argument `TaskSchema` is the schema you defined earlier.

4. **Export the Task Model**:
   ```javascript
   module.exports = Task;
   ```
   - This line exports the `Task` model so that it can be used in other parts of your application, such as in route handlers and controllers.

Overall, this code sets up a Mongoose model for tasks with a specific schema. When you create, read, update, or delete tasks in your application, you'll use this model to interact with the MongoDB database, ensuring that data adheres to the defined schema.
# router/test.ts

**Step 1: Import Dependencies**

```javascript
const express = require('express'); // Import Express.js to create route handlers
const router = express.Router(); // Create an instance of an Express Router for handling routes
const Task = require('../models/task'); // Import your Task model for interacting with the MongoDB database
```

**Step 2: Create a New Task (HTTP POST)**

```javascript
router.post('/', async (req, res) => {
  try {
    const { title, description } = req.body; // Extract the title and description from the request body
    const task = new Task({ title, description }); // Create a new Task instance
    await task.save(); // Save the new task to the database
    res.status(201).json(task); // Respond with the created task and a 201 status code (Created)
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' }); // Handle any errors that occur during this process
  }
});
```

- This route is responsible for creating a new task.
- It extracts the `title` and `description` from the request body.
- It creates a new `Task` instance with the provided data and saves it to the database.
- It responds with the created task and a 201 status code if successful, or it responds with a 500 status code if an error occurs.

**Step 3: Get All Tasks (HTTP GET)**

```javascript
router.get('/', async (req, res) => {
  try {
    const tasks = await Task.find(); // Retrieve all tasks from the database
    res.json(tasks); // Respond with the list of tasks in JSON format
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' }); // Handle any errors that occur during this process
  }
});
```

- This route retrieves all tasks from the database.
- It uses `Task.find()` to fetch all tasks.
- It responds with the list of tasks in JSON format if successful or a 500 status code if an error occurs.

**Step 4: Get a Specific Task by ID (HTTP GET)**

```javascript
router.get('/:taskId', async (req, res) => {
  const { taskId } = req.params; // Extract the taskId from the URL parameters
  try {
    const task = await Task.findById(taskId); // Retrieve a task by its ID
    if (!task) {
      return res.status(404).json({ error: 'Task not found' }); // Handle the case where the task is not found
    }
    res.json(task); // Respond with the retrieved task
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' }); // Handle any errors that occur during this process
  }
});
```

- This route retrieves a specific task by its ID, which is extracted from the URL parameters.
- It uses `Task.findById(taskId)` to find the task.
- If the task is not found, it responds with a 404 status code and an error message.
- If the task is found, it responds with the task data in JSON format.

**Step 5: Update a Task by ID (HTTP PUT)**

```javascript
router.put('/:taskId', async (req, res) => {
  const { taskId } = req.params; // Extract the taskId from the URL parameters
  const { title, description } = req.body; // Extract updated data from the request body
  try {
    const task = await Task.findByIdAndUpdate(
      taskId,
      { title, description },
      { new: true }
    ); // Find and update the task by its ID
    if (!task) {
      return res.status(404).json({ error: 'Task not found' }); // Handle the case where the task is not found
    }
    res.json(task); // Respond with the updated task
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' }); // Handle any errors that occur during this process
  }
});
```

- This route updates a specific task by its ID, which is extracted from the URL parameters.
- It extracts the updated `title` and `description` from the request body.
- It uses `Task.findByIdAndUpdate()` to find and update the task by its ID.
- If the task is not found, it responds with a 404 status code and an error message.
- If the task is updated successfully, it responds with the updated task data in JSON format.

**Step 6: Delete a Task by ID (HTTP DELETE)**

```javascript
router.delete('/:taskId', async (req, res) => {
  const { taskId } = req.params; // Extract the taskId from the URL parameters
  try {
    const task = await Task.findByIdAndRemove(taskId); // Find and remove the task by its ID
    if (!task) {
      return res.status(404).json({ error: 'Task not found' }); // Handle the case where the task is not found
    }
    res.json({ message: 'Task deleted successfully' }); // Respond with a success message
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' }); // Handle any errors that occur during this process
  }
});
```

- This route deletes a specific task by its ID, which is extracted from the URL parameters.
- It uses `Task.findByIdAndRemove()` to find and remove the task by its ID.
- If the task is not found, it responds with a 404 status code and an error message.
- If the task is deleted successfully, it responds with a success message.

These steps cover the functionality of your `routes/task.js` file, which handles creating, retrieving, updating, and deleting tasks in your API.































