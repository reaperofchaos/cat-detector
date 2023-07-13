import './App.css';
import {init} from './helpers/model.helpers'
function App() {

  return (
    <div className="App">
      <button type="button" onClick={()=>init()}>Start</button>
      <div id="webcam-container"></div>
      <div id="label-container"></div>
    </div>
  );
}

export default App;
