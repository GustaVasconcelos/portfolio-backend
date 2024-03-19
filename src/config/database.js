import mongoose from 'mongoose';

const connectDb = async () => {
    const dbUri = process.env.MONGODB_URI;
    
    if (!dbUri) {
        throw new Error('A URI do MongoDB não está definida em process.env.MONGODB_URI');
    }

    try {
        await mongoose.connect(dbUri);
        console.log('Conectado ao MongoDB');
    } catch (error) {
        console.error('Erro ao conectar ao MongoDB:', error);
        process.exit(1);
    }
};

export default connectDb;