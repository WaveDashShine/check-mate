const { app, BrowserWindow } = require('electron')
const path = require('node:path')
const puppeteer = require('puppeteer-core')
const chromePaths = require('chrome-paths')

const createWindow = () => {
    const win = new BrowserWindow({
        width: 800,
        height: 600,
        webPreferences: {
            preload: path.join(__dirname, 'preload.js')
        }
    })

    win.loadFile(path.join(__dirname, 'index.html'))
}

app.whenReady().then(() => {
    console.log("test console log: Activated...")
    createWindow()
    app.on('activate', () => {
        if (BrowserWindow.getAllWindows().length === 0) createWindow()
    })
})

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') app.quit()
    const chromePath = chromePaths.chrome
    console.log(`Chrome Path: ${chromePath}`)
})