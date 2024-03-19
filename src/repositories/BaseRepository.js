class BaseRepository {
    constructor(model) {
        this.model = model;
    }

    async create(item) {
        return this.model.create(item);
    }

    async findById(id) {
        return this.model.findById(id).exec();
    }

    async findAll() {
        return this.model.find().exec();
    }

    async update(id, item) {
        return this.model.findByIdAndUpdate(id, item, { new: true }).exec();
    }

    async delete(id) {
        return this.model.findByIdAndDelete(id).exec();
    }
}

export default BaseRepository;
