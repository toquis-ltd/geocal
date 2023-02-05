import About from './components/about';
import Settings from './components/settings/settings';
import Converter from './components/converter';

import './App.css';

function App() {
  return (
    <div className='converter'>
      <div className="application">
        <Settings/>
        <Converter/>
      </div>
      <About/>
    </div>
    );
}

export default App;