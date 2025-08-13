import React, {useState, useEffect} from "react";
import { loadExcelData } from '../components/ReadExcelFileData/ExcelLoader';
import {styles} from '../components/ComponentCss';


const DivPageMonthlyIncidents = () => {
 
    const [originalData, setOriginalData] = useState([]);
    const [excelData, setExcelData] = useState([]);
    const [selectedYear, setSelectedYear] = useState(new Date().getFullYear().toString());
    const [selectedMonth, setSelectedMonth] = useState((new Date().getMonth() + 1).toString().padStart(2, '0'));
    const [selectedWeek, setSelectedWeek] = useState("");
    const [needUpdate, setNeedUpdate] = useState(true);
 
    
    // Get Date Today
    useEffect(() => {
        const fToday = () => {
            const dateTodayString = new Date().toLocaleDateString("fr-FR") ;
            return dateTodayString;
        };
        const today = fToday();
        const YearToday = today.split("/")[2];
        setSelectedYear(YearToday);
        const monthToday = today.split("/")[1];
        setSelectedMonth(monthToday);
 
        const fetchData = async () => {
            const dataExcel = await loadExcelData();
            if (dataExcel && dataExcel.length > 0) {
                var copyData = [...dataExcel];
                copyData = parseColNumberToDateString(copyData);
                setOriginalData(copyData); // données prêtes à être filtrées
                setNeedUpdate(true); // déclenche le filtrage
            }
        };
        fetchData();
    }, []);
 
   
    // CONVERSION NUMBER TO DATE STRING
    const parseExcelDateString = (excelDateNumber) => {
        const baseDate = new Date(1900, 0, 1);
        return (new Date(baseDate.getTime() + (excelDateNumber - 2) * 86400000)).toLocaleDateString();
    }

    // CONVERSION COLUMN NUMBER TO COLUMN DATE STRING
    const parseColNumberToDateString = (copyData) => {
      // Transformation des dates dans les colonnes 1, 10 et 11
      for (let a = 0; a < Object.keys(copyData[0]).length; a++) {
        const currentKey = Object.keys(copyData[0])[a];
        if (a === 1 || a === 10 || a === 11) {
          for (let b = 1; b < copyData.length; b++) {
              const cell = copyData[b][currentKey];
              if (typeof cell === "number") {
                  copyData[b][currentKey] = parseExcelDateString(cell);
              }
          }
        }
      }
      return copyData;
    }
 
    const filterByYearMonthOrWeek = (data, mois, annee,week) => {
        const year = `/${annee}`
        const yearMonthSearch = `/${mois}/${annee}`;

        if(annee === "" && mois === "" && week === "") {
          return data.filter(row =>
            row[0] === "Week" || (row[3] === "Incident")
          );
        } else {
            if(annee != "" && mois === "" && week === "") {
              return data.filter(row =>
                row[0] === "Week" || (row[3] === "Incident" && row[1].includes(year))
              );
            } else {
                if(annee != "" && mois != "" && week === "") {
                  return data.filter(row =>
                    row[0] === "Week" || (row[3] === "Incident" && row[1].includes(yearMonthSearch))
                  );
                } else {
                  if(annee != "" && mois === 0 && week != "") {
                    return data.filter(row =>
                      row[3] === "Incident" && row[1].includes(year) && row[0] === parseInt(week)
                    );
                  } else { // test an = "" et week != ""
                    if(annee === "" && week != "") {
                      alert("Error : Please a year !!");
                      return null   
                    }
                  } 
                }
            } 
        }

        return null;
    };
 
    useEffect(() => {
        if (needUpdate && originalData.length > 0) {
            const filteredData = filterByYearMonthOrWeek(originalData, selectedMonth, selectedYear,selectedWeek);
            setExcelData(filteredData);
            setNeedUpdate(false);
        }
    }, [needUpdate, selectedMonth, selectedYear, originalData]);
 

  // SELECT YEAR
  const tabYear = ["2022", "2023", "2024", "2025"];
  
  const handleSelectYearChange = (event) => {
    setSelectedYear(event.target.value);
  };

  // SELECT MOIS
  const tabLibMonth = ["January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"];

  const handleSelectMonthChange = (event) => {
    setSelectedMonth(event.target.value);
  };

  // SELECT WEEK
  const tabNumWeek = Array.from({ length: 52 }, (_, i) => i + 1);

  const handleSelectWeekChange = (event) => {
    setSelectedWeek(event.target.value);
    setSelectedMonth(0);
  };

  // BOUTON UPDATE
  const handleUpdateClick = () => {
    setNeedUpdate(true);
  };

 
  return (
    <div style={styles.divImport} >
      
      <label style={{marginRight:15}}>Year&nbsp;
        <select id="selectYear" value={selectedYear} onChange={handleSelectYearChange} >
          <option value="">--All--</option>
          {tabYear.map((libYear,index) => (
            <option key={index} value={libYear}>{libYear}</option>
          ))}
        </select>
      </label>

      <label style={{marginRight:15}}>Month&nbsp;
        <select id="selectMonth" value={selectedMonth} onChange={handleSelectMonthChange} >
          <option value="">--All--</option>
          {tabLibMonth.map((libMonth, index) => (
            <option key={index} value={String(index + 1).padStart(2,'0')}>{libMonth}</option>
          ))}
        </select>
      </label>

      <label>Week&nbsp;
        <select id="selectWeek" value={selectedWeek} onChange={handleSelectWeekChange}>
          <option value="">--All--</option>
          {tabNumWeek.map((numWeek, index) => (
            <option key={index} value={numWeek}>{String(numWeek)}</option>
          ))}
        </select>
      </label>
 
        <button style={styles.btnUpdate} onClick={handleUpdateClick}>
          Update  
        </button>
 
        <h2 style={styles.title}>INCIDENTS</h2>
        <br/>
        <br/>
 
        <table style={styles.tableIncidents}>
                         
          <tbody>
            {excelData && excelData.length > 0 && excelData.map((row, rowIndex) => {
              // Affiche toujours l'en-tête (ligne 0)
              if (rowIndex === 0) {
                return (
                  <tr key={rowIndex}>
                    {row.map((cell, cellIndex) => (
                      <th style={{textAlign: "center",border: "1px solid black",backgroundColor: "lightgreen",padding: 5,}} key={cellIndex} >{cell}</th>
                    ))}
                  </tr>
                );
              }
           
              return (
                <tr key={rowIndex}>
                  {row.map((cell, cellIndex) => (
                    <td style={{ border: "1px solid black", padding: 5 }} key={cellIndex}>{cell}</td>
                  ))}
                </tr>
              );
            })}
             
          </tbody>
        </table>
 
      </div>
  );
 
};
 
export default DivPageMonthlyIncidents;