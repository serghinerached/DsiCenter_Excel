import {styles} from '../components/ComponentCss';
import React, {useState,useRef} from "react";
import readExcel from "../components/ReadExcelFileData/readExcel";
import ExcelLoader from '../components/ReadExcelFileData/ExcelLoader';

function DivPageMonthlyWoScade() {

  const excelDataLoad = ExcelLoader();

  const [excelData, setExcelData] = useState([]);
  

  const handleFileSelect = async (file) => {
    try {
        const data = await readExcel(file);
        setExcelData(data);
    } catch (error) {
        alert("*** Error reading Excel file",error);
    }
  };


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
