import { useState } from "react";
import "./App.css";
import NoiseDisplayer from "./components/NoiseDisplayer";

function App() {
  const [isMonitoring, setIsMonitoring] = useState(false);

  return (
    <>
      <h1>Noise Monitor</h1>
      <div className="card">
        <button onClick={() => setIsMonitoring((prev) => !prev)}>
          {isMonitoring ? "End monitoring" : "Start monitoring"}
        </button>
        <NoiseDisplayer isMonitoring={isMonitoring} />
      </div>
    </>
  );
}

export default App;
