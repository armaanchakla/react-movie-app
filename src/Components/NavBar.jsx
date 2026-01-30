const NavBar = () => {
    return (
        <>
            <nav className="bg-white sticky top-0 z-40 shadow">
                <div className="max-w-7xl mx-auto px-4 py-4">
                    <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                    <h1 className="text-2xl font-bold text-red-500 text-center sm:text-left">arMovies</h1>
                    <div className="flex flex-wrap justify-center gap-2">
                        <label htmlFor="darkToggle" className="px-4 py-2 rounded-full bg-gray-900 text-white text-sm cursor-pointer"> 🌗 </label>
                        {/* <label htmlFor="filter-all" className="filter-btn">All</label>
                        <label htmlFor="filter-action" className="filter-btn">Action</label>
                        <label htmlFor="filter-scifi" className="filter-btn">Sci-Fi</label>
                        <label htmlFor="filter-drama" className="filter-btn">Drama</label> */}
                    </div>
                    </div>
                </div>
            </nav>
        </>
    );
};

export default NavBar;