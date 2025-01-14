import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import MovieList from './components/MovieList';
import MovieDetail from './pages/MovieDetail';
import Login from './components/Login';
import PrivateRoute from './components/PrivateRoute';

const App: React.FC = () => {
    return (
        <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/" element={<PrivateRoute><MovieList /></PrivateRoute>} />
            <Route path="/movie/:id" element={<PrivateRoute><MovieDetail /></PrivateRoute>} />
        </Routes>
    );
};

export default App;