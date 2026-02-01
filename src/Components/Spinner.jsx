const Spinner = () => {
  
  return (
    <>
      <div className="text-center m-auto py-20">
        <div className="flex flex-col items-center space-y-2">
          <svg
            className="w-8 h-8 text-blue-500 animate-spin"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            ></circle>
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8v4l3-3-3-3v4a8 8 0 00-8 8h4z"
            ></path>
          </svg>
          <span className="text-blue-500 text-sm font-normal">Loading...</span>
        </div>
      </div>
    </>
  );
};

export default Spinner;
