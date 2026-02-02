const Header = () => {
  return (
    <>
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
    </>
  );
};

export default Header;
