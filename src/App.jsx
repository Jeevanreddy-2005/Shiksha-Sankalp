import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Navbar } from "./components/NavBar/NavBar";
import { Home } from "./pages/Home/Home";
import Meeting from "./pages/Meeting/Meeting";
import Reports from "./pages/Reports/Reports";
import Dashboard from "./pages/Dashboard/Dashboard";
import { HelmetProvider } from "react-helmet-async";
import Register from "./pages/Register";
import { About } from "./pages/About/About";
import {PrivacyPolicy} from "./pages/Legal/PrivacyPolicy";
import {TermsOfService} from "./pages/Legal/TermsOfService";
import {NotFound} from "./pages/NotFound/NotFound";

export const App = () => {
  return (
    <HelmetProvider>
      <Router>
        <div>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/meeting" element={<Meeting/> }/>
            <Route path="/reports" element={<Reports />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/register" element={<Register />} />
            <Route path="/about" element={<About />} />
            <Route path="/privacy" element={<PrivacyPolicy />} />
            <Route path="/terms" element={<TermsOfService />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
          <Navbar />
        </div>
      </Router>
    </HelmetProvider>
  );
};
