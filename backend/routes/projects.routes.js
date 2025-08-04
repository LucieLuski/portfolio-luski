const express = require('express');
const router = express.Router();

const auth = require('../middleware/auth');
const multer = require('../middleware/multer-config');

const projectsCtrl = require('../controllers/projects.controllers');

router.get('/', projectsCtrl.getAllProjects);

router.post('/', auth, multer, projectsCtrl.createProject);

module.exports = router;