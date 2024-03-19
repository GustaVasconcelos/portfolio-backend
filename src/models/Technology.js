import { Schema, model, Types } from 'mongoose';

const technologySchema = new Schema({
    name: { type: String, required: true },
    image: { type: String, required: true },
    status: { type: String, enum: ['active', 'inactive'], required: true },
    userId: { type: Types.ObjectId, required: true }
});

const TechnologyModel = model('Technology', technologySchema);

export default TechnologyModel;