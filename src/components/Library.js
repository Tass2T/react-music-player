import React from 'react'
import LibrarySong from './LibrarySong'

function Library({ libraryStatus, isPlaying, setCurrentSong, songs, audioRef, setSongs}) {
    return (
        <div className={`library ${libraryStatus? 'active-library' : ''}`}>
            <h2>Library</h2>
            <div className="library-songs">
                {
                    songs.map(song =>
                        <LibrarySong songs={songs} setSongs={setSongs} isPlaying={isPlaying} audioRef={audioRef} setCurrentSong={setCurrentSong} song={song} key={song.id}/>
                    )
                }
            </div>
        </div>
    )
}

export default Library
