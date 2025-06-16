import {styles} from '../components/ComponentCss';
import React, {useState,useRef} from "react";
import FileInput from "../components/ReadExcelFileData/FileInput";
import readExcel from "../components/ReadExcelFileData/readExcel";
import ExcelLoader from '../components/ReadExcelFileData/ExcelLoader';

function DivPageTraker() {

  
  const [excelData, setExcelData] = useState([]);
  

  const handleFileSelect = async (file) => {
    try {
        const data = await readExcel(file);
        setExcelData(data);
    } catch (error) {
        alert("*** Error reading Excel file",error);
    }
  };

  const excelDataLoad = ExcelLoader();

   const hiddenFileInput = useRef(null);
  
    const handleClick = () => {
      hiddenFileInput.current.click();
    };
  
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
           
            <p style={styles.p2}> Last import : 19/09/2022</p>

            <h2 style={styles.title}>TRAKER</h2>
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
                        (<td style={styles.tdIncidents} key={cellIndex}>{cell}</td>) 

                        /*
                        (
                          (cellIndex === 0 || cellIndex === 2 || cellIndex === 3 || cellIndex === 5 || cellIndex === 7 || cellIndex === 11) // NON DATE
                          ? 
                          (
                            (<td style={styles.tdIncidents} key={cellIndex}>{cell}</td>) 
                          ) 
                          : 
                          (cellIndex === 1 || cellIndex === 9 || cellIndex === 10) // DATES
                          ? 
                          ( 
                             //(<td style={styles.tdIncidents} key={cellIndex}>{convDate(cell)}</td>) 
                            (<td style={styles.tdIncidents} key={cellIndex}>{cell}</td>) 

                          ) 
                          :
                          null
                        ) 
                        */
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
