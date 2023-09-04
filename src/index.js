const {app, BrowserWindow, ipcMain} = require('electron')
const config = require('./config');
const Logger = require('./logger');
const TenderController = require("./tenders/controller");


const appLogger = new Logger('App');
const ipcLogger = new Logger('IPC');

const tenderController = new TenderController();

function createWindow() {
    const mainWindow = new BrowserWindow(config.window)
mainWindow.webContents.openDevTools()

    ipcMain.handle('get-tenders', (event) => {
        ipcLogger.message(`Get tenders: ${JSON.stringify(event)}`);

        return tenderController.next();
    })

    mainWindow.loadFile('./src/index.html')
}

app.on('ready', () => {
    appLogger.message('App is ready')

    createWindow()
    app.on('activate', function () {
        if (BrowserWindow.getAllWindows().length === 0) createWindow()
    })

})

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit()
    }
})
