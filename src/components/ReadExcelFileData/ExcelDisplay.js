import React, {useState} from "react";
import FileInput from "./FileInput";
import readExcel from "./readExcel";


const ExcelDisplay = () => {
    const [excelData, setExcelData] = useState([]);

    const handleFileSelect = async (file) => {
        try {
            const data = await readExcel(file);
            setExcelData(data);
        } catch (error) {
            console.error("*** Error reading Excel file",error);
        }
    };

    return (
        <div>
           
            <table className="bordered-table">
                <tbody>
                    {excelData.map((row, rowIndex) => (
                        <tr key={rowIndex}>
                            {row.map((cell, cellIndex) => (
                                <td key={cellIndex}>{cell}</td>
                            ))}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default ExcelDisplay;