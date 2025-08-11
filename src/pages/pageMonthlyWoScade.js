import {styles} from '../components/ComponentCss';
import React, {useState,useRef,useEffect} from "react";
import { loadExcelData } from '../components/ReadExcelFileData/ExcelLoader';

function DivPageMonthlyWoScade() {

  // DECLARATIONS
  const [excelDataLoad, SetExcelDataLoad] = useState([]);

  // CONVERT NUMBER TO DATE STRING
  const convertNumberToDateString = (excelDateNumber) => {
    const baseDate = new Date(1900, 0, 1);
    return (new Date(baseDate.getTime() + (excelDateNumber - 2) * 86400000)).toLocaleDateString();
  }

  // CONVERT COLUMN NUMBER TO DATE STRING
  const convertColTabNumberToString = (copyData) => {
    // Transformation des dates dans les colonnes 1, 10 et 11
    for (let a = 0; a < Object.keys(copyData[0]).length; a++) {
      const currentKey = Object.keys(copyData[0])[a];
      if (a === 1 || a === 10 || a === 11) {
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
      copyData = convertColTabNumberToString(copyData);
      SetExcelDataLoad(copyData);
    }
      fetchData();
  }, [])

  

  //-----
  return <div style={styles.divImport} >

          <label style={{marginRight:15}}>
            Year&nbsp;
            <select name="selectYear">
              <option value="2025">2025</option>
              <option value="2024">2024</option>
              <option value="2023">2023</option>
            </select>
          </label>
          <label>
            Month&nbsp;
            <select name="selectMonth">
              <option value="January">January</option>
              <option value="February">February</option>
              <option value="March">March</option>
              <option value="April">April</option>
              <option value="May">May</option>
              <option value="June">June</option>
            </select>
          </label>

            <button style={styles.btnUpdate} onClick="">
              Update  
            </button>

            <h2 style={styles.title}>MONTHLY - Wo Scade</h2>
            <br/>
            <br/>

            <table style={styles.tableIncidents}>
                              
              <tbody>
                {excelDataLoad && excelDataLoad.length > 0 && excelDataLoad.map((row, rowIndex) => {
                  // Affiche toujours l'en-tête (ligne 0)
                  if (rowIndex === 0) {
                    return (
                      <tr key={rowIndex}>
                        {row.map((cell, cellIndex) => (
                          <th style={{textAlign: "center",border: "1px solid black",backgroundColor: "lightgreen",padding: 5,}} key={cellIndex} >
                            {cell}
                          </th>
                        ))}
                      </tr>
                    );
                  }

                  // Pour les autres lignes : vérifier s'il y a "Incident"
                  const hasIncident = row.includes("Request") &&  row.includes("Scade");
                  if (!hasIncident) return null;

                  return (
                    <tr key={rowIndex}>
                      {row.map((cell, cellIndex) => (
                        <td style={{ border: "1px solid #ccc", padding: 5 }} key={cellIndex}>
                          {cell}
                        </td>
                      ))}
                    </tr>
                  );
                })}
                  
              </tbody>

            </table>
              

          </div>
          
}

export default DivPageMonthlyWoScade;
