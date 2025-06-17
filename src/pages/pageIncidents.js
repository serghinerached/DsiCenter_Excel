import {styles} from '../components/ComponentCss';
import React, {useState,useRef} from "react";
import readExcel from "../components/ReadExcelFileData/readExcel";

function DivPageIncidents() {

  
  const [excelData, setExcelData] = useState([]);
  

  const handleFileSelect = async (file) => {
    try {
        const data = await readExcel(file);
        setExcelData(data);
    } catch (error) {
        alert("*** Error reading Excel file",error);
    }
  };

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

  const hiddenFileInput = useRef(null);

  const handleClick = () => {
    hiddenFileInput.current.click();
  };

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    try {
        const data = await readExcel(file);
        setExcelData(data);
    } catch (error) {
        alert("*** Error reading this Excel file",error);
    }
  };


  //-----
  return <div style={styles.divImport} >

            <input type="file" ref={hiddenFileInput} onChange={handleFileChange} style={{ display: 'none' }}  /> <br/>
            <button style={styles.btnImport} onClick={handleClick}>
              Import  
            </button>

            <p style={styles.p2}>Last import : 19/05/2025</p>
            <h2 style={styles.title}>INCIDENTS</h2>
            <br/>
            <br/>

              <table style={styles.tableIncidents}>
                
                {excelData && excelData.length > 0 && excelData.map((row, rowIndex) => (
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
                ))}
             
              </table>

          </div>
}

export default DivPageIncidents;
