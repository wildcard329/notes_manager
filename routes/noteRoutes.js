const router = require('express').Router();
const notes = require('../repository/noteRepository.js');

router.get('/all', (req, res) => {
    notes.getNotes()
        .then(results => {
            res.status(200).json(results.rows);
        })
        .catch(err => {
            throw err;
        });
});

router.get('/:id', (req, res) => {
    const id = parseInt(req.params.id);

    notes.getNote(id)
        .then(results => {
            if (results.rows.length) {
                res.status(200).json(results.rows[0]);
            } else {
                res.status(404).json({msg: `No note with id ${id}`});
            };
        })
        .catch(err => {
            res.status(500).json(err);
        });
});

router.post('/create', (req, res) => {
    const { title, text, created } = req.body;

    notes.addNote({title, text, created})
        .then(results => {
            res.status(201).json(results.rows[0]);
        })
        .catch(err => {
            res.status(500).json(err);
        });
});

router.put('/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const { title, text } = req.body;

    notes.getNote(id)
        .then(results => {
            if (results.rows.length) {
                notes.editNote({title, text, id})
                    .then(() => {
                        res.status(200).json({msg: `Note with id ${id} updated`});
                    })
                    .catch(err => {
                        res.status(500).json(err);
                    });
            } else {
                res.status(404).json({msg: `Could not find note with id ${id}`});
            };
        })
        .catch(err => {
            res.status(500).json(err);
        });
});

router.delete('/:id', (req, res) => {
    const id = parseInt(req.params.id);

    notes.getNote(id)
        .then(results => {
            if (results.rows.length) {
                notes.deleteNote(id)
                    .then(() => {
                        res.status(200).json({msg: `Note with id ${id} deleted successfully`});
                    })
                    .catch(err => {
                        res.status(500).json(err);
                    });
            } else {
                res.status(404).json({msg: `Could not find note with id ${id}`});
            };
        })
        .catch(err => {
            res.status(500).json(err);
        });
});

module.exports = router;
