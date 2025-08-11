import React from "react";
import TrackerService from "../services/TrackerService";
import {styles} from './ComponentCss';
import ExcelLoader from '../components/ReadExcelFileData/ExcelLoader';
import DivPageTraker from "../pages/pageTraker";

class TrackerComponent extends React.Component {

    render () {
          return(
            <div style={styles.div2}>
                <DivPageTraker/>
            </div>
        )
    }
}

export default TrackerComponent