import PropTypes from "prop-types";
import { useTranslation } from "react-i18next";

const TrackingDetails = ({ trackingData, showMore }) => {
  const { t, i18n } = useTranslation();

  const groupedEvents = trackingData?.TransitEvents?.reduce((acc, event) => {
    const eventDate = new Date(event.timestamp).toLocaleDateString(i18n.language, {
      weekday: "long",
      month: "long",
      day: "numeric",
      year: "numeric",
    });

    if (!acc[eventDate]) {
      acc[eventDate] = [];
    }

    acc[eventDate].push(event);
    return acc;
  }, {});

  const visibleEvents = Object.entries(groupedEvents || {}).slice(0, showMore ? undefined : 4);

  return (
    <ol
      className={`relative text-gray-500 border-none ${
        showMore ? "max-h-full" : "max-h-48 overflow-y-clip"
      } transition-all duration-500`}
    >
      <div className="mb-3 text-md font-semibold">{t("trackingDetails")}</div>

      {groupedEvents && Object.keys(groupedEvents).length > 0 ? (
        visibleEvents.map(([date, events], index) => (
          <li key={index} className="w-2xl mb-4">
            <div className="flex items-center">
              <span className="flex items-center justify-center w-5 h-5 rounded-full ring-4 ring-white bg-gray-300"></span>
              <h3 className="font-medium leading-tight ml-4">{date}</h3>
            </div>

            <div className="ml-2 border-l-2 border-gray-300 pl-4">
              {events.map((event, eventIndex) => {
                const formattedTime = new Date(event.timestamp).toLocaleTimeString(i18n.language, {
                  hour: "2-digit",
                  minute: "2-digit",
                  hour12: true,
                });

                return (
                  <div key={eventIndex} className="pl-4 border my-2 rounded-sm p-2 border-gray-200">
                    <p className="text-sm text-gray-800">
                      {t(`states.${event.state}`, {
                        defaultValue: event.state,
                      })}
                    </p>

                    <div className="flex">
                      <p className="text-sm font-semibold text-gray-400">{formattedTime}</p>
                      {(event.hub || event.location) && (
                        <p className="text-sm font-semibold text-gray-400 ml-2">
                          • {event.hub || event.location}
                        </p>
                      )}
                    </div>

                    {event.reason && (
                      <p className="text-sm text-red-500">
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
  );
};

TrackingDetails.propTypes = {
  trackingData: PropTypes.object.isRequired,
  showMore: PropTypes.bool.isRequired,
};

export default TrackingDetails;
