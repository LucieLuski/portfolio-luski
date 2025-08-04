const Project = require('../models/project');
const { default: httpStatus } = require('http-status');
const fs = require('fs')

exports.getAllProjects = (req, res, next) => {
    Project.find()
        .then(project => res.status(httpStatus.OK).json(project))
        .catch(error => res.status(httpStatus.BAD_REQUEST).json({ error }))
};


exports.createProject = (req, res, next) => {
    if (!req.file) {
        return res.status(httpStatus.BAD_REQUEST).json({ message: 'Une image est requise pour créer un projet.' });
    }

    const projectObject = JSON.parse(req.body.project);


    const project = new Project({
        ...projectObject,
        coverUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`,  // url pour acceder au fichier 
    });

    project.save()
        .then(() => res.status(httpStatus.CREATED).json({ message: 'Projet créé !' }))
        .catch((error) => {               // Capture erreur en cas de doublon dans titre 
            const filename = book.imageUrl.split('/images/')[1];
            //suppression de l'img du fs
            fs.unlink(`images/${filename}`, () => {

                if (error.code === 11000) {
                    return res.status(httpStatus.CONFLICT).json({ message: 'Le projet existe déjà.' });
                }

                if (error.name === 'ValidationError') {
                    const errors = Object.values(error.errors).map(error => error.message);
                    return res.status(httpStatus.BAD_REQUEST).json({ message: "Le projet est incomplet.", errors });
                }

                return res.status(httpStatus.BAD_REQUEST).json({ error });

            })
        })
}