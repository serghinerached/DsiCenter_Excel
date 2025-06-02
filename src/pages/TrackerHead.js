import React from "react";
import {styles} from '../components/ComponentCss';


function DivHeadTracker() {

  const fImport = () => {
    alert("Importation OK !");
  }

  const fToday = () => {
    const elem = new Date().toLocaleDateString("fr-FR") ;
    return elem;
  };

  //-----
  return <div style={styles.divImport} >
            <button style={styles.btnImport} onClick={fImport}>Import</button>
            <p style={styles.p1}> {fToday()} </p>
            <p style={styles.p2}> Last import : 19/09/2022</p>
            <h2 style={styles.title}>Tracker</h2>
          </div>
  ;
}

export default DivHeadTracker;
