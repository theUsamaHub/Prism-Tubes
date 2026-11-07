import React from 'react';
import Crystal from './Crystal';
export function Coin(){return <span className="coin-art" aria-hidden="true"><svg viewBox="0 0 48 48"><circle cx="24" cy="26" r="21" fill="#a76a1b"/><circle cx="24" cy="23" r="21" fill="#efb943" stroke="#fff0a4" strokeWidth="2"/><circle cx="24" cy="23" r="15" fill="#f7cd60" stroke="#c68b24" strokeWidth="2"/><path d="m24 13 9 5v10l-9 5-9-5V18Z" fill="#e9aa31" stroke="#fff0a4" strokeWidth="2"/></svg></span>;}
export default function Results({state,total,time,onContinue}){
 const reward=state.lastReward||{coins:0,crystal:false,stars:state.stars[state.level]||1};
 const collected=Object.keys(state.stars).length;
 return <div className="overlay victory" role="dialog" aria-modal="true" aria-labelledby="result-title">
 <div className="confetti" aria-hidden="true">{Array.from({length:48},(_,i)=><i key={i} style={{'--x':`${(i*37)%100}%`,'--delay':`${(i%8)*.12}s`,'--spin':`${i%2?540:-540}deg`,background:['#e4ad43','#398f7e','#e47851','#f2d892'][i%4]}}/>)}</div>
 <div className="result-wallet"><Coin/><strong>{state.coins||0}</strong><span>YOUR COINS</span></div>
 <div className="reward-panel">
 <div className="ribbon">LEVEL {state.level+1} COMPLETE</div>
 <div className="result-stars" aria-label={`${reward.stars} stars`}>{[1,2,3].map(n=><svg key={n} className={n<=reward.stars?'earned':''} style={{animationDelay:`${n*.15}s`}} viewBox="0 0 100 100" aria-hidden="true"><path d="m50 5 14 28 31 5-23 23 6 32-28-15-28 15 6-32L5 38l31-5Z"/></svg>)}</div>
 <h2 id="result-title">Brilliantly sorted!</h2><p className="result-stats">{state.moves} moves <span>·</span> {time}</p>
 <div className="reward-items"><div><Coin/><strong>+{reward.coins}</strong><span>{reward.coins?'Coins earned':'Best reward already earned'}</span></div><div><span className="reward-crystal"><Crystal variant={state.level}/></span><strong>{reward.crystal?'+1':'Collected'}</strong><span>Garden crystal</span></div></div>
 <div className="garden-progress"><div><span>PRISM GARDEN</span><strong>{collected} / {total} crystals</strong></div><progress value={collected} max={total} aria-label="Prism Garden collection"/><p>{collected===total?'Your first collection is complete!':'Another little piece of your garden.'}</p></div>
 <button className="primary result-continue" autoFocus onClick={onContinue}>{state.level===total-1?'Play again':'Continue →'}</button><span className="reward-saved">Rewards added to your balance</span>
 </div></div>;
}
