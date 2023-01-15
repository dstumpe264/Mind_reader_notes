const { randomUUID } = require('crypto');
const express = require('express');
const path = require('path');
const noteData = require('./Develop/db/db.json');
const fs = require('fs');
const { readAndAppend, readFromFile } = require('./Develop/helpers/fsUtils');

const app = express();
const PORT = 3001;

app.use(express.static('public'));
app.use(express.json());

app.get('/', (req, res) =>
  res.sendFile(path.join(__dirname, 'develop/public/index.html'))
);

app.get('/notes', (req, res) =>
  res.sendFile(path.join(__dirname, 'develop/public/notes.html'))
);

app.get('/api/notes', (req, res) => res.json(noteData));

app.post('/api/notes', (req, res) => {

    const {title, text} = req.body;

    if(title && text) {
        const newNote = {
            title,
            text,
        };


        readAndAppend(newNote, './develop/db/db.json');

        const response = {
            status: 'success',
            body: newNote
        };
        res.status(201).json(response);
    } else {
        res.status(500).json('Error in parsing note');
    }
})
app.listen(PORT, () =>
  console.log(`Example app listening at http://localhost:${PORT}`)
);
