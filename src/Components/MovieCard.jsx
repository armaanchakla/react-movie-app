const MovieCard = ({ movies }) => {
    
    movies.map(movie => {
        console.log(movie.title);
    });

    return (
        <>
            <div className="movies grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">

                {movies.map(movie => (
                    <div key={movie.id} className="movie-card relative rounded-xl overflow-hidden shadow-lg border border-gray-200">
                        <img className="h-full w-full object-cover" src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`} alt={movie.title} />
                        <div className="overlay absolute inset-0 bg-black/70 text-white flex flex-col justify-end p-4 transition-all duration-300">
                        <h3 className="text-lg font-semibold">{movie.title}</h3>
                        <p className="text-sm text-gray-300">Sci-Fi • Thriller</p>
                        <div className="flex justify-between items-center mt-2">
                            <span className="text-xs bg-green-600 px-2 py-1 rounded">⭐ 8.5</span>
                            <button className="text-xs bg-red-500 px-3 py-1 rounded">Details</button>
                        </div>
                        </div> 
                    </div>
                    )
                )};



                {/* <div className="movie-card action relative rounded-xl overflow-hidden shadow-lg border border-gray-200">
                    <img
                    className="h-full w-full object-cover"
                    src="https://images.unsplash.com/photo-1505685296765-3a2736de412f"
                    alt="Interstellar"
                    />
                    <div className="overlay absolute inset-0 bg-black/70 text-white flex flex-col justify-end p-4 transition-all duration-300">
                    <h3 className="text-lg font-semibold">Interstellar</h3>
                    <p className="text-sm text-gray-300">Sci-Fi • Adventure</p>
                    <div className="flex justify-between items-center mt-2">
                        <span className="text-xs bg-green-600 px-2 py-1 rounded">⭐ 8.1</span>
                        <button className="text-xs bg-red-500 px-3 py-1 rounded">Details</button>
                    </div>
                    </div>
                </div> */}

                {/* <div className="movie-card action relative rounded-xl overflow-hidden shadow-lg border border-gray-200">
                    <img
                    className="h-full w-full object-cover"
                    src="https://images.unsplash.com/photo-1509347528160-9a9e33742cdb"
                    alt="The Dark Knight"
                    />
                    
                    <div className="overlay absolute inset-0 bg-black/70 text-white flex flex-col justify-end p-4 transition-all duration-300">
                    <h3 className="text-lg font-semibold">The Dark Knight</h3>
                    <p className="text-sm text-gray-300">Action • Adventure</p>
                    <div className="flex justify-between items-center mt-2">
                        <span className="text-xs bg-green-600 px-2 py-1 rounded">⭐ 8.8</span>
                        <button className="text-xs bg-red-500 px-3 py-1 rounded">Details</button>
                    </div>
                    </div>
                </div> */}

                {/* <div className="movie-card action relative rounded-xl overflow-hidden shadow-lg border border-gray-200">
                    <img
                    className="h-full w-full object-cover"
                    src="https://images.unsplash.com/photo-1489599849927-2ee91cede3ba"
                    alt="Joker"
                    />
                    <div className="overlay absolute inset-0 bg-black/70 text-white flex flex-col justify-end p-4 transition-all duration-300">
                    <h3 className="text-lg font-semibold">Joker</h3>
                    <p className="text-sm text-gray-300">Drama • Adventure</p>
                    <div className="flex justify-between items-center mt-2">
                        <span className="text-xs bg-green-600 px-2 py-1 rounded">⭐ 8.4</span>
                        <button className="text-xs bg-red-500 px-3 py-1 rounded">Details</button>
                    </div>
                    </div>
                </div> */}
            </div>
        </>
    );
};

export default MovieCard;