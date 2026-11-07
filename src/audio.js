// Original synthesized effects. No external audio files or network requests.
let context;
let enabled=true;
const active=new Set();
export function unlockAudio(){try{context??=new(window.AudioContext||window.webkitAudioContext)();if(context.state==='suspended')context.resume().catch(()=>{});}catch{}}
export function stopAudio(){for(const o of active){try{o.stop();}catch{}}active.clear();}
export function setSound(value){enabled=value;if(!value)stopAudio();}
export function sound(kind){if(!enabled||!context||context.state!=='running'||document.hidden)return;
 const notes={select:[440],place:[620],invalid:[185],complete:[523,659,784],win:[523,659,784,1047],undo:[390,310]}[kind]||[440];
 notes.forEach((frequency,i)=>{const o=context.createOscillator(),gain=context.createGain(),t=context.currentTime+i*.11;const duration=kind==='win'||kind==='complete'?.35:.12;
 o.type='sine';o.frequency.setValueAtTime(frequency,t);if(kind==='place')o.frequency.exponentialRampToValueAtTime(frequency*.65,t+duration);
 gain.gain.setValueAtTime(0,t);gain.gain.linearRampToValueAtTime(.07,t+.012);gain.gain.exponentialRampToValueAtTime(.001,t+duration);
 o.connect(gain);gain.connect(context.destination);active.add(o);o.onended=()=>{active.delete(o);o.disconnect();gain.disconnect();};o.start(t);o.stop(t+duration+.02);
 });
}
