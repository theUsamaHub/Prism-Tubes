import React,{useState} from 'react';
import Crystal from './Crystal';
export default function Garden({stars,onClose}){
 const [page,setPage]=useState(0),keys=Object.keys(stars).sort((a,b)=>Number(a)-Number(b)),pages=Math.max(1,Math.ceil(keys.length/6));
 return <div className="overlay garden-screen" role="dialog" aria-modal="true" aria-labelledby="garden-title"><span className="eyebrow">YOUR PRISM GARDEN</span><h2 id="garden-title">Your crystal collection</h2><div className="garden-grid">{keys.length?keys.slice(page*6,page*6+6).map(k=><div className="crystal-display" key={k}><Crystal variant={Number(k)}/><span>Level {Number(k)+1}</span></div>):<p>Complete a level to collect your first crystal.</p>}</div><nav className="garden-pages" aria-label="Collection pages"><button disabled={page===0} onClick={()=>setPage(p=>p-1)} aria-label="Previous page">←</button><span>{page+1} / {pages}</span><button disabled={page>=pages-1} onClick={()=>setPage(p=>p+1)} aria-label="Next page">→</button></nav><button className="primary" autoFocus onClick={onClose}>Back to game</button></div>;
}
