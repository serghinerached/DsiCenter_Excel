import {styles} from '../components/ComponentCss';
import {useState,useRef,useEffect} from "react";
import { loadExcelData } from '../components/ReadExcelFileData/ExcelLoader';

function DivPageTraker() {

  // DECLARATIONS
  const [excelDataLoad, SetExcelDataLoad] = useState([]);
  const [dateLastImport, SetDateLastImport] = useState();
  const hiddenFileInput = useRef(null);

  // CONVERT NUMBER TO DATE STRING
  const convertNumberToDateString = (excelDateNumber) => {
    const baseDate = new Date(1900, 0, 1);
    return (new Date(baseDate.getTime() + (excelDateNumber - 2) * 86400000)).toLocaleDateString();
  }

  // CONVERT COLUMN NUMBER TO DATE STRING
  const convertColTabNumberToString = (copyData) => {
    // Transformation des dates dans les colonnes 1, 10 et 11
    for (let a = 0; a < Object.keys(copyData[0]).length; a++) {
      copyData[a].splice(13, 1); // supp col 13
      const currentKey = Object.keys(copyData[0])[a];
      if (a === 1 || a === 9 || a === 10) {
          for (let b = 1; b < copyData.length; b++) {
              const cell = copyData[b][currentKey];
              if (typeof cell === "number") {
                  copyData[b][currentKey] = convertNumberToDateString(cell);
              }
          }
      }
    }
    return copyData;
  }
  
  
    // TRAITEMENT DEMARRAGE
    useEffect(() => {
      const fetchData = async () => {
        var copyData = [...await loadExcelData()];
        SetDateLastImport(convertNumberToDateString(copyData[1][13]));
        copyData = convertColTabNumberToString(copyData);
        SetExcelDataLoad(copyData);
      }
        fetchData();
    }, [])

    

   // BOUTON IMPORT
    const handleClick = () => {
      hiddenFileInput.current.click();
    };
  
    // BOUTON FILE HIDDEN
    const handleChange = (event) => {
      const file = event.target.files[0];
      console.log('Fichier sélectionné :', file);
      // Vous pouvez lire le fichier ici avec FileReader ou l'envoyer au serveur
    };


  //-----
  return <div style={styles.divImport} >
          
            <input type="file" ref={hiddenFileInput} onClick={handleChange} style={{ display: 'none' }}  /> <br/>
           
            <button style={styles.btnImport} onClick={handleClick}>
              Import  
            </button>
           
            <p style={styles.p2}> Last import : {dateLastImport}</p>

            <h2 style={styles.title}>TRACKER</h2>
            <br/>
            <br/>

              <table style={styles.tableIncidents}>
                
                {excelDataLoad && excelDataLoad.length > 0 && excelDataLoad.map((row, rowIndex) => (
                  row && row.length > 0 &&
                  <tbody>
                    
                  <tr key={rowIndex}>
                  
                      {row.map((cell, cellIndex) => (

                        (rowIndex > 0) // row > 0
                        ?
                          (<td style={{textAlign:"center",...styles.tdIncidents}} key={cellIndex}>{cell}</td>)
                        : // row = 0 (entete)
                          (<th style={{textAlign:"center",border:"1px solid black",backgroundColor:"cyan",padding:5}} key={cellIndex}>{cell}</th>) 
                      ))}
                      
                  </tr>
                  </tbody>
                ))}
             
              </table>

          </div>
}

export default DivPageTraker;
