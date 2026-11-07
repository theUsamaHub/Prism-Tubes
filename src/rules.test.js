import test from 'node:test';
import assert from 'node:assert/strict';
import {LEVELS,move,solved,canMove} from './rules.js';
for(const [i,l] of LEVELS.entries())test(`level ${i+1} has a legal complete solution`,()=>{let b=l.board;assert.equal(solved(b),false);for(const [a,z] of l.path){b=move(b,a,z);assert.ok(b);}assert.ok(solved(b));});
test('illegal moves preserve input',()=>{const b=[[0],[1],[],[0,0,0,0]];assert.equal(canMove(b,0,1),false);assert.equal(canMove(b,0,3),false);assert.equal(canMove(b,0,0),false);assert.equal(move(b,2,0),null);assert.deepEqual(b,[[0],[1],[],[0,0,0,0]]);});
test('campaign has 30 distinct valid boards with four balls per color',()=>{assert.equal(LEVELS.length,30);const seen=new Set();for(const {board} of LEVELS){const key=board.map(t=>t.join(',')).sort().join('|');assert.equal(seen.has(key),false);seen.add(key);assert.ok(board.every(t=>t.length<=4));for(const color of new Set(board.flat()))assert.equal(board.flat().filter(c=>c===color).length,4);}});
