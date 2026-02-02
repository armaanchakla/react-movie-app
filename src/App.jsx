import { useEffect, useState } from "react";
import "./App.css";

import NavBar from "./Components/NavBar.jsx";
import MovieCard from "./Components/MovieCard.jsx";
import Spinner from "./Components/Spinner.jsx";
import useTheme from "./Components/UseTheme.jsx";
import Search from "./Components/Search.jsx";
import useDebounce from "./hooks/useDebounce.js";
import Header from "./Components/Header.jsx";

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [movies, setMovies] = useState([]);
  const [error, setError] = useState(null);
  const { theme, toggleTheme } = useTheme();
  const [searchTerm, setSearchTerm] = useState("");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState("");

  const [trendingMovies, setTrendingMovies] = useState([]); 

  useDebounce(
    () => {
      setDebouncedSearchTerm(searchTerm);
    },
    500,
    [searchTerm],
  );

  const API_BASE_URL = "https://api.themoviedb.org/3";
  const API_KEY = import.meta.env.VITE_TMDB_API_KEY;
  const API_OPTIONS = {
    headers: {
      accept: "application/json",
      Authorization: `Bearer ${API_KEY}`,
    },
  };

  const fetchMovies = async (query = "") => {
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
      
      insertTrendingMovies(data.results);
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  const insertTrendingMovies = (result) => {
    const randomTrendingMoviesCopy = [...result];
    if (!randomTrendingMoviesCopy) return;
    
    const randomTrendingMovies = [...randomTrendingMoviesCopy]
      .sort(() => Math.random() - 0.5)
      .slice(0, 5)
      .map(({ id, title, poster_path }) => ({
        id,
        title,
        poster_path,
        count: 1,
      }));
    setTrendingMovies(randomTrendingMovies);

    // const trendingMovie = result[0] || null;
    // if (!trendingMovie) return;

    // setTrendingMovies(prevTrends => {
    //   // Check if movie already exists
    //   const existingMovie = prevTrends.find(
    //     movie => movie.id === trendingMovie.id
    //   );

    //   // If exists → increment count
    //   if (existingMovie) {
    //     return prevTrends.map(movie =>
    //       movie.id === trendingMovie.id
    //         ? { ...movie, count: movie.count + 1 }
    //         : movie
    //     );
    //   }

    //   // If max 5 reached → do nothing
    //   if (prevTrends.length >= 5) {
    //     return prevTrends;
    //   }

    //   // Else add new movie
    //   return [
    //     ...prevTrends,
    //     {
    //       id: trendingMovie.id,
    //       title: trendingMovie.title,
    //       poster_path: trendingMovie.poster_path,
    //       count: 1,
    //     },
    //   ];
    // });
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
          <Header></Header>

          <Search
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
            theme={theme}
          />

          {/* TRENDING MOVIES */}
          {trendingMovies.length > 0 && (
            <section className="trending">
              <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-center sm:text-left">
                Trending Movies
              </h2>

              <ul>
                {trendingMovies.map((movie, index) => (
                  <li key={movie.id}>
                    <p>{index + 1}</p>
                    <img
                      src={movie.poster_path ? `https://image.tmdb.org/t/p/w500/${movie.poster_path}` : "../../public/no-movie.png"}
                      alt={movie.title}
                    />
                  </li>
                ))}
              </ul>
            </section>
          )}

          {/* POPULAR MOVIES */}
          <h2 className="text-xl sm:text-2xl md:text-3xl font-bold mb-6 text-center sm:text-left">
            Popular Movies
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
