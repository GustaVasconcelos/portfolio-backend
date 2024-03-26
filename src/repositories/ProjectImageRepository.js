import BaseRepository from './BaseRepository.js';
import ProjectImageModel from '../models/ProjectImage.js';

class ProjectImageRepository extends BaseRepository {
    constructor () {
        super(ProjectImageModel);
    }

    findProjectImagesByProjectId(projectId) {
        return this.model.find({ projectId }).exec();
    }
}

export default ProjectImageRepository;