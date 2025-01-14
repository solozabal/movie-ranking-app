"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.submitRating = exports.fetchMovieDetails = exports.fetchMovies = void 0;
const axios_1 = __importDefault(require("axios"));
const TMDB_API_URL = 'https://api.themoviedb.org/3';
const TMDB_API_KEY = process.env.TMDB_API_KEY; // Ensure to set your TMDb API key in environment variables
const fetchMovies = (query, genre, year) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const response = yield axios_1.default.get(`${TMDB_API_URL}/search/movie`, {
            params: Object.assign(Object.assign({ api_key: TMDB_API_KEY, query }, (genre && { with_genres: genre })), (year && { year })),
        });
        return response.data.results;
    }
    catch (error) {
        throw new Error('Error fetching movies: ' + error.message);
    }
});
exports.fetchMovies = fetchMovies;
const fetchMovieDetails = (movieId) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const response = yield axios_1.default.get(`${TMDB_API_URL}/movie/${movieId}`, {
            params: {
                api_key: TMDB_API_KEY,
            },
        });
        return response.data;
    }
    catch (error) {
        throw new Error('Error fetching movie details: ' + error.message);
    }
});
exports.fetchMovieDetails = fetchMovieDetails;
const submitRating = (movieId, rating) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield axios_1.default.post(`${TMDB_API_URL}/movie/${movieId}/rating`, {
            value: rating,
        }, {
            params: {
                api_key: TMDB_API_KEY,
            },
        });
    }
    catch (error) {
        throw new Error('Error submitting rating: ' + error.message);
    }
});
exports.submitRating = submitRating;
