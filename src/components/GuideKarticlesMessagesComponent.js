import React from "react";
import {styles} from './ComponentCss';
import DivPageGuideKarticlesMessages from "../pages/pageGuideKarticlesMessages";

class GuideKarticlesMessagesComponent extends React.Component {

    render () {
          return(
            <div style={styles.div2}>
                <DivPageGuideKarticlesMessages/>
            </div>
        )
    }
}

export default GuideKarticlesMessagesComponent