import React, { useState, useEffect, useRef } from "react";
import styles from "./AudioPlayer.module.css";
import Card from "./Card";

function AudioPlayer(props) 
{
    const { title, audioPath, imagePath } = props; 

    const [isPlaying, setIsPlaying] = useState(false);
    const [trackProgress, setTrackProgress] = useState(0);
    const [trackDuration, setTrackDuration] = useState(0);

    const audioRef = useRef(
        new Audio(process.env.PUBLIC_URL + audioPath)
    );
    const intervalRef = useRef();

    useEffect(() => {
        const audio = audioRef.current;

        audio.addEventListener("loadedmetadata", () => {
            setTrackDuration(audio.duration);
        });

        return () => {
            audio.removeEventListener("loadedmetadata", () => {});
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

    const formatTime = (time) => {
        const minutes = Math.floor(time / 60);
        const seconds = Math.floor(time % 60);
        return `${minutes}:${seconds.toString().padStart(2, '0')}`;
    };

    return (
        <Card>
            <h1>{title}</h1>
            <img
                src={process.env.PUBLIC_URL + imagePath}
                alt="Track cover"
            />
            <input
                type="range"
                min="0"
                max={trackDuration}
                step="0.01"
                value={trackProgress}
                onChange={handleSliderChange}
            />
            <div className={styles.timeDisplay}>
                {formatTime(trackProgress)} / {formatTime(trackDuration)}
            </div>
            <div className={styles.buttonGroup}>
                <button onClick={handleRestart}>R</button>
                <button onClick={handlePlayPause}>
                    {isPlaying ? "❚❚" : "▶"}
                </button>
            </div>
        </Card>
    );
}

export default AudioPlayer;
