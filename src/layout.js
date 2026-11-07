// Reserve headroom for a raised ball, its bob, and the transfer arc.
export function boardLayout(width,height,count){
 let best=null;
 for(let cols=1;cols<=count;cols++){
  const rows=Math.ceil(count/cols),gap=Math.min(150,width/(cols+.35));
  const r=Math.min(29,(height/rows-89)/10.7,(gap-30)/2);
  if(!best||r>best.r)best={cols,rows,gap,r};
 }
 const r=Math.max(2,best.r),th=8.7*r+25,rowHeight=th+2*r+64;
 return {...best,r,th,rowHeight,top:(height-best.rows*rowHeight)/2+2*r+30};
}
