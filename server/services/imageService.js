const { Storage } = require('@google-cloud/storage');

const storage = new Storage({
    projectId: process.env.GOOGLE_PROJECT_ID,
    keyFilename: process.env.GOOGLE_KEY_FILENAME,
});

const uploadImageToGoogle = async (imageFile, imageFolder) => {
    return new Promise((resolve, reject) => {
        const bucket = storage.bucket(process.env.GOOGLE_BUCKET_NAME);
        const blob = bucket.file(`${imageFolder}/${imageFile.originalname}`);
        const blobStream = blob.createWriteStream();

        blobStream.on('finish', async () => {
            const [url] = await blob.getSignedUrl({
                action: 'read',
                expires: '03-09-2030',
            });
            resolve({
                message: 'Image uploaded successfully',
                imageUrl: url,
            });
        });

        blobStream.on('error', (error) => {
            reject(error);
        });

        blobStream.end(imageFile.buffer);
    });
};


