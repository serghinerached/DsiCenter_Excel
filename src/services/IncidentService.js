import axios from "axios";

const INCIDENTS_REST_API_URL = 'http://localhost:8080/api/tasks/incidents';

class IncidentService {

    getIncidents() {
        return axios.get(INCIDENTS_REST_API_URL);
    }
}

export default new IncidentService();