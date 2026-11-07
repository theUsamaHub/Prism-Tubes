import test from 'node:test';
import assert from 'node:assert/strict';
import {normalizeRewards,awardCompletion} from './rewards.js';
test('first win awards coins and crystal once, including after reload',()=>{const win=awardCompletion({level:0,stars:{},coins:0},3);assert.equal(win.coins,60);assert.equal(win.lastReward.crystal,true);const replay=awardCompletion(JSON.parse(JSON.stringify(win)),3);assert.equal(replay.coins,60);assert.equal(replay.lastReward.coins,0);assert.equal(replay.lastReward.crystal,false);});
test('only improved stars pay on replay',()=>{const first=awardCompletion({level:0,stars:{},coins:0},1);const improved=awardCompletion(first,3);assert.equal(improved.lastReward.coins,20);assert.equal(improved.coins,60);assert.equal(awardCompletion(improved,1).coins,60);});
test('old saves receive earned coins exactly once',()=>{const s=normalizeRewards({stars:{0:3,1:2}});assert.equal(s.coins,110);assert.deepEqual(normalizeRewards(s),s);});
test('different levels accumulate rewards',()=>{const a=awardCompletion({level:0,stars:{},coins:0},3);const b=awardCompletion({...a,level:1},2);assert.equal(b.coins,110);});
