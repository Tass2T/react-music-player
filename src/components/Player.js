import {useEffect} from 'react'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faPlay, faAngleLeft, faAngleRight, faPause} from '@fortawesome/free-solid-svg-icons'

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

    const skipTrackHandler = async (direction) => {
        let currentIndex = songs.findIndex(song => song.id === currentSong.id)
        if (direction === "forward") {
           await setCurrentSong(songs[(currentIndex+1)%songs.length])
        } else {
            if (currentIndex === 0) {
                await setCurrentSong(songs[songs.length -1])
            } else {
                await setCurrentSong(songs[currentIndex-1])
            }
        }
        if(isPlaying) audioRef.current.play()
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

    // add the styles
    const trackAnim = {
        transform: `translateX(${songInfo.animationPercentage}%)`
    }

    return (
        <div className="player">
            <div className="time-control">
                <p>{getTime(songInfo.currentTime) || 0}</p>
                <div style={{background: `linear-gradient(to right, ${currentSong.color[0]}, ${currentSong.color[1]})`}} className="track">
                    <input min={0} max={songInfo.duration} value={songInfo.currentTime} onChange={dragHandler} type="range"/>
                    <div style={trackAnim} className="animate-track"></div>
                </div>
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


