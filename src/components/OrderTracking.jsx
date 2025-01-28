import { useState } from "react";
import { useTranslation } from "react-i18next";
import SearchBar from "./SearchBar";
import ShipmentDetails from "./ShipmentDetails";

const OrderTracking = () => {
  const { t } = useTranslation(); 
  const [showMore, setShowMore] = useState(false);
  const [trackingData, setTrackingData] = useState(null);
  const [trackingNumber, setTrackingNumber] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [state, setState] = useState(null);

  const handleShowMore = () => {
    setShowMore(!showMore);
  };

  const handleSearch = async () => {
    setIsLoading(true);
    setError(null);
    setTrackingData(null);
    try {
      const response = await fetch(
        `https://tracking.bosta.co/shipments/track/${trackingNumber}`,
        {
          headers: { "x-requested-by": "Bosta" },
        }
      );
      if (!response.ok) {
        throw new Error(t("trackingNumberNotFound"));
      }
      const data = await response.json();
      setTrackingData(data);
      setState(data.CurrentStatus.state);
      console.log(data.CurrentStatus.state);
    } catch (error) {
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full">
      <div className="mx-auto p-4 rounded-lg">
        <div className="relative top-4">
          <SearchBar
            trackingNumber={trackingNumber}
            setTrackingNumber={setTrackingNumber}
            handleSearch={handleSearch}
          />
        </div>

        {(trackingData || error) && (
          <div className="bg-white p-10 rounded-lg w-full">
            {isLoading && <p className="text-center">{t("loading")}</p>}
            {error && <p className="text-red-600 text-center">{error}</p>}
            {trackingData && (
              <ShipmentDetails
                state={state}
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
