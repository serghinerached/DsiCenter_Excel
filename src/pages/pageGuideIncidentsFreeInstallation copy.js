import {styles} from '../components/ComponentCss';
import {useState, useRef,useEffect} from "react";
import { loadExcelIncidentsMessagesCotsList } from '../components/ReadExcelFileData/ExcelLoaderCotsList';


function DivPageGuideIncidentsFreeInstallation() {

  const [form, setForm] = useState({ open: false, nameMessage: "" });
  const popupRef  = useRef(null);
  const [excelMessagesLoad, SetExcelMessagesLoad] = useState([]);  


  // TRAITEMENT DEMARRAGE
    useEffect(() => {
      const fetchData = async () => {
        var copyData = [...await loadExcelIncidentsMessagesCotsList()];
        SetExcelMessagesLoad(copyData);
      }
        fetchData();
    }, [])

    var workNotes = "";
    var addComments = "";

    if (form.open) {
        for (let i = 0; i < excelMessagesLoad.length; i++) {
          if (excelMessagesLoad[i][0] === null) {
            break;
          }
          if (excelMessagesLoad[i][0] === form.nameMessage) {
            workNotes = excelMessagesLoad[i][2];
          //  break;
          }
          if (excelMessagesLoad[i][0] === form.nameMessage) {
            addComments = excelMessagesLoad[i][1];
          }
        }
    }


  //-----
   return  <div style={styles.divImport} >
    
            <h2 style={styles.title3}>Incidents : Free - Installation/Uninstallation</h2>
             <table>
              <tr>
                <td style={{border:"1px solid black",textAlign:"left"}}>

                  <svg width="670" height="650" >
                    

                    <polygon points="153,30 233,80 153,130 73,80" fill={"orange"} />
                    <text x="153" y="85" textAnchor="middle" fill="black">Name/Version ?</text>
                    <line x1="231" y1="80" x2="284" y2="80" stroke="black" markerEnd="url(#arrow)" /> 
                    <line x1="285" y1="95" x2="183" y2="160" stroke="black" markerEnd="url(#arrow)" />

                    <rect x="285" y="55" width="60" height="40" fill="cyan" stroke="black" />
                    <text x="315" y="80" textAnchor="middle" fill="black" style={{ cursor: "pointer" }} onClick={(e) => setForm((prev) => ({ ...prev, open:true,nameMessage: "Msg 1A" }))} >Msg 1A</text>

                    <line x1="153" y1="130" x2="153" y2="160" stroke="black" markerEnd="url(#arrow)" />
                    <rect x="123" y="160" width="60" height="40" fill="cyan" stroke="black" />
                    <text x="153" y="185" textAnchor="middle" fill="black" style={{ cursor: "pointer" }} onClick={(e) => setForm((prev) => ({ ...prev, open:true,nameMessage: "Msg 1B" }))}>Msg 1B</text>

                    <line x1="153" y1="200" x2="153" y2="230" stroke="black" markerEnd="url(#arrow)" />
                    <polygon points="153,230 213,260 153,290 93,260" fill={"orange"} />
                    <text x="153" y="265" textAnchor="middle" fill="black">Success ?</text>


                    <line x1="211" y1="260" x2="284" y2="260" stroke="black" markerEnd="url(#arrow)" />
                    <rect x="284" y="240" width="60" height="40" fill="cyan" stroke="black" />
                    <text x="315" y="265" textAnchor="middle" fill="black" style={{ cursor: "pointer" }} onClick={(e) => setForm((prev) => ({ ...prev, open:true,nameMessage: "Msg 1C" }))}>Msg 1C</text>
                    <line x1="315" y1="280" x2="315" y2="320" stroke="black" markerEnd="url(#arrow)" />


                    <line x1="395" y1="350" x2="440" y2="350" stroke="black" markerEnd="url(#arrow)" />
                    <polygon points="520,320 600,350 520,390 440,350" fill={"orange"} />
                    <text x="520" y="355" textAnchor="middle" fill="black">Airbus Site ?</text>
                    <line x1="598" y1="350" x2="598" y2="420" stroke="black" markerEnd="url(#arrow)" />

                    <polygon points="315,320 395,350 315,390 234,350" fill={"orange"} />
                    <text x="315" y="355" textAnchor="middle" fill="black">Admin rights ?</text>
                    <line x1="315" y1="390" x2="315" y2="497" stroke="black" markerEnd="url(#arrow)"/>

                    <line x1="520" y1="390" x2="520" y2="420" stroke="black" markerEnd="url(#arrow)" />
                    <rect x="480" y="420" width="77" height="50" fill="cyan" stroke="black" />
                    <text x="520" y="440" textAnchor="middle" fill="black" style={{ cursor: "pointer"}} onClick={(e) => setForm((prev) => ({ ...prev, open:true,nameMessage: "Msg 1D" }))}>
                      Msg 1D<tspan x="520" dy="1em">(Techbar)</tspan>
                    </text>
                    <line x1="520" y1="470" x2="520" y2="497" stroke="black" markerEnd="url(#arrow)" />

                    <rect x="570" y="420" width="77" height="50" fill="cyan" stroke="black" />
                    <text x="610" y="440" textAnchor="middle" fill="black" style={{ cursor: "pointer" }} onClick={(e) => setForm((prev) => ({ ...prev, open:true,nameMessage: "Msg 1E" }))}>
                      Msg 1E<tspan x="610" dy="1em">(Remote)</tspan>
                    </text>
                    <line x1="610" y1="470" x2="610" y2="497" stroke="black" markerEnd="url(#arrow)" />

                    <line x1="153" y1="290" x2="153" y2="478" stroke="black" markerEnd="url(#arrow)" />
                    <rect x="118" y="480" width="70" height="40" fill="pink" stroke="black" />
                    <text x="152" y="503" textAnchor="middle" fill="black">Resolve</text>
                    <line x1="610" y1="500" x2="190" y2="500" stroke="black" markerEnd="url(#arrow)" />

                    <defs>
                      <marker id="arrow" markerWidth="10" markerHeight="10" refX="6" refY="3" orient="auto">
                        <path d="M0,0 L0,6 L9,3 z" fill="black" />
                      </marker>
                    </defs>
                  </svg>

               </td>

                <td style={{verticalAlign:"top"}}>

                  <div ref={popupRef}>
                    {form.open && ( // si form.open = true
                      <div >        
                        <table >
                          <tr>
                            <td style={{paddingLeft:"3px",...styles.td1Messages}}>Message</td> <td style={styles.td2Messages}>{form.nameMessage}</td>
                          </tr>
                          <tr>
                            <td style={{paddingLeft:"3px",...styles.td1Messages}}>Work notes</td> <td style={{fontSize: "12px", ...styles.td2Messages }}>{workNotes}</td>
                          </tr>
                          <tr>
                            <td style={{paddingLeft:"3px",...styles.td1Messages}}>Add. comments</td> <td style={{fontSize: "12px", ...styles.td2Messages }}>{addComments}</td>
                          </tr>
                        </table>

                        <button onClick={() => setForm(false,"")} >Fermer</button>

                      </div>
                    )}
                  </div>

                </td>

              </tr>
            </table>
              
            </div>
             
}

export default DivPageGuideIncidentsFreeInstallation;
