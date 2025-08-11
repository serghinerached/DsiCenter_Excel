import React from "react";
import {styles} from './ComponentCss';
import ExcelDisplay from './ReadExcelFileData/ExcelDisplay';
import DivPageIncidents from '../pages/pageIncidents';



class IncidentComponent extends React.Component {

    render () {

        return(
            <div style={styles.div2}>
                <DivPageIncidents/>
            </div>  
        )
    }
}


export default IncidentComponent