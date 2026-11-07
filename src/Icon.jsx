import React from 'react';
const paths={
 pause:<><path d="M8 5v14M16 5v14"/></>,
 undo:<><path d="m9 5-5 5 5 5M4 10h9a6 6 0 0 1 6 6v3"/></>,
 restart:<><path d="M5 9a8 8 0 1 1-1 7M5 3v6h6"/></>,
 tube:<><path d="M8 3h8M9 3v14a3 3 0 0 0 6 0V3M9 12h6M3 5v6M0 8h6"/></>,
 crystal:<><path d="m12 2 7 7-2 10-5 3-5-3L5 9Z M12 2v20M5 9l7 4 7-4"/></>
};
export default function Icon({name}){return <svg className="icon" viewBox="-2 0 28 24" fill="none" stroke="currentColor" strokeWidth="2.3" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">{paths[name]||paths.crystal}</svg>;}
