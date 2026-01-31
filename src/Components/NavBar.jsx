const NavBar = ({ theme, toggleTheme }) => {
    return (
        <>
            <nav className="bg-white sticky top-0 z-40 shadow">
                <div className="max-w-7xl mx-auto px-4 py-4">
                    <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                        <h1 className="text-2xl font-bold text-red-500 text-center sm:text-left">arMovies</h1>
                        <div className="flex flex-wrap justify-center gap-2">
                            <button onClick={toggleTheme} className="theme-btn">{theme === "dark" ? "☀️" : "🌙"}</button>
                        </div>
                    </div>
                </div>
            </nav>
        </>
    );
};

export default NavBar;