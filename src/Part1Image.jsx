import {Maximize2,X} from 'lucide-react'
import {useEffect,useState} from 'react'

const FALLBACKS=[
 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=1000&auto=format&fit=crop&q=85',
 'https://images.unsplash.com/photo-1497215728101-856f4ea42174?w=1000&auto=format&fit=crop&q=85',
]
export default function Part1Image({src,image}){
 const[zoomed,setZoomed]=useState(false)
 const[fallbackIndex,setFallbackIndex]=useState(-1)
 const requested=src||image||FALLBACKS[0]
 const displayed=fallbackIndex<0?requested:FALLBACKS[Math.min(fallbackIndex,FALLBACKS.length-1)]
 useEffect(()=>setFallbackIndex(-1),[requested])
 const recover=()=>setFallbackIndex(value=>Math.min(value+1,FALLBACKS.length-1))
 return <><figure className="part1-photo"><img src={displayed} alt="TOEIC Part 1" onError={recover}/><button type="button" onClick={()=>setZoomed(true)}><Maximize2/> Phóng to ảnh</button></figure>{zoomed&&<div className="part1-lightbox" role="dialog" aria-modal="true" aria-label="Ảnh Part 1 phóng to" onClick={()=>setZoomed(false)}><button onClick={()=>setZoomed(false)} aria-label="Đóng ảnh"><X/></button><img src={displayed} alt="TOEIC Part 1 phóng to" onError={recover} onClick={event=>event.stopPropagation()}/></div>}</>
}