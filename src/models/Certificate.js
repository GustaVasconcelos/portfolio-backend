import { Schema, model, Types } from 'mongoose';

const certificateSchema = new Schema({
    name: { type: String, required: true },
    company: { type: String },
    link: { type: String },
    dateObtained: { type: Date },
    userId: { type: Types.ObjectId, ref: 'User' }, 
});

const CertificateModel = model('Certificate', certificateSchema);

export default CertificateModel;