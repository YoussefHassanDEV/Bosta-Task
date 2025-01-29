import { useState } from "react";
import { useTranslation } from "react-i18next";
import i18n from "./i18n";
import Topbar from "./components/Topbar";
import ShipmentDetails from "./components/ShipmentDetails";

const App = () => {
  const { t } = useTranslation();
  const [trackingNumber, setTrackingNumber] = useState("");
  const [trackingData, setTrackingData] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [showMore, setShowMore] = useState(false);

  const handleShowMore = () => {
    setShowMore((prevState) => !prevState);
  };

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
    <div className="t">
      <div className="custom-light-blue w-full h-fit">
        <Topbar
          changeLanguage={(lang) => i18n.changeLanguage(lang)}
          trackingNumber={trackingNumber}
          setTrackingNumber={setTrackingNumber}
          handleSearch={handleSearch}
        />
      </div>

      <div className="mx-auto mt-6 w-full bg-white">
        {(trackingData || error) && (
          <div className="p-4">
            {isLoading && <p className="text-center">{t("loading")}</p>}
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

export default App;
