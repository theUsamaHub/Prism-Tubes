// Best-star records are the reward ledger: a completion can only pay once.
export function normalizeRewards(state){
 const stars=Object.fromEntries(Object.entries(state.stars||{}).filter(([k,v])=>/^\d+$/.test(k)&&Number.isInteger(v)&&v>=1&&v<=3));
 const earned=Object.values(stars).reduce((sum,n)=>sum+30+n*10,0);
 return {...state,stars,coins:Number.isSafeInteger(state.coins)&&state.coins>=0?state.coins:earned};
}
export function awardCompletion(state,rating){
 const s=normalizeRewards(state),previous=s.stars[s.level]||0,best=Math.max(previous,rating);
 const reward=(previous===0?30:0)+(best-previous)*10;
 return {...s,coins:s.coins+reward,stars:{...s.stars,[s.level]:best},lastReward:{coins:reward,crystal:previous===0,stars:rating}};
}
