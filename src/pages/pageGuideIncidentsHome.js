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
                  <svg width="1000" height="650" className="bg-white rounded-lg shadow-lg">
                    

                    <polygon points="500,30 580,80 500,130 420,80" fill={"orange"} />
                    <text x="500" y="85" textAnchor="middle" fill="black">Name/Version ?</text>
                    <line x1="578" y1="80" x2="649" y2="80" stroke="black" markerEnd="url(#arrow)" />
                    <line x1="500" y1="130" x2="500" y2="160" stroke="black" markerEnd="url(#arrow)" />

                    <rect x="650" y="55" width="60" height="40" fill="cyan" stroke="black" />
                    <text x="680" y="80" textAnchor="middle" fill="black" style={{ cursor: "pointer" }} onClick={() => fMessage("Msg 1A")}>Msg 1A</text>

                    <polygon points="500,160 580,190 500,220 420,190" fill={"orange"} />
                    <text x="500" y="195" textAnchor="middle" fill="black">How i do ?</text>
                    <line x1="500" y1="220" x2="500" y2="250" stroke="black" markerEnd="url(#arrow)" />

                    <rect x="470" y="250" width="60" height="40" fill="cyan" stroke="black" />
                    <text x="500" y="275" textAnchor="middle" fill="black" style={{ cursor: "pointer" }} onClick={() => fMessage("Msg 1B")}>Msg 1B</text>

                    <line x1="578" y1="190" x2="650" y2="190" stroke="black" markerEnd="url(#arrow)" />
                    <polygon points="730,160 810,190 730,220 650,190" fill={"orange"} />
                    <text x="730" y="195" textAnchor="middle" fill="black">Issue ?</text>
                    <line x1="730" y1="220" x2="730" y2="250" stroke="black" markerEnd="url(#arrow)" />

                    <rect x="700" y="250" width="60" height="40" fill="cyan" stroke="black" />
                    <text x="730" y="275" textAnchor="middle" fill="black" style={{ cursor: "pointer" }} onClick={() => fMessage("Msg 1C")}>Msg 1C</text>

                    <line x1="500" y1="291" x2="600" y2="330" stroke="black" markerEnd="url(#arrow)" />
                    <line x1="730" y1="291" x2="620" y2="330" stroke="black" markerEnd="url(#arrow)" />
                    <polygon points="610,330 690,360 610,390 530,360" fill={"orange"} />
                    <text x="612" y="365" textAnchor="middle" fill="black">Success ?</text>

                    <polygon points="410,360 490,390 410,420 330,390" fill={"orange"} />
                    <text x="409" y="395" textAnchor="middle" fill="black">Airbus site ?</text>

                    <rect x="266" y="450" width="77" height="50" fill="cyan" stroke="black" />
                    <text x="305" y="474" textAnchor="middle" fill="black" style={{ cursor: "pointer"}} onClick={() => fMessage("Msg 1D")}>
                      Msg 1D<tspan x="305" dy="1em">(Techbar)</tspan>
                    </text>

                    <rect x="380" y="450" width="77" height="50" fill="cyan" stroke="black" />
                    <text x="415" y="474" textAnchor="middle" fill="black" style={{ cursor: "pointer" }} onClick={() => fMessage("Msg 1E")}>
                      Msg 1E<tspan x="415" dy="1em">(Remote)</tspan>
                    </text>

                    <line x1="610" y1="390" x2="610" y2="600" stroke="black" markerEnd="url(#arrow)" />
                    <rect x="576" y="600" width="70" height="40" fill="pink" stroke="black" />
                    <text x="612" y="622" textAnchor="middle" fill="black">Resolve</text>


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
