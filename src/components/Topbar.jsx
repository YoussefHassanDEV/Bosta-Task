import { useTranslation } from "react-i18next";
import PropTypes from "prop-types";
import logo from "../assets/logo.svg";
import logo_en from "../assets/Bosta Logo-en.svg";
import specular from "../assets/specular.svg";

const Topbar = ({ changeLanguage }) => {
  const { t, i18n } = useTranslation();

  const handleLanguageChange = (e) => {
    changeLanguage(e.target.value);
  };

  return (
    <div className="w-full bg-custom-light-blue h-fit custom-light-blue">
      <div className="w-full flex justify-center">
        <div className="w-full max-w-6xl flex items-center justify-around px-6 py-3">
          <div className="flex items-center space-x-2">
            <select
              className="p-1 text-sm mr-32"
              onChange={handleLanguageChange}
              defaultValue={i18n.language}
            >
              <option value="en">English</option>
              <option value="ar">عربي</option>
            </select>
          </div>
          <div className="flex items-center ml-12">
            <img
              src={i18n.language === "en" ? logo_en : logo}
              alt="Logo"
              className="h-10"
            />
          </div>
        </div>
      </div>
      <div className="flex justify-center mt-4">
        <img src={specular} alt="Specular Logo" className="h-32" />
      </div>
      <div className="text-center mt-6">
        <h1 className="text-5xl font-bold text-gray-800">{t("orderTracking")}</h1>
      </div>
    </div>
  );
};

Topbar.propTypes = {
  changeLanguage: PropTypes.func.isRequired,
};

export default Topbar;
