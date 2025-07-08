import { useEffect, useState } from "react";
import * as XLSX from "xlsx";
 
function ExcelLoader() {
    const [data, setExcelData] = useState([]);
   
    useEffect(() => {
        try{
            fetch(process.env.PUBLIC_URL + "/data/Tracker.xlsx")
            .then((res) => {
                if (!res.ok) throw new Error(`HTTP error! Status: ${res.status}`);
                console.log(res.headers.get("content-type"));
                return res.arrayBuffer();
            })
            .then((ab) => {
                const dataArray = new Uint8Array(ab);
                const workbook = XLSX.read(dataArray, { type: "array" });
       
                const sheetName = workbook.SheetNames[0];
                const worksheet = workbook.Sheets[sheetName];
                const jsonData = XLSX.utils.sheet_to_json(worksheet, { header: 1, defval: null });
       
                setExcelData(jsonData);
                console.log("jsonData : ", jsonData);
            })
        }catch(error){
            console.log("Error dans ExcelLoader : ", error);
        }
    }, []);
   
    if(data && data.length > 0) {
        console.log("data : ", data);
        return data;
    }
};
 
export default ExcelLoader;
 
export async function loadExcelData() {
    try {
        const res = await fetch(process.env.PUBLIC_URL + "/data/Tracker.xlsx");
        if (!res.ok) throw new Error(`HTTP error! Status: ${res.status}`);
        const ab = await res.arrayBuffer();
        const dataArray = new Uint8Array(ab);
        const workbook = XLSX.read(dataArray, { type: "array" });
        const sheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[sheetName];
        const jsonData = XLSX.utils.sheet_to_json(worksheet, { header: 1, defval: null });
        return jsonData;
    } catch (error) {
        console.error("Erreur dans loadExcelData :", error);
        return [];
    }
}