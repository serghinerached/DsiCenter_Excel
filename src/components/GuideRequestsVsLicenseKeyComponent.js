import React from "react";
import TrackerService from "../services/TrackerService";
import {styles} from './ComponentCss';
import DivPageGuideRequestsVsLicenseKey from "../pages/pageGuideRequestsVsLicenseKey";

class GuideRequestsVsLicenseKeyComponent extends React.Component {

    render () {
          return(
            <div style={styles.div2}>
                <DivPageGuideRequestsVsLicenseKey/>
            </div>
        )
    }
}

export default GuideRequestsVsLicenseKeyComponent