import React from "react";
import {styles} from './ComponentCss';
import ExcelDisplay from './ReadExcelFileData/ExcelDisplay';
import DivPageIncidents from '../pages/pageIncidents';
import DivPageMonthlyIncidents from "../pages/pageMonthlyIncidents";



// class MonthlyIncidentComponent extends React.Component {

//     render () {

//         return(
//             <div style={styles.div2}>
//                 <DivPageMonthlyIncidents/>
//             </div>  
//         )
//     }
// }

const MonthlyIncidentComponent = () => {

    return(
        <div style={styles.div2}>
            <DivPageMonthlyIncidents/>
        </div>  
       )
}


export default MonthlyIncidentComponent