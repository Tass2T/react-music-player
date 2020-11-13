import {useEffect} from 'react'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faPlay, faAngleLeft, faAngleRight, faPause} from '@fortawesome/free-solid-svg-icons'
import audioPlay from '../util'
import playAudio from '../util'

export default function Player ({songs, setSongs, setCurrentSong, audioRef, songInfo, setSongInfo, isPlaying, setIsplaying, currentSong}) {
    

    const playSongHandler = () => {
        if (isPlaying) {
            audioRef.current.pause()
            setIsplaying(false)
        } else {
            audioRef.current.play()
            setIsplaying(true)
        }
    }

    const getTime = (time) => {
        return (
            Math.floor(time/60) + ":" + ("0" + Math.floor(time%60)).slice(-2)
        )
    }

    const dragHandler = (e) => {
        audioRef.current.currentTime = e.target.value
        setSongInfo({...songInfo, currentTime: e.target.value})
    }

    const skipTrackHandler = (direction) => {
        let currentIndex = songs.findIndex(song => song.id === currentSong.id)
        if (direction === "forward") {
            setCurrentSong(songs[(currentIndex+1)%songs.length])
        } else {
            if (currentIndex === 0) {
                setCurrentSong(songs[songs.length -1])
            } else {
                setCurrentSong(songs[currentIndex-1])
            }
        }
        playAudio(isPlaying, audioRef)
    }

    useEffect(() => {
        const newSongs = songs.map(item => {
            if (item.id === currentSong.id) {
                return {
                    ...item,
                    active: true
                }
            } else {
                return {
                    ...item,
                    active: false
                }
            }
        })
        setSongs(newSongs)
    }, [currentSong])

    return (
        <div className="player">
            <div className="time-control">
                <p>{getTime(songInfo.currentTime) || 0}</p>
                <input min={0} max={songInfo.duration} value={songInfo.currentTime} onChange={dragHandler} type="range"/>
                <p>{getTime(songInfo.duration) || 0}</p>
            </div>
            <div className="play-control">
                <FontAwesomeIcon className="skip-back" onClick={() => skipTrackHandler("back")} size="2x" icon={faAngleLeft}/>
                <FontAwesomeIcon onClick={playSongHandler} className="play" size="2x" icon={isPlaying? faPause : faPlay}/>
                <FontAwesomeIcon className="skip-forward" onClick={() => skipTrackHandler("forward")} size="2x" icon={faAngleRight}/>
            </div>
        </div>
    )
}


