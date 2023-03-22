import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, NavLink } from 'react-router-dom';
import SearchIcon from './search.svg';
import MovieCard from './MovieCard';
import Music from './Music';

const API_URL = 'http://www.omdbapi.com?apikey=c27cbd82';

const App = () => {
    const [movies, setMovies] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [isEmpty, setIsEmpty] = useState(false);
    const [test, setTest] = useState(false);

    const searchMovies = async (title) => {
        const response = await fetch(`${API_URL}&s=${title}`);
        const data = await response.json();
        if (data.Search) {
            setMovies(data.Search);
            setIsEmpty(false);
            setTest(false);
        } else {
            setMovies([]);
            setIsEmpty(true);
            setTest(false);
        }
    };

    useEffect(() => {
        searchMovies(searchTerm);
    }, []);

    return (
            <BrowserRouter>
                <div className='mini_nav'>
                <div>
                <NavLink to='/'><h2>Music</h2></NavLink>
                </div>
                <div>
                <NavLink to='movie'><h2>Movie</h2></NavLink>
                </div>
            </div>
            <Routes>
                <Route index element={<Music />} />
                <Route path='movie' element={
                <div className="app">
                    <h1>MovieDom</h1>
                    <div className="search">
                    <input
                        placeholder='Search for movies'
                        value={searchTerm}
                        onChange={(e) => {
                            setSearchTerm(e.target.value)
                            if (e.target.value.length > 0) {
                                setTest(true);
                                setIsEmpty(false);
                            }
                            else{
                                setTest(false);
                            }
                        }
                        }
                    />
                    <img
                        src={SearchIcon}
                        alt="search"
                        onClick={() => searchMovies(searchTerm)}
                    />
                    </div>
                    {
                        test && (
                            <div className='empty'>
                                <h2>Click search icon to see movie</h2>
                            </div>
                        )
                    }
                    {movies.length > 0 ? (
                    <div className="container">
                        {movies.map((movie) => (
                        <MovieCard movie={movie} key={movie.imdbID} />
                        ))}
                    </div>
                    ) : (
                    <div className='empty'>
                        {searchTerm ? (
                        isEmpty && (
                            <h2>No movie found</h2>
                        )
                        ) : (
                        <h2>Please, search for any movie of your choice</h2>
                        )}
                    </div>
                    )}
                </div>
                } />
            </Routes>
        </BrowserRouter>
    );
};

export default App;
