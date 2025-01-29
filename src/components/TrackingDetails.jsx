import PropTypes from "prop-types";
import { useTranslation } from "react-i18next";
import { jsPDF } from "jspdf";

const TrackingDetails = ({ trackingData, showMore }) => {
  const { t, i18n } = useTranslation();

  const groupedEvents = trackingData?.TransitEvents?.reduce((acc, event) => {
    const eventDate = new Date(event.timestamp).toLocaleDateString(
      i18n.language,
      {
        weekday: "long",
        month: "long",
        day: "numeric",
        year: "numeric",
      }
    );

    if (!acc[eventDate]) {
      acc[eventDate] = [];
    }

    acc[eventDate].push(event);
    return acc;
  }, {});

  const visibleEvents = Object.entries(groupedEvents || {}).slice(
    0,
    showMore ? undefined : 4
  );

  const exportTrackingDataAsPDF = () => {
    i18n.changeLanguage("en");

    const doc = new jsPDF();

    doc.setFontSize(16);
    doc.text(t("trackingDetails"), 10, 10);

    let yOffset = 20;

    if (groupedEvents && Object.keys(groupedEvents).length > 0) {
      visibleEvents.forEach(([date, events]) => {
        doc.setFontSize(12);
        doc.text(date, 10, yOffset);
        yOffset += 10;

        events.forEach((event) => {
          const formattedTime = new Date(event.timestamp).toLocaleTimeString(
            i18n.language,
            {
              hour: "2-digit",
              minute: "2-digit",
              hour12: true,
            }
          );

          const eventState = t(`states.${event.state}`, {
            defaultValue: event.state,
          });
          const eventLocation = event.hub || event.location;
          const eventReason = event.reason
            ? t(`reasons.${event.reason}`, { defaultValue: event.reason })
            : "";

          doc.setFontSize(10);
          doc.text(`${formattedTime} - ${eventState}`, 10, yOffset);
          yOffset += 6;

          if (eventLocation) {
            doc.text(`• ${eventLocation}`, 10, yOffset);
            yOffset += 6;
          }

          if (eventReason) {
            doc.setTextColor(255, 0, 0);
            doc.text(eventReason, 10, yOffset);
            yOffset += 6;
            doc.setTextColor(0, 0, 0);
          }

          yOffset += 10;
        });
      });
    } else {
      doc.text(t("noTrackingDetailsAvailable"), 10, yOffset);
    }

    doc.save("tracking_details.pdf");

    i18n.changeLanguage(i18n.language);
  };

  return (
    <div>
      <ol
        className={`w-64 md:w-xl lg:w-5xl  mx-auto relative text-gray-500 border-none ${
          showMore ? "max-h-full" : "max-h-48 overflow-y-clip"
        } transition-all duration-500`}
      >
        <div className="mb-3 text-md font-semibold">{t("trackingDetails")}</div>

        {groupedEvents && Object.keys(groupedEvents).length > 0 ? (
          visibleEvents.map(([date, events], index) => (
            <li key={index} className="w-60 md:w-xl lg:w-5xl  mb-4">
              <div className="flex items-center">
                <span className="flex items-center justify-center w-5 h-5 rounded-full ring-4 ring-white bg-gray-300"></span>
                <h3 className="font-medium leading-tight ml-4">{date}</h3>
              </div>

              <div className="ml-2 border-l-2 border-gray-300 pl-4">
                {events.map((event) => {
                  const formattedTime = new Date(
                    event.timestamp
                  ).toLocaleTimeString(i18n.language, {
                    hour: "2-digit",
                    minute: "2-digit",
                    hour12: true,
                  });

                  return (
                    <div
                      key={event.timestamp}
                      className="pl-4 border my-2 rounded-sm p-2 border-gray-200 word-wrap"
                    >
                      <p className="text-sm text-gray-800 word-wrap">
                        {t(`states.${event.state}`, {
                          defaultValue: event.state,
                        })}
                      </p>

                      <div className="flex">
                        <p className="text-sm font-semibold text-gray-400 word-wrap">
                          {formattedTime}
                        </p>
                        {(event.hub || event.location) && (
                          <p className="text-sm font-semibold text-gray-400 ml-2 word-wrap">
                            • {event.hub || event.location}
                          </p>
                        )}
                      </div>

                      {event.reason && (
                        <p className="text-sm text-red-500 word-wrap">
                          {t(`reasons.${event.reason}`, {
                            defaultValue: event.reason,
                          })}
                        </p>
                      )}
                    </div>
                  );
                })}
              </div>
            </li>
          ))
        ) : (
          <p className="text-gray-500">{t("noTrackingDetailsAvailable")}</p>
        )}

        {!showMore && (
          <div className="absolute inset-x-0 bottom-0 h-24 w-full bg-gradient-to-t from-white to-transparent"></div>
        )}
      </ol>
      <div className="mt-4">
        <button
          onClick={exportTrackingDataAsPDF}
          className="px-4 py-2 text-[#0098a5]"
        >
          {t("exportTrackingDetails")}
        </button>
      </div>
    </div>
  );
};

TrackingDetails.propTypes = {
  trackingData: PropTypes.object.isRequired,
  showMore: PropTypes.bool.isRequired,
};

export default TrackingDetails;
