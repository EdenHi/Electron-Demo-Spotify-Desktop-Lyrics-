import { BrowserWindow, ipcMain, IpcMainEvent } from 'electron'

const handleSetWindowTitle = (event: IpcMainEvent, title: string) => {
    const webContents = event?.sender
    const window = BrowserWindow.fromWebContents(webContents)
    window!.setTitle(title)
}
const createNewTab = (event: IpcMainEvent, url: string) => {
    const tab = new BrowserWindow()
    tab.loadURL(url)
    tab.webContents.on('will-redirect', (event, navigationUrl) => {
        console.log(navigationUrl, '2')

        // 取消默认行为
        event.preventDefault()

        // 重定向至本地页面
        tab.loadURL('http://localhost:5173/callback')
    })
}
const openDeskLyrics = () => {
    const win = new BrowserWindow({
        width: 600,
        height: 150,
        transparent: true,
        frame: false,
        alwaysOnTop: true,
        resizable: false,
        backgroundColor: '#10000000',
        webPreferences: {
            nodeIntegration: true,
            contextIsolation: false
        }
    })
    win.loadURL('http://localhost:5173/desk-lyrics')
    win.setHasShadow(false)
    // win.setFrameless(true)
    // win.webContents.openDevTools()
}
export const ipcHandlers = [
    {
        event: 'handleSetWindowTitle',
        callback: handleSetWindowTitle
    },
    {
        event: 'createNewTab',
        callback: createNewTab
    },
    {
        event: 'openDeskLyrics',
        callback: openDeskLyrics
    }
]

export const registerIPCHandlers = () => {
    ipcHandlers.forEach((handler: { event: string; callback: any }) => {
        ipcMain.on(handler.event, handler.callback)
    })
}
