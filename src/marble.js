// Cached marble artwork: spherical lighting, rim reflection and refracted color.
export function drawMarble(ctx,size,color,style='glass'){
 if(style==='gems'){drawGem(ctx,size,color);return;}
 const rgb=[color>>16&255,color>>8&255,color&255],image=ctx.createImageData(size,size),radius=size*.45;
 for(let y=0;y<size;y++)for(let x=0;x<size;x++){
  const nx=(x-size/2)/radius,ny=(y-size/2)/radius,d=nx*nx+ny*ny;
  if(d>=1)continue;
  const z=Math.sqrt(1-d),fresnel=Math.pow(1-z,3),light=Math.max(0,-nx*.38-ny*.48+z*.78);
  const caustic=Math.exp(-((nx-.27)**2/.17+(ny-.52)**2/.045));
  const ribbon=Math.exp(-((nx+.2*Math.sin(ny*4)-.08)**2)/.018)*Math.max(0,1-d)*.12;
  const shade=.25+light*.56+caustic*.38+ribbon;
  const index=(y*size+x)*4;
  for(let c=0;c<3;c++)image.data[index+c]=Math.min(255,rgb[c]*shade+(c===2?215:235)*fresnel*.38+caustic*55);
  image.data[index+3]=Math.min(255,(1-Math.sqrt(d))*radius*255);
 }
 ctx.putImageData(image,0,0);
 ctx.save();ctx.translate(size/2,size/2);ctx.scale(radius,radius);
 // Curved studio-window reflection, softened at its edges.
 const reflection=ctx.createRadialGradient(-.34,-.48,.015,-.34,-.48,.46);
 reflection.addColorStop(0,'rgba(255,255,255,.9)');reflection.addColorStop(.38,'rgba(255,255,255,.5)');reflection.addColorStop(1,'rgba(255,255,255,0)');
 ctx.fillStyle=reflection;ctx.beginPath();ctx.arc(-.34,-.48,.46,0,Math.PI*2);ctx.fill();
 ctx.rotate(-.48);ctx.fillStyle='rgba(255,255,255,.83)';ctx.beginPath();ctx.roundRect(-.24,-.79,.39,.15,.07);ctx.fill();
 ctx.fillStyle='rgba(255,255,255,.32)';ctx.beginPath();ctx.roundRect(.19,-.72,.075,.13,.025);ctx.fill();ctx.restore();
 ctx.save();ctx.translate(size/2,size/2);ctx.scale(radius,radius);ctx.lineWidth=.025;ctx.strokeStyle='rgba(255,255,255,.42)';ctx.beginPath();ctx.arc(0,0,.91,.32,1.28);ctx.stroke();ctx.restore();
 if(style==='candy'){
 ctx.save();ctx.translate(size/2,size/2);ctx.scale(radius,radius);ctx.beginPath();ctx.arc(0,0,.97,0,Math.PI*2);ctx.clip();
 for(let arm=0;arm<7;arm++){ctx.beginPath();for(let step=0;step<=80;step++){const r=step/80,angle=arm*Math.PI*2/7+r*3.5;const x=Math.cos(angle)*r,y=Math.sin(angle)*r;if(step===0)ctx.moveTo(x,y);else ctx.lineTo(x,y);}ctx.lineWidth=.09;ctx.strokeStyle='rgba(255,248,221,.7)';ctx.stroke();}ctx.restore();
 }
}
function drawGem(ctx,size,color){
 const rgb=[color>>16&255,color>>8&255,color&255];const tint=(factor,white=0)=>`rgb(${rgb.map(v=>Math.min(255,Math.round(v*factor+white))).join(',')})`;
 ctx.save();ctx.translate(size/2,size/2);ctx.scale(size*.46,size*.46);
 const points=Array.from({length:8},(_,i)=>{const a=i*Math.PI/4-Math.PI/8;return [Math.cos(a),Math.sin(a)];});
 for(let i=0;i<8;i++){const a=points[i],b=points[(i+1)%8];ctx.beginPath();ctx.moveTo(...a);ctx.lineTo(...b);ctx.lineTo(b[0]*.56,b[1]*.56);ctx.lineTo(a[0]*.56,a[1]*.56);ctx.closePath();ctx.fillStyle=tint([.6,.52,.7,.94,1.1,1.15,.85,.68][i],i>3&&i<6?45:0);ctx.fill();}
 const fill=ctx.createLinearGradient(-.5,-.5,.5,.5);fill.addColorStop(0,tint(.8,95));fill.addColorStop(.55,tint(1));fill.addColorStop(1,tint(.6));ctx.beginPath();points.forEach((p,i)=>i?ctx.lineTo(p[0]*.56,p[1]*.56):ctx.moveTo(p[0]*.56,p[1]*.56));ctx.closePath();ctx.fillStyle=fill;ctx.fill();ctx.lineWidth=.018;ctx.strokeStyle='rgba(255,255,255,.55)';ctx.stroke();ctx.beginPath();ctx.moveTo(-.85,-.34);ctx.lineTo(-.35,-.85);ctx.strokeStyle='rgba(255,255,255,.9)';ctx.lineWidth=.035;ctx.stroke();ctx.restore();
}
