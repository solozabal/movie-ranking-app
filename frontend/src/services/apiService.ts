import axios from 'axios';

const API_BASE_URL = 'http://localhost:5000/api'; // Adjust the base URL as needed

interface IMovie {
    title: string;
    synopsis: string;
    cast: { id: string; name: string }[];
    userRatings: number;
}

export const getMovies = async (query: string) => {
    try {
        const response = await axios.get(`${API_BASE_URL}/movies`, {
            params: { query }
        });
        return response.data;
    } catch (error: any) {
        throw new Error('Error fetching movies: ' + (error.response?.data?.message || error.message));
    }
};

export const getMovieDetails = async (movieId: string): Promise<IMovie> => {
    try {
        const response = await axios.get(`${API_BASE_URL}/movies/${movieId}`);
        return response.data as IMovie;
    } catch (error: any) {
        throw new Error('Error fetching movie details: ' + (error.response?.data?.message || error.message));
    }
};

export const submitRating = async (movieId: string, rating: number) => {
    try {
        const response = await axios.post(`${API_BASE_URL}/movies/${movieId}/rate`, { rating });
        return response.data;
    } catch (error: any) {
        throw new Error('Error submitting rating: ' + (error.response?.data?.message || error.message));
    }
};