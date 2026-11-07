import generatedLevels from './generated-levels.js';
export const CAPACITY=4;
export const clone=b=>b.map(t=>[...t]);
export function canMove(b,a,z){return a!==z && !!b[a]?.length && !!b[z] && b[z].length<CAPACITY && (!b[z].length || b[z].at(-1)===b[a].at(-1));}
export function move(b,a,z){if(!canMove(b,a,z))return null;const n=clone(b);n[z].push(n[a].pop());return n;}
export const solved=b=>b.every(t=>!t.length||(t.length===CAPACITY&&t.every(c=>c===t[0])));
// Each authored introduction includes an independently replayed solution witness.
export const LEVELS=[
 {board:[[0,0,0],[1,1,1,0],[2,2,2,2],[1],[]],path:[[1,0],[3,1]]},
 {board:[[0,0,0,1],[1,1,1],[2,2,2,0],[2],[]],path:[[0,1],[2,0],[3,2]]},
 {board:[[0,0,1,1],[1,1,2,2],[2,2,0,0],[],[]],path:[[0,3],[0,3],[2,0],[2,0],[1,2],[1,2],[3,1],[3,1]]},
 {board:[[0,0,0,2],[1,1,0,2],[2,2,1,1],[],[]],path:[[0,3],[1,3],[1,0],[2,1],[2,1],[3,2],[3,2]]},
 {board:[[0,0,1,2],[1,1,2,0],[2,2,0,1],[],[]],path:[[0,3],[1,4],[2,0],[2,4],[1,3],[0,1],[0,1],[4,0],[4,0],[3,2],[3,2]]}
,...generatedLevels];
