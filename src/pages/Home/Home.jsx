import React from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import "./Home.css";
import mainGif from "../../assets/main.gif";
import step1 from "../../assets/images/step1.png";
import step2 from "../../assets/images/step2.png";
import step3 from "../../assets/images/step3.png";
import { Title } from "../../components/Title/Title";

export const Home = () => {
  const { t, i18n } = useTranslation();

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
  };

  const journeySteps = [
    {
      titleKey: t("step1Title"),
      descriptionKey: t("step1Description"),
      image: step1,
      alt: "Document grassroots stories",
    },
    {
      titleKey: t("step2Title"),
      descriptionKey: t("step2Description"),
      image: step2,
      alt: "Amplify grassroots impact",
    },
    {
      titleKey: t("step3Title"),
      descriptionKey: t("step3Description"),
      image: step3,
      alt: "Foster collaboration",
    },
  ];

  return (
    <div className="home-container">
      {/* Header */}
      <Title />
      <main>
        {/* Hero Section */}
        <section className="hero-section">
          <div className="left-content">
            <h1>{t("heroTitle")}</h1>
            <h2>{t("heroSubtitle")}</h2>
            <p>{t("heroDescription")}</p>
            <Link to="/meeting" className="cta-button">
              {t("ctaButton")} <i class="ri-live-fill"></i>
            </Link>
          </div>
          <div className="right-content">
            <img src={mainGif} alt="main" className="hero-image" />
          </div>
        </section>

        {/* Journey Section */}
        <section className="getting-started">
          <h2 className="section-title">{t("missionTitle")}</h2>
          <div className="steps-grid">
            {journeySteps.map((step, index) => (
              <div className="step" key={index}>
                <div className="step-number">{index + 1}</div>
                <h3 className="curved-underline">{step.titleKey}</h3>
                <div className="step-img">
                  <img src={step.image} alt={step.alt} />
                </div>
                <p>{step.descriptionKey}</p>
              </div>
            ))}
          </div>
          <Link to="/about" className="secondary-button">
            {t("learnMore")}
          </Link>
        </section>
      </main>
    </div>
  );
};
