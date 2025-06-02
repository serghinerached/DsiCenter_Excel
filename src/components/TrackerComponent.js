import React from "react";
import TrackerService from "../services/TrackerService";
import {styles} from './ComponentCss';
import Table from 'react-bootstrap/Table';
import DivHeadTracker from '../pages/TrackerHead';

class TrackerComponent extends React.Component {

    constructor(props){
        super(props)
        this.state = {
            trackers:[]
        }
    }

    componentDidMount() {
        TrackerService.getTracker().then((response) => {
            this.setState({ trackers: response.data})
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


    render () {

        return(
            <div style={styles.div2}>

                <DivHeadTracker/>

                <div style={styles.div1}>
                    
                    <Table striped bordered hover style={styles.tableTracker} >
                        <thead>
                            <tr style={styles.thFormat} >
                                <td> Week </td>
                                <td> Date received </td>
                                <td> Number </td>
                                <td> Task type </td>
                                <td> Cots name </td>
                                <td> Version </td>
                                <td> Assigned to </td>
                                <td> Action </td>
                                <td> Date complete </td>
                                <td> Status </td>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                this.state.trackers.map(
                                    tracker =>
                                    <tr key = {tracker.id_tracker} >
                                        <td> {tracker.week}</td>
                                        <td className="td8"> {this.convDate(tracker.dateReceived)}</td>
                                        <td> {tracker.refNumber}</td>
                                        <td className="td8"> {tracker.taskType}</td>
                                        <td className="td16"> {tracker.cotsName}</td>
                                        <td className="td13a"> {tracker.version}</td>
                                        <td className="td13b"> {tracker.assignedTo}</td>
                                        <td className="td10"> {tracker.action}</td>
                                        <td className="td8"> {this.convDate(tracker.dateComplete)}</td>
                                        <td className="td13b"> {tracker.status}</td>
                                    </tr>
                                )
                            }

                        </tbody>
                    </Table>
                </div>
            </div>
        )
    }

}

export default TrackerComponent