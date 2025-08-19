import React from "react";
import TrackerService from "../services/TrackerService";
import {styles} from './ComponentCss';
import DivPageGuideIncidentsHome from "../pages/pageGuideIncidentsHome";

class GuideIncidentsHomeComponent extends React.Component {

    render () {
          return(
            <div style={styles.div2}>
                <DivPageGuideIncidentsHome/>
            </div>
        )
    }
}

export default GuideIncidentsHomeComponent