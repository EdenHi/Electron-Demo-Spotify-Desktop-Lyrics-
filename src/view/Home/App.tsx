import { useEffect, useState } from 'react'
import './App.css'
import { useNavigate, useNavigation } from 'react-router-dom'
import { querystring } from '@/utils/commom'
import { apiGetSpotifyLyrisc, apiGetSpotifyPlayback, apiSpotifyRedirect } from '@/api/Spotify'
import { handleSetWindowTitle, openDeskLyrics } from '@/api/IPC'

function App() {
    const hhh = () => {
        openDeskLyrics()
    }
    return (
        <div className="App">
            <button onClick={apiSpotifyRedirect}>login</button>
            {/* <button onClick={request}>request</button> */}
            <button onClick={hhh}>open desk lyrics</button>
        </div>
    )
}

export default App
