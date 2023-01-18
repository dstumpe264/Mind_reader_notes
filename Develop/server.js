const { randomUUID } = require('crypto');
const express = require('express');
const path = require('path');
const fs = require('fs');
const { readAndAppend, readFromFile } = require('./helpers/fsUtils');
const api = require('./routes/index.js');

const PORT = 3001;
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/api', api);

app.use(express.static('public'));

app.get('/', (req, res) =>
  res.sendFile(path.join(__dirname, '/public/index.html'))
);

// Wildcard route to direct users to a 404 page
// app.get('*', (req, res) =>
//   res.sendFile(path.join(__dirname, 'public/pages/404.html'))
// );

app.get('/notes', (req, res) =>
  res.sendFile(path.join(__dirname, '/public/notes.html'))
);

// app.get('/api/notes', (req, res) => res.json(noteData));

// app.post('/api/notes', (req, res) => {

//     const {title, text} = req.body;

//     if(title && text) {
//         const newNote = {
//             title,
//             text,
//         };


//         readAndAppend(newNote, './db/db.json');

//         const response = {
//             status: 'success',
//             body: newNote
//         };
//         res.status(201).json(response);
//     } else {
//         res.status(500).json('Error in parsing note');
//     }
// })
app.listen(PORT, () =>
  console.log(`Example app listening at http://localhost:${PORT}`)
);
