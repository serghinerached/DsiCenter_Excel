import "./App.css";
import Sidebar from "./components/Sidebar";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import RequestComponent from "./components/RequestComponent";
import IncidentComponent from "./components/IncidentComponent";
import TrackerComponent from "./components/TrackerComponent";
import MonthlyIncidentComponent from "./components/MonthlyIncidentComponent";
import MonthlyWoScadeComponent from "./components/MonthlyWoScadeComponent";
import GuideRequestsComponent from "./components/GuideRequestsComponent";
import GuideRequestsMessagesComponent from "./components/GuideRequestsMessagesComponent";
import GuideIncidentsComponent from "./components/GuideIncidentsComponent"
import GuideIncidentsMessageComponent from "./components/GuideIncidentsMessagesComponent"

function App() {
  return (
    <Router>
      <Sidebar />
      <Routes>
        <Route path="/tracker" element={<TrackerComponent />} /> 
    {/*    <Route path="/tasks/requests"  element={<RequestComponent />} /> */}
        <Route path="/tasks/incidents" element={<IncidentComponent />} /> 
        <Route path="/reporting/Monthly_Incidents" element={<MonthlyIncidentComponent />} /> 
        <Route path="/reporting/Monthly_WoScade" element={<MonthlyWoScadeComponent />} /> 
        <Route path="/Guides/requests" element={<GuideRequestsComponent />} /> 
        <Route path="/Guides/requestsMessages/:id" element={<GuideRequestsMessagesComponent />} /> 
        <Route path="/Guides/Incidents" element={<GuideIncidentsComponent />} /> 
        <Route path="/Guides/incidentsMessages/:id" element={<GuideIncidentsMessageComponent/>} /> 

      </Routes>
    </Router>
  );
}

  
export default App;
