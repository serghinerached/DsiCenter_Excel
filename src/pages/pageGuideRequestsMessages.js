import {styles} from '../components/ComponentCss';
import {useState,useEffect} from "react";
import { loadExcelMessagesCotsList } from '../components/ReadExcelFileData/ExcelLoaderCotsList';
import { useParams } from 'react-router-dom';

function DivPageGuideRequestsMessages() {
  const {id} = useParams();
  const version = id.split(",")[0];
  const group = id.split(",")[1];
  const instructions =  id.split(",")[2];
  const addComments =  id.split(",")[3];
  const workNotes =  id.split(",")[4];

    // DECLARATIONS
  const [excelMessagesLoad, SetExcelMessagesLoad] = useState([]);  

  
  // TRAITEMENT DEMARRAGE
  useEffect(() => {
    const fetchData = async () => {
      var copyData = [...await loadExcelMessagesCotsList()];
      SetExcelMessagesLoad(copyData);
    }
      fetchData();
  }, [])


  for (let i = 0; i < excelMessagesLoad.length; i++) {
    if (excelMessagesLoad[i][0] === null) {
      break;
    }
    var messageInstructions;
    if (excelMessagesLoad[i][0] === instructions) {
      messageInstructions = excelMessagesLoad[i][1];
    }
    var messageWorkNotes;
    if (excelMessagesLoad[i][0] === workNotes) {
      messageWorkNotes = excelMessagesLoad[i][1];
    }
    var messageAddComments;
    if (excelMessagesLoad[i][0] === addComments) {
      messageAddComments = excelMessagesLoad[i][1];
    }
  }
  if (messageWorkNotes != undefined) {
    messageWorkNotes = messageWorkNotes.replaceAll("SOFTWARE",version);
  }
  if (messageAddComments != undefined) {
    messageAddComments = messageAddComments.replaceAll("SOFTWARE",version);
  }
  
    return  <div style={styles.divImport} >
                     
                <h2 style={styles.title3}>{version}</h2>
                <br/>
                <br/>

                <table style={styles.tableIncidents}>
                  <tbody>
                    <tr>
                      <td style={styles.td1Messages}>Access group</td><td style={styles.td2Messages}>{group}</td>
                    </tr>
<tr>
                      <td style={styles.td1Messages}>Instructions</td><td style={styles.td2Messages}>{messageInstructions}</td>
                    </tr>
                    <tr>
                      <td style={styles.td1Messages}>Work Notes</td><td style={styles.td2Messages}>{messageWorkNotes}</td>
                    </tr>
                    <tr>
                      <td style={styles.td1Messages}>Add. Comments</td><td style={styles.td2Messages}>{messageAddComments}</td>
                    </tr>
                  </tbody>
                </table>
            </div>
}

export default DivPageGuideRequestsMessages;
