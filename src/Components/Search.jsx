const Search = ({ searchTerm, setSearchTerm, theme }) => {
    
  return (
    <div className="flex justify-center mb-6">
      <input
        type="text"
        placeholder="What do you feel like watching today?"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className={`w-full max-w-md px-4 py-2 rounded-full border focus:outline-none focus:ring-2 ${
          theme === "dark"
            ? "bg-slate-800 border-slate-600 text-white placeholder-gray-400 focus:ring-blue-500 focus:border-blue-500"
            : "bg-white border-gray-300 text-gray-900 placeholder-gray-400 focus:ring-blue-500 focus:border-blue-500"
        }`}
      />
    </div>
  );
};

export default Search;