import {styles} from '../components/ComponentCss';
import React, {useState} from "react";
import FileInput from "../components/ReadExcelFileData/FileInput";
import readExcel from "../components/ReadExcelFileData/readExcel";

function DivHeadTracker() {

  const fImport = () => {
    alert("Importation OK !");
  }

  const fToday = () => {
    const elem = new Date().toLocaleDateString("fr-FR") ;
    return elem;
  };

  const [excelData, setExcelData] = useState([]);
  

  const handleFileSelect = async (file) => {
    try {
        const data = await readExcel(file);
        setExcelData(data);
        fImport();
    } catch (error) {
        console.error("*** Error reading Excel file",error);
    }
  };

  //-----
  return <div style={styles.divImport} >
          <h3>Import</h3>
          <FileInput onFileSelect={handleFileSelect} /> <br/>

            <p style={styles.p2}>Last import : 19/05/2025</p>
            <h2 style={styles.title}>INCIDENTS</h2>
            <br/>
            <br/>

              {excelData.map((row, rowIndex) => (
                <tr key={rowIndex}>
                    {row.map((cell, cellIndex) => (
                        <td key={cellIndex}>{cell}</td>
                    ))}
                </tr>
              ))}

          </div>

          
}

export default DivHeadTracker;
