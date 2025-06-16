
// export default ExcelLoader;
import React, { useEffect, useState } from "react";
import * as XLSX from "xlsx";
import DivPageTraker from "../../pages/pageTraker";

function ExcelLoader() {
  const [data, setExcelData] = useState([]);

  useEffect(() => {
    fetch(process.env.PUBLIC_URL + "/data/Tracker.xlsx") // si dans public/data

      .then((res) => {
        if (!res.ok) throw new Error(`HTTP error! Status: ${res.status}`);
          console.log(res.headers.get("content-type")); // Vérifie le format
          return res.arrayBuffer();
      })
      .then((ab) => {
        const dataArray = new Uint8Array(ab);
        const workbook = XLSX.read(dataArray, { type: "array" }); 

        const sheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[sheetName];
        const jsonData = XLSX.utils.sheet_to_json(worksheet, { header: 1, defval: null });

        setExcelData(jsonData);
        console.log(jsonData);

      })
      .catch((error) => {
        console.error("Erreur lors du chargement du fichier :", error);
      }
    );

  }, []);

  return data; 

}; 

export default ExcelLoader;