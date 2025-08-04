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


exports.modifyProject = (req, res) => {
    // creer le new url si file
    // //modif
    // supprime l'img du fs nouveau ou ancien selon reussite ou echec 
    console.log('ID reçu en paramètre :', req.params.id);
    Project.findOne({ _id: req.params.id })
        .then((project) => {

            const oldFileName = project.coverUrl.split('/images/')[1]
            let newFileName = null

            const projectObject = req.file ?
                { // si il y a img, genere l'url
                    ...JSON.parse(req.body.project),
                    coverUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
                } : { ...req.body };

            if (req.file) {
                newFileName = req.file.filename;
            }

            Project.updateOne({ _id: req.params.id }, { ...projectObject, _id: req.params.id }) // securite via url
                .then(() => {
                    if (newFileName) {
                        fs.unlink(`images/${oldFileName}`, error => {
                            if (error) {
                                console.error("Erreur lors de la suppression de l'ancienne image :", error);
                            }
                        });
                    }

                    res.status(httpStatus.OK).json({ message: 'Projet modifié' });
                })
                .catch(error => {
                    if (newFileName) {
                        fs.unlink(`images/${newFileName}`, error => {
                            if (error) {
                                console.error("Erreur lors de la suppression de la nouvelle image :", error);
                            }
                        });
                    }

                    res.status(httpStatus.BAD_REQUEST).json({ error });
                });
        })
};


exports.deleteProject = (req, res) => {

    Project.findOne({ _id: req.params.id })
        .then((project) => {
            if (!project) {
                return res.status(httpStatus.NOT_FOUND).json({ message: 'Projet non trouvé' });
            }

            const filename = project.coverUrl.split('/images/')[1];  // Recuperer le nom du fichier à suppr
            //suppression fichier 
            Project.deleteOne({ _id: req.params.id })
                .then(() => {
                    fs.unlink(`images/${filename}`, error => {
                        if (error) {
                            console.error("Erreur lors de la suppression de l'image :", error);
                        }
                    });
                    res.status(httpStatus.OK).json({ message: 'livre supprimé' });
                })
                .catch(error => res.status(httpStatus.BAD_REQUEST).json({ error }));

        })
        .catch(error => res.status(httpStatus.BAD_REQUEST).json({ error }));
}
