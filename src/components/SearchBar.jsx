import { useTranslation } from "react-i18next";
import PropTypes from "prop-types";
import logo from "../assets/logo.svg";
import logo_en from "../assets/Bosta Logo-en.svg";
import specular from "../assets/specular.svg";
import SearchBar from "./SearchBar"; // Importing the SearchBar component

const Topbar = ({ changeLanguage, trackingNumber, setTrackingNumber, handleSearch }) => {
  const { t, i18n } = useTranslation();

  return (
    <div className="w-screen mx-auto bg-custom-light-blue h-fit">
      <div className="w-full flex justify-center">
        <div className="w-full max-w-6xl flex items-center justify-between px-6 py-3">
          {/* Language Selector */}
          <div className="flex items-center space-x-2">
            <select
              className="p-1 text-sm"
              onChange={(e) => changeLanguage(e.target.value)}
              defaultValue={i18n.language}
            >
              <option value="en">English</option>
              <option value="ar">عربي</option>
            </select>
          </div>

          {/* Logo */}
          <div className="flex items-center justify-center">
            <img
              src={i18n.language === "en" ? logo_en : logo}
              alt="Logo"
              className="sm:h-8 md:h-10 lg:h-12 w-auto"
            />
          </div>

          {/* Search Bar Component */}
          <SearchBar
            trackingNumber={trackingNumber}
            setTrackingNumber={setTrackingNumber}
            handleSearch={handleSearch}
          />
        </div>
      </div>

      {/* Specular Logo */}
      <div>
        <img
          src={specular}
          alt="Specular Logo"
          className="h-16 md:h-16 lg:h-16 w-auto mx-auto mt-3 sm:h-16"
        />
      </div>

      {/* Heading */}
      <div className="text-center mt-6">
        <h1 className="text-5xl font-bold text-gray-800">{t("orderTracking")}</h1>
      </div>
    </div>
  );
};

Topbar.propTypes = {
  changeLanguage: PropTypes.func.isRequired,
  trackingNumber: PropTypes.string.isRequired,
  setTrackingNumber: PropTypes.func.isRequired,
  handleSearch: PropTypes.func.isRequired,
};

export default Topbar;
