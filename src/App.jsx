import { useEffect, useState } from 'react'
import './App.css'

import NavBar from './Components/NavBar.jsx';
import MovieCard from './Components/MovieCard.jsx';
import Spinner from './Components/Spinner.jsx';
import useTheme from './Components/UseTheme.jsx';

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [movies, setMovies] = useState([]);
  const [error, setError] = useState(null);
  const { theme, toggleTheme } = useTheme();
  const [searchTerm, setSearchTerm] = useState("");
  
  // const filteredMovies = movies.filter((movie) =>
  //   movie.title.toLowerCase().includes(searchTerm.toLowerCase())
  // );

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
      <div className={`page ${theme} min-h-screen`}>    
        <NavBar  theme={theme} toggleTheme={toggleTheme} />

        <main className="max-w-7xl mx-auto px-4 py-8">

          <div className="flex justify-center mb-6">
            <input
              type="text"
              placeholder="What do you feel like watching today?"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className={`w-full max-w-md px-4 py-2 rounded-full border focus:outline-none focus:ring-2 ${
                theme === 'dark'
                  ? 'bg-slate-800 border-slate-600 text-white placeholder-gray-400 focus:ring-blue-500 focus:border-blue-500'
                  : 'bg-white border-gray-300 text-gray-900 placeholder-gray-400 focus:ring-blue-500 focus:border-blue-500'
              }`}
            />
          </div>

          <h2 className="text-xl sm:text-2xl md:text-3xl font-bold mb-6 text-center sm:text-left">All Movies</h2>
          {isLoading && <Spinner />}
          {error && <div className="text-center text-red-500">Error loading movies</div>}
          {!isLoading && !error && <MovieCard movies={movies} />}
        </main>

        <footer className="text-center py-6 text-sm text-gray-500"> © 2026 arMovies </footer>
      </div>
    </>
  )
}

export default App
