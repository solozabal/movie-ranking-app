import mongoose, { Schema, Document } from 'mongoose';

interface IUserRating {
    userId: string;
    rating: number;
}

export interface IMovie extends Document {
    title: string;
    genre: string[];
    releaseDate: Date;
    rating: number;
    userRatings: IUserRating[];
}

const MovieSchema: Schema = new Schema({
    title: { type: String, required: true },
    genre: { type: [String], required: true },
    releaseDate: { type: Date, required: true },
    rating: { type: Number, default: 0 },
    userRatings: [{ userId: { type: String, required: true }, rating: { type: Number, required: true } }]
});

const Movie = mongoose.model<IMovie>('Movie', MovieSchema);

export default Movie;