// electron-app/main.js

const { app, BrowserWindow } = require('electron');
const { exec } = require('child_process');

function createWindow() {
    // Start the Streamlit app
    exec('streamlit run ../streamlit_app.py', (err, stdout, stderr) => {
        if (err) {
            console.error('Failed to start Streamlit:', err);
            return;
        }
        console.log(stdout);
        console.error(stderr);
    });

    // Create the browser window
    const win = new BrowserWindow({
        width: 800,
        height: 600,
        webPreferences: {
            nodeIntegration: true
        }
    });

    // Load the Streamlit app in the Electron window
    win.loadURL('http://localhost:8501');
}

app.whenReady().then(createWindow);

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit();
    }
});

app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
        createWindow();
    }
});
