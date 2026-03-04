import { Cloudinary } from '@cloudinary/url-gen';

export const cld = new Cloudinary({
    cloud: {
        cloudName: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME || 'demo'
    }
});

/**
 * Generates a playable URL for an audio file stored in Cloudinary.
 * @param publicId The Cloudinary public ID of the audio file (e.g., 'folder1/audio_file_1')
 */
export const getAudioUrl = (publicId: string) => {
    // Note: Cloudinary treats audio files as 'video' resource types under the hood
    return cld.video(publicId).toURL();
};
