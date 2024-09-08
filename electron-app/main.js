const { app, BrowserWindow } = require('electron');
const { exec } = require('child_process');
const path = require('path');

function createWindow() {
    // Determine the path to the Streamlit app
    const streamlitPath = path.join(__dirname, '../streamlit_app/streamlit_app.py');

    // Start the Streamlit app
    const streamlitProcess = exec(`streamlit run ${streamlitPath}`, (err, stdout, stderr) => {
        if (err) {
            console.error('Failed to start Streamlit:', err);
            return;
        }
        console.log(stdout);
        console.error(stderr);
    });

    // Create the Electron browser window
    const win = new BrowserWindow({
        width: 800,
        height: 600,
        webPreferences: {
            nodeIntegration: true,
        },
    });

    // Load the Streamlit app URL into the Electron window
    win.loadURL('http://localhost:8501');

    // Handle the window close event
    win.on('closed', () => {
        if (streamlitProcess) {
            streamlitProcess.kill();  // Terminate the Streamlit process when the window is closed
        }
    });
}

// App lifecycle event handling
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
