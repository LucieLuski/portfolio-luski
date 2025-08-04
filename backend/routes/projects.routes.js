const express = require('express');
const router = express.Router();

const auth = require('../middleware/auth');
const multer = require('../middleware/multer-config');

const projectsCtrl = require('../controllers/projects.controllers');

router.get('/', projectsCtrl.getAllProjects);
router.post('/', auth, multer, projectsCtrl.createProject);
router.put('/:id', auth, multer, projectsCtrl.modifyProject);
router.delete('/:id', auth, projectsCtrl.deleteProject);

module.exports = router;