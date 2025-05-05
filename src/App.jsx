import { useState } from 'react'
import './App.css'
import { useEffect } from 'react';
import Card from './components/Card';

const MOVIES_URL = 'https://potterhead-api.vercel.app/api/movies';

function shuffle(array) {
  return array.map(value => ({ value, sort: Math.random() }))
    .sort((a, b) => a.sort - b.sort)
    .map(({ value }) => value);
}

function App() {
  const [score, setScore] = useState(0);
  const [bestScore, setBestScore] = useState(0);
  const [movies, setMovies] = useState([]);
  const [selectedIds, setSelectedIds] = useState([]);

  const getMovies = () => {
    return fetch(MOVIES_URL)
      .then(response => response.json())
      .then(data => data.map(item => ({id: item.serial, poster: item.poster})))
      .catch(error => error);
  }

  useEffect(() => {
    getMovies()
      .then(movies => setMovies(movies))
      .catch(error => console.error(error));
  }, []);

  const onCardClick = (id) => {
    if(selectedIds.includes(id)) {
      if(score > bestScore) {
        setBestScore(score);
        setScore(0);
      }
      setSelectedIds([]);

      return;
    }
    setScore(score+1);
    setSelectedIds([...selectedIds, id]);
    setMovies(shuffle(movies));
  }

  return (
    <>
      <h1>Memory Card</h1>
      <p>Current score: {score}</p>
      <p>Best score: {bestScore}</p>

      <div className="board">
        {movies.map(movie => <Card key={movie.id} movie={movie} onClick={onCardClick} />)}
      </div>
    </>
  )
}

export default App
