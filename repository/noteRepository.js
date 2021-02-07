const db = require('../pgConfig.js');

const getNotes = () => {
    return db.query('SELECT * FROM notes ORDER BY created ASC');
};

const getNote = id => {
    return db.query('SELECT * FROM notes WHERE id = $1', [id]);
};

const addNote = ({title, text, created}) => {
    return db.query('INSERT INTO notes (title, text, created) VALUES ($1, $2, $3) RETURNING id', [title, text, created]);
};

const editNote = ({title, text, id}) => {
    return db.query('UPDATE notes SET title = $1, text = $2 WHERE id = $3', [title, text, id]);
};

const deleteNote = id => {
    return db.query('DELETE FROM notes WHERE id = $1', [id])
}

module.exports = {
    getNotes,
    getNote,
    addNote,
    editNote,
    deleteNote
};
