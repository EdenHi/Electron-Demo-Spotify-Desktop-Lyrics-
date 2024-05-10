import { querystring } from '@/utils/commom'
const spotifyTokens = JSON.parse(localStorage.getItem('spotifyTokens')!) || ''
function generateSearchParams(data: any) {
    return Object.keys(data).length ? `?${querystring().stringify(data)}` : ''
}
const request = {
    async get(url: string, data?: any, options?: object) {
        return (
            await fetch(url + generateSearchParams(data), {
                method: 'GET',
                headers: { Authorization: `${spotifyTokens?.token_type} ${spotifyTokens?.access_token}` },
                ...options
            })
        ).json()
    },
    async post(url: string, data?: any, options?: object) {
        return (
            await fetch(url, {
                method: 'POST',
                headers: { Authorization: `${spotifyTokens?.token_type} ${spotifyTokens?.access_token}` },
                body: new URLSearchParams(data),
                ...options
            })
        ).json()
    }
}

export const apiSpotifyRedirect = () => {
    const spotifyLoginUrl =
        'https://accounts.spotify.com/authorize?' +
        querystring().stringify({
            response_type: 'code',
            client_id: 'b8d581124f0b4ffd83868dcc60bccf1f',
            scope: 'app-remote-control user-read-playback-state streaming playlist-read-private playlist-read-collaborative',
            redirect_uri: 'http://localhost:5173/callback'
        })
    location.href = spotifyLoginUrl
}

export const apiGetSpotifyToken = (data: any) => {
    return request.post('https://accounts.spotify.com/api/token', data, {
        headers: {
            'content-type': 'application/x-www-form-urlencoded',
            Authorization:
                'Basic ' + btoa('b8d581124f0b4ffd83868dcc60bccf1f' + ':' + '70cee4847a084e2d95b27769ff981632')
        }
    })
}

export const apiGetSpotifyPlayback = () => {
    return request.get('https://api.spotify.com/v1/me/player', { market: 'IN' })
}
export const apiGetSpotifyLyrisc = (data: any) => {
    return request.get('https://oiapi.net/API/Kggc/', data, { headers: {} })
}
