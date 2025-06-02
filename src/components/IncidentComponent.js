import React from "react";
import IncidentService from "../services/IncidentService";
import {styles} from './ComponentCss';
import Table from 'react-bootstrap/Table';
import ExcelDisplay from './ReadExcelFileData/ExcelDisplay';
import DivHeadIncidents from '../pages/IncidentsHead';



class IncidentComponent extends React.Component {
/*
    constructor(props){
        super(props)
        this.state = {
            incidents:[]
        }
    }

    componentDidMount() {
        IncidentService.getIncidents().then((response) => {
            this.setState({ incidents: response.data})
            console.log(response.data)
        });

    }

    convDate (date1) {
        if(date1 !== "" && date1 !== undefined && date1 !== null) {
            var d = date1.split("-")[2]
            var jj = d.split(" ")[0]
            var date2 = jj + "/" + date1.split("-")[1] + "/" + date1.split("-")[0];
            return date2;
        } else {
            return "";
        }
    }
*/
    render () {

        return(
            
            <div style={styles.div2}>
                <DivHeadIncidents/>


                    <ExcelDisplay/>


                <div style={styles.div1}>
                    <ExcelDisplay/>


                </div>
            </div>
            
        )
    }

}



export default IncidentComponent