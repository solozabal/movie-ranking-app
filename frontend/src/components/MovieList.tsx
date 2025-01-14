import React, { useEffect, useState } from 'react';
import { getMovies } from '../services/apiService';

interface IMovie {
    id: string;
    title: string;
    releaseDate: string;
}

const MovieList: React.FC = () => {
    const [movies, setMovies] = useState<IMovie[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        const fetchMovies = async () => {
            try {
                const data = await getMovies(searchTerm) as IMovie[];
                setMovies(data);
            } catch (err) {
                setError('Failed to fetch movies');
            } finally {
                setLoading(false);
            }
        };

        fetchMovies();
    }, [searchTerm]);

    const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(event.target.value);
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>{error}</div>;
    }

    return (
        <div>
            <input
                type="text"
                placeholder="Search for movies..."
                value={searchTerm}
                onChange={handleSearch}
            />
            <ul>
                {movies.map((movie) => (
                    <li key={movie.id}>
                        <h3>{movie.title}</h3>
                        <p>{movie.releaseDate}</p>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default MovieList;