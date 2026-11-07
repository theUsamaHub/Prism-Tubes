import React,{useId} from 'react';
const palettes=[['#edfff6','#91edca','#29a88b','#08574e'],['#edfaff','#9dd6f1','#3c8dc1','#173e69'],['#fff8d7','#f3d47d','#c48b2c','#754519'],['#fff0ed','#f6b39e','#d27460','#7c3d38'],['#f7ffe8','#c5de8a','#7ca640','#3f632c']];
export default function Crystal({variant=0}){
 const id=useId().replace(/:/g,''),[light,mid,base,dark]=palettes[variant%palettes.length];
 return <svg className="crystal-art" viewBox="0 0 120 150" aria-hidden="true">
 <defs><linearGradient id={`${id}body`} x1="0" y1="0" x2="1" y2=".7"><stop stopColor={light}/><stop offset=".35" stopColor={mid}/><stop offset=".67" stopColor={base}/><stop offset="1" stopColor={dark}/></linearGradient><linearGradient id={`${id}face`} x1="0" y1="0" x2=".8" y2="1"><stop stopColor={light}/><stop offset=".4" stopColor={mid}/><stop offset="1" stopColor={base}/></linearGradient><radialGradient id={`${id}shadow`}><stop stopColor="#234d3e" stopOpacity=".25"/><stop offset="1" stopColor="#234d3e" stopOpacity="0"/></radialGradient></defs>
 <ellipse cx="61" cy="136" rx="52" ry="11" fill={`url(#${id}shadow)`}/>
 <g transform="rotate(-16 34 103)"><path d="M16 81 30 61 45 78 47 125 31 136 17 124Z" fill={`url(#${id}body)`}/><path d="m30 61 1 28-15-8Z" fill={light}/><path d="m31 89 14-11 2 47-16 11Z" fill={dark} opacity=".6"/><path d="m17 83 5 4 1 36-5-2Z" fill="white" opacity=".55"/></g>
 <g transform="rotate(18 89 102)"><path d="m74 74 17-23 15 21-2 56-16 9-15-14Z" fill={`url(#${id}body)`}/><path d="m91 51-3 35-14-12Z" fill={light}/><path d="m88 86 18-14-2 56-16 9Z" fill={dark} opacity=".45"/></g>
 <path d="M38 43 61 9 86 39 84 119 61 137 38 118Z" fill={`url(#${id}body)`}/>
 <path d="m61 9-4 51-19-17Z" fill={light}/><path d="m61 9 25 30-29 21Z" fill={mid}/>
 <path d="m38 43 19 17 4 77-23-19Z" fill={`url(#${id}face)`}/><path d="m57 60 29-21-2 80-23 18Z" fill={dark} opacity=".52"/>
 <path d="m58 61 17-12-8 69-6 19Z" fill={light} opacity=".3"/>
 <path d="m40 48 5 5 0 57-4-3Z" fill="white" opacity=".8"/>
 <path d="m61 10-4 50 4 76M39 43l18 17 28-21" fill="none" stroke={light} strokeWidth="1.2" opacity=".8"/>
 <path d="m43 80 18-8 15 11-13 18-21-5Z" fill={light} opacity=".13"/>
 <path d="m61 9 3 13 11 3-11 2-3 12-2-12-10-2 10-3Z" fill="white" opacity=".9"/>
 </svg>;
}
