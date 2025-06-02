import React from "react";
import SctaskService from "../services/RequestService";
import {styles} from './ComponentCss';
import Table from 'react-bootstrap/Table';


class RequestComponent extends React.Component {

    constructor(props){
        super(props)
        this.state = {
            requests:[]
        }
    }

    componentDidMount() {
        SctaskService.getSctasks().then((response) => {
            this.setState({ requests: response.data})
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
                <h2 className="h2">Requests list</h2>
                <div style={styles.div1}>
                    <Table striped bordered hover style={styles.tableRequestIncident} >
                        <thead>
                            <tr style={styles.thFormat} >
                                <td> Number </td>
                                <td> Opened  </td>
                                <td> Assigned To  </td>
                                <td> State </td>
                                <td> Short Description </td>
                                <td> Requested For </td>
                                <td> Dep </td>
                                <td> Due Date </td>
                                <td> Closed </td>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                this.state.requests.map(
                                    sctask => 
                                    <tr key = {sctask.id_sctask} >
                                        <td className="td10"> {sctask.number}</td>
                                        <td className="td8"> {}  {sctask.opened /*this.convDate(sctask.opened)*/} </td>
                                        <td className="td13b"> {sctask.assignedTo}</td>
                                        <td className="td13b"> {sctask.state}</td>
                                        <td className="td20"> {sctask.shortDescription}</td>
                                        <td className="td13b"> {sctask.requestedFor}</td>
                                        <td className="td8"> {sctask.dep}</td>
                                        <td className="td8"> {sctask.dueDate /*this.convDate(sctask.dueDate)*/} </td>
                                        <td className="td8"> {sctask.closed /*this.convDate(sctask.closed)*/}</td>
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

export default RequestComponent