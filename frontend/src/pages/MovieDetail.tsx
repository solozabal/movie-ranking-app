import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getMovieDetails } from '../services/apiService';

interface IMovie {
    title: string;
    synopsis: string;
    cast: { id: string; name: string }[];
    userRatings: number;
}

const MovieDetail: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const [movie, setMovie] = useState<IMovie | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchMovieDetails = async () => {
            try {
                if (id) {
                    const data: IMovie = await getMovieDetails(id);
                    setMovie(data);
                } else {
                    setError('Invalid movie ID');
                    setLoading(false);
                }
            } catch (err) {
                setError('Failed to fetch movie details');
            } finally {
                setLoading(false);
            }
        };

        fetchMovieDetails();
    }, [id]);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>{error}</div>;
    }

    return (
        <div>
            <h1>{movie?.title}</h1>
            <p>{movie?.synopsis}</p>
            <h2>Cast</h2>
            <ul>
                {movie?.cast.map((actor) => (
                    <li key={actor.id}>{actor.name}</li>
                ))}
            </ul>
            <h2>User Ratings</h2>
            <p>{movie?.userRatings} / 10</p>
        </div>
    );
};

export default MovieDetail;