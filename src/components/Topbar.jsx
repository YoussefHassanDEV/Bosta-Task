import { useTranslation } from "react-i18next";
import PropTypes from "prop-types";
import { useState } from "react";
import logo from "../assets/logo.svg";
import logo_en from "../assets/Bosta Logo-en.svg";
import specular from "../assets/specular.svg";

const Topbar = ({ changeLanguage, trackingNumber, setTrackingNumber, handleSearch }) => {
  const { t, i18n } = useTranslation();
  const [showSearch, setShowSearch] = useState(false);

  const handleLanguageChange = (e) => {
    changeLanguage(e.target.value);
  };

  return (
    <div className="w-screen mx-auto bg-custom-light-blue h-fit">
      <div className="w-full flex justify-center">
        <div className="w-full max-w-6xl flex items-center justify-around px-6 py-3">
          <div className="flex items-center space-x-2">
            <select
              className="p-1 text-sm"
              onChange={handleLanguageChange}
              defaultValue={i18n.language}
            >
              <option value="en">English</option>
              <option value="ar">عربي</option>
            </select>
          </div>

          <div className="flex items-center justify-center">
            <img
              src={i18n.language === "en" ? logo_en : logo}
              alt="Logo"
              className="sm:h-8 md:h-10 lg:h-12 w-auto"
            />
          </div>

          <div className="sm:hidden flex items-center">
            <button onClick={() => setShowSearch(!showSearch)} className="p-2">
              <svg
                className="h-6 w-6 text-gray-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M21 21l-4.35-4.35M17 10.5A6.5 6.5 0 104.5 4a6.5 6.5 0 0012.5 6.5z"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {showSearch && (
        <div className="sm:hidden flex justify-center mt-2">
          <div className="relative w-full max-w-xs">
            <input
              type="text"
              value={trackingNumber}
              onChange={(e) => setTrackingNumber(e.target.value)}
              placeholder={t("enterOrderNumber")}
              className="w-full h-10 pl-4 pr-10 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-lg"
            />
            <button
              onClick={handleSearch}
              className="absolute right-0 top-0 bg-red-600 p-2 h-10 w-10 rounded-lg rounded-l-none flex items-center justify-center"
            >
              <svg
                className="h-5 w-5 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M21 21l-4.35-4.35M17 10.5A6.5 6.5 0 104.5 4a6.5 6.5 0 0012.5 6.5z"
                />
              </svg>
            </button>
          </div>
        </div>
      )}

      <div>
        <img
          src={specular}
          alt="Specular Logo"
          className="h-16 md:h-16 lg:h-16 w-auto mx-auto mt-3 sm:h-16"
        />
      </div>

      <div className="text-center mt-6">
        <h1 className="text-5xl font-bold text-gray-800">{t("Track Your Order")}</h1>
      </div>

      <div className="hidden sm:flex justify-center mt-4">
        <div className="relative w-full max-w-md top-5">
          <input
          
            type="text"
            value={trackingNumber}
            onChange={(e) => setTrackingNumber(e.target.value)}
            placeholder={t("enterOrderNumber")}
            className="w-full h-14 pl-16 pr-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-lg bg-white text-right"
          />
          <div className="absolute left-0 top-0">
            <button 
             aria-label="Search"
              onClick={handleSearch}
              className="bg-red-600 p-4 h-14 w-14 rounded-lg rounded-r-none flex items-center justify-center"
            >
              <svg
                className="h-6 w-6 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M21 21l-4.35-4.35M17 10.5A6.5 6.5 0 104.5 4a6.5 6.5 0 0012.5 6.5z"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

Topbar.propTypes = {
  changeLanguage: PropTypes.func,
  trackingNumber: PropTypes.string.isRequired,
  setTrackingNumber: PropTypes.func.isRequired,
  handleSearch: PropTypes.func,
};

export default Topbar;
