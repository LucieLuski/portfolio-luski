const mongoose = require('mongoose');

const projectSchema = mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    coverUrl: { type: String },
    imagesUrl: [{ type: String }],
    demoUrl: { type: String },
    repoUrl: { type: String },
    stacks: [{ type: String, required: true }],
    learnings: { type: String },
    challenges: { type: String },
})

module.exports = mongoose.model('Project', projectSchema);