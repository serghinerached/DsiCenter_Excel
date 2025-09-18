import React from "react";
import {styles} from './ComponentCss';
//import DivPageTracker_Excel from "../pages/pageTracker_Excel";
import DivPageTracker_Supabase from "../pages/pageTracker_Supabase"

class TrackerExcelComponent extends React.Component {

    render () {
          return(
            <div style={styles.div2}>
                {/* <DivPageTracker_Excel/> */}
                <DivPageTracker_Supabase/> 
            </div>
        )
    }
}

export default TrackerExcelComponent