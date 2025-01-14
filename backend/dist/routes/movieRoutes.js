"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const movieController_1 = __importDefault(require("../controllers/movieController"));
const router = (0, express_1.Router)();
const movieController = new movieController_1.default();
// Route to fetch all movies
router.get('/movies', (req, res) => movieController.getMovies(req, res));
// Route to fetch movie details by ID
router.get('/movies/:id', (req, res) => movieController.getMovieDetails(req, res));
// Route to submit a rating for a movie
router.post('/movies/:id/rate', (req, res) => movieController.rateMovie(req, res));
exports.default = router;
