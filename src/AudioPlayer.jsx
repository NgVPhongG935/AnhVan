import {useCallback,useEffect,useRef,useState} from 'react'
import {Eye,EyeOff,Gauge,Pause,Play,RotateCcw,Volume2} from 'lucide-react'

const NORMAL_SPEEDS=[.8,1,1.2]
const PART1_SPEEDS=[.8,.88,1,1.2]
const PART1_PAUSE_MS=1800
const PREFERRED_VOICES=['Google US English','Samantha','Microsoft David','Microsoft Zira']
const stripOptionLabel=value=>String(value||'').replace(/^\s*[A-D][.)]\s*/i,'').trim()

function chooseEnglishVoice(voices){
 for(const preferred of PREFERRED_VOICES){
  const voice=voices.find(item=>item.name.toLowerCase().includes(preferred.toLowerCase()))
  if(voice)return voice
 }
 return voices.find(item=>item.lang?.toLowerCase()==='en-us')
  ||voices.find(item=>item.lang?.toLowerCase().startsWith('en'))
  ||null
}

export default function AudioPlayer({audioUrl,text='',transcript='',translation='',canShowTranscript=false,autoPlay=false,part1Options=null}){
 const audioRef=useRef(null)
 const runIdRef=useRef(0)
 const pauseTimerRef=useRef(null)
 const isPart1=Array.isArray(part1Options)&&part1Options.length>0
 const[rate,setRate]=useState(isPart1?.88:1)
 const[playing,setPlaying]=useState(false)
 const[showTranscript,setShowTranscript]=useState(false)
 const[voices,setVoices]=useState([])

 useEffect(()=>{
  if(!('speechSynthesis' in window))return undefined
  const loadVoices=()=>setVoices(window.speechSynthesis.getVoices())
  loadVoices()
  window.speechSynthesis.addEventListener?.('voiceschanged',loadVoices)
  return()=>window.speechSynthesis.removeEventListener?.('voiceschanged',loadVoices)
 },[])

 const stop=useCallback(()=>{
  runIdRef.current+=1
  if(pauseTimerRef.current)window.clearTimeout(pauseTimerRef.current)
  pauseTimerRef.current=null
  if(audioRef.current){audioRef.current.pause();audioRef.current.currentTime=0}
  if('speechSynthesis' in window)window.speechSynthesis.cancel()
  setPlaying(false)
 },[])

 const waitForPause=useCallback((milliseconds,runId)=>new Promise(resolve=>{
  pauseTimerRef.current=window.setTimeout(()=>{
   pauseTimerRef.current=null
   resolve(runId===runIdRef.current)
  },milliseconds)
 }),[])

 const speakOnce=useCallback((speechText,speechRate,runId)=>new Promise(resolve=>{
  if(!speechText||!('speechSynthesis' in window)||runId!==runIdRef.current){resolve(false);return}
  const utterance=new SpeechSynthesisUtterance(speechText)
  utterance.lang='en-US'
  utterance.rate=speechRate
  utterance.pitch=1
  utterance.voice=chooseEnglishVoice(voices)
  utterance.onend=()=>resolve(runId===runIdRef.current)
  utterance.onerror=()=>resolve(false)
  window.speechSynthesis.speak(utterance)
 }),[voices])

 const playSpeech=useCallback(async()=>{
  if((!text&&!isPart1)||!('speechSynthesis' in window))return
  window.speechSynthesis.cancel()
  const runId=runIdRef.current+1
  runIdRef.current=runId
  setPlaying(true)
  if(isPart1){
   for(let index=0;index<part1Options.length;index+=1){
    if(runId!==runIdRef.current)break
    const optionText=stripOptionLabel(part1Options[index])
    const completed=await speakOnce(`${String.fromCharCode(65+index)}. ${optionText}`,.88,runId)
    if(!completed||runId!==runIdRef.current)break
    if(index<part1Options.length-1){
     const stillActive=await waitForPause(PART1_PAUSE_MS,runId)
     if(!stillActive)break
    }
   }
  }else{
   await speakOnce(text,rate,runId)
  }
  if(runId===runIdRef.current)setPlaying(false)
 },[isPart1,part1Options,rate,speakOnce,text,waitForPause])

 const toggle=()=>{
  if(playing){stop();return}
  if(audioUrl&&audioRef.current){
   audioRef.current.playbackRate=isPart1?.88:rate
   audioRef.current.play()
   setPlaying(true)
   return
  }
  playSpeech()
 }

 useEffect(()=>{if(autoPlay)playSpeech();return stop},[autoPlay,playSpeech,stop])
 useEffect(()=>{if(audioRef.current)audioRef.current.playbackRate=isPart1?.88:rate},[isPart1,rate])
 useEffect(()=>stop,[audioUrl,text,part1Options,stop])

 const speeds=isPart1?PART1_SPEEDS:NORMAL_SPEEDS
 return <section className="audio-player">
  {audioUrl&&<audio ref={audioRef} src={audioUrl} onEnded={()=>setPlaying(false)} onPause={()=>setPlaying(false)} preload="metadata"/>}
  <div className="audio-controls"><button type="button" className="audio-main" onClick={toggle}>{playing?<Pause/>:<Play/>}{playing?'Tạm dừng':'Phát đoạn nghe'}</button><button type="button" title="Phát lại từ đầu" onClick={()=>{stop();window.setTimeout(playSpeech,20)}}><RotateCcw/></button><span><Volume2/> {audioUrl?'Audio file':'English TTS'}</span><div className="speed"><Gauge/>{speeds.map(value=><button type="button" className={rate===value?'active':''} onClick={()=>setRate(value)} key={value}>{value.toFixed(value===.88?2:1)}x</button>)}</div></div>
  {isPart1&&<small className="audio-part1-note">Part 1: tốc độ chuẩn 0.88x · nghỉ 1.8 giây giữa các đáp án</small>}
  {canShowTranscript&&<><button type="button" className="transcript-toggle" onClick={()=>setShowTranscript(value=>!value)}>{showTranscript?<EyeOff/>:<Eye/>}{showTranscript?'Ẩn transcript':'Hiện transcript & bản dịch'}</button>{showTranscript&&<div className="audio-transcript"><strong>Transcript</strong><p>{transcript||text}</p>{translation&&<><strong>Dịch nghĩa</strong><p>{translation}</p></>}</div>}</>}
 </section>
}
