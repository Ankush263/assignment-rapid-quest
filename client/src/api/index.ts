import axios from 'axios';

// const URL = `http://localhost:5000`;
const URL = `https://assignment-rapid-quest.onrender.com`;

const VIDEO_URL = `${URL}/api/v1/video`;

const VIDEO_API = axios.create({ baseURL: VIDEO_URL });

export const createVideo = (_formData: FormData) =>
	VIDEO_API.post(`/`, _formData);

export const getAllVideos = () => VIDEO_API.get('/');
