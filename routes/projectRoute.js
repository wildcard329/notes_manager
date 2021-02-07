const router = require('express').Router();
const projects = require('../repository/projectRepository');

router.get('/all', (req, res) => {
    projects.getProjects()
        .then(results => {
            res.status(200).json(results.rows);
        })
        .catch(err => {
            res.status(500).json(err);
        });
});

router.get('/:id', (req, res) => {
    const id = parseInt(req.params.id);

    projects.getProject(id)
        .then(results => {
            if (results.rows.length) {
                res.status(200).json(results.rows[0]);
            } else {
                res.status(404).json({msg: `No project with id ${id}`})
            };
        })
        .catch(err => {
            res.status(500).json(err);
        });
});

router.post('/create', (req, res) => {
    const { title, description, errors, goals, outcomes, created } = req.body;

    projects.addProject({title, description, errors, goals, outcomes, created})
        .then(results => {
            res.status(201).json(results.rows[0]);
        })
        .catch(err => {
            res.status(500).json(err);
        });
});

router.put('/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const { title, description, errors, goals, outcomes } = req.body;

    projects.getProject(id)
        .then(results => {
            if (results.rows.length) {
                projects.editProject({title, description, errors, goals, outcomes, id})
                    .then(() => {
                        res.status(200).json({msg: `Project with id ${id} updated`});
                    })
                    .catch(err => {
                        res.status(500).json(err);
                    });
            } else {
                res.status(404).json({msg: `Could not find project with id ${id}`});
            };
        })
        .catch(err => {
            res.status(500).json(err);
        });
});

router.delete('/:id', (req, res) => {
    const id = parseInt(req.params.id);

    projects.getProject(id)
        .then(results => {
            if (results.rows.length) {
                projects.deleteProject(id)
                    .then(() => {
                        res.status(200).json({msg: `Deleted project with id ${id}`});
                    })
                    .catch(err => {
                        res.status(500).json(err);
                    });
            } else {
                res.status(404).json({msg: `Could not find project with id ${id}`});
            };
        })
        .catch(err => {
            res.status(500).json(err);
        });
});

module.exports = router;
