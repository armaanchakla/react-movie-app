import { GENRE_MAP } from "../utils/genres";

const MovieCard = ({ movies, page, onPageChange, totalPages }) => {

  return (
    <>
      <div className="movies grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {movies.map((movie) => {
          const genres = movie.genre_ids
            .slice(0, 2)
            .map((id) => GENRE_MAP[id])
            .filter(Boolean)
            .join(" • ");
          const ratingColor =
            movie.vote_average >= 7
              ? "bg-green-600"
              : movie.vote_average >= 5
                ? "bg-yellow-500"
                : "bg-red-500";

          return (
            <div
              key={movie.id}
              className="movie-card relative rounded-xl overflow-hidden shadow-lg border border-gray-200"
            >
              <img
                className="h-full w-full object-cover"
                src={movie.poster_path
                  ? `https://image.tmdb.org/t/p/w500/${movie.poster_path}`
                  : "../../public/no-movie.png"
                }
                alt={movie.title}
              />
              <div className="overlay absolute inset-0 bg-black/70 text-white flex flex-col justify-end p-4 transition-all duration-300">
                <h3 className="text-lg font-semibold">{movie.title}</h3>
                <p className="text-sm text-white-300">
                  {genres || "Unknown"}
                </p>
                <span className="text-sm text-white-400 mt-1">
                  
                  {movie.release_date?.slice(0, 4)}
                </span>
                <div className="flex flex-col mt-2">
                  <div className="flex justify-between items-center">
                    <span
                      className={`text-xs ${ratingColor} px-2 py-1 rounded`}
                    >
                      ⭐ {movie.vote_average.toFixed(1)}
                    </span>
                    <button className="text-xs bg-gray-500 px-3 py-1 rounded">
                      Details
                    </button>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div>
        <div className="flex justify-center items-center mt-8">
          <button
            className={`mx-2 px-4 py-2 rounded text-white transition ${page === 1 ? "bg-gray-300 cursor-not-allowed" : "bg-blue-500 hover:bg-gray-600"}`}
            onClick={() => onPageChange(page - 1)}
            disabled={page === 1}
          >
            Previous
          </button>

          <span className="mx-2">Page {page} of {totalPages}</span>

          <button
            className={`mx-2 px-4 py-2 rounded text-white transition ${page === totalPages ? "bg-gray-300 cursor-not-allowed" : "bg-blue-500 hover:bg-gray-600"}`}
            onClick={() => onPageChange(page + 1)}
            disabled={page === totalPages}
          >
            Next
          </button>
        </div>
      </div>
    </>
  );
};

export default MovieCard;
