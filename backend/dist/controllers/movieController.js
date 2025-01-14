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
Object.defineProperty(exports, "__esModule", { value: true });
const movieService_1 = require("../services/movieService");
const express_validator_1 = require("express-validator");
class MovieController {
    // Validação e sanitização dos parâmetros de consulta
    getMovies(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            yield (0, express_validator_1.query)('query').isString().trim().escape().run(req);
            yield (0, express_validator_1.query)('genre').optional().isString().trim().escape().run(req);
            yield (0, express_validator_1.query)('year').optional().isInt({ min: 1900, max: new Date().getFullYear() }).toInt().run(req);
            const errors = (0, express_validator_1.validationResult)(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({ errors: errors.array() });
            }
            try {
                const query = req.query.query;
                const genre = req.query.genre;
                const year = req.query.year ? parseInt(req.query.year, 10) : undefined;
                const movies = yield (0, movieService_1.fetchMovies)(query, genre, year);
                res.status(200).json(movies);
            }
            catch (error) {
                res.status(500).json({ message: 'Error fetching movies', error });
            }
        });
    }
    // Validação e sanitização do parâmetro de rota
    getMovieDetails(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            yield (0, express_validator_1.param)('id').isInt().toInt().run(req);
            const errors = (0, express_validator_1.validationResult)(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({ errors: errors.array() });
            }
            try {
                const movieId = parseInt(req.params.id, 10);
                const movieDetails = yield (0, movieService_1.fetchMovieDetails)(movieId);
                res.status(200).json(movieDetails);
            }
            catch (error) {
                res.status(500).json({ message: 'Error fetching movie details', error });
            }
        });
    }
    // Validação e sanitização do corpo da requisição
    rateMovie(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            yield (0, express_validator_1.body)('movieId').isInt().toInt().run(req);
            yield (0, express_validator_1.body)('rating').isInt({ min: 1, max: 10 }).toInt().run(req);
            const errors = (0, express_validator_1.validationResult)(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({ errors: errors.array() });
            }
            try {
                const { movieId, rating } = req.body;
                const result = yield (0, movieService_1.submitRating)(movieId, rating);
                res.status(200).json(result);
            }
            catch (error) {
                res.status(500).json({ message: 'Error submitting rating', error });
            }
        });
    }
}
exports.default = MovieController;
