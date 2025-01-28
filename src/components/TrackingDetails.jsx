import PropTypes from "prop-types";

const TrackingDetails = ({ trackingData, showMore }) => {
  return (
    <ol
      className={`relative text-gray-500 border-l-2 border-gray-200 ${
        showMore ? "max-h-full" : "max-h-48 overflow-y-clip"
      } transition-all duration-500`}
    >
      {trackingData?.TransitEvents && trackingData.TransitEvents.length > 0 ? (
        trackingData.TransitEvents.map((event, index) => (
          <li key={index} className="mb-10 ml-6">
            <span
              className={`absolute flex items-center justify-center w-8 h-8 rounded-full -start-4 ring-4 ring-white ${
                index % 2 === 0 ? "bg-green-200" : "bg-gray-100"
              }`}
            >
              <svg
                className={`w-3.5 h-3.5 ${
                  index % 2 === 0 ? "text-green-500" : "text-gray-500"
                }`}
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 16 12"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M1 5.917 5.724 10.5 15 1.5"
                />
              </svg>
            </span>
            <h3 className="font-medium leading-tight">{event.state}</h3>
            <p className="text-sm">
              {new Date(event.timestamp).toLocaleString()}
            </p>
            <p className="text-xs text-gray-500">
              {event.hub || event.location}
            </p>
          </li>
        ))
      ) : (
        <p className="text-gray-500">No tracking details available.</p>
      )}

      {!showMore && (
        <div className="absolute inset-x-0 bottom-0 h-24 w-full bg-gradient-to-t from-white to-transparent"></div>
      )}
    </ol>
  );
};

TrackingDetails.propTypes = {
  trackingData: PropTypes.object.isRequired,
  showMore: PropTypes.bool.isRequired,
};

export default TrackingDetails;
