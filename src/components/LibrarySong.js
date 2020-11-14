

export default function LibrarySong ({ songs, setSongs, isPlaying, audioRef, setCurrentSong, song}) {

    const songSelectHandler = async () => {
       await setCurrentSong(song)
        // add active state
        const newSongs = songs.map(item => {
            if (item.id === song.id) {
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
        // check if the song is played, if it is, then play the new song
        if(isPlaying) audioRef.current.play()
        
    }

    return (
        <div className={`library-song ${song.active? 'selected' : ""}`} onClick={songSelectHandler}>
            <img src={song.cover} alt={song.name}/>
            <div className="song-description">
                <h3>{song.name}</h3>
                <h4>{song.artist}</h4>
            </div> 
        </div>
    )
}