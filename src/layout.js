// Choose the tube arrangement that produces the largest balls in the available area.
export function boardLayout(width,height,count){
 let best=null;
 for(let cols=1;cols<=count;cols++){
  const rows=Math.ceil(count/cols),gap=Math.min(150,width/(cols+.35));
  const th=Math.min(285,(height-12)/rows-90);
  const r=Math.min(29,(th-25)/8.7,(gap-30)/2);
  if(!best||r>best.r)best={cols,rows,gap,th,r};
 }
 const r=Math.max(2,best.r);return {...best,r,th:Math.max(45,8.7*r+25)};
}
