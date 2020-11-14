import './styles/app.scss';
import {useState, useRef} from 'react'
import data from './data'
import Library from './components/Library';
import Nav from './components/Nav'
const { default: Player } = require("./components/Player");
const { default: Song } = require("./components/Song");

function App() {

  const audioRef = useRef(null)
  const [songInfo, setSongInfo] = useState({
    currentTime: 0,
    duration: 0, 
    animationPercentage: 0
})
  const [songs, setSongs] = useState(data())
  const [currentSong, setCurrentSong] = useState(songs[0])
  const [isPlaying, setIsPlaying] = useState(false)
  const [libraryStatus, setLibraryStatus] = useState(false)

  const timeUpdateHandler = (e) => {
    const currentTime = e.target.currentTime
    const duration = e.target.duration
    // calculate percentage
    const roundedCurrent = Math.round(currentTime)
    const roundedDuration = Math.round(duration)
    const animationPercentage = Math.round((roundedCurrent/roundedDuration) * 100)
    setSongInfo({...songInfo, currentTime, duration, animationPercentage})
}

const songEndHandler = async () => {
  let currentIndex = songs.findIndex(song => song.id === currentSong.id)
  await setCurrentSong(songs[(currentIndex+1)%songs.length])
  if(isPlaying) audioRef.current.play()
}

  return (
    <div className={`App ${libraryStatus? "library-active" : ""}`}>
      <Nav libraryStatus={libraryStatus} setLibraryStatus={setLibraryStatus}/>
      <Song currentSong={currentSong}/>
      <Player songs={songs} setSongs={setSongs} setCurrentSong={setCurrentSong} audioRef={audioRef} songInfo={songInfo} setSongInfo={setSongInfo} isPlaying={isPlaying} setIsplaying={setIsPlaying} currentSong={currentSong}/>
      <Library libraryStatus={libraryStatus} isPlaying={isPlaying} audioRef={audioRef} setCurrentSong={setCurrentSong} songs={songs} setSongs={setSongs}/>
      <audio onTimeUpdate={timeUpdateHandler} onLoadedData={timeUpdateHandler} ref={audioRef} src={currentSong.audio} onEnded={songEndHandler}/>
    </div>
  );
}

export default App;
