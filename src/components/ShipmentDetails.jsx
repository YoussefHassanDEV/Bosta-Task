import PropTypes from "prop-types";
import TrackingDetails from "./TrackingDetails";

const ShipmentDetails = ({ trackingData, showMore, handleShowMore }) => {
  const formatDate = (dateString) => {
    const options = { weekday: "short", month: "short", day: "numeric" };
    const date = new Date(dateString);
    return date.toLocaleDateString(undefined, options);
  };

  const calculateDaysDifference = (promisedDate) => {
    const today = new Date();
    const promised = new Date(promisedDate);
    const differenceInTime = promised - today;
    const differenceInDays = Math.floor(differenceInTime / (1000 * 3600 * 24));
    return differenceInDays;
  };

  const shipmentStages = [
    { id: 1, label: "Picked Up", state: "Received at warehouse" },
    { id: 2, label: "Processing", state: "Returned" },
    { id: 3, label: "Out for Delivery", state: "Out for delivery" },
    { id: 4, label: "Delivered", state: "Delivered" },
  ];

  const currentState = trackingData?.CurrentStatus?.state || "";
  const currentStageIndex = shipmentStages.findIndex(
    (stage) => stage.state === currentState
  );

  return (
    <div>
      <h2 className="text-lg font-normal mb-1">
        ORDER #{trackingData.TrackingNumber}
      </h2>
      <div className="text-blue-600 mb-1">
        Arriving by {formatDate(trackingData.PromisedDate)}
      </div>

      <div className="text-gray-600 text-sm">
        {calculateDaysDifference(trackingData.PromisedDate) >= 1 ? (
          <>
            <p>Your order is expected to arrive within</p>
            <p>
              {calculateDaysDifference(trackingData.PromisedDate)} working
              day(s)
            </p>
          </>
        ) : (
          <p></p>
        )}
      </div>

      <div className="flex items-center justify-between mb-8 relative">
        {shipmentStages.map((stage, index) => (
          <div
            key={stage.id}
            className="flex flex-col items-center relative z-10 w-1/4"
          >
            <div
              className={`w-8 h-8 rounded-full flex items-center justify-center 
              ${
                index <= currentStageIndex
                  ? "bg-blue-600 text-white"
                  : "bg-gray-200 text-gray-500"
              }`}
            >
              {index + 1}
            </div>
            <div
              className={`text-sm mt-2 text-center
              ${
                index <= currentStageIndex ? "text-blue-600" : "text-gray-500"
              }`}
            >
              {stage.label}
            </div>
          </div>
        ))}
        <div className="absolute top-4 left-0 w-full">
          {[...Array(3)].map((_, sectionIndex) => (
            <div
              key={sectionIndex}
              className="absolute h-[2px] border-t-2"
              style={{
                left: `${(sectionIndex * 25) + 12.5}%`,
                width: '25%',
                borderStyle: 'dashed',
                borderColor: sectionIndex < currentStageIndex ? '#2563eb' : 
                           sectionIndex === currentStageIndex ? '#93c5fd' : '#e5e7eb'
              }}
            />
          ))}
        </div>
      </div>

      <TrackingDetails trackingData={trackingData} showMore={showMore} />

      <div className="flex justify-center mt-4">
        <button
          onClick={handleShowMore}
          className="px-4 py-2 bg-blue-600 text-white rounded-md"
        >
          {showMore ? "Show Less" : "Show More"}
        </button>
      </div>
    </div>
  );
};

ShipmentDetails.propTypes = {
  trackingData: PropTypes.object.isRequired,
  showMore: PropTypes.bool.isRequired,
  handleShowMore: PropTypes.func.isRequired,
};

export default ShipmentDetails;