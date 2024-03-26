import { Schema, model, Types } from 'mongoose';

const ProjectTechnologySchema = new Schema({
    projectId: { type: Types.ObjectId, ref: 'Project', required: true },
    technologyId: { type: Types.ObjectId, ref: 'Technology', required: true }
});

const ProjectTechnology = model('ProjectTechnology', ProjectTechnologySchema);

export default ProjectTechnology;