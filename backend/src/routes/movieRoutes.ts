import { Router } from 'express';
import MovieController from '../controllers/movieController';

const router = Router();
const movieController = new MovieController();

// Route to fetch all movies
router.get('/movies', (req, res) => movieController.getMovies(req, res));

// Route to fetch movie details by ID
router.get('/movies/:id', (req, res) => movieController.getMovieDetails(req, res));

// Route to submit a rating for a movie
router.post('/movies/:id/rate', (req, res) => movieController.rateMovie(req, res));

export default router;