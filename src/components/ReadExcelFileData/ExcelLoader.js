// IMPORTATION DATAS EXCEL FILE

import * as XLSX from "xlsx";
 
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
        //console.log("res loadExcelData ***********", jsonData);
        //console.log("res ***********", jsonData);
        return jsonData;
    } catch (error) {
        console.error("Erreur dans loadExcelData :", error);
        return [];
    }
}