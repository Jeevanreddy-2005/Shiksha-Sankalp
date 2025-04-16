import React, { useState, useEffect } from "react";
import { supabase } from "../../server/supabaseClient";
import { Title } from "../../components/Title/Title";
import { useTranslation } from "react-i18next";
import "./Reports.css";
import { Loader } from "../../components/Loader/Loader";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";

const Reports = () => {
  const [reports, setReports] = useState([]);
  const [formData, setFormData] = useState({
    place: "",
    school_name: "",
    problem_faced: "",
    solution_approach: "",
  });
  const [loading, setLoading] = useState(true);

  const { t } = useTranslation();

  const fetchReports = async () => {
    setLoading(true);
    const { data, error } = await supabase.from("reports").select("*");
    if (error) {
      console.error("Error fetching reports:", error);
    } else {
      setReports(data);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchReports();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { data, error } = await supabase.from("reports").insert([formData]);
    if (error) {
      console.error("Error submitting form:", error);
    } else {
      setFormData({
        place: "",
        school_name: "",
        problem_faced: "",
        solution_approach: "",
      });
      fetchReports();
    }
  };

  const handleDownloadReport = () => {
    const container = document.createElement("div");
    container.style.padding = "20px";
    
    const titlePage = document.createElement("div");
    titlePage.style.textAlign = "center";
    titlePage.style.marginBottom = "40px";
    
    const titleElement = document.createElement("h1");
    titleElement.textContent = "Shiksha Sankalp Report";
    titleElement.style.color = "#00008B";
    titleElement.style.fontSize = "36px";
    titleElement.style.marginBottom = "20px";
    titleElement.style.fontWeight = "bold";
    
    const dateElement = document.createElement("p");
    const currentDate = new Date().toLocaleString();
    dateElement.textContent = `Generated on: ${currentDate}`;
    dateElement.style.fontSize = "18px";
    dateElement.style.color = "#666";
    dateElement.style.marginBottom = "40px";
    
    const analysisSection = document.createElement("div");
    analysisSection.style.marginTop = "40px";
    analysisSection.style.marginBottom = "40px";
    
    const analysisTitle = document.createElement("h2");
    analysisTitle.textContent = "Meeting Analysis";
    analysisTitle.style.fontSize = "24px";
    analysisTitle.style.marginBottom = "20px";
    analysisTitle.style.textAlign = "center";
    
    const cardsContainer = document.createElement("div");
    cardsContainer.style.display = "flex";
    cardsContainer.style.justifyContent = "center";
    cardsContainer.style.gap = "20px";
    cardsContainer.style.marginBottom = "40px";
    
    const goalsCard = document.createElement("div");
    goalsCard.style.padding = "20px";
    goalsCard.style.backgroundColor = "#f0f0f0";
    goalsCard.style.borderRadius = "8px";
    goalsCard.style.width = "200px";
    goalsCard.style.textAlign = "center";
    goalsCard.innerHTML = `
      <h3 style="margin-bottom: 10px;">Goals Met</h3>
      <p style="font-size: 24px; color: #00008B; font-weight: bold;">85%</p>
    `;
    
    const challengesCard = document.createElement("div");
    challengesCard.style.padding = "20px";
    challengesCard.style.backgroundColor = "#f0f0f0";
    challengesCard.style.borderRadius = "8px";
    challengesCard.style.width = "200px";
    challengesCard.style.textAlign = "center";
    challengesCard.innerHTML = `
      <h3 style="margin-bottom: 10px;">Challenges Resolved</h3>
      <p style="font-size: 24px; color: #00008B; font-weight: bold;">70%</p>
    `;
    
    const pageBreak = document.createElement("div");
    pageBreak.style.pageBreakAfter = "always";
    
    const reportsGrid = document.querySelector(".reports-grid").cloneNode(true);
    
    titlePage.appendChild(titleElement);
    titlePage.appendChild(dateElement);
    cardsContainer.appendChild(goalsCard);
    cardsContainer.appendChild(challengesCard);
    analysisSection.appendChild(analysisTitle);
    analysisSection.appendChild(cardsContainer);
    
    container.appendChild(titlePage);
    container.appendChild(analysisSection);
    container.appendChild(pageBreak);
    container.appendChild(reportsGrid);
    
    document.body.appendChild(container);

    // Optimized PDF generation settings
    html2canvas(container, {
      scale: 1.5,
      useCORS: true,
      allowTaint: true,
      logging: false,
      backgroundColor: '#ffffff'
    }).then((canvas) => {
      const imgData = canvas.toDataURL('image/jpeg', 0.75);
      const pdf = new jsPDF({
        orientation: 'p',
        unit: 'mm',
        format: 'a4',
        compress: true
      });

      const imgWidth = 210;
      const pageHeight = 297;
      const imgHeight = (canvas.height * imgWidth) / canvas.width;
      
      let heightLeft = imgHeight;
      let position = 0;

      pdf.addImage(imgData, 'JPEG', 0, position, imgWidth, imgHeight, '', 'FAST');
      heightLeft -= pageHeight;

      while (heightLeft >= 0) {
        position = heightLeft - imgHeight;
        pdf.addPage();
        pdf.addImage(imgData, 'JPEG', 0, position, imgWidth, imgHeight, '', 'FAST');
        heightLeft -= pageHeight;
      }

      pdf.save("Shiksha_Sankalp_Report.pdf");
      document.body.removeChild(container);
    });
  };

  return (
    <>
      <Title />
      <div className="reports-container">
        <h1>{t("reports.title")}</h1>
        <p>{t("reports.description")}</p>

        <form onSubmit={handleSubmit} className="feedback-form">
          <input
            type="text"
            name="place"
            placeholder={t("reports.form.place")}
            value={formData.place}
            onChange={handleInputChange}
            required
          />
          <input
            type="text"
            name="school_name"
            placeholder={t("reports.form.school_name")}
            value={formData.school_name}
            onChange={handleInputChange}
            required
          />
          <textarea
            name="problem_faced"
            placeholder={t("reports.form.problem_faced")}
            value={formData.problem_faced}
            onChange={handleInputChange}
            required
          />
          <textarea
            name="solution_approach"
            placeholder={t("reports.form.solution_approach")}
            value={formData.solution_approach}
            onChange={handleInputChange}
            required
          />
          <button type="submit">{t("reports.form.submit")}</button>
        </form>

        <div className="reports-grid">
          {loading ? (
            <Loader />
          ) : reports.length > 0 ? (
            reports.map((report) => (
              <div key={report.id} className="report-card">
                <h3>{report.school_name}</h3>
                <p>
                  <strong>
                    <i className="ri-map-pin-2-line"></i>{" "}
                    {t("reports.report_card.place")}:
                  </strong>{" "}
                  {report.place}
                </p>
                <p>
                  <strong>
                    <i className="ri-megaphone-line"></i>{" "}
                    {t("reports.report_card.problem")}:
                  </strong>{" "}
                  {t(report.problem_faced)}
                </p>
                <p>
                  <strong>
                    <i className="ri-bookmark-3-line"></i>{" "}
                    {t("reports.report_card.solution")}:
                  </strong>{" "}
                  {t(report.solution_approach)}
                </p>
              </div>
            ))
          ) : (
            <p>{t("reports.no_reports")}</p>
          )}
        </div>

        {!loading && reports.length > 0 && (
          <div className="download-button-container">
            <button className="download-button" onClick={handleDownloadReport}>
              {t("reports.download_report")} <i className="ri-download-2-line"></i>
            </button>
          </div>
        )}
      </div>
    </>
  );
};

export default Reports;