const db = require('../pgConfig.js');

const getProjects = () => {
    return db.query('SELECT * FROM projects ORDER BY created ASC');
};

const getProject = id => {
    return db.query('SELECT * FROM projects WHERE id = $1', [id]);
};

const addProject = ({title, description, errors, goals, outcomes, created}) => {
    return db.query('INSERT INTO projects (title, description, errors, goals, outcomes, created) VALUES {$1, $2, $3, $4, $5, $6) RETURNING id', [title, description, errors, goals, outcomes, created]);
};

const editProject = ({title, description, errors, goals, outcomes, id}) => {
    return db.query('UPDATE projects SET title = $1, description = $2, errors = $3, goals = $4, outcomes = $5 WHERE id = $6', [title, description, errors, goals, outcomes, id]);
};

const deleteProject = id => {
    return db.query('DELETE FROM projects WHERE id = $1', [id]);
};

module.exports = {
    getProjects,
    getProject,
    addProject,
    editProject,
    deleteProject
};
