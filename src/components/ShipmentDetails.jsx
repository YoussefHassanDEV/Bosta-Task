import React from "react";
import PropTypes from "prop-types";
import { useTranslation } from "react-i18next";
import TrackingDetails from "./TrackingDetails";

const ShipmentDetails = ({ trackingData, showMore, handleShowMore }) => {
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
    <div className=" w-64 mx-auto  md:w-2xl lg:w-2xl xl:w-4xl 2xl:w-5xl">
      <div className="bg-white mb-6 p-3 border border-gray-300 rounded-md ">
        <h2 className="text-sm text-gray-500 font-normal mb-1">
          ORDER #{trackingData.TrackingNumber}
        </h2>
        <div
          className={`text-[#0098a5] mb-1 flex font-bold `}
        >
          <div className="text-black">&nbsp;{t("arrivingBy")}&nbsp; </div>
          {formatDate(trackingData.PromisedDate, i18n.language)}
        </div>
        <div className="text-gray-600 text-sm">
          {calculateDaysDifference(trackingData.PromisedDate) >= 1 ? (
            <>
              <p>{t("yourOrderIsExpectedToArriveWithin")}</p>
              <p>
                {calculateDaysDifference(trackingData.PromisedDate)} working
                {t("days")}
              </p>
            </>
          ) : (
            <p></p>
          )}

          <div className="flex mx-auto mb-8 relative w-60 md:w-xl xl:w-3xl">
            {shipmentStages.map((stage, index) => (
              <div
                key={stage.id}
                className="flex flex-col items-center   relative z-10 w-1/4 mt-1 "
              >
                <div
                  className={`w-7 h-7 rounded-full flex items-center justify-center  
              ${
                index <= currentStageIndex
                  ? "bg-[#0098a5] text-white border"
                  : "bg-white text-white border border-black"
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
                  className={` mt-2 text-center  
              ${
                index <= currentStageIndex ? "text-[#0098a5]" : "text-gray-500"
              }`}
                >
                  {t(stage.label)}
                </div>
              </div>
            ))}
            <div className="absolute top-4 right-8 w-60 md:w-xl md:right-20 xl:w-3xl">
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
                          borderColor: "#0098a5",
                        }}
                      />
                      <div
                        className="absolute h-[2px]"
                        style={{
                          left: `${sectionIndex * 25 + 37.5}%`,
                          width: "12.5%",
                          background: `repeating-linear-gradient(
                            to right,
                            #d0d5dd 0,
                            #d0d5dd 8px,
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
                            borderTop: "2px solid #0098a5",
                          }
                        : {
                            background: `repeating-linear-gradient(
                              to right,
                              #d0d5dd 0,
                              #d0d5dd 8px,
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
      </div>

      <TrackingDetails trackingData={trackingData} showMore={showMore} />

      <div className="flex justify-center mt-4">
        <button
          onClick={handleShowMore}
          className="px-4 py-2 text-[#0098a5] rounded-md"
        >
          {showMore ? ` ${t("showLess")} ˄` : `${t("showMore")} ˅`}
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
