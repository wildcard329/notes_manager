const express = require('express');
const cors = require('cors');
const notes = require('../routes/noteRoutes.js');
const projects = require('../routes/projectRoutes.js');

const server = express();

server.use(express.json());
server.use(cors());
server.use('/api/notes', notes);
server.use('/api/projects', projects);

module.exports = server;
