import { useState } from "react";
import { useTranslation } from "react-i18next";
import SearchBar from "./SearchBar";
import ShipmentDetails from "./ShipmentDetails";

const OrderTracking = () => {
  const { t } = useTranslation();
  const [showMore, setShowMore] = useState(false);
  const [trackingNumber, setTrackingNumber] = useState("");
  const [trackingData, setTrackingData] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const handleShowMore = () => setShowMore((prevState) => !prevState);
  const handleSearch = async () => {
    setIsLoading(true);
    setError(null);
    setTrackingData(null);
    try {
      const response = await fetchTrackingData(trackingNumber);
      if (response.ok) {
        const data = await response.json();
        setTrackingData(data);
      } else {
        throw new Error(t("trackingNumberNotFound"));
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };
  const fetchTrackingData = (trackingNumber) =>
    fetch(`https://tracking.bosta.co/shipments/track/${trackingNumber}`, {
      headers: { "x-requested-by": "Bosta" },
    });
  return (
    <div className=" w-xs sm:w-xl md:w-2xl lg:w-full mx-auto">
      <div className="mx-auto p-4 rounded-lg">
        <div className="relative top-6">
          <SearchBar
            trackingNumber={trackingNumber}
            setTrackingNumber={setTrackingNumber}
            handleSearch={handleSearch}
          />
        </div>
        {(trackingData || error) && (
          <div className="mx-auto  p-10 rounded-lg   w-72 sm:w-xl md:w-5xl lg:w-6xl 2xl:w-7xl">
            {isLoading && (
              <p data-testid="loading-state" className="text-center">
                {t("loading")}
              </p>
            )}
            {error && <p className="text-red-600 text-center">{error}</p>}
            {trackingData && (
              <ShipmentDetails
                state={trackingData.CurrentStatus?.state}
                trackingData={trackingData}
                showMore={showMore}
                handleShowMore={handleShowMore}
              />
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default OrderTracking;
