export const STYLES=[{id:'glass',name:'Glass marbles',price:0},{id:'gems',name:'Cut gemstones',price:150},{id:'candy',name:'Swirl candies',price:300}];
export function purchaseStyle(state,id){
 const item=STYLES.find(s=>s.id===id);if(!item)return state;
 const owned=state.ownedStyles||['glass'];
 if(owned.includes(id))return {...state,ballStyle:id};
 if(!Number.isSafeInteger(state.coins)||state.coins<item.price)return state;
 return {...state,coins:state.coins-item.price,ownedStyles:[...owned,id],ballStyle:id};
}
