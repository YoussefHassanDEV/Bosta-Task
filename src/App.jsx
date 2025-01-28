import { useTranslation } from "react-i18next";
import Topbar from "./components/Topbar";
import OrderTracking from "./components/OrderTracking";
import "./i18n";

function App() {
  const { i18n } = useTranslation();

  const changeLanguage = (lang) => {
    i18n.changeLanguage(lang);
  };

  return (
    <div className="App w-full custom-light-blue">
      <Topbar changeLanguage={changeLanguage} />
      <OrderTracking />
    </div>
  );
}

export default App;
