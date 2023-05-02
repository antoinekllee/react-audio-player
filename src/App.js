import React, { useState, useEffect, useRef } from 'react';
import './App.css';

function App() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [trackProgress, setTrackProgress] = useState(0);
  const [trackDuration, setTrackDuration] = useState(0);

  const audioRef = useRef(new Audio(process.env.PUBLIC_URL + '/assets/Music.wav'));
  const intervalRef = useRef();

  useEffect(() => {
    const audio = audioRef.current;

    audio.addEventListener('loadedmetadata', () => {
      setTrackDuration(audio.duration);
    });

    return () => {
      audio.removeEventListener('loadedmetadata', () => {});
    };
  }, []);

  useEffect(() => {
    const audio = audioRef.current;

    if (isPlaying) {
      audio.play();
      intervalRef.current = setInterval(() => {
        setTrackProgress(audio.currentTime);
      }, 1000);
    } else {
      audio.pause();
      clearInterval(intervalRef.current);
    }

    return () => {
      clearInterval(intervalRef.current);
    };
  }, [isPlaying]);

  const handlePlayPause = () => {
    setIsPlaying(!isPlaying);
  };

  const handleRestart = () => {
    audioRef.current.currentTime = 0;
    setTrackProgress(0);
  };

  const handleSliderChange = (event) => {
    const newValue = parseFloat(event.target.value);
    audioRef.current.currentTime = newValue;
    setTrackProgress(newValue);
  };

  return (
    <div className="App">
      <div className="card">
        <h1>Archesis Theme</h1>
        <img src={process.env.PUBLIC_URL + '/assets/Cover.png'} alt="Track cover" />
        <input
          type="range"
          min="0"
          max={trackDuration}
          step="0.01"
          value={trackProgress}
          onChange={handleSliderChange}
        />
        <div className="button-group"> {/* Add the "button-group" class */}
          <button onClick={handleRestart}>R</button>
          <button onClick={handlePlayPause}>{isPlaying ? '❚❚' : '▶'}</button>
        </div>
      </div>
    </div>
  );
}

export default App;
