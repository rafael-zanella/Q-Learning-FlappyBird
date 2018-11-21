
const {app, BrowserWindow} = require('electron');

function createWindow(){
    win = new BrowserWindow( 
	{ 
		width: 890, 
		height: 450,  
		show:false,
		autoHideMenuBar: true
	}) //frame:false,
	
	win.webContents.openDevTools()
    //carrega index.html do app
    win.loadFile('index.html')

    win.once("ready-to-show", ()=>{
        win.show();
    })

	
}
process.env['ELECTRON_DISABLE_SECURITY_WARNINGS'] = 'true';
app.on('ready', createWindow)