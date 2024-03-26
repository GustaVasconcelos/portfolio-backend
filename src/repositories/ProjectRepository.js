import BaseRepository from './BaseRepository.js';
import ProjectModel from '../models/Project.js';

class ProjectRepository extends BaseRepository {
    constructor () {
        super(ProjectModel);
    }

    findProjectsByUserId(userId) {
        return this.model.find({ userId }).exec();
    }
}

export default ProjectRepository;