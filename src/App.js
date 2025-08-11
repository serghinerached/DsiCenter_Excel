import "./App.css";
import Sidebar from "./components/Sidebar";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import RequestComponent from "./components/RequestComponent";
import IncidentComponent from "./components/IncidentComponent";
import TrackerComponent from "./components/TrackerComponent";
import MonthlyIncidentComponent from "./components/MonthlyIncidentComponent";
import MonthlyWoScadeComponent from "./components/MonthlyWoScadeComponent";
<<<<<<< HEAD
import GuideRequestsComponent from "./components/GuideRequestsComponent";
=======

>>>>>>> f14067ff92e396975595d9416c17038d93c006ed

function App() {
  return (
    <Router>
      <Sidebar />
      <Routes>
        <Route path="/tracker" element={<TrackerComponent />} /> 
        <Route path="/tasks/requests"  element={<RequestComponent />} /> 
        <Route path="/tasks/incidents" element={<IncidentComponent />} /> 
        <Route path="/reporting/Monthly_Incidents" element={<MonthlyIncidentComponent />} /> 
        <Route path="/reporting/Monthly_WoScade" element={<MonthlyWoScadeComponent />} /> 
<<<<<<< HEAD
        <Route path="/Guides/requests" element={<GuideRequestsComponent />} /> 
=======
>>>>>>> f14067ff92e396975595d9416c17038d93c006ed

      </Routes>
    </Router>
  );
}

  
export default App;
