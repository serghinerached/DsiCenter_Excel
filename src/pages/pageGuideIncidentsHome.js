import {styles} from '../components/ComponentCss';
import {useState,useEffect} from "react";
import { loadExcelIncidentsHomeCotsList } from '../components/ReadExcelFileData/ExcelLoaderCotsList';
import { FaEdit } from "react-icons/fa"; // Icône "Edit" de FontAwesome
import { useNavigate } from "react-router-dom";



function DivPageGuideIncidentsHome() {

  // DECLARATIONS
  const [excelDataLoad, SetExcelDataLoad] = useState([]);  
  const navigate = useNavigate();

  
  // TRAITEMENT DEMARRAGE
  useEffect(() => {
    const fetchData = async () => {
      var copyData = [...await loadExcelIncidentsHomeCotsList()];
      SetExcelDataLoad(copyData);
    }
      fetchData();
  }, [])

  // click icone msg
  const fMessage = (numMessage) => {
    alert(numMessage);
  };


  //-----
   return  <div style={styles.divImport} >
            <h2 style={styles.title3}>Incidents - Issues Installation/Uninstallation</h2>
            
            <div className="flex justify-center items-center h-screen bg-gray-100">
                  <svg width="1000" height="600" className="bg-white rounded-lg shadow-lg">
                    

                    <polygon points="500,30 580,80 500,130 420,80" fill={"orange"} />
                    <text x="500" y="85" textAnchor="middle" fill="black">Name/Version ?</text>
                    <line x1="580" y1="80" x2="649" y2="80" stroke="black" markerEnd="url(#arrow)" />
                    <line x1="500" y1="130" x2="500" y2="160" stroke="black" markerEnd="url(#arrow)" />

                    <rect x="650" y="55" width="50" height="40" fill="cyan" stroke="black" />
                    <text x="675" y="80" textAnchor="middle" fill="black" style={{ cursor: "pointer" }} onClick={() => fMessage("1A")}>1A</text>

                    <polygon points="500,160 580,190 500,220 420,190" fill={"orange"} />
                    <text x="500" y="195" textAnchor="middle" fill="black">How i do ?</text>
                    <line x1="500" y1="220" x2="500" y2="250" stroke="black" markerEnd="url(#arrow)" />

                    <rect x="475" y="250" width="50" height="40" fill="cyan" stroke="black" />
                    <text x="500" y="275" textAnchor="middle" fill="black">1B</text>

                    <defs>
                      <marker id="arrow" markerWidth="10" markerHeight="10" refX="6" refY="3" orient="auto">
                        <path d="M0,0 L0,6 L9,3 z" fill="black" />
                      </marker>
                    </defs>
                  </svg>
                </div>
              </div>

  //-------------
     /* return   <div style={styles.divImport} >
                     
                <h2 style={styles.title2}>GUIDE : Incidents</h2>
                <br/>
                <br/>

                <table style={styles.tableIncidents}>
                  <tbody>

                    {excelDataLoad.map((row, rowIndex) => {
                      if(rowIndex === 0) {
                        return (
                          <tr key={rowIndex}>
                            <th style={styles.tdIncidentsDatas}>{row[0]}</th> 
                            <th style={styles.tdIncidentsDatas}>Link</th> 

                          </tr>
                        )
                      } else {
                        if(row[0] !== null){
                          return (
                          <tr key={rowIndex}>
                              <td style={styles.tdIncidents}>{row[0]}</td> 
                              <td style={styles.tdIncidentsCol4}>
                                <FaEdit size={20} style={styles.colMessages} onClick={() => handleIconClick([row[0],row[1]])}/>
                              </td> 
                            </tr>
                          )
                        }
                      }

                    })}
                      
                  </tbody>
                </table>

              </div>        
*/

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

export default DivPageGuideIncidentsHome;
