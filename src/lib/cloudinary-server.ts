import { v2 as cloudinary } from 'cloudinary';

// Configure the backend Cloudinary SDK
cloudinary.config({
    cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
    secure: true,
});

export async function fetchFolderAudio(folderName: string) {
    try {
        // Search for all 'video' resource types (which includes audio in Cloudinary) in the specific folder
        const result = await cloudinary.search
            .expression(`folder:"${folderName}" AND resource_type:video`)
            .sort_by('public_id', 'asc')
            .max_results(500)
            .execute();
        // Cloudinary only does basic alphabetical sorting which puts "10" before "2".
        // Instead, we fetch them and perform a natural alphanumeric Javascript sort.
        const sortedResources = result.resources.sort((a: any, b: any) =>
            a.public_id.localeCompare(b.public_id, undefined, { numeric: true, sensitivity: 'base' })
        );

        return sortedResources.map((file: any) => ({
            id: file.public_id,
            title: file.filename || file.public_id.split('/').pop(),
            duration: file.duration ? new Date(file.duration * 1000).toISOString().substring(14, 19) : 'Unknown',
            level: 'Practice',
            url: file.secure_url
        }));
    } catch (error) {
        console.error(`Error fetching from Cloudinary folder ${folderName}:`, error);
        return [];
    }
}
