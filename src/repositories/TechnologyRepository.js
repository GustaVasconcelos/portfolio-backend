import BaseRepository from './BaseRepository.js';
import TechnologyModel from '../models/Technology.js';

class TechnologyRepository extends BaseRepository {
    constructor() {
        super(TechnologyModel);
    }

    findTechnologiesByUserId(userId) {
        return this.model.find({ userId }).exec();
    }
}

export default TechnologyRepository;
