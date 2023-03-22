import React from 'react';
import { useState, useEffect } from 'react';
import SearchIcon from './search.svg';
import './App.css';

const Music = () => {
    const [endPoint, setEndPoint] = useState('');
    const [container, setContainer] = useState([]);
    const [isEmpty, setIsEmpty] = useState(true);
    const [isSearched, setIsSearched] = useState(false);

    useEffect(() => {
        if (isSearched) {
        fetchMusic();
        } else {
        setContainer([]);
        setIsEmpty(!endPoint);
        }
    }, [endPoint, isSearched]);

    const fetchMusic = () => {
        const options = {
        method: 'GET',
        headers: {
            'X-RapidAPI-Key': '15641aa020msh698352c2cc6da20p1b999fjsn0b4f8c68cb6c',
            'X-RapidAPI-Host': 'genius-song-lyrics1.p.rapidapi.com',
        },
        };

        fetch(`https://genius-song-lyrics1.p.rapidapi.com/search/?q=+${endPoint}`, options)
        .then((response) => response.json())
        .then((data) => {
            if (data.hits && data.hits.length > 0) {
            setContainer(data.hits);
            setIsEmpty(false);
            } else {
            setContainer([]);
            setIsEmpty(true);
            }
        })
        .catch((err) => {
            console.error(err);
            setContainer([]);
            setIsEmpty(true);
        });
    };

    const onChangeHandler = (e) => {
        setEndPoint(e.target.value);
        setIsSearched(false);
    };

    const submitHandler = (e) => {
        e.preventDefault();
        if (endPoint) {
        setIsSearched(true);
        }
    };

    return (
        <div className='app'>
        <h1>Genius Lyrics</h1>
        <div className='search'>
            <input
            type='text'
            value={endPoint}
            onChange={onChangeHandler}
            placeholder='Search for song'
            />
            <img src={SearchIcon} alt='search' onClick={submitHandler} />
        </div>
        <div className='empty'>
            {isEmpty && !isSearched && <h2>Please search for any music of your choice</h2>}
            {isEmpty && isSearched && <h2>No music found</h2>}
        </div>
        {container.length > 0 && (
            <div className='container'>
            {container.map((item, index) => {
                return (
                <div key={index} className='music-container'>
                    <div>
                    <img src={item.result.song_art_image_url} alt='' />
                    </div>
                    <div>
                    <h3>{item.result.artist_names}</h3>
                    <p>{item.result.full_title}</p>
                    <a href={item.result.url} target='_blank' rel='noopener noreferrer'>
                        see lyrics
                    </a>
                    </div>
                </div>
                );
            })}
            </div>
        )}
        </div>
    );
};

export default Music;
