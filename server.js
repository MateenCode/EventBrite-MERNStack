const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const path = require('path')

const users = require('./routes/api/users');
const events = require('./routes/api/events');

const app = express();

// Body parser middlewar
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// DB Config
const db = require('./config/keys').mongoURI;

// Connect to MongoDB
mongoose.connect(db)
  .then(() => console.log('MongoDB Connected'))
  .catch(err => console.log(err));

app.get('/', (req, res) => res.send('Hello World'));

// Use Routes
app.use('/api/users', users);
app.use('/api/events', events);


// Server static assets if in production
if (process.env.NODE_ENV === 'production') {
  // Set static folder
  app.use(express.static('client/build'));

  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  });
}




const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server running on port ${port}`));
