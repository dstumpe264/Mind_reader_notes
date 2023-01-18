const notes = require('express').Router();
const { readAndAppend, readFromFile, writeToFile } = require('../helpers/fsUtils');

notes.get('/', (req, res) =>
    readFromFile('./db/db.json').then((data) => res.json(JSON.parse(data)))
);

notes.get('/:id', (req,res) => {
    const noteId = req.params.note_id;
    readFromFile('./db/db.json')
        .then((data) => JSON.parse(data))
        .then((json) => {
            const result = json.filter((note) => note.note_id === noteId);
            return result.length > 0
                ? res.json(result)
                : res.json('No note with that ID');
        });
});

notes.post('/', (req, res) => {
    const {title, text} = req.body;
    id = "10";
    if(title && text) {
        const newNote = {
            id,
            title,
            text,
        };


        readAndAppend(newNote, './db/db.json');

        const response = {
            status: 'success',
            body: newNote
        };
        res.status(201).json(response);
    } else {
        res.status(500).json('Error in parsing note');
    }
})

notes.delete('/:id', (req, res) => {
    const noteId = req.params.id;
    readFromFile('./db/db.json')
      .then((data) => JSON.parse(data))
      .then((json) => {
        const result = json.filter((note) => note.id !== noteId);
  
        // Save that array to the filesystem
        writeToFile('./db/db.json', result);
  
        // Respond to the DELETE request
        res.json(`Item ${noteId} has been deleted 🗑️`);
      });
  });

module.exports = notes;