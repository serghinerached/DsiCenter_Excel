import {styles} from '../components/ComponentCss';
import {useState} from "react";
import { useNavigate } from "react-router-dom";



function DivPageGuideIncidentsHome() {

  // DECLARATIONS
  const [excelDataLoad, SetExcelDataLoad] = useState([]);  
  const navigate = useNavigate();

  // click icone msg
  const fMessage = (numMessage) => {
    navigate(`/Guides/incidentsMessages/${numMessage}`); // redirection vers /detail/id
  };


  //-----
   return  <div style={styles.divImport} >
            <h2 style={styles.title3}>Incidents - Issues Installation/Uninstallation</h2>
            
            <div className="flex justify-center items-center h-screen bg-gray-100">
                  <svg width="1200" height="650" className="bg-white rounded-lg shadow-lg">
                    

                    <polygon points="500,30 580,80 500,130 420,80" fill={"orange"} />
                    <text x="500" y="85" textAnchor="middle" fill="black">Name/Version ?</text>
                    <line x1="578" y1="80" x2="628" y2="80" stroke="black" markerEnd="url(#arrow)" />
                    <line x1="500" y1="130" x2="500" y2="160" stroke="black" markerEnd="url(#arrow)" />

                    <rect x="628" y="55" width="60" height="40" fill="cyan" stroke="black" />
                    <text x="658" y="80" textAnchor="middle" fill="black" style={{ cursor: "pointer" }} onClick={() => fMessage("Msg 1A")}>Msg 1A</text>


                    <rect x="470" y="160" width="60" height="40" fill="cyan" stroke="black" />
                    <text x="500" y="185" textAnchor="middle" fill="black" style={{ cursor: "pointer" }} onClick={() => fMessage("Msg 1B")}>Msg 1B</text>
                  
                    <line x1="500" y1="200" x2="500" y2="230" stroke="black" markerEnd="url(#arrow)" />
                    <polygon points="500,230 580,260 500,290 420,260" fill={"orange"} />
                    <text x="500" y="265" textAnchor="middle" fill="black">Success ?</text>

                    <line x1="578" y1="260" x2="628" y2="260" stroke="black" markerEnd="url(#arrow)" />
                    <rect x="628" y="240" width="60" height="40" fill="cyan" stroke="black" />
                    <text x="658" y="265" textAnchor="middle" fill="black" style={{ cursor: "pointer" }} onClick={() => fMessage("Msg 1C")}>Msg 1C</text>
                    
                    <line x1="688" y1="260" x2="738" y2="260" stroke="black" markerEnd="url(#arrow)" />
                    <polygon points="818,230 899,260 818,300 738,260" fill={"orange"} />
                    <text x="818" y="267" textAnchor="middle" fill="black">Admin rights ?</text>
                    <line x1="818" y1="300" x2="818" y2="352" stroke="black" />
                    <line x1="818" y1="352" x2="537" y2="352" stroke="black" markerEnd="url(#arrow)"/>


                    <line x1="897" y1="260" x2="947" y2="260" stroke="black" markerEnd="url(#arrow)" />
                    <polygon points="1028,230 1108,260 1028,300 947,260" fill={"orange"} />
                    <text x="1028" y="266" textAnchor="middle" fill="black">Airbus Site ?</text>


                    <line x1="1028" y1="300" x2="1028" y2="327" stroke="black" markerEnd="url(#arrow)" />
                    <rect x="980" y="330" width="77" height="50" fill="cyan" stroke="black" />
                    <text x="1020" y="350" textAnchor="middle" fill="black" style={{ cursor: "pointer"}} onClick={() => fMessage("Msg 1D")}>
                      Msg 1D<tspan x="1020" dy="1em">(Techbar)</tspan>
                    </text>
                    <line x1="1028" y1="380" x2="1028" y2="410" stroke="black"  />


                    <line x1="1106" y1="260" x2="1106" y2="330" stroke="black" markerEnd="url(#arrow)" />
                    <rect x="1070" y="330" width="77" height="50" fill="cyan" stroke="black" />
                    <text x="1110" y="350" textAnchor="middle" fill="black" style={{ cursor: "pointer" }} onClick={() => fMessage("Msg 1E")}>
                      Msg 1E<tspan x="1110" dy="1em">(Remote)</tspan>
                    </text>
                    <line x1="1106" y1="380" x2="1106" y2="410" stroke="black"  />

                    <line x1="500" y1="290" x2="500" y2="330" stroke="black" markerEnd="url(#arrow)" />
                    <rect x="465" y="330" width="70" height="40" fill="pink" stroke="black" />
                    <text x="500" y="355" textAnchor="middle" fill="black">Resolve</text>
                    <line x1="1106" y1="410" x2="500" y2="410" stroke="black"  />
                    <line x1="500" y1="410" x2="500" y2="373" stroke="black"  markerEnd="url(#arrow)" />

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
