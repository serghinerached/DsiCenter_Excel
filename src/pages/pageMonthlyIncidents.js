import React, {useState, useEffect} from "react";
import { loadExcelData } from '../components/ReadExcelFileData/ExcelLoader2';
import {styles} from '../components/ComponentCss';


const DivPageMonthlyIncidents = () => {
 
    const [originalData, setOriginalData] = useState([]);
    const [excelData, setExcelData] = useState([]);
    const [selectedYear, setSelectedYear] = useState(new Date().getFullYear().toString());
    const [selectedMonth, setSelectedMonth] = useState((new Date().getMonth() + 1).toString().padStart(2, '0'));
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
                const copyData = [...dataExcel];
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
                setOriginalData(copyData); // données prêtes à être filtrées
                setNeedUpdate(true); // déclenche le filtrage
            }
        };
        fetchData();
    }, []);
 
    const parseExcelDateString = (excelDateNumber) => {
        // Excel base: 1 Jan 1900 → JS base: 1 Jan 1970
        const baseDate = new Date(1900, 0, 1);
        // Excel bug: 1900 is considered a leap year → need to subtract 2 days
        return (new Date(baseDate.getTime() + (excelDateNumber - 2) * 86400000)).toLocaleDateString();
    }
 
    const filtrerSelonMoisEtAnnee = (data, mois, annee) => {
        const yearMonthSearch = `/${mois}/${annee}`;
        return data.filter(row =>
            row[0] === "Week" ||
            (row[3] === "Incident" && row[1].includes(yearMonthSearch))
        );
    };
 
    useEffect(() => {
        if (needUpdate && originalData.length > 0) {
            const filteredData = filtrerSelonMoisEtAnnee(originalData, selectedMonth, selectedYear);
            setExcelData(filteredData);
            setNeedUpdate(false);
        }
    }, [needUpdate, selectedMonth, selectedYear, originalData]);
 
  const handleSelectYearChange = (event) => {
    setSelectedYear(event.target.value);
  };
  const handleSelectMonthChange = (event) => {
    setSelectedMonth(event.target.value);
  };
 
  const handleUpdateClick = () => {
    setNeedUpdate(true);
  };
 
  return (
    <div style={styles.divImport} >
      <label style={{marginRight:15}}>
        Year&nbsp;
        <select name="selectYear" value={selectedYear} onChange={handleSelectYearChange}>
          <option value="2025">2025</option>
          <option value="2024">2024</option>
          <option value="2023">2023</option>
          <option value="2022">2022</option>
        </select>
      </label>
      <label>
        Month&nbsp;
        <select name="selectMonth" value={selectedMonth} onChange={handleSelectMonthChange}>
          <option value="01">January</option>
          <option value="02">February</option>
          <option value="03">March</option>
          <option value="04">April</option>
          <option value="05">May</option>
          <option value="06">June</option>
          <option value="07">July</option>
          <option value="08">August</option>
          <option value="09">September</option>
          <option value="10">October</option>
          <option value="11">November</option>
          <option value="12">December</option>
        </select>
      </label>
 
        <button style={styles.btnUpdate} onClick={handleUpdateClick}>
          Update  
        </button>
 
        <h2 style={styles.title}>MONTHLY - INCIDENTS</h2>
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
                      <th style={{textAlign: "center",border: "1px solid black",backgroundColor: "lightgreen",padding: 5,}} key={cellIndex} >
                        {cell}
                      </th>
                    ))}
                  </tr>
                );
              }
           
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
  );
 
};
 
export default DivPageMonthlyIncidents;