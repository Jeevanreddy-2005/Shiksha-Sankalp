import React, { useState, useEffect } from "react";
import { Bar, Pie, Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title as ChartTitle,
  Tooltip,
  Legend,
  ArcElement,
  PointElement,
  LineElement,
} from "chart.js";
import { Title } from "../../components/Title/Title";
import { supabase } from "../../server/supabaseClient";
import { useTranslation } from "react-i18next"; 
import "./Dashboard.css";

// Register Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  ChartTitle,
  Tooltip,
  Legend,
  ArcElement,
  PointElement,
  LineElement
);

const Dashboard = () => {
  const { t } = useTranslation(); // Initialize useTranslation hook
  const [showPopup, setShowPopup] = useState(true);
  const [data, setData] = useState({
    issues: [],
    solutions: [],
    trends: [],
    dropoutRates: [],
    enrollmentRates: [],
    genderRatio: [],
  });

  // Fetch data from Supabase
  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const { data: issues } = await supabase.from("issues").select("*");
    const { data: solutions } = await supabase.from("solutions").select("*");
    const { data: trends } = await supabase.from("trends").select("*");
    const { data: dropoutRates } = await supabase
      .from("dropout_rates")
      .select("*");
    const { data: enrollmentRates } = await supabase
      .from("enrollment_rates")
      .select("*");
    const { data: genderRatio } = await supabase
      .from("gender_ratio")
      .select("*");

    setData({
      issues,
      solutions,
      trends,
      dropoutRates,
      enrollmentRates,
      genderRatio,
    });
  };

  // Data for charts
  const issuesData = {
    labels: data.issues.map((issue) => issue.category),
    datasets: [
      {
        label: t("dashboard.mostCommonIssues"), 
        data: data.issues.map((issue) => issue.frequency),
        backgroundColor: "rgba(255, 99, 132, 0.5)",
        borderColor: "rgba(255, 99, 132, 1)",
        borderWidth: 1,
      },
    ],
  };

  const solutionsData = {
    labels: data.solutions.map((solution) => solution.type),
    datasets: [
      {
        label: t("dashboard.proposedSolutions"), 
        data: data.solutions.map((solution) => solution.count),
        backgroundColor: ["#FF6384", "#36A2EB", "#FFCE56", "#4BC0C0"],
      },
    ],
  };

  const trendsData = {
    labels: data.trends.map((trend) => trend.date),
    datasets: [
      {
        label: t("dashboard.trendsOverTime"), 
        data: data.trends.map((trend) => trend.issues),
        borderColor: "rgba(75, 192, 192, 1)",
        fill: false,
      },
      {
        label: t("dashboard.proposedSolutions"), 
        data: data.trends.map((trend) => trend.solutions),
        borderColor: "rgba(153, 102, 255, 1)",
        fill: false,
      },
    ],
  };

  const dropoutRatesData = {
    labels: data.dropoutRates.map((rate) => rate.state),
    datasets: [
      {
        label: t("dashboard.dropoutRatesByState"), 
        data: data.dropoutRates.map((rate) => rate.rate),
        backgroundColor: "rgba(54, 162, 235, 0.5)",
        borderColor: "rgba(54, 162, 235, 1)",
        borderWidth: 1,
      },
    ],
  };

  const enrollmentRatesData = {
    labels: data.enrollmentRates.map((rate) => rate.year),
    datasets: [
      {
        label: t("dashboard.enrollmentRatesOverTime"), 
        data: data.enrollmentRates.map((rate) => rate.rate),
        backgroundColor: "rgba(75, 192, 192, 0.5)",
        borderColor: "rgba(75, 192, 192, 1)",
        borderWidth: 1,
      },
    ],
  };

  const genderRatioData = {
    labels: data.genderRatio.map((ratio) => ratio.school),
    datasets: [
      {
        label: t("dashboard.girlsData"), 
        data: data.genderRatio.map((ratio) => ratio.girls),
        backgroundColor: "rgba(255, 99, 132, 0.5)",
      },
      {
        label: t("dashboard.boysData"), 
        data: data.genderRatio.map((ratio) => ratio.boys),
        backgroundColor: "rgba(54, 162, 235, 0.5)",
      },
    ],
  };

  return (
    <>
      <Title />
      <div className="dashboard-container">
        <div className="dashboard-title">
          <h1>{t("dashboard.title")}</h1> {/* Translated title */}
          <p>{t("dashboard.description")}</p> {/* Translated description */}
        </div>

        <div className="charts-grid">
          {/* Bar Chart - Most Common Issues */}
          <div className="chart">
            <h2>{t("dashboard.mostCommonIssues")}</h2> 
            <Bar data={issuesData} options={{ responsive: true }} />
          </div>

          {/* Pie Chart - Proposed Solutions */}
          <div className="chart pie-chart-container">
            <h2>{t("dashboard.proposedSolutions")}</h2> 
            <Pie data={solutionsData} options={{ responsive: true }} />
          </div>

          {/* Line Chart - Trends Over Time */}
          <div className="chart">
            <h2>{t("dashboard.trendsOverTime")}</h2> 
            <Line data={trendsData} options={{ responsive: true }} />
          </div>

          {/* Bar Chart - Dropout Rates by State */}
          <div className="chart">
            <h2>{t("dashboard.dropoutRatesByState")}</h2> 
            <Bar data={dropoutRatesData} options={{ responsive: true }} />
          </div>

          {/* Line Chart - Enrollment Rates Over Time */}
          <div className="chart">
            <h2>{t("dashboard.enrollmentRatesOverTime")}</h2> 
            <Line data={enrollmentRatesData} options={{ responsive: true }} />
          </div>

          {/* Bar Chart - Girls to Boys Ratio */}
          <div className="chart">
            <h2>{t("dashboard.girlsToBoysRatio")}</h2> 
            <Bar data={genderRatioData} options={{ responsive: true }} />
          </div>
        </div>
      </div>
    </>
  );
};

export default Dashboard;