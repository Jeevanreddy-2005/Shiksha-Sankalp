import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import "./Language.css";

export const Language = () => {
  const { i18n } = useTranslation();
  const [selectedLanguage, setSelectedLanguage] = useState(
    localStorage.getItem("language") || "en"
  );

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
    localStorage.setItem("language", lng);
    setSelectedLanguage(lng);
  };

  return (
    <div className="language-dropdown">
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
  );
};
