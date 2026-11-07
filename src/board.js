import Phaser from 'phaser';
import {drawMarble} from './marble';
import {boardLayout} from './layout';

export const COLORS=[0xe76539,0x259c9b,0xe6b537,0x4279c5,0x8baf50,0xd67e9c];
export class Board extends Phaser.Scene {
 constructor(bridge){super('board');this.bridge=bridge;}
 create(){this.cameras.main.setOrigin(0,0).setZoom(this.bridge.density||1);this.bridge.scene=this;this.paint();window.prismMark?.('board','Puzzle prepared');this.game.events.once('postrender',()=>window.prismMark?.('frame','First frame rendered'));this.scale.on('resize',()=>this.paint());this.input.on('pointerup',()=>{this.down=null;});}
 orb(x,y,r,c,symbols){
  const style=this.bridge.state.ballStyle||'glass';const key=`marble-${style}-${c}`;
  if(!this.textures.exists(key)){
   const source=document.createElement('canvas');source.width=source.height=512;
   drawMarble(source.getContext('2d'),512,COLORS[c],style);
   const texture=this.textures.createCanvas(key,128,128);
   texture.context.imageSmoothingEnabled=true;texture.context.imageSmoothingQuality='high';
   texture.context.drawImage(source,0,0,128,128);
   texture.refresh();texture.setFilter(Phaser.Textures.FilterMode.LINEAR);
  }
  const shadow=this.add.ellipse(2,r*.91,r*1.5,r*.25,0x173f39,.22);
  const ball=this.add.image(0,0,key).setDisplaySize(r*2.22,r*2.22);
  const items=[shadow,ball];
  if(symbols){const mark=this.add.graphics();mark.lineStyle(Math.max(2,r*.095),0xfff8dc,.94);const d=r*.22;
   if(c===0)mark.strokeCircle(0,r*.14,d);
   if(c===1)mark.strokeRoundedRect(-d,r*.14-d,d*2,d*2,2);
   if(c===3){mark.lineBetween(-d,0,d,r*.28);mark.lineBetween(d,0,-d,r*.28);}if(c===4){mark.lineBetween(-d,r*.14,d,r*.14);mark.lineBetween(0,r*.14-d,0,r*.14+d);}if(c===5){mark.lineBetween(-d,0,d,0);mark.lineBetween(-d,r*.28,d,r*.28);}if(c===2)mark.strokeTriangle(0,r*.14-d*1.2,-d*1.1,r*.14+d,d*1.1,r*.14+d);
   items.push(mark);
  }
  return this.add.container(x,y,items);
 }
 paint(){if(!this.add||this.moving)return;this.tweens.killAll();this.children.removeAll();const {board,selected,symbols,guide,blocked,focus}=this.bridge.state;const density=this.bridge.density||1;const w=this.scale.width/density,h=this.scale.height/density;const {cols,rows,gap,th,r}=boardLayout(w,h,board.length),tw=r*2+22;this.positions=[];this.topOrbs=[];this.tubeVisuals=[];
 board.forEach((tube,i)=>{const visualStart=this.children.list.length;const row=Math.floor(i/cols),count=Math.min(cols,board.length-row*cols),x=w/2+(i%cols-(count-1)/2)*gap,y=(h-rows*(th+90))/2+62+row*(th+90);this.positions.push({x,y,th,r});const g=this.add.graphics();const complete=tube.length===4&&tube.every(c=>c===tube[0]);g.fillStyle(0x294e46,.22);g.fillEllipse(x,y+th+13,tw+22,17);if(complete){g.fillStyle(0x8cffe0,.08);g.fillRoundedRect(x-tw/2-8,y-8,tw+16,th+18,30);}// Layered glass: colored edges, inset wall, rolled lip and weighted base.
 g.fillStyle(0x76a79b,.18);g.fillRoundedRect(x-tw/2,y,tw,th,tw/2);
 g.fillStyle(0xffffff,.28);g.fillRoundedRect(x-tw/2+6,y+5,tw-12,th-12,(tw-12)/2);
 g.lineStyle(3,selected===i?0xcc8a29:complete?0x398b76:0x70978c,.9);
 g.beginPath();g.moveTo(x-tw/2,y+2);g.lineTo(x-tw/2,y+th-tw/2);g.arc(x,y+th-tw/2,tw/2,Math.PI,0,true);g.lineTo(x+tw/2,y+2);g.strokePath();
 g.lineStyle(4,0xffffff,.8);g.lineBetween(x-tw/2+7,y+17,x-tw/2+7,y+th-tw/2-5);
 g.lineStyle(2,0x477d70,.22);g.lineBetween(x+tw/2-6,y+15,x+tw/2-6,y+th-tw/2);
 g.lineStyle(5,0x699b8d,.3);g.beginPath();g.arc(x,y+th-tw/2-3,tw/2-6,.12,Math.PI-.12);g.strokePath();
 g.fillStyle(0xc0d6c9,1);g.fillEllipse(x,y,tw+9,13);g.lineStyle(2,0x658f80,.8);g.strokeEllipse(x,y,tw+9,13);
 g.fillStyle(0x5c8d7e,.28);g.fillEllipse(x,y,tw-5,6);g.lineStyle(2,0xffffff,.95);g.strokeEllipse(x,y-2,tw+5,9);

 tube.forEach((c,j)=>{const cy=y+th-r-9-j*(r*2+4);const o=this.orb(x,cy,r,c,symbols);if(j===tube.length-1)this.topOrbs[i]=o;if(selected===i&&j===tube.length-1){o.y=y-r-14;if(!matchMedia('(prefers-reduced-motion: reduce)').matches)this.tweens.add({targets:o,y:o.y-6,duration:700,yoyo:true,repeat:-1,ease:'Sine.inOut'});}});
 if(complete)this.add.text(x,y+th+26,'✦',{fontSize:'20px',color:'#398b76'}).setOrigin(.5);if(focus===i){g.lineStyle(2,0xffffff,.6);g.strokeEllipse(x,y+th+15,tw+10,15);}
 this.tubeVisuals[i]=this.add.container(0,0,this.children.list.slice(visualStart));
 const zone=this.add.zone(x,y+th/2-15,gap-8,th+55).setInteractive({useHandCursor:true});zone.on('pointerdown',p=>{if(!blocked)this.down={i,x:p.x,y:p.y};});zone.on('pointerup',p=>{const d=this.down;if(blocked||!d)return;if(d.i!==i&&Math.hypot(p.x-d.x,p.y-d.y)>8)this.bridge.transfer(d.i,i);else this.bridge.select(i);this.down=null;});
 });
 if(guide&&!blocked){const target=selected===guide[0]?guide[1]:guide[0],p=this.positions[target];const ring=this.add.circle(p.x,p.y-8,p.r+8,0xffffff,0).setStrokeStyle(3,0xcf8530,.85);const hand=this.add.text(p.x+10,p.y+6,'☝',{fontFamily:'Arial',fontSize:`${Math.max(28,p.r*1.9)}px`,color:'#ffffff',stroke:'#344479',strokeThickness:5}).setOrigin(.3,0);if(!matchMedia('(prefers-reduced-motion: reduce)').matches){this.tweens.add({targets:hand,y:hand.y+15,duration:620,yoyo:true,repeat:-1,ease:'Sine.inOut'});this.tweens.add({targets:ring,scale:1.25,alpha:.2,duration:900,yoyo:true,repeat:-1});}}
 }
 reject(index){
  const tube=this.tubeVisuals?.[index],p=this.positions?.[index];if(!tube||!p)return;
  this.tweens.killTweensOf(tube);tube.x=0;
  if(tube.rejectionFlash){this.tweens.killTweensOf(tube.rejectionFlash);tube.rejectionFlash.destroy();}
  const flash=this.add.graphics();flash.lineStyle(4,0xd95b49,.95);flash.fillStyle(0xef745b,.13);
  flash.fillRoundedRect(p.x-p.r-15,p.y-5,p.r*2+30,p.th+10,p.r+15);
  flash.strokeRoundedRect(p.x-p.r-15,p.y-5,p.r*2+30,p.th+10,p.r+15);
  tube.add(flash);tube.rejectionFlash=flash;
  this.tweens.add({targets:flash,alpha:0,delay:180,duration:240,onComplete:()=>{if(tube.rejectionFlash===flash)tube.rejectionFlash=null;flash.destroy();}});
  if(!matchMedia('(prefers-reduced-motion: reduce)').matches){
   this.tweens.add({targets:tube,x:7,duration:45,yoyo:true,repeat:2,ease:'Sine.inOut',onComplete:()=>{tube.x=0;}});
  }
  const now=performance.now();if(!this.lastVibration||now-this.lastVibration>500){
   try{navigator.vibrate?.([35,25,35]);}catch{}this.lastVibration=now;
  }
 }
 fly(a,z,done){const board=this.bridge.state.board,p=this.positions[a],q=this.positions[z];if(!p||!q){done();return;}this.moving=true;this.topOrbs[a]?.setVisible(false);const o=this.orb(p.x,p.y-p.r-14,p.r,board[a].at(-1),this.bridge.state.symbols);this.tweens.add({targets:o,x:q.x,y:q.y-q.r-20,duration:matchMedia('(prefers-reduced-motion: reduce)').matches?0:220,ease:'Sine.inOut',onComplete:()=>{this.tweens.add({targets:o,y:q.y+q.th-q.r-9-board[z].length*(q.r*2+4),duration:150,ease:'Back.in',onComplete:()=>{o.destroy();this.moving=false;done();}});}});}
}
