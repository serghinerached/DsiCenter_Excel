import * as XLSX from 'xlsx';

const readExcel = (file) => {

    return new Promise((resolve, reject) => {

        const reader = new FileReader();

        reader.onload = (e) => {
            const data = new Uint8Array(e.target.result);
            const workbook = XLSX.read(data,{type: "array"});
            const sheetName = workbook.SheetNames[0];
            const sheet = workbook.Sheets[sheetName];
            // const excelData = XLSX.utils.sheet_to_json(sheet,{header: 1});
            const excelData = XLSX.utils.sheet_to_json(sheet, { header: 1, defval: null }); // Ajout de defval
            
            resolve(excelData);    
        };

        reader.onerror = (error) => {
            reject(error);
        };

        reader.readAsArrayBuffer(file);

    });
};

export default readExcel;