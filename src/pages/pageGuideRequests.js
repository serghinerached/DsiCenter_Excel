import {styles} from '../components/ComponentCss';
import React, {useState,useRef,useEffect} from "react";
import FileInput from "../components/ReadExcelFileData/FileInput";
import readExcel from "../components/ReadExcelFileData/readExcel";
import { loadExcelDataCotsList } from '../components/ReadExcelFileData/ExcelLoaderCotsList';
import { FaEdit } from "react-icons/fa"; // Icône "Edit" de FontAwesome

function DivPageGuideRequests() {

  // DECLARATIONS
  const [excelDataLoad, SetExcelDataLoad] = useState([]);  
  
    // TRAITEMENT DEMARRAGE
    useEffect(() => {
      const fetchData = async () => {
        var copyData = [...await loadExcelDataCotsList()];
      //  console.log(copyData);
        SetExcelDataLoad(copyData);
      }
        fetchData();
    }, [])
    
    // supp lignes vides
    //const excelDataFilter = excelDataLoad.filter((row) => !row.every((cell) => cell == null || cell.toString().trim() === ""));
   // console.log("excelDataFilter ******************");
   // console.log(excelDataFilter)


  //-----
  return <div style={styles.divImport} >
                     
            <h2 style={styles.title2}>COTS LIST : Access requests</h2>
            <br/>
            <br/>

              <table style={styles.tableIncidents}>
                <tbody>

                  {excelDataLoad.map((row, rowIndex) => (
                      
                    <tr key={row.join("-")+rowIndex}>
                    
                        {row.map((cell, ColIndex) => (

                          (rowIndex > 0) // row > 0
                          ?     
                            (row[4] != null) // si col != vide (group) => c'est une requet
                            ?                  
                              (
                                (ColIndex === 0) // application
                                ? 
                                  ( 
                                    (row[0] === null) 
                                    ? 
                                      (<td style={styles.tdIncidentsApp} key={ColIndex}>{cell}</td>) 
                                    :
                                      (<td style={styles.tdIncidents} key={ColIndex}>{cell}</td>) 
                                 )

                                :
                                  (ColIndex === 1 || ColIndex === 3) 
                                  ?
                                    (<td style={styles.tdIncidents} key={ColIndex}>{cell}</td>) 
                                  :  
                                    (ColIndex === 4) 
                                    ?
                                      (<td style={styles.tdIncidentsCol4} key={ColIndex}>
                                        <FaEdit size={20} style={{ cursor: "pointer", color: "green" }} />
                                      </td>) 
                                    :                                        
                                      null
                              ) 
                            :
                              null
                          : // row = 0 (entete)
                            (
                              (ColIndex === 0) 
                                ? 
                                (<th style={{textAlign:"center",border:"1px solid black",backgroundColor:"lightgray",padding:5}} key={ColIndex}>{cell}</th>) 
                                :
                                  (ColIndex === 1 || ColIndex === 3) 
                                  ?
                                    (<th style={{textAlign:"center",border:"1px solid black",backgroundColor:"lightgray",padding:5}} key={ColIndex}>{cell}</th>) 
                                  :  
                                    (ColIndex === 4) 
                                    ?
                                      (<th style={{textAlign:"center",border:"1px solid black",backgroundColor:"lightgreen",padding:5}} key={ColIndex}>Message</th>) 
                                    :                              
                                      null
                            ) 
                      
                        ))}
                        
                    </tr>
                  ))}

              </tbody>

              </table>

          </div>
}

export default DivPageGuideRequests;
