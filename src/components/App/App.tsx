import React, { useState} from 'react';
import styles from './App.module.css'
import song1 from './allthat.mp3'
import song2 from './dreams.mp3'
import song3 from './creativeminds.mp3'
import poster1 from './allthat.webp'
import poster2 from './dreams.webp'
import poster3 from './creativeminds.jpg'

interface Track {
    song: HTMLAudioElement,
    poster: string,
    name: string,
}

const initialTracks: Track[] = [
    {
        song: new Audio(song1),
        poster: poster1,
        name: "Первый трек"
    },
    {
        song: new Audio(song2),
        poster: poster2,
        name: "Второй трек"
    },
    {
        song: new Audio(song3),
        poster: poster3,
        name: 'Третий трек'
    }
]

const App = () => {

    const [currentTrack, setCurrentTrack] = useState(0)
    const [track, setTrack] = useState<Track>(initialTracks[currentTrack]);
    const [isPlay, setIsPlay] = useState(false)

    React.useEffect(() => {
        setTrack(initialTracks[currentTrack])
    }, [currentTrack])


    React.useEffect(() => {
        if (isPlay) {
            track.song.play();
        } else {
            track.song.pause();
        }
    }, [isPlay])

    const handleClickNext = () => {
        if (initialTracks.length - 1 > currentTrack) {
            setIsPlay(false)
            setCurrentTrack(currentTrack + 1)
        }
    }

    const handleClickPrev = () => {
        if (currentTrack > 0) {
            setIsPlay(false)
            setCurrentTrack(currentTrack - 1)
        }
    }

    const changeVolume = (e: React.ChangeEvent<HTMLInputElement>) => {
        track.song.volume = +e.target.value
    }

    const handleMuteClick = () => {
        track.song.volume = 0;
    }

    const handleLoudClick = () => {
        track.song.volume = 0.5
    }

    const changeTime = (e: React.ChangeEvent<HTMLInputElement>) => {
       track.song.currentTime = +e.currentTarget.value
    }

    const handleSwitchPlay = () => {
        setIsPlay(!isPlay)
    }

    return (
        <main className={styles.container}>
            <section className={styles.player}>
                <button className={`${styles.player__button} ${styles.player__button_type_back}`}
                        onClick={handleClickPrev}/>
                <button
                    className={`${styles.player__button} ${isPlay ? styles.player__button_type_pause : styles.player__button_type_play}`}
                    onClick={handleSwitchPlay}/>
                <button className={`${styles.player__button} ${styles.player__button_type_next}`}
                        onClick={handleClickNext}/>
                <div className={styles.player__volume}>
                    <button className={`${styles.player__volume_button} ${styles.player__volume_button_type_on}`}
                            onClick={handleLoudClick}/>
                    <input className={styles.player__volume_bar} type='range'
                           min={0}
                           max={1}
                           defaultValue={0.5}
                           step={0.01}
                           onChange={changeVolume}>
                    </input>
                    <button className={`${styles.player__volume_button} ${styles.player__volume_button_type_off}`}
                            onClick={handleMuteClick}/>
                </div>
                <h2 className={styles.player__name}>
                    {track.name}
                </h2>
                <div className={styles.player__progress}>
                    <input type={'range'}
                           min={0}
                           step={1}
                           max={track.song.duration.toFixed(2)}
                           value={track.song.currentTime.toFixed(2)}
                           onChange={changeTime}></input>
                </div>
                <img className={`${styles.player__poster} ${isPlay ? styles.player__poster_active : ''}`}
                     src={track.poster} alt={'Постер трека'}/>
            </section>
        </main>
    )
}

export default App;
