import "./App.css";
import Sidebar from "./components/Sidebar";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import TrackerComponent from "./components/TrackerComponent";
import GuideRequestsComponent from "./components/GuideRequestsComponent";
import GuideRequestsMessagesComponent from "./components/GuideRequestsMessagesComponent";
import GuideIncidentsComponent from "./components/GuideIncidentsComponent"
import GuideIncidentsMessageComponent from "./components/GuideIncidentsMessagesComponent"
import GuideRequestVsLicenseKeyComponent from "./components/GuideRequestsVsLicenseKeyComponent"
import GuideIncidentsKarticlesComponent from "./components/GuideIncidentsKarticlesComponent"
import GuideKarticlesMessagesComponent from "./components/GuideKarticlesMessagesComponent"
import GuideIncidentsExamplesComponent from "./components/GuideIncidentsExamplesComponent"
import GuideIncidentsExamplesMessagesComponent from "./components/GuideIncidentsExamplesMessagesComponent"

function App() {
  return (
    <Router>
      <Sidebar />
      <Routes>
        <Route path="/tracker" element={<TrackerComponent />} /> 
        <Route path="/Guides/AccessRequests" element={<GuideRequestsComponent />} /> 
        <Route path="/Guides/VsLicenseKey" element={<GuideRequestVsLicenseKeyComponent />} /> 
        <Route path="/Guides/requestsMessages/:id" element={<GuideRequestsMessagesComponent />} /> 
        <Route path="/Guides/Process" element={<GuideIncidentsComponent />} /> 
        <Route path="/Guides/IncidentsKarticles" element={<GuideIncidentsKarticlesComponent />} />
        <Route path="/Guides/incidentsMessages/:id" element={<GuideIncidentsMessageComponent/>} /> 
        <Route path="/Guides/KarticlesMessages/:id" element={<GuideKarticlesMessagesComponent/>} />
        <Route path="/Guides/IncidentsExamples" element={<GuideIncidentsExamplesComponent />} />
        <Route path="/Guides/IncidentsExamplesMessages/:id" element={<GuideIncidentsExamplesMessagesComponent />} />

      </Routes>
    </Router>
  );
}

  
export default App;
