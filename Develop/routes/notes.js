const notes = require('express').Router();
const { readAndAppend, readFromFile, writeToFile } = require('../helpers/fsUtils');

notes.get('/', (req, res) =>
    readFromFile('./db/db.json').then((data) => res.json(JSON.parse(data)))
);

notes.post('/', (req, res) => {
    const {title, text} = req.body;

    if(title && text) {
        const newNote = {
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

module.exports = notes;