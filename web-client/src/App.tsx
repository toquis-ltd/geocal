import About from './components/about';
import Settings from './components/settings/settings';
import Converter from './components/converter';

import './App.css';

function App() {
  return (
    <div className='converter'>
      <Settings/>
      <Converter/>
      <About/>
    </div>
    );
}

export default App;
