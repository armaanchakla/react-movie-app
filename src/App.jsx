import { useEffect, useState } from 'react'
import './App.css'

import NavBar from './Components/NavBar.jsx';
import MovieCard from './Components/MovieCard.jsx';
import Spinner from './Components/Spinner.jsx';

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [movies, setMovies] = useState([]);
  const [error, setError] = useState(null);

  const fetchMovies = async () => {
    try {
      const res = await fetch(
        "https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc",
        {
          headers: {
            Authorization: "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIwYmZkYWU2YTc1YzZlNzQ3YjY1NGZmYWM1YzI1N2MwMiIsIm5iZiI6MTc2OTcxNDg3Ny4xMTM5OTk4LCJzdWIiOiI2OTdiYjRiZDg5MWIwZjAwZTZhMDhmZWEiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.B8HPLsW5nn35W7gJSFeTtVBauPfgeQh2WzLDSyZCjHU",
            Accept: "application/json",
          },
        }
      );

      if (!res.ok) throw new Error("Failed to fetch movies");
      const data = await res.json();
      
      setMovies(data.results);
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchMovies();
  }, []);
  

  return (
    <>
      <input type="checkbox" id="darkToggle" className="hidden"></input>
      {/* <input type="radio" id="filter-all" name="filter" className="hidden" checked></input>
      <input type="radio" id="filter-action" name="filter" className="hidden"></input>
      <input type="radio" id="filter-scifi" name="filter" className="hidden"></input>
      <input type="radio" id="filter-drama" name="filter" className="hidden"></input> */}

      <div className="page min-h-screen transition-all duration-300">
        <NavBar />

        <main className="max-w-7xl mx-auto px-4 py-8">
          <h2 className="text-xl sm:text-2xl md:text-3xl font-bold mb-6 text-center sm:text-left">Popular Movies</h2>
          {isLoading ? <Spinner /> : error ? <div className="text-center text-red-500">Error loading movies</div> : <MovieCard movies={movies} />}
        </main>

        <footer className="text-center py-6 text-sm text-gray-500"> © 2026 arMovies </footer>

      </div>
    </>
  )
}

export default App
