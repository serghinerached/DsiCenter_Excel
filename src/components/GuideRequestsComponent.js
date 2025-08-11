import React from "react";
import TrackerService from "../services/TrackerService";
import {styles} from './ComponentCss';
import DivPageGuideRequests from "../pages/pageGuideRequests";

class GuideRequestsComponent extends React.Component {

    render () {
          return(
            <div style={styles.div2}>
                <DivPageGuideRequests/>
            </div>
        )
    }
}

export default GuideRequestsComponent