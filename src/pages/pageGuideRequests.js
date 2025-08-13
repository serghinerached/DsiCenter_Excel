import {styles} from '../components/ComponentCss';
import {useState,useRef,useEffect} from "react";
import { loadExcelDataCotsList } from '../components/ReadExcelFileData/ExcelLoaderCotsList';
import { FaEdit } from "react-icons/fa"; // Icône "Edit" de FontAwesome
import { useNavigate } from "react-router-dom";



function DivPageGuideRequests() {

  // DECLARATIONS
  const [excelDataLoad, SetExcelDataLoad] = useState([]);  
  const navigate = useNavigate();

  
  // TRAITEMENT DEMARRAGE
  useEffect(() => {
    const fetchData = async () => {
      var copyData = [...await loadExcelDataCotsList()];
      SetExcelDataLoad(copyData);
    }
      fetchData();
  }, [])

  // click icone msg
  const handleIconClick = (id) => {
    navigate(`/Guides/requestsMessages/${id}`); // redirection vers /detail/id
  };

  //-----
   
    return    <div style={styles.divImport} >
                     
                <h2 style={styles.title2}>GUIDE : Access requests</h2>
                <br/>
                <br/>

                <table style={styles.tableIncidents}>
                  <tbody>

                    {excelDataLoad.map((row, rowIndex) => {
                      if(rowIndex === 0) {
                        return (
                          <tr key={rowIndex}>
                            <th style={styles.tdIncidentsDatas}>{row[0]}</th> 
                            <th style={styles.tdIncidentsDatas}>{row[3]}</th> 
                            <th style={styles.tdIncidentsDatas}>Message</th> 
                          </tr>
                        )
                      } else {
                        if(row[4] !== null){
                          return (
                          <tr key={rowIndex}>
                              <td style={styles.tdIncidents}>{row[0]}</td> 
                              <td style={styles.tdIncidents} >{row[3]}</td> 
                              <td style={styles.tdIncidentsCol4}>
                                <FaEdit size={20} style={styles.colMessages} onClick={() => handleIconClick([row[3],row[4],row[5],row[6],row[7]])}/>
                              </td> 
                            </tr>
                          )
                        }
                      }

                    })}
                      
                  </tbody>
                </table>

              </div>        


  /* AUTRE SOLUTION
  return <div style={styles.divImport} >
                     
            <h2 style={styles.title2}>COTS LIST : Access requests</h2>
            <br/>
            <br/>

              <table style={styles.tableIncidents}>
                <tbody>

                  {excelDataLoad.map((row, rowIndex) => (
                      
                    <tr key={row.join("-")+rowIndex}>
                    
                        {row.map((cell, ColIndex) => (

                          (rowIndex > 0) // row > 0
                          ?     
                            (row[4] !== null) // si col !== vide (group) => c'est une requet
                            ?                  
                              (
                                (ColIndex === 0) // application
                                ? 
                                  ( 
                                    (row[0] === null) 
                                    ? 
                                      (<td style={styles.tdIncidentsApp} key={ColIndex}>{cell}</td>) 
                                    :
                                      (<td style={styles.tdIncidents} key={ColIndex}>{cell}</td>) 
                                 )

                                :
                                  (ColIndex === 1 || ColIndex === 3) 
                                  ?
                                    (<td style={styles.tdIncidents} key={ColIndex}>{cell}</td>) 
                                  :  
                                    (ColIndex === 4) 
                                    ?
                                      (<td style={styles.tdIncidentsCol4} key={ColIndex}>
                                        <FaEdit size={20} style={{ cursor: "pointer", color: "green" }} />
                                      </td>) 
                                    :                                        
                                      null
                              ) 
                            :
                              null
                          : // row = 0 (entete)
                            (
                              (ColIndex === 0) 
                                ? 
                                (<th style={{textAlign:"center",border:"1px solid black",backgroundColor:"lightgray",padding:5}} key={ColIndex}>{cell}</th>) 
                                :
                                  (ColIndex === 1 || ColIndex === 3) 
                                  ?
                                    (<th style={{textAlign:"center",border:"1px solid black",backgroundColor:"lightgray",padding:5}} key={ColIndex}>{cell}</th>) 
                                  :  
                                    (ColIndex === 4) 
                                    ?
                                      (<th style={{textAlign:"center",border:"1px solid black",backgroundColor:"lightgreen",padding:5}} key={ColIndex}>Message</th>) 
                                    :                              
                                      null
                            ) 
                      
                        ))}
                        
                    </tr>
                  ))}

              </tbody>

              </table>

          </div>
          */
}

export default DivPageGuideRequests;
