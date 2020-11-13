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
    duration: 0
})
  const [songs, setSongs] = useState(data())
  const [currentSong, setCurrentSong] = useState(songs[0])
  const [isPlaying, setIsPlaying] = useState(false)
  const [libraryStatus, setLibraryStatus] = useState(false)

  const timeUpdateHandler = (e) => {
    const currentTime = e.target.currentTime
    const duration = e.target.duration
    setSongInfo({...songInfo, currentTime, duration})
}

  return (
    <div className="App">
      <Nav libraryStatus={libraryStatus} setLibraryStatus={setLibraryStatus}/>
      <Song currentSong={currentSong}/>
      <Player audioRef={audioRef} songInfo={songInfo} setSongInfo={setSongInfo} isPlaying={isPlaying} setIsplaying={setIsPlaying} currentSong={currentSong}/>
      <Library libraryStatus={libraryStatus} isPlaying={isPlaying} audioRef={audioRef} setCurrentSong={setCurrentSong} songs={songs} setSongs={setSongs}/>
      <audio onTimeUpdate={timeUpdateHandler} onLoadedData={timeUpdateHandler} ref={audioRef} src={currentSong.audio}/>
    </div>
  );
}

export default App;
