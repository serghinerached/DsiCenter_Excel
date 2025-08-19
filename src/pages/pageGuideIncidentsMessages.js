import {styles} from '../components/ComponentCss';
import { useParams } from 'react-router-dom';

function DivPageGuideIncidentsMessages() {
  const {id} = useParams();
  const nameMessage = id.split(",")[0];
  const textMessage = id.split(",")[1];
  
  
    return  <div style={styles.divImport} >

                <table style={styles.tableIncidents}>
                  <tbody>
                    <tr>
                      <td style={styles.td1Messages}>nameMessage</td><td style={styles.td2Messages}>{nameMessage}</td>
                    </tr>
                    <tr>
                      <td style={styles.td1Messages}>textMessage</td><td style={styles.td2Messages}>{textMessage}</td>
                    </tr>
                  </tbody>
                </table>
                
            </div>
            

}

export default DivPageGuideIncidentsMessages;
