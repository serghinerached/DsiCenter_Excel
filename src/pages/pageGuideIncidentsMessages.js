import {styles} from '../components/ComponentCss';
import {useState,useEffect} from "react";
import { useParams } from 'react-router-dom';
import { loadExcelIncidentsMessagesCotsList } from '../components/ReadExcelFileData/ExcelLoaderCotsList';


function DivPageGuideIncidentsMessages() {
  const {id} = useParams();
  const nameMessage = id;


  // DECLARATIONS
  const [excelMessagesLoad, SetExcelMessagesLoad] = useState([]);  

    
  // TRAITEMENT DEMARRAGE
  useEffect(() => {
    const fetchData = async () => {
      var copyData = [...await loadExcelIncidentsMessagesCotsList()];
      SetExcelMessagesLoad(copyData);
    }
      fetchData();
  }, [])

  for (let i = 0; i < excelMessagesLoad.length; i++) {
    if (excelMessagesLoad[i][0] === null) {
      break;
    }
    var textMessage;
    if (excelMessagesLoad[i][0] === nameMessage) {
      textMessage = excelMessagesLoad[i][1];
      break;
    }
  }
  
  
    return  <div style={styles.divImport} ><br></br>

                <table style={styles.tableIncidents}>
                  <tbody>
                    <tr>
                      <td style={styles.td1Messages}>Message</td><td style={styles.td2Messages}>{nameMessage}</td>
                    </tr>
                    <tr>
                      <td style={styles.td1Messages}>Text</td><td style={styles.td2Messages}>{textMessage}</td>
                    </tr>
                  </tbody>
                </table>
                
            </div>
            

}

export default DivPageGuideIncidentsMessages;
