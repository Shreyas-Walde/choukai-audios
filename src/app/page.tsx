import AudioDashboard from "../components/AudioDashboard";
import { fetchFolderAudio } from "../lib/cloudinary-server";

export default async function Home() {
  // Uses Next.js Server Components to securely access CLOUDINARY_API_SECRET and fetch data
  const data = {
    folder1: await fetchFolderAudio("all_dio/disc 1"),
    folder2: await fetchFolderAudio("all_dio/disc2"),
    folder3: await fetchFolderAudio("all_dio/disc 3"),
    folder4: await fetchFolderAudio("all_dio/disc 4"),
  };

  return <AudioDashboard initialData={data} />;
}
