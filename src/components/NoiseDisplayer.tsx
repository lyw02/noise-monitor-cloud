import { useState, useEffect } from "react";
import { UPDATE_INTERVAL } from "../const";

const NoiseDisplayer = ({ isMonitoring }: { isMonitoring: boolean }) => {
  const [decibels, setDecibels] = useState<number>(0);
  const [csvData, setCsvData] = useState<string>("");

  useEffect(() => {
    let audioContext: AudioContext;
    let analyser: AnalyserNode;
    let microphone: MediaStreamAudioSourceNode;
    let interval: number;

    const startListening = async () => {
      console.log("Start monitoring");
      if (!navigator.mediaDevices) {
        alert("Ooops!!! Your browser does not support media devices.");
        return;
      }

      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          audio: true,
        });
        audioContext = new AudioContext();
        analyser = audioContext.createAnalyser();
        microphone = audioContext.createMediaStreamSource(stream);
        microphone.connect(analyser);

        analyser.fftSize = 2048;
        const bufferLength = analyser.frequencyBinCount;
        const dataArray = new Uint8Array(bufferLength);

        const getDecibels = () => {
          analyser.getByteTimeDomainData(dataArray);
          let sumSquares = 0;
          for (const amplitude of dataArray) {
            const normalized = amplitude / 128 - 1; // 0 to 255 => -1 to 1
            sumSquares += normalized * normalized;
          }
          const rms = Math.sqrt(sumSquares / dataArray.length);
          const refPressure = 20 * Math.pow(10, -6);
          const maxPressure = 1;
          const decibels = 20 * Math.log10((rms * maxPressure) / refPressure);
          setDecibels(decibels);
          return decibels;
        };

        getDecibels();
        interval = setInterval(async () => {
          const decibels = getDecibels();
          const timestamp = new Date().toISOString();
          navigator.geolocation.getCurrentPosition((position) => {
            const { latitude, longitude } = position.coords;
            const data = `${timestamp},${latitude},${longitude},${decibels}\n`;
            console.log(data);
            setCsvData((prev) => prev + data);
          });
        }, UPDATE_INTERVAL);
      } catch (err) {
        console.error("Error accessing the microphone", err);
      }
    };

    if (isMonitoring) {
      startListening();
    }

    return () => {
      if (interval) {
        clearInterval(interval);
      }
      if (microphone) {
        microphone.disconnect();
      }
      if (audioContext) {
        audioContext.close();
      }
    };
  }, [isMonitoring]);

  useEffect(() => {
    if (!isMonitoring && csvData) {
      const blob = new Blob([csvData], { type: "text/csv;charset=utf-8;" });
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.setAttribute("href", url);
      link.setAttribute(
        "download",
        `noise-data-${new Date().toISOString()}.csv`
      );
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      setCsvData("");
    }
  }, [isMonitoring]);

  return isMonitoring ? (
    <h3>Noise Level: {decibels.toFixed(2)} dB</h3>
  ) : (
    <h3>Not monitoring</h3>
  );
};

export default NoiseDisplayer;
