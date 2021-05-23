import {useState, useEffect} from 'react';

import ConversionSettings  from "./components/Settings";
import PointConverter from "./components/converter/PointConverter";
import Stories from './components/Stories';

import { getInformationAboutCode } from './tools/parse'
import { UrlParser } from './AppWrapper'

import './styles/style.sass';
import './styles/converter-style.sass';
import './styles/history-style.sass';
import './styles/popup-style.sass';
import './styles/globe-style.sass';
import './styles/settings-style.sass';
import './styles/dropdown-style.sass';

async function handelCRS (code, handeler) {
    await getInformationAboutCode(code).then(e => handeler(e.message));
}

function Converter ({sourceCRSCode, targetCRSCode, point}) {
    
    const [sourceCRS, setSourceCRS] = useState({});
    const [targetCRS, setTargetCRS] = useState({});
    const [history, setHistory] = useState([]);
    
    useEffect(() => {
        if (sourceCRSCode !== null) handelCRS(sourceCRSCode, setSourceCRS);
        if (targetCRSCode !== null) handelCRS(targetCRSCode, setTargetCRS);
    }, [])

    function updateHistory(story) {
        let targetHistory = [...history];
        if (history.includes(JSON.stringify(story)) === false) {
            targetHistory.unshift(JSON.stringify(story));
            setHistory(targetHistory);
        }
    }

    return(
      <>
        <ConversionSettings
                            sourceCRS={{get:()=>sourceCRS, set:setSourceCRS}}
                            targetCRS={{get:()=>targetCRS, set:setTargetCRS}}
        />
        <PointConverter
                        sourceCRS={sourceCRS}
                        targetCRS={targetCRS}
                        updateHistory = {(e) => updateHistory(e)}
                        point={point}
        />
        <Stories history={history}/>
      </>
    );
}


function App() {
    const [source, target, point] = UrlParser();
    return <Converter sourceCRSCode={source} targetCRSCode={target} point={point}/>
}

export default App;