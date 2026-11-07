import fs from 'node:fs';
let seed=82417;const random=()=>{seed=(Math.imul(seed,1664525)+1013904223)>>>0;return seed/4294967296;};
const levels=[],seen=new Set();
for(let index=5;index<60;index++){
 const colors=index<10?3:index<17?4:index<24?5:6;
 for(let attempt=0;attempt<500;attempt++){
  const board=Array.from({length:colors+2},(_,i)=>i<colors?Array(4).fill(i):[]),history=[];
  const visited=new Set([JSON.stringify(board)]);
  for(let step=0;step<18+(index-5)*3;step++){
   const options=[];
   for(let a=0;a<board.length;a++)for(let b=0;b<board.length;b++){
    if(a===b||!board[a].length||board[b].length===4)continue;
    const c=board[a].at(-1);
    if(board[a].length>1&&board[a].at(-2)!==c)continue;
    const next=board.map(t=>[...t]);next[b].push(next[a].pop());
    if(visited.has(JSON.stringify(next)))continue;
    options.push({a,b,next,weight:board[b].length&&board[b].at(-1)!==c?4:1});
   }
   if(!options.length)break;
   let pick=random()*options.reduce((n,o)=>n+o.weight,0),o=options.at(-1);
   for(const candidate of options){pick-=candidate.weight;if(pick<=0){o=candidate;break;}}
   board.splice(0,board.length,...o.next);visited.add(JSON.stringify(board));history.push([o.b,o.a]);
  }
  const mixed=board.filter(t=>new Set(t).size>1).length;
  const transitions=board.reduce((sum,t)=>sum+t.slice(1).filter((c,i)=>c!==t[i]).length,0);
  if(index>=30&&transitions<8)continue;
  const key=board.map(t=>t.join(',')).sort().join('|');
  if(mixed<Math.min(colors,2+Math.floor(index/12))||seen.has(key))continue;
  seen.add(key);levels.push({board,path:history.reverse()});break;
 }
 if(levels.length!==index-4)throw new Error(`Could not generate level ${index+1}`);
}
fs.writeFileSync('src/generated-levels.js','// Frozen, seeded reverse-shuffle puzzles with legal solution witnesses.\nexport default '+JSON.stringify(levels,null,2)+';\n');
console.log(`Generated ${levels.length} levels`);
