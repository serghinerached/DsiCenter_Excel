import axios from "axios";

const TRACKER_REST_API_URL = 'http://localhost:8080/api/tracker';

class TrackerService {

    getTracker() {
        return axios.get(TRACKER_REST_API_URL);
    }
}

export default new TrackerService();