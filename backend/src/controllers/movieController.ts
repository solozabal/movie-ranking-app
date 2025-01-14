import { Request, Response } from 'express';
import { fetchMovies, fetchMovieDetails, submitRating } from '../services/movieService';
import { body, query, param, validationResult } from 'express-validator';

class MovieController {
    // Validação e sanitização dos parâmetros de consulta
    async getMovies(req: Request, res: Response) {
        await query('query').isString().trim().escape().run(req);
        await query('genre').optional().isString().trim().escape().run(req);
        await query('year').optional().isInt({ min: 1900, max: new Date().getFullYear() }).toInt().run(req);

        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        try {
            const query = req.query.query as string;
            const genre = req.query.genre as string;
            const year = req.query.year ? parseInt(req.query.year as string, 10) : undefined;
            const movies = await fetchMovies(query, genre, year);
            res.status(200).json(movies);
        } catch (error) {
            console.error('Error fetching movies:', error);
            res.status(500).json({ message: 'Error fetching movies', error });
        }
    }

    // Validação e sanitização do parâmetro de rota
    async getMovieDetails(req: Request, res: Response) {
        await param('id').isInt().toInt().run(req);

        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        try {
            const movieId = parseInt(req.params.id, 10);
            const movieDetails = await fetchMovieDetails(movieId);
            res.status(200).json(movieDetails);
        } catch (error) {
            res.status(500).json({ message: 'Error fetching movie details', error });
        }
    }

    // Validação e sanitização do corpo da requisição
    async rateMovie(req: Request, res: Response) {
        await body('movieId').isInt().toInt().run(req);
        await body('rating').isInt({ min: 1, max: 10 }).toInt().run(req);

        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        try {
            const { movieId, rating } = req.body;
            const result = await submitRating(movieId, rating);
            res.status(200).json(result);
        } catch (error) {
            res.status(500).json({ message: 'Error submitting rating', error });
        }
    }
}

export default MovieController;