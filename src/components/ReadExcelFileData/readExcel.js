import * as XLSX from 'xlsx';
import React, { useEffect, useState } from "react";


const readExcel = (file) => {
    return new Promise((resolve, reject) => {

        const reader = new FileReader();

        reader.onload = (e) => {
            const data = new Uint8Array(e.target.result);
            const workbook = XLSX.read(data,{type: "array"});
            const sheetName = workbook.SheetNames[0];
            const sheet = workbook.Sheets[sheetName];
            const excelJsonData = XLSX.utils.sheet_to_json(sheet, { header: 1, raw: false,defval: null }); // Ajout de defval
            
            resolve(excelJsonData);    
        };
        reader.onerror = (error) => {
            reject(error);
        };

        reader.readAsArrayBuffer(file);

    });
    
};

export default readExcel;