import { useEffect, useState } from 'react'
import './index.css'
import { apiGetSpotifyLyrisc, apiGetSpotifyPlayback, apiSpotifyRedirect } from '@/api/Spotify'
function DeskLyrics() {
    const [spotifyItem, setSpotifyItem] = useState<{ name: string; progress_ms: number; isPlay: boolean }>({
        name: '',
        progress_ms: 0,
        isPlay: false
    })
    const [lyrisc, setLyrisc] = useState<{ text: string; ms: number }[]>([])
    const [currIndex, setCurrIndex] = useState<number>(0)
    const request = () => {
        apiGetSpotifyPlayback().then((res) => {
            if (res.error && res.error.status === 401) {
                return apiSpotifyRedirect()
            }
            setSpotifyItem({ name: res.item.name, progress_ms: res.progress_ms, isPlay: res.is_playing })
        })
    }
    useEffect(() => {
        request()
        const time = setInterval(() => {
            request()
        }, 5000)
        return () => {
            clearInterval(time)
        }
    }, [])
    // 用于每秒更新progress_ms的Effect
    useEffect(() => {
        let timer
        if (!timer) {
            timer = setInterval(() => {
                setSpotifyItem((prevState) => ({
                    ...prevState,
                    progress_ms: prevState.isPlay ? prevState.progress_ms + 1000 : prevState.progress_ms
                }))
                setCurrIndex(lyrisc.findIndex((item) => item.ms > spotifyItem.progress_ms))
            }, 1000) // 每秒增加1000ms
        }
        return () => clearInterval(timer)
    }, [spotifyItem]) // 依赖isPlay，确保仅在播放时更新

    useEffect(() => {
        if (spotifyItem.name) {
            apiGetSpotifyLyrisc({ msg: spotifyItem?.name, n: 1 }).then((res: any) => {
                setLyrisc(
                    res.data.content
                        ?.split('\n')
                        .filter((line: string) => /^\[\d{2}:\d{2}\.\d{2}\]/.test(line))
                        .map((item: string) => {
                            const text = item.slice(10, item.length)
                            let msArr: any[] = item.slice(1, 9).split(':')
                            msArr.splice(1, 1, msArr[1].split('.'))
                            msArr = msArr.flat().map((i) => Number(i))
                            return { text: text, ms: msArr[0] * 60 * 1000 + msArr[1] * 1000 + msArr[2] }
                        })
                )
            })
        }
    }, [spotifyItem?.name])
    return (
        <>
            <div className="container">
                <div className="title">{spotifyItem?.name}</div>
                {lyrisc
                    .filter((l, lIndex) => lIndex === currIndex || lIndex === currIndex - 1)
                    .map((i, index) => (
                        <div key={index}>{i.text}</div>
                    ))}
            </div>
        </>
    )
}
export default DeskLyrics
