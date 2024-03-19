import bucket from '../config/firebaseConfig.js';

class FirebaseStorageService {
    async uploadFile(file) {
        if (!file) {
            throw new Error('Nenhum arquivo foi enviado.');
        }

        const filename = `${Date.now()}_${file.originalname}`;
        
        const blob = bucket.file(filename);

        const blobStream = blob.createWriteStream({
            metadata: { contentType: file.mimetype }
        });

        return new Promise((resolve, reject) => {
            blobStream.on('error', error => reject(error));

            blobStream.on('finish', () => {
                const publicUrl = `https://storage.googleapis.com/${bucket.name}/${encodeURIComponent(blob.name)}`;
                resolve(publicUrl);
            });

            blobStream.end(file.buffer);
        });
    }
}

export default FirebaseStorageService;
