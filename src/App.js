import React from 'react';
import './App.css';
import AudioPlayer from './components/AudioPlayer'; // Import AudioPlayer component

const data = [
  {
    title: "Illusions",
    audioPath: "/assets/music/Illusions.mp3",
    imagePath: "/assets/music/IllusionsCover.jpg"
  },
  {
    title: "Never Surrender",
    audioPath: "/assets/music/NeverSurrender.mp3",
    imagePath: "/assets/music/NeverSurrenderCover.png"
  },
  {
    title: "Soulicious",
    audioPath: "/assets/music/Soulicious.mp3",
    imagePath: "/assets/music/SouliciousCover.jpg"
  }
]

function App() {
  return (
    <div className="App">
      {/* <AudioPlayer title="Illusions" audioPath="/assets/music/Illusions.wav" imagePath="/assets/music/IllusionsCover.jpg" /> */}

      {data.map((track, index) => (
        <AudioPlayer
          key={index}
          title={track.title}
          audioPath={track.audioPath}
          imagePath={track.imagePath}
        />
      ))}
    </div>
  );
}

export default App;
