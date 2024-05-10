import { apiGetSpotifyToken } from '@/api/Spotify'
import localforage from 'localforage'
import { useCallback, useEffect } from 'react'
import { useNavigate, useParams, useSearchParams } from 'react-router-dom'

function Callback() {
    const [searchParams, setSearchParams] = useSearchParams()
    const navigate = useNavigate()
    console.log(window)

    useEffect(() => {
        apiGetSpotifyToken({
            grant_type: 'authorization_code',
            code: searchParams.get('code'),
            redirect_uri: 'http://localhost:5173/callback'
        }).then((res) => {
            if (res.access_token) {
                localStorage.setItem('spotifyTokens', JSON.stringify(res))
                navigate('/')
            }
        })

        return () => {}
    }, [])

    return (
        <>
            <button
                onClick={() => {
                    navigate('/')
                }}>
                back
            </button>
        </>
    )
}
export default Callback
