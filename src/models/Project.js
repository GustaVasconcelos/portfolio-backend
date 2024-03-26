import { Schema, model, Types } from 'mongoose';

const ProjectSchema = new Schema({
    name: { type: String, required: true },
    description: { type: String },
    deploy: { type: String },
    repository: { type: String },
    featured: { type: Boolean, default: false },
    userId: { type: Types.ObjectId, required: true }
});

const Project = model('Project', ProjectSchema);

export default Project;
