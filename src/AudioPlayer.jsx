import {useEffect,useMemo,useRef,useState} from 'react'
import {Eye,EyeOff,Gauge,Pause,Play,RotateCcw,Volume2} from 'lucide-react'

const SPEEDS=[.8,1,1.2]

export default function AudioPlayer({audioUrl,text='',transcript='',translation='',canShowTranscript=false,autoPlay=false}){
 const audioRef=useRef(null)
 const[rate,setRate]=useState(1)
 const[playing,setPlaying]=useState(false)
 const[showTranscript,setShowTranscript]=useState(false)
 const voices=useMemo(()=>typeof window==='undefined'||!window.speechSynthesis?[]:window.speechSynthesis.getVoices(),[])
 const stop=()=>{if(audioRef.current)audioRef.current.pause();if('speechSynthesis' in window)window.speechSynthesis.cancel();setPlaying(false)}
 const playSpeech=()=>{
  if(!text||!('speechSynthesis' in window))return
  window.speechSynthesis.cancel()
  const utterance=new SpeechSynthesisUtterance(text)
  utterance.lang='en-US';utterance.rate=rate
  utterance.voice=voices.find(voice=>voice.lang==='en-US')||voices.find(voice=>voice.lang?.startsWith('en'))||null
  utterance.onend=()=>setPlaying(false);utterance.onerror=()=>setPlaying(false)
  setPlaying(true);window.speechSynthesis.speak(utterance)
 }
 const toggle=()=>{
  if(playing){stop();return}
  if(audioUrl&&audioRef.current){audioRef.current.playbackRate=rate;audioRef.current.play();setPlaying(true);return}
  playSpeech()
 }
 useEffect(()=>{if(autoPlay)playSpeech();return()=>{if('speechSynthesis' in window)window.speechSynthesis.cancel()}},[autoPlay,text]) // eslint-disable-line react-hooks/exhaustive-deps
 useEffect(()=>{if(audioRef.current)audioRef.current.playbackRate=rate},[rate])
 useEffect(()=>()=>{if(audioRef.current)audioRef.current.pause();if('speechSynthesis' in window)window.speechSynthesis.cancel()},[audioUrl,text])

 return <section className="audio-player">
  {audioUrl&&<audio ref={audioRef} src={audioUrl} onEnded={()=>setPlaying(false)} onPause={()=>setPlaying(false)} preload="metadata"/>}
  <div className="audio-controls"><button className="audio-main" onClick={toggle}>{playing?<Pause/>:<Play/>}{playing?'Tạm dừng':'Phát đoạn nghe'}</button><button title="Phát lại từ đầu" onClick={()=>{stop();window.setTimeout(toggle,20)}}><RotateCcw/></button><span><Volume2/> {audioUrl?'Audio file':'English TTS'}</span><div className="speed"><Gauge/>{SPEEDS.map(value=><button className={rate===value?'active':''} onClick={()=>setRate(value)} key={value}>{value.toFixed(1)}x</button>)}</div></div>
  {canShowTranscript&&<><button className="transcript-toggle" onClick={()=>setShowTranscript(value=>!value)}>{showTranscript?<EyeOff/>:<Eye/>}{showTranscript?'Ẩn transcript':'Hiện transcript & bản dịch'}</button>{showTranscript&&<div className="audio-transcript"><strong>Transcript</strong><p>{transcript||text}</p>{translation&&<><strong>Dịch nghĩa</strong><p>{translation}</p></>}</div>}</>}
 </section>
}
