import {styles} from '../components/ComponentCss';
import {useState, useRef,useEffect} from "react";
import DivPageGuideIncidentsFreeInstallation from './pageGuideIncidentsFreeInstallation';


function DivPageGuideIncidents() {

  const [selectedMode, setSelectedMode] = useState();
  const [selectedtypeIssue, setSelectedtypeIssue] = useState();
  const [needUpdate, setNeedUpdate] = useState(false);


// SELECT MODE
  const tabLibMode = ["Free", "Pull user", "Remote control"];
  const handleSelectModeChange = (event) => {
    setSelectedMode(event.target.value);
  };

  // SELECT TYPE
  const tabtypeIssue = ["Installation/Uninstallation", "Issue"];
  const handleSelecttypeIssueChange = (event) => {
    setSelectedtypeIssue(event.target.value);
  };

  // BOUTON OK
  const handleUpdateClick = () => {
   setNeedUpdate(true);
  };

  //-----
   return  <div style={{border:"2px solid blue", ...styles.divImport}} >
    
              <h2 style={styles.title3}>Incidents : </h2>

              <label style={{marginRight:15}}>&nbsp;Mode&nbsp;
                <select id="selectMode" value={selectedMode} onChange={handleSelectModeChange} >
                  {tabLibMode.map((libMode, index) => (
                    <option key={index} value={libMode}>{libMode}</option>
                  ))}
                </select>
              </label>

              <label style={{marginRight:15}}>Type&nbsp;
                <select id="selectTypeIssue" value={selectedtypeIssue} onChange={handleSelecttypeIssueChange} >
                  {tabtypeIssue.map((libtypeIssue,index) => (
                    <option key={index} value={libtypeIssue}>{libtypeIssue}</option>
                  ))}
                </select>
              </label>

              <button style={styles.btnOk} onClick={handleUpdateClick}>OK</button>

              {needUpdate &&
                <div>
                  <DivPageGuideIncidentsFreeInstallation/>
                </div>
              }
              
            </div>
             
}

export default DivPageGuideIncidents;
