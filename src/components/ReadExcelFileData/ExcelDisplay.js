import React, {useState} from "react";
import FileInput from "./FileInput";
import readExcel from "./readExcel";
import styles from "../ComponentCss";


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

            <table className="bordered-table">
                <tbody>

                    {excelData.map((row, rowIndex) => (
                        <tr key={rowIndex}>
                            {row.map((cell, cellIndex) => (
                        
                                (<td style={styles.tdIncidents} key={cellIndex}>{cell}</td>) 
                        
                            ))}
                        </tr>
                    ))}

                </tbody>
            </table>
    );
};

export default ExcelDisplay;