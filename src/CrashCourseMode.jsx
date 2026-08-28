import {useEffect,useState} from 'react'
import {ArrowLeft,ArrowRight,CheckCircle2,Lightbulb,Play,RefreshCw,RotateCcw,XCircle} from 'lucide-react'
import AudioPlayer from './AudioPlayer'
import Part1Image from './Part1Image'
import ExplanationCard from './ExplanationCard'
import {linearStages,synonymPairs,totalLinearQuestions} from './linearCourseData'
import {shuffleArray} from './quizGenerator'

const KEY='toeic-linear-450-v3'
const initial={stage:0,item:0,phase:'theory',finished:false,score:0,sessionIds:[]}
const load=()=>{try{return{...initial,...JSON.parse(localStorage.getItem(KEY))}}catch{return initial}}
const save=value=>localStorage.setItem(KEY,JSON.stringify(value))
const generate=(source,excluded=[])=>{
 const excludedSet=new Set(excluded)
 let available=source.filter(question=>!excludedSet.has(question.id))
 if(available.length<10)available=[...source]
 return shuffleArray(available).slice(0,10).map((question,order)=>{
  const correctText=question.options[question.correctAnswer]
  const options=shuffleArray(question.options)
  const originalIndexByText=new Map(question.options.map((text,index)=>[text,index]))
  return {...question,instanceId:`${question.id}-${Date.now()}-${order}`,options,correctAnswer:options.indexOf(correctText),optionsMeaning:options.map(text=>question.optionsMeaning?.[originalIndexByText.get(text)]),optionExplanations:options.map(text=>question.optionExplanations?.[originalIndexByText.get(text)]||'Đối chiếu lựa chọn này với cấu trúc và ngữ cảnh của câu.')}
 })
}


