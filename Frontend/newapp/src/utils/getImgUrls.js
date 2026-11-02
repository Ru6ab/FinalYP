const API = import.meta.env.VITE_API_URL;

export default function getImgUrls(path) {
  if (!path) return "";
  if (/^https?:\/\//i.test(path)) return path; // Cloudinary or any full URL
  const file = path.split(/[\\/]/).pop(); // local file: keep only the filename
  return `${API}/${file}`;
}