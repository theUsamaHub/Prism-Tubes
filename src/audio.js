// Original layered glass/percussion synthesis. No downloads or audio assets.
let context,master,reverb,enabled=true,lastAt=0,variation=0;
const active=new Set();
export function unlockAudio(){
 try{
  if(!context){
   context=new(window.AudioContext||window.webkitAudioContext)();
   const compressor=context.createDynamicsCompressor();compressor.threshold.value=-18;compressor.knee.value=12;compressor.ratio.value=4;
   master=context.createGain();master.gain.value=enabled?.65:0;master.connect(compressor);compressor.connect(context.destination);
   reverb=context.createConvolver();const impulse=context.createBuffer(2,Math.floor(context.sampleRate*.42),context.sampleRate);
   let seed=723;for(let channel=0;channel<2;channel++){const data=impulse.getChannelData(channel);for(let i=0;i<data.length;i++){seed=(Math.imul(seed,1664525)+1013904223)>>>0;data[i]=(seed/4294967296*2-1)*Math.pow(1-i/data.length,4)*.35;}}
   reverb.buffer=impulse;const wet=context.createGain();wet.gain.value=.16;reverb.connect(wet);wet.connect(master);
  }
  if(context.state==='suspended')context.resume().then(syncMusic).catch(()=>{});else syncMusic();
 }catch{}
}
export function stopAudio(){for(const voice of active){try{voice.stop();}catch{}}active.clear();if(master&&context)master.gain.setValueAtTime(0,context.currentTime);}
export function setSound(value){enabled=value;if(!value)stopAudio();}
function tone(frequency,start,duration,volume,type='sine',endFrequency=frequency){
 const oscillator=context.createOscillator(),envelope=context.createGain();oscillator.type=type;
 oscillator.frequency.setValueAtTime(frequency,start);oscillator.frequency.exponentialRampToValueAtTime(endFrequency,start+duration);
 envelope.gain.setValueAtTime(0,start);envelope.gain.linearRampToValueAtTime(volume,start+.004);envelope.gain.exponentialRampToValueAtTime(.0001,start+duration);
 oscillator.connect(envelope);envelope.connect(master);envelope.connect(reverb);active.add(oscillator);
 oscillator.onended=()=>{active.delete(oscillator);oscillator.disconnect();envelope.disconnect();};oscillator.start(start);oscillator.stop(start+duration+.02);
}
function glass(note,start,strength=1){tone(note,start,.26,.10*strength);tone(note*2.76,start,.095,.023*strength);tone(note*5.4,start,.035,.006*strength);}
export function sound(kind){
 if(!enabled||!context||context.state!=='running'||document.hidden)return;
 const now=context.currentTime;if(now-lastAt<.035||active.size>40)return;lastAt=now;master.gain.setTargetAtTime(.65,now,.008);
 const pitch=[1,1.025,.985,1.012][variation++%4];
 if(kind==='select'){glass(880*pitch,now,.9);return;}
 if(kind==='place'){tone(260*pitch,now,.10,.24,'sine',135*pitch);glass(1160*pitch,now+.008,1.05);return;}
 if(kind==='invalid'){tone(170,now,.10,.055,'sine',140);return;}
 if(kind==='undo'){glass(740,now,.48);glass(554,now+.075,.38);return;}
 const notes=kind==='win'?[523.25,659.25,783.99,1046.5]:[659.25,783.99,1046.5];
 notes.forEach((n,i)=>glass(n,now+i*.105,kind==='win'?1.05:1.2));
 if(kind==='win'){tone(261.63,now,.8,.07);tone(392,now+.21,.65,.045);tone(1318.5,now+.42,.65,.035);}
}

// A quiet original 32-second ambient loop, generated once and reused.
let musicSource,musicBus,musicBuffer,musicEnabled=true,musicPaused=false;
function makeMusic(){
 const rate=22050,duration=32,buffer=context.createBuffer(2,rate*duration,rate);
 const chords=[[130.81,164.81,196],[110,130.81,164.81],[87.31,110,130.81],[98,123.47,146.83]];
 for(let channel=0;channel<2;channel++){
  const data=buffer.getChannelData(channel);
  for(let sample=0;sample<data.length;sample++){
   const t=sample/rate,bar=Math.floor(t/8),local=t%8;
   const envelope=Math.sin(Math.PI*local/8)**2;
   let value=0;for(const frequency of chords[bar]){value+=Math.sin(2*Math.PI*frequency*t+channel*.12)*.025*envelope;value+=Math.sin(2*Math.PI*frequency*2*t)*.006*envelope;}
   const beat=Math.floor(local/1),age=local%1,note=chords[bar][beat%3]*4;
   value+=Math.sin(2*Math.PI*note*age)*Math.exp(-age*5)*Math.min(1,age*100)*.023;
   data[sample]=value;
  }
 }
 return buffer;
}
function syncMusic(){
 if(!context||context.state!=='running')return;
 if(!musicBus){musicBus=context.createGain();musicBus.gain.value=0;musicBus.connect(context.destination);}
 if(musicEnabled&&!musicPaused&&!document.hidden&&!musicSource){musicBuffer??=makeMusic();musicSource=context.createBufferSource();musicSource.buffer=musicBuffer;musicSource.loop=true;musicSource.connect(musicBus);musicSource.start();}
 musicBus.gain.setTargetAtTime(musicEnabled&&!musicPaused&&!document.hidden?.45:0,context.currentTime,.15);
}
export function setMusic(value){musicEnabled=value;syncMusic();}
export function pauseMusic(value){musicPaused=value;syncMusic();}