export default function CrashCourseMode({onExit}){
 const[progress,setProgress]=useState(load),[questions,setQuestions]=useState([]),[selected,setSelected]=useState(null),[showGuide,setShowGuide]=useState(false),[tipOpen,setTipOpen]=useState(true)
 const stage=linearStages[Math.min(progress.stage,linearStages.length-1)]
 const question=questions[progress.item]
 const answered=selected!==null
 const completed=progress.finished?totalLinearQuestions:progress.stage*10+progress.item
 const percent=Math.round(completed/totalLinearQuestions*100)
 const update=next=>{setProgress(next);save(next)}
 const buildTest=()=>{const fresh=generate(stage.pool,progress.sessionIds);setQuestions(fresh);setSelected(null);update({...progress,item:0,phase:'practice',score:0,sessionIds:[...new Set([...progress.sessionIds,...fresh.map(q=>q.id)])]})}
 useEffect(()=>{if(progress.phase==='practice'&&!questions.length){setQuestions(generate(stage.pool,progress.sessionIds))}},[progress.phase,progress.stage,stage.pool,progress.sessionIds,questions.length])

 const choose=index=>{if(answered)return;setSelected(index);if(index===question.correctAnswer)update({...progress,score:progress.score+1})}
 const next=()=>{setSelected(null);if(progress.item<9){update({...progress,item:progress.item+1});return}if(progress.stage<linearStages.length-1){setQuestions([]);update({...progress,stage:progress.stage+1,item:0,phase:'theory',score:0});return}update({...progress,finished:true,phase:'complete'})}
 const restart=()=>{localStorage.removeItem(KEY);setQuestions([]);setSelected(null);setProgress(initial)}

 if(progress.finished)return <main className="crash-course"><section className="course-complete"><span><CheckCircle2/></span><small>HOÀN THÀNH LỘ TRÌNH TUYẾN TÍNH</small><h1>Bạn đã đi hết 5 chặng nền tảng</h1><p>Hãy lặp lại lộ trình để gặp các cách xào đáp án khác và củng cố phản xạ. Điểm mục tiêu không được đảm bảo chỉ bằng mẹo; tiến bộ đến từ luyện đều và xem kỹ câu sai.</p><div className="complete-score"><strong>100%</strong><span>50/50 hoạt động</span></div><button onClick={restart}><RotateCcw/> Học lại từ đầu</button></section></main>

 if(progress.phase==='theory')return <main className="crash-course"><CourseHeader stage={progress.stage} percent={percent} onExit={onExit}/><section className="theory-screen"><span className="step-badge">CHẶNG {progress.stage+1}/5</span><h1>{stage.title}</h1><p>{stage.subtitle}</p><div className="three-rules stage-cheats">{stage.tips.map((tip,index)=><article key={tip.rule}><b>{index+1}</b><div><strong>{tip.rule}</strong><p>{tip.detail}</p><small>Ví dụ: {tip.example}</small></div></article>)}</div>{stage.id==='listening-3-4'&&<div className="synonym-strip">{synonymPairs.slice(0,10).map(pair=><span key={pair[0]}>{pair[0]} = <b>{pair[1]}</b></span>)}</div>}<div className="theory-note"><Lightbulb/><span><strong>Không cần thuộc hết ngay.</strong> Hãy nhớ cách nhận diện; mỗi câu đều mở lời giải và phân tích từng lựa chọn sau khi bấm.</span></div><button className="giant-next" onClick={buildTest}><Play/> Tôi đã thuộc mẹo — Vào làm 10 câu <ArrowRight/></button></section></main>
 if(!question)return <main className="crash-course"><p>Đang xào đề mới…</p></main>

 return <main className="crash-course"><CourseHeader stage={progress.stage} percent={percent} onExit={onExit}/><div className="linear-meta"><span>CHẶNG {progress.stage+1} · CÂU {progress.item+1}/10</span><strong>{stage.title}</strong></div><section className="linear-question"><div className="question-top"><span>{stage.id==='listening-1-2'?'PART 2 CÓ 3 ĐÁP ÁN · PART 1 CÓ 4':'XÀO ĐỀ FISHER–YATES'}</span><div><button onClick={()=>setShowGuide(true)}><Lightbulb/> Xem toàn bộ mẹo</button><button onClick={buildTest}><RefreshCw/> Đổi đề mới</button></div></div>{question.part==='part-1'&&<Part1Image src={question.imageUrl}/>} {question.part!=='part-1'&&question.passage&&<pre className="linear-passage">{question.passage}</pre>}{question.part!=='part-1'&&<h2>{question.question}</h2>}{stage.id.startsWith('listening')&&<AudioPlayer audioUrl={question.audioUrl} text={question.speech||question.transcript||question.question} transcript={question.transcript||question.speech} translation={question.transcriptTranslation||question.vietnameseTranslation} canShowTranscript={answered}/>}<div className="linear-options">{question.options.map((option,index)=>{const correct=answered&&index===question.correctAnswer,wrong=answered&&index===selected&&index!==question.correctAnswer;return <button key={`${question.instanceId}-${index}`} disabled={answered} className={correct?'correct':wrong?'wrong':answered?'dim':''} onClick={()=>choose(index)}><b>{String.fromCharCode(65+index)}</b>{question.part==='part-1'?`Phương án ${String.fromCharCode(65+index)}`:option}{correct&&<CheckCircle2/>}{wrong&&<XCircle/>}</button>})}</div><aside className={`inline-fast-tip ${tipOpen?'open':''}`}><button type="button" aria-expanded={tipOpen} onClick={()=>setTipOpen(value=>!value)}><span>💡 Mẹo phản xạ nhanh cho câu này:</span><b>{tipOpen?'Thu gọn':'Mở xem'}</b></button>{tipOpen&&<p>{question.fastTip||stage.tips[0]?.detail}</p>}</aside>{answered&&<><ExplanationCard isCorrect={selected===question.correctAnswer} selectedAnswer={question.options[selected]} correctAnswer={question.options[question.correctAnswer]} translation={question.vietnameseTranslation} explanation={question.explanation} fastTip={question.fastTip} questionText={question.question} options={question.options} correctIndex={question.correctAnswer} optionsMeaning={question.optionsMeaning}/><section className="option-analysis"><h3>Phân tích từng đáp án A, B, C, D</h3>{question.optionExplanations.map((text,index)=><p className={index===question.correctAnswer?'right':index===selected?'picked':''} key={text}><b>{String.fromCharCode(65+index)}.</b> {text}</p>)}</section></>}</section>{showGuide&&<div className="stage-guide-modal" role="dialog" aria-modal="true" aria-label="Bí kíp của chặng hiện tại" onClick={()=>setShowGuide(false)}><article onClick={event=>event.stopPropagation()}><button className="guide-close" onClick={()=>setShowGuide(false)} aria-label="Đóng">×</button><span>📖 BÍ KÍP {stage.title.toUpperCase()}</span><h2>Đối chiếu mẹo ngay trên câu đang làm</h2>{stage.tips.map((tip,index)=><section key={tip.rule}><b>{index+1}</b><div><strong>{tip.rule}</strong><p>{tip.detail}</p><small>Ví dụ: {tip.example}</small></div></section>)}</article></div>}{answered&&<button className="continuous-next" onClick={next}>{progress.item===9?(progress.stage===4?'Hoàn thành lộ trình':'Sang chặng tiếp theo'):<>Câu tiếp theo <span>👉</span></>}</button>}</main>
}

function CourseHeader({stage,percent,onExit}){return <header className="course-header"><button onClick={onExit}><ArrowLeft/> Trang đầu</button><div className="course-progress"><div><i style={{width:`${percent}%`}}/></div><span>Bạn đã hoàn thành <strong>{percent}%</strong> lộ trình 450+</span></div><div className="step-dots">{linearStages.map((item,index)=><span className={index<stage?'done':index===stage?'active':''} key={item.id}>{index<stage?<CheckCircle2/>:index+1}</span>)}</div></header>}