const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');

const taskRouter = require('./routes/task')
const PORT = process.env.PORT || 4000;

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());
app.use('/tasks',taskRouter)

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;

db.on('error', (error) => {
  console.error('MongoDB connection error:', error);
});

db.once('open', () => {
  console.log('Connected to MongoDB');
});

app.get('/', (req, res) => {
  res.send('Hello world');
});

app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});
