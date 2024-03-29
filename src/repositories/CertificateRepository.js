import BaseRepository from './BaseRepository.js';
import CertificateModel from '../models/Certificate.js';

class CertificateRepository extends BaseRepository {
    constructor () {
        super(CertificateModel);
    }

    findCertificatesByUserId(userId) {
        return this.model.find({ userId }).exec();
    }
}

export default CertificateRepository;