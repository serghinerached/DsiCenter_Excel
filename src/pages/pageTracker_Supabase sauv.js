import React, {useRef,useState, useEffect} from "react";
import {styles} from '../components/ComponentCss';
import { supabase } from '../components/ReadSupabase/supabaseClient';
import Papa from "papaparse";


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
    const [dataCsvIncident, setDataCsvIncident] = useState([]);
    const [newTrackerIncident,setNewTrackerIncident] = useState([])


 
    // Get Date Today
    useEffect(() => {
      const fToday = () => {
        const dateTodayString = new Date().toLocaleDateString("fr-FR");
        return dateTodayString;
      };
      const today = fToday();
      const YearToday = today.split("/")[2];
      setSelectedYear(YearToday);
      const monthToday = today.split("/")[1];
      setSelectedMonth(monthToday);

      const fetchAllData = async () => {
        let allData = [];
        const chunkSize = 1000;
        let from = 0;
        let more = true;

        while (more) {
          const { data, error } = await supabase
            .from("Tracker")
            .select("*")
            .range(from, from + chunkSize - 1);

          if (error) {
            console.error("Erreur Supabase :", error);
            break;
          }

          allData = [...allData, ...data];
          from += chunkSize;
          more = data.length === chunkSize; // s'il y avait moins de 1000 lignes, on a fini
        }

        if (allData.length > 0) {
          SetDateLastImport((allData[1]["Last import"]).split(" ")[0]);
          console.log("dataTableTracker :", allData.length);

          setOriginalData(allData);
          setNeedUpdate(true);
        }
      };

      fetchAllData();
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
            setSupabaseTracker(filteredData); 
            setNeedUpdate(false);
            console.log("originalData : " + originalData.length);
            console.log("filteredData : " + filteredData.length);
            console.log("supabaseTrackerData : " + supabaseTrackerData.length);

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
    const handleChangeFile = (event) => {
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
  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      Papa.parse(file, {
        header: true, // si tu veux utiliser la première ligne comme entête
        skipEmptyLines: true,
        complete: (results) => {
          setDataCsvIncident(results.data);
        },
      });
    }
  };

var tabNewIncCsv = [];
var tabUpdateIncCsv = [];

const UpdateTableTracker = () => {
  if (!dataCsvIncident || dataCsvIncident.length === 0) {
    alert("Fichier vide ou null");
    return;
  }
 // Indexer supabaseTrackerData par Number normalisé
  const trackerMap = new Map(
    originalData
      .filter(row => row && row["Number"]) // ignore lignes vides
      .map(row => [String(row["Number"]).trim(), row])
    );

  // Filtrer
    const tabNewInc = dataCsvIncident.filter(incRow => {
    const num = String(incRow["Number"]).trim();
    const trackerRow = trackerMap.get(num);

    const incState = (incRow["State"] ?? "").trim().toLowerCase();
    const trackerState = (trackerRow?.["State"] ?? "").trim().toLowerCase();
/*
    if (!trackerRow) {
      console.log("NEW : ", num);
      return true;
    }

    if (trackerState !== incState) {
      console.log("STATE CHANGED : ", num);
      return true;
    }
*/
  if (!trackerRow) {
  //  console.log("NEW : ", incRow) // ligne venant du CSV
    tabNewIncCsv.push(incRow)
    return true
  }

if (trackerState !== incState) {
 // console.log("Incident updated :", incRow)    // toute la ligne du CSV
  tabUpdateIncCsv.push(incRow)
  return true
}

    return false;
  });

  setNewTrackerIncident(tabNewInc);

  insertTrackerData(tabNewInc);

};

  // Fonction pour calculer le numéro ISO de la semaine
function getWeekNumber(dateStr) {
  const date = new Date(dateStr);
  if (isNaN(date)) return ""; // retourne vide si date invalide

  const d = new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()));
  d.setUTCDate(d.getUTCDate() + 4 - (d.getUTCDay() || 7));
  const yearStart = new Date(Date.UTC(d.getUTCFullYear(), 0, 1));
  const weekNo = Math.ceil((((d - yearStart) / 86400000) + 1) / 7);
  return String(weekNo); // text
}

// Fonction principale pour transformer et insérer les données
async function insertTrackerData(tabNewIncCsv) {
  const columnsToRemove = [
    "Short description",
    "Assignement group",
    "Requested by",
    "Dep",
    "Base item"
  ];

  const desiredOrder = [
    "Week",
    "Opened",
    "Number",
    "Type",
    "Cots",
    "Service",
    "State",
    "Assigned to",
    "Requested for",
    "Resolved",
    "Closed",
    "Priority",
    "Reopen"
  ];

  // Transformer le tableau
  const cleanedAndOrderedTab = tabNewIncCsv.map(row => {
    const cleanedRow = { ...row };

    // 1️⃣ Supprimer les colonnes inutiles
    columnsToRemove.forEach(col => delete cleanedRow[col]);

    // 2️⃣ Ajouter les nouvelles colonnes
    cleanedRow["Type"] = "Incident";
    cleanedRow["Cots"] = "";

    // 3️⃣ Calculer le numéro de semaine à partir de "Opened"
    cleanedRow["Week"] = cleanedRow["Opened"] ? getWeekNumber(cleanedRow["Opened"]) : "";

    // 4️⃣ Réordonner les colonnes
    const orderedRow = {};
    desiredOrder.forEach(col => {
      orderedRow[col] = cleanedRow[col] ?? "";
    });

    return orderedRow;
  });

  // 5️⃣ Insertion dans Supabase
  const { data, error } = await supabase
    .from("Tracker")
    .insert(cleanedAndOrderedTab);

  if (error) {
    console.error("Erreur insertion:", error);
  } else {
    console.log("Toutes les lignes insérées:", data);
  }
}

  function updateTableTracker(tabNewItabNewIncCsv,tabUpdateIncCsvncident) {
    console.log("tabNewItabNewIncCsv -> ");
    tabNewItabNewIncCsv.forEach((row,i) => {
      console.log(i, row)
    })
/*
    console.log("tabUpdateIncCsvncident -> ");
    tabUpdateIncCsvncident.forEach((row,i) => {
      console.log(i,row);
    }); */
  }



  return (
    <div style={styles.divImport} >

      <div>
      {/* Bouton personnalisé */}
       <input
        type="file"
        accept=".csv"
        onChange={handleFileUpload}
      />
    </div>

      <input type="file" ref={hiddenFileInput} onClick={handleChangeFile} style={{ display: 'none' }}  /> <br/>  
      <button style={styles.btnImport} onClick={UpdateTableTracker}>
        Update  
      </button>
      
      <p style={styles.p2}> Last update : {dateLastImport}</p><br></br>
      
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
              <tr style={{fontSize:"13px" }}> 
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