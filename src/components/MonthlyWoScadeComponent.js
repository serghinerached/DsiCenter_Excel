import React from "react";
import {styles} from './ComponentCss';
import DivPageMonthlyWoScade from "../pages/pageMonthlyWoScade"; 



class MonthlyWoScadeComponent extends React.Component {

    render () {

        return(
            <div style={styles.div2}>
                <DivPageMonthlyWoScade/>
            </div>  
        )
    }
}


export default MonthlyWoScadeComponent