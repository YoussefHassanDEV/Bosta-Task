import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import en from "./locales/en.json";
import ar from "./locales/ar.json";

const setDirection = (language) => {
  const direction = language === "ar" ? "ltr" : "ltr"; 
  document.documentElement.dir = direction; 
  document.documentElement.lang = language;
};

i18n
  .use(initReactI18next)
  .init({
    resources: {
      en: { translation: en },
      ar: { translation: ar },
    },
    lng: "en", 
    fallbackLng: "en", 
    interpolation: {
      escapeValue: false, 
    },
    react: {
      useSuspense: false, 
    },
  });

i18n.on("languageChanged", (language) => {
  setDirection(language);
});

export default i18n;
