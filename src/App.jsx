import { useEffect, useState } from "react";
import "./App.css";

import NavBar from "./Components/NavBar.jsx";
import MovieCard from "./Components/MovieCard.jsx";
import Spinner from "./Components/Spinner.jsx";
import useTheme from "./Components/UseTheme.jsx";
import Search from "./Components/Search.jsx";
import useDebounce from "./hooks/useDebounce.js";

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [movies, setMovies] = useState([]);
  const [error, setError] = useState(null);
  const { theme, toggleTheme } = useTheme();
  const [searchTerm, setSearchTerm] = useState("");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState("");

  useDebounce(() => { setDebouncedSearchTerm(searchTerm) }, 500, [searchTerm]);

  const API_BASE_URL = "https://api.themoviedb.org/3";
  const API_KEY = import.meta.env.VITE_TMDB_API_KEY;
  const API_OPTIONS = {
    headers: {
      accept: "application/json",
      Authorization: `Bearer ${API_KEY}`,
    },
  };

  const fetchMovies = async (query = '') => {
    try {
      setIsLoading(true);
      setError(null);

      const endpoint = query
        ? `${API_BASE_URL}/search/movie?query=${encodeURIComponent(query)}&include_adult=false&language=en-US&page=${page}`
        : `${API_BASE_URL}/discover/movie?include_adult=false&include_video=false&language=en-US&page=${page}&sort_by=popularity.desc`;

      const res = await fetch(endpoint, API_OPTIONS);

      if (!res.ok) throw new Error("Failed to fetch movies");
      const data = await res.json();

      setMovies(data.results);
      setTotalPages(500 /* data.total_pages */); // TMDB API only allows up to page 500
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchMovies(debouncedSearchTerm);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [page, debouncedSearchTerm]);

  return (
    <>
    
      <div className={`page ${theme} min-h-screen`}>
        <NavBar theme={theme} toggleTheme={toggleTheme} />

        <main className="max-w-7xl mx-auto px-4 py-8">
          <section className="flex flex-col items-center text-center">
            <img
              src="/hero.png"
              alt="Hero Banner"
              className="w-64 sm:w-96 md:w-md lg:w-xl xl:w-3xl h-64 mb-6 object-contain"
            />

            <p className="max-w-2xl text-lg sm:text-2xl md:text-4xl lg:text-5xl font-semibold mb-6 bg-linear-to-r from-blue-500 via-purple-500 to-pink-500 bg-clip-text text-transparent">
              Find Your Next Favorite{" "}
              <span className="bg-linear-to-r from-red-400 via-pink-500 to-red-600 bg-clip-text text-transparent">
                Movie
              </span>{" "}
              to Watch!
            </p>
          </section>

          <Search
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
            theme={theme}
          />

          <h2 className="text-xl sm:text-2xl md:text-3xl font-bold mb-6 text-center sm:text-left">
            All Movies
          </h2>
          {isLoading && <Spinner />}
          {error && (
            <div className="text-center text-red-500">Error loading movies</div>
          )}
          {!isLoading && !error && (
            <MovieCard
              movies={movies}
              page={page}
              onPageChange={setPage}
              totalPages={totalPages}
            />
          )}
        </main>

        <footer className="text-center py-6 text-sm text-gray-500">
          © 2026 {import.meta.env.VITE_APP_NAME}
        </footer>
      </div>
    </>
  );
}

export default App;
