import {styles} from '../components/ComponentCss';
import React, {useState,useRef,useEffect} from "react";
import { loadExcelData } from '../components/ReadExcelFileData/ExcelLoader';


function DivPageIncidents() {

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
  /*
  useEffect(() => {
    const fetchData = async () => {
      var copyData = [...await loadExcelData()];
      copyData = convertColTabNumberToString(copyData);
      SetExcelDataLoad(copyData);
    }
      fetchData();
  }, [])
*/
  
  const hiddenFileInput = useRef(null);
  const [excelData, setExcelData] = useState([]);
  

  // FONCTIONS
  const convDate = (date1) => {
    try{
      if(date1 !== "" && date1 !== undefined && date1 !== null) {
        let converted_date = new Date(Math.round((date1 - 25569) * 864e5));
        converted_date = String(converted_date).slice(4, 15)
        date1 = converted_date.split(" ")
        let day = date1[1];
        let month = date1[0];
        month = "JanFebMarAprMayJunJulAugSepOctNovDec".indexOf(month) / 3 + 1
        if (month.toString().length <= 1)
            month = '0' + month
        let year = date1[2];

        return String(day + '/' + month + '/' + year)

      } else {
          return "";
      }
    } catch (error) {
      console.log("Error date : " ,error.message);
    }
   
  };


  // BUTTON CLICK
  const handeClickButton = () => {
    hiddenFileInput.current.click();
  }; 


  // SELECT CHANGE
  const handeSelectChange = async () => {
    try {
      var copyData = [...await loadExcelData()];
      copyData = convertColTabNumberToString(copyData);
      SetExcelDataLoad(excelDataLoad);
    } catch (error) {
      alert("*** Error reading this Excel file = ",error);
    }
  };


  //-----
  return <div style={styles.divImport} >

            <input type="file" onChange={handeSelectChange} style={{ display: 'none' }}  /> <br/>
            <button style={styles.btnImport} ref={hiddenFileInput} onClick={handeClickButton}>
              Import  
            </button>

            <p style={styles.p2}>Last import : 19/05/2025</p>
            <h2 style={styles.title}>INCIDENTS</h2>
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
                            (<td style={styles.tdIncidents} key={cellIndex}>{convDate(cell)}</td>) 
                          ) 
                          :
                          null
                        ) 

                        : // row = 0 (entete)

                        (
                          (cellIndex === 0  || cellIndex === 1 || cellIndex === 2 || cellIndex === 3 || cellIndex === 5 || cellIndex === 7 
                            || cellIndex === 9 || cellIndex === 10 || cellIndex === 11
                          ) 
                          ? 
                          (
                            (<th style={{textAlign:"center",border:"1px solid black",backgroundColor:"lightgreen"}} key={cellIndex}>{cell}</th>) 
                          ) 
                          : 
                          null
                        ) 
                        
                      ))}
                      
                  </tr>
                  </tbody>
                ))};
             
              </table>

          </div>
    
}

export default DivPageIncidents;
