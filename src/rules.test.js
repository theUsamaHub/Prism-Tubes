import test from 'node:test';
import assert from 'node:assert/strict';
import {LEVELS,move,solved,canMove} from './rules.js';
for(const [i,l] of LEVELS.entries())test(`level ${i+1} has a legal complete solution`,()=>{let b=l.board;assert.equal(solved(b),false);for(const [a,z] of l.path){b=move(b,a,z);assert.ok(b);}assert.ok(solved(b));});
test('illegal moves preserve input',()=>{const b=[[0],[1],[],[0,0,0,0]];assert.equal(canMove(b,0,1),false);assert.equal(canMove(b,0,3),false);assert.equal(canMove(b,0,0),false);assert.equal(move(b,2,0),null);assert.deepEqual(b,[[0],[1],[],[0,0,0,0]]);});
