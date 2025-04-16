import React, { useEffect, useState } from "react";
import "./Title.css";
import { useTranslation } from "react-i18next";

export const Title = () => {
  const { t, i18n } = useTranslation();
  const [selectedLanguage, setSelectedLanguage] = useState(
    localStorage.getItem("language") || "en"
  );

  useEffect(() => {
    i18n.changeLanguage(selectedLanguage);
  }, [selectedLanguage, i18n]);

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
    localStorage.setItem("language", lng);
    setSelectedLanguage(lng);
  };

  return (
    <>
      <div className="home-title">
        <div className="title-flex">
          <img src="/logo.svg" alt="Logo" className="logo" />
          <span className="title">{t("appTitle")}</span>
        </div>

        <div className="language-dropdown lang-mobile">
          <select
            value={selectedLanguage}
            onChange={(e) => changeLanguage(e.target.value)}
          >
            <option value="en">English</option>
            <option value="hi">हिंदी</option>
            <option value="kn">ಕನ್ನಡ</option>
            <option value="te">తెలుగు</option>
            <option value="ta">தமிழ்</option>
            <option value="ml">മലയാളം</option>
          </select>
        </div>
      </div>
    </>
  );
};
