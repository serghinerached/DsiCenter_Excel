import "./App.css";
import Sidebar from "./components/Sidebar";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import TrackerComponent from "./components/TrackerComponent";
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
        <Route path="/Guides/requests" element={<GuideRequestsComponent />} /> 
        <Route path="/Guides/requestsMessages/:id" element={<GuideRequestsMessagesComponent />} /> 
        <Route path="/Guides/Incidents" element={<GuideIncidentsComponent />} /> 
        <Route path="/Guides/incidentsMessages/:id" element={<GuideIncidentsMessageComponent/>} /> 

      </Routes>
    </Router>
  );
}

  
export default App;
