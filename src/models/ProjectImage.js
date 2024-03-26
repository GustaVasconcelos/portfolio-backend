import { Schema, model, Types } from 'mongoose';

const projectImageSchema = new Schema({
    imageUrl: { type: String, required: true },
    projectId: { type: Types.ObjectId, ref: 'Project', required: true }
});

const ProjectImage = model('ProjectImage', projectImageSchema);

export default ProjectImage;
