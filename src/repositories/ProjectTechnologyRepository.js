import BaseRepository from './BaseRepository.js';
import ProjectTechnologyModel from '../models/ProjectTechnology.js';

class ProjectTechnologyRepository extends BaseRepository {
    constructor () {
        super(ProjectTechnologyModel);
    }

    findProjectTechnologiesByProjectId(projectId) {
        return this.model.find({ projectId }).exec();
    }
}

export default ProjectTechnologyRepository;