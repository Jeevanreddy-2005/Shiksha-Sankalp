import React from "react";
import { useTranslation } from "react-i18next";
import { Title } from "../../components/Title/Title";
import "./About.css";

export const About = () => {
  const { t } = useTranslation();

  return (
    <>
    <Title/>
    <div className="about-container">
      <h1 className="about-title">{t("about.title")}</h1>

      <div className="about-content">
        <h2>{t("about.whoWeAre")}</h2>
        <p dangerouslySetInnerHTML={{ __html: t("about.content.whoWeAre") }} />

        <h2>{t("about.ourMission")}</h2>
        <p dangerouslySetInnerHTML={{ __html: t("about.content.ourMission") }} />

        <h2>{t("about.howWeWork")}</h2>
        <p dangerouslySetInnerHTML={{ __html: t("about.content.howWeWork") }} />
      </div>

      <div className="social-icons">
        <div className="ksr-link">
          <a
            href="https://bento.me/cosmics"
            target="_blank"
            rel="noopener noreferrer"
          >
            <i className="ri-flashlight-fill"></i>Built by Cosmic
          </a>
        </div>
      </div>
    </div>
    </>
  );
};