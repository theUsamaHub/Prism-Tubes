// Real completion milestones; the loader never advances on a timer.
const mark=window.prismMark;
const icon=document.querySelector('#boot-screen img');
(icon?.decode?.()||Promise.resolve()).catch(()=>{}).then(()=>mark?.('branding','Artwork ready'));
import('./main.jsx').then(()=>mark?.('code','Game code loaded')).catch(error=>{
 console.error('Prism Tubes startup failed',error);
 const message=document.getElementById('boot-message');if(message)message.textContent='Could not load the game. Please reload.';
 const retry=document.getElementById('boot-retry');if(retry)retry.hidden=false;
});
