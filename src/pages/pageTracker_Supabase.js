import React, {useRef,useState, useEffect} from "react";
import {styles} from '../components/ComponentCss';
import { supabase } from '../components/ReadSupabase/supabaseClient';


const DivPageTracker_Supabase = () => {
 
    const [originalData, setOriginalData] = useState([]);
    const [supabaseTrackerData, setSupabaseTracker] = useState([]);
    const [selectedYear, setSelectedYear] = useState(new Date().getFullYear().toString());
    const [selectedMonth, setSelectedMonth] = useState((new Date().getMonth() + 1).toString().padStart(2, '0'));
    const [selectedWeek, setSelectedWeek] = useState("");
    const [selectedType, setSelectedType] = useState("");
    const [needUpdate, setNeedUpdate] = useState(true);
    const [dateLastImport, SetDateLastImport] = useState();
    const hiddenFileInput = useRef(null);

 
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
       
        // LOAD TABLE Tracker FROM SUPABASE
        const fetchData = async () => {
          let { data: dataTableTracker, error } = await supabase
            .from("Tracker") 
            .select("*");
          if (error) {
            console.error("Erreur :", error);
          } else {
            if (dataTableTracker && dataTableTracker.length > 0) {
              SetDateLastImport((dataTableTracker[1]["Last import"]).split(" ")[0]);
              setOriginalData(dataTableTracker); // données prêtes à être filtrées
              setNeedUpdate(true); // déclenche le filtrage
            }
          }
        };
        fetchData();

    }, []);
 
 
    const filterByYearMonthOrWeek = (data, mois, annee,week,type) => {
        const year = `/${annee}`
        const yearMonthSearch = `/${mois}/${annee}`;

        if(annee === "" && mois === "" && week === "" && type === "") {
          return data.filter(row =>
            row[1] === "Week" 
          );
        } else {
            if(annee != "" && mois === "" && week === ""  && type === "") {
              return data.filter(row =>
                row[1] === "Week" || row[2].includes(year)
              );
            } else {
                if(annee != "" && mois != "" && week === ""  && type === "") {
                  return data.filter(row =>
                  //  row[1] === "Week" || row[2].includes(yearMonthSearch)
                    row.Week === "Week" || row.Opened.includes(yearMonthSearch)

                  );
                } else {
                  if(annee != "" && mois === 0 && week != ""  && type === "") {
                    return data.filter(row =>
                      row[2].includes(year) && row[0] === parseInt(week)
                    );
                  } else { // test an = "" et week != ""
                    if(annee === "" && week != "") {
                      alert("Error : Please a year !!");
                      return null   
                    }

                    // test
                    else {
                      alert("ok");
                    }
                    //----
                  } 
                }
            } 
        }

        return null;
    };
 
    useEffect(() => {
        if (needUpdate && originalData.length > 0) {
            const filteredData = filterByYearMonthOrWeek(originalData, selectedMonth, selectedYear,selectedWeek,selectedType);            
            setSupabaseTracker(filteredData); //filteredData);
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

  const handleSelectTypeChange = (event) => {
    setSelectedType(event.target.value);
    setSelectedMonth(0);
  };

  // SELECT TYPE
  const tabType = ["Incident", "Request"];

  const handleSelectWeekChange = (event) => {
    setSelectedWeek(event.target.value);
  };

  // BOUTON UPDATE
  const handleUpdateClick = () => {
    setNeedUpdate(true);
  };

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

    // CONVERT NUMBER TO DATE STRING
  const convertNumberToDateString = (supabaseTrackerDateNumber) => {
    const baseDate = new Date(1900, 0, 1);
    return (new Date(baseDate.getTime() + (supabaseTrackerDateNumber - 2) * 86400000)).toLocaleDateString();
  }

  var columns = supabaseTrackerData[0] // recup colonnes et on enlève la dernière 
  ? Object.keys(supabaseTrackerData[0]) 
  : [];
  columns = columns.slice(0, -1); // enlève la dernière colonne

  //bouton import
  const fileInputRef = useRef(null);

  const handleClick2 = () => {
    fileInputRef.current.click(); // déclenche l'ouverture du sélecteur de fichier
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      console.log("Fichier sélectionné :", file.name);
    }
  };

  return (
    <div style={styles.divImport} >

      <div>
      {/* Bouton personnalisé */}
      <button
        onClick={handleClick}
        className="px-4 py-2 bg-blue-600 text-white rounded-lg"
      >
        Importer un fichier
      </button>

      {/* Input caché */}
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
        style={{ display: "none" }}
      />
    </div>

       <input type="file" ref={hiddenFileInput} onClick={handleChange} style={{ display: 'none' }}  /> <br/>  
      <button style={styles.btnImport} onClick={handleClick2}>
        Import  
      </button>
      
      <p style={styles.p2}> Last import : {dateLastImport}</p><br></br>
      
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

      <label>&nbsp;&nbsp;Type&nbsp;
        <select id="selectType" value={selectedType} onChange={handleSelectTypeChange}>
          <option value="">--All--</option>
          {tabType.map((numType, index) => (
            <option key={index} value={numType}>{numType}</option>
          ))}
        </select>
      </label>
 
        <button style={styles.btnUpdate} onClick={handleUpdateClick}>
          Filter  
        </button>
 
        <h2 style={styles.title}>TRACKER</h2>
        <br/>
        <br/>
 
        <table style={styles.tableIncidents}>
           <thead>
            <tr>
              {columns.map((col) => (
                <th style={{backgroundColor: "lightgreen", border: "1px solid black", padding: 5, textAlign:"center" }} key={col}>
                  {col}
                  </th>
              )) }
            </tr>
          </thead>
           {supabaseTrackerData.map((row) => (
              <tr style={{fontSize:"12px" }}> 
                <td style={{ border: "1px solid black", padding: 5,textAlign:"center" }} >{row.Id}</td>
                <td style={{ border: "1px solid black", padding: 5 ,textAlign:"center"}} >{row.Week}</td>
                <td style={{ border: "1px solid black", padding: 5,textAlign:"center" }} >{row.Opened.split(" ")[0]}</td>
                <td style={{ border: "1px solid black", padding: 5,textAlign:"center" }} >{row.Number}</td>
                <td style={{ border: "1px solid black", padding: 5,textAlign:"center" }} >{row.Type}</td>
                <td style={{ border: "1px solid black", padding: 5 }} >{row.Cots}</td>
                <td style={{ border: "1px solid black", padding: 5 }} >{row.Service}</td>
                <td style={{ border: "1px solid black", padding: 5,textAlign:"center" }} >{row.Status}</td>
                <td style={{ border: "1px solid black", padding: 5,}} >{row["Assigned to"]}</td>
                <td style={{ border: "1px solid black", padding: 5 }} >{row["Requested for"]}</td>
                <td style={{ border: "1px solid black", padding: 5,textAlign:"center" }} >
                  {row.Resolved ? row.Resolved.split(" ")[0] : ""}
                </td>
                <td style={{ border: "1px solid black", padding: 5,textAlign:"center" }} >
                  {row.Closed ? row.Closed.split(" ")[0] : ""}
                </td>
                <td style={{ border: "1px solid black", padding: 5,textAlign:"center" }} >{row.Priority}</td>
                <td style={{ border: "1px solid black", padding: 5,textAlign:"center" }} >{row.Reopen}</td>
              </tr>
           ))}
       
        </table>
 
      </div>
  );
 
};
 
export default DivPageTracker_Supabase;