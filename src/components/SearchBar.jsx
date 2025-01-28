import PropTypes from 'prop-types';

const SearchBar = ({ trackingNumber, setTrackingNumber, handleSearch }) => {
  return (
    <div className="flex justify-center mt-8  ">
      <div className="relative w-full max-w-md">
        <input
          type="text"
          value={trackingNumber}
          onChange={(e) => setTrackingNumber(e.target.value)}
          placeholder="Enter your order number"
          className="w-full h-14 pl-16 pr-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-lg bg-white text-right"
        />
        <div className="absolute left-0 top-0">
          <button
            onClick={handleSearch}
            className="bg-red-600 p-4 h-14 w-14 rounded-lg rounded-r-none flex items-center justify-center"
          >
            <svg className="h-6 w-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M21 21l-4.35-4.35M17 10.5A6.5 6.5 0 104.5 4a6.5 6.5 0 0012.5 6.5z"
              />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};

SearchBar.propTypes = {
  trackingNumber: PropTypes.string.isRequired,
  setTrackingNumber: PropTypes.func.isRequired,
  handleSearch: PropTypes.func.isRequired,
};

export default SearchBar;
