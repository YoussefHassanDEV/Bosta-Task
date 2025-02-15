import React from "react";
import PropTypes from "prop-types";
import { useTranslation } from "react-i18next";
import TrackingDetails from "./TrackingDetails";

const ShipmentDetails = ({ trackingData, showMore, handleShowMore, toggle }) => {
  const { t, i18n } = useTranslation();

  const formatDate = (dateString, locale) => {
    const options = { weekday: "short", month: "short", day: "numeric" };
    const date = new Date(dateString);
    return date.toLocaleDateString(locale, options);
  };

  const calculateDaysDifference = (promisedDate) => {
    const today = new Date();
    const promised = new Date(promisedDate);
    const differenceInTime = promised - today;
    const differenceInDays = Math.floor(differenceInTime / (1000 * 3600 * 24));
    return differenceInDays;
  };

  const shipmentStages = [
    { id: 1, label: t("pickedUp"), state: "Received at warehouse" },
    { id: 2, label: t("processing"), state: "Returned" },
    { id: 3, label: t("outForDelivery"), state: "Out for delivery" },
    { id: 4, label: t("delivered"), state: "Delivered" },
  ];

  const currentState = trackingData?.CurrentStatus?.state || "";
  const currentStageIndex = shipmentStages.findIndex(
    (stage) => stage.state === currentState
  );
  return (
    <div className="w-80 mx-auto md:w-2xl lg:w-2xl xl:w-4xl 2xl:w-5xl">
      <div className={` mb-6 p-3 border border-gray-300 rounded-md ${toggle === "light" ? "bg-white text-black" : "bg-gray-700 text-white"}`}>
        <h2 className=" text-sm text-gray-500 font-normal mb-1">
          ORDER #{trackingData.TrackingNumber}
        </h2>
        <div className={`mb-1 flex font-bold ${toggle === "light" ? "text-[#0098a5]" : "text-green-400"}`}>
          <div className={`${toggle === "light" ? "text-black" : "text-white"}`}>&nbsp;{t("arrivingBy")}&nbsp;</div>
          {formatDate(trackingData.PromisedDate, i18n.language)}
        </div>
        <div className={`${toggle === "light" ? "text-gray-600" : "text-gray-300"} text-sm`}>
          {calculateDaysDifference(trackingData.PromisedDate) >= 1 && (
            <>
              <p>{t("yourOrderIsExpectedToArriveWithin")}</p>
              <p>
                {calculateDaysDifference(trackingData.PromisedDate)} working {t("days")}
              </p>
            </>
          )}
        </div>
        <div className="flex mx-auto mb-8 relative w-72 md:w-xl xl:w-3xl ">
          {shipmentStages.map((stage, index) => (
            <div key={stage.id} className="flex flex-col items-center relative z-10 w-1/4 mt-1">
              <div
                className={`w-7 h-7 rounded-full flex items-center justify-center 
                  ${index <= currentStageIndex
                    ? toggle === "light"
                      ? "bg-[#0098a5] text-white border"
                      : "bg-green-400 text-white border"
                    : toggle === "light"
                      ? "bg-white text-white border border-black"
                      : "bg-gray-800 text-white border border-gray-500"
                  }`}
              >
                <svg
                  className="w-3.5 h-3.5"
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
              </div>
              <div
                className={`mt-2 mx-1 text-center  
                  ${index <= currentStageIndex
                    ? toggle === "light"
                      ? "text-[#0098a5]"
                      : "text-green-400"
                    : toggle === "light"
                      ? "text-gray-500"
                      : "text-gray-400"
                  }`}
              >
                {t(stage.label)}
              </div>
            </div>
          ))}
          <div className="absolute top-4 right-8 w-72 md:w-xl md:right-20 xl:w-3xl">
            {[...Array(3)].map((_, sectionIndex) => {
              const isTransitionLine = sectionIndex === currentStageIndex;
              if (isTransitionLine) {
                return (
                  <React.Fragment key={sectionIndex}>
                    <div
                      className="absolute h-[2px] border-t-2"
                      style={{
                        left: `${sectionIndex * 25 + 25}%`,
                        width: "12.5%",
                        borderStyle: "solid",
                        borderColor: toggle === "light" ? "#0098a5" : "green",
                      }}
                    />
                    <div
                      className="absolute h-[2px]"
                      style={{
                        left: `${sectionIndex * 25 + 37.5}%`,
                        width: "12.5%",
                        background: `repeating-linear-gradient(
                          to right,
                          ${toggle === "light" ? "#d0d5dd" : "#4b5563"} 0,
                          ${toggle === "light" ? "#d0d5dd" : "#4b5563"} 8px,
                          transparent 8px,
                          transparent 16px
                        )`,
                        height: "2px",
                      }}
                    />
                  </React.Fragment>
                );
              }
              return (
                <div
                  key={sectionIndex}
                  className="absolute h-[2px]"
                  style={{
                    left: `${sectionIndex * 25 + 25}%`,
                    width: "25%",
                    ...(sectionIndex < currentStageIndex
                      ? {
                        borderTop: `2px solid ${toggle === "light" ? "#0098a5" : "green"}`,
                      }
                      : {
                        background: `repeating-linear-gradient(
                            to right,
                            ${toggle === "light" ? "#d0d5dd" : "#4b5563"} 0,
                            ${toggle === "light" ? "#d0d5dd" : "#4b5563"} 8px,
                            transparent 8px,
                            transparent 16px
                          )`,
                        height: "2px",
                      }),
                  }}
                />
              );
            })}
          </div>
        </div>
      </div>
      <TrackingDetails trackingData={trackingData} showMore={showMore} toggle={toggle} />
      <div className="flex justify-center mt-4">
        <button
          onClick={handleShowMore}
          className={`px-4 py-2 rounded-md ${toggle === "light" ? "text-[#0098a5]" : "text-green-400"}`}
        >
          {showMore ? `${t("showLess")} ˄` : `${t("showMore")} ˅`}
        </button>
      </div>
    </div>
  );
};
ShipmentDetails.propTypes = {
  trackingData: PropTypes.object.isRequired,
  showMore: PropTypes.bool.isRequired,
  handleShowMore: PropTypes.func.isRequired,
  toggle: PropTypes.string.isRequired,
};

export default ShipmentDetails;
