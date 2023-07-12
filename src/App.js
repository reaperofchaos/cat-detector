import './App.css';
import {useState, useEffect} from 'react'
import {init, predict2} from './helpers/model.helpers'
function App() {
  const [prediction, setPrediction] = useState("");

  predict2().then((val) => {
      console.log("something is happening")
        console.log(val);
    })
    .catch((err) => console.log(err));

  console.log("prediction", prediction)
  return (
    <div className="App">
      <button type="button" onClick={()=>init()}>Start</button>
      <div id="webcam-container"></div>
      <div id="label-container"></div>
      <div id="label-container2">{prediction}</div>
    </div>
  );
}

export default App;
