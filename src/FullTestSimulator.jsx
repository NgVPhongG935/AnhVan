import {useEffect,useMemo,useState} from 'react'
import {ArrowLeft,ArrowRight,CheckCircle2,Clock3,Flag,RotateCcw,Trophy,XCircle} from 'lucide-react'
import ListeningQuestion,{ListeningReview} from './ListeningQuestion'
import ExplanationCard from './ExplanationCard'
import {legacyQuestionBank as fullQuestionBank} from './data/toeicData'
import {shuffleArray} from './quizGenerator'

const CONFIG={
 mini:{name:'Mini Full Test 50 câu',seconds:35*60,allocation:{'part-1':3,'part-2':7,'part-3':9,'part-4':6,'part-5':8,'part-6':4,'part-7':13}},
 full:{name:'Full Test 200 câu',seconds:120*60,allocation:{'part-1':6,'part-2':25,'part-3':39,'part-4':30,'part-5':30,'part-6':16,'part-7':54}},
}
const listeningParts=new Set(['part-1','part-2','part-3','part-4'])
const createInstances=(part,count)=>{
 const pool=fullQuestionBank[part]||[],instances=[]
 const blockOrder=()=>{
  if(!['part-3','part-4'].includes(part))return shuffleArray(pool)
  const groups=Object.values(pool.reduce((result,question)=>{const key=question.groupId||question.id;(result[key]||=[]).push(question);return result},{}))
  return shuffleArray(groups).flatMap(group=>group)
 }
 while(instances.length<count){for(const question of blockOrder()){if(instances.length>=count)break;const correctText=question.options[question.correctAnswer],options=shuffleArray(question.options),originalIndex=new Map(question.options.map((text,index)=>[text,index]));instances.push({...question,part,options,optionsMeaning:options.map(text=>question.optionsMeaning?.[originalIndex.get(text)]),optionTranslations:options.map(text=>question.optionTranslations?.[originalIndex.get(text)]),correctAnswer:options.indexOf(correctText),instanceId:`${part}-${instances.length}-${Date.now()}-${Math.random()}`})}}
 return instances
}
const createTest=mode=>Object.entries(CONFIG[mode].allocation).flatMap(([part,count])=>createInstances(part,count))
const scoreFromRaw=(correct,total)=>Math.max(5,Math.min(495,Math.round((5+correct/total*490)/5)*5))
const titleFor=total=>total>=730?'Nền tảng rất tốt':total>=550?'Đạt mốc tham khảo 550+':total>=450?'Đã chạm mục tiêu 450+':'Cần củng cố lại các Part yếu'

export default function FullTestSimulator({onExit}){
 const[mode,setMode]=useState(null),[questions,setQuestions]=useState([]),[answers,setAnswers]=useState({}),[index,setIndex]=useState(0),[remaining,setRemaining]=useState(0),[finished,setFinished]=useState(false),[review,setReview]=useState(false)
 const question=questions[index]
 const start=selectedMode=>{setMode(selectedMode);setQuestions(createTest(selectedMode));setAnswers({});setIndex(0);setRemaining(CONFIG[selectedMode].seconds);setFinished(false);setReview(false)}
 const submit=()=>setFinished(true)
 useEffect(()=>{if(!mode||finished)return;const timer=window.setInterval(()=>setRemaining(value=>{if(value<=1){window.clearInterval(timer);setFinished(true);return 0}return value-1}),1000);return()=>window.clearInterval(timer)},[mode,finished])
 const result=useMemo(()=>{
  const rows=questions.map((item,i)=>({...item,selected:answers[i],correct:answers[i]===item.correctAnswer}))
  const listening=rows.filter(row=>listeningParts.has(row.part)),reading=rows.filter(row=>!listeningParts.has(row.part))
  const listeningCorrect=listening.filter(row=>row.correct).length,readingCorrect=reading.filter(row=>row.correct).length
  const byPart=Object.keys(CONFIG[mode]?.allocation||{}).map(part=>{const partRows=rows.filter(row=>row.part===part),correct=partRows.filter(row=>row.correct).length,unanswered=partRows.filter(row=>row.selected===undefined).length;return{part,correct,wrong:partRows.length-correct-unanswered,unanswered,total:partRows.length}})
  const listeningScore=scoreFromRaw(listeningCorrect,listening.length||1),readingScore=scoreFromRaw(readingCorrect,reading.length||1)
  const unanswered=rows.filter(row=>row.selected===undefined).length,correct=listeningCorrect+readingCorrect
  return{rows,listeningCorrect,readingCorrect,listeningTotal:listening.length,readingTotal:reading.length,listeningScore,readingScore,total:listeningScore+readingScore,correct,wrong:rows.length-correct-unanswered,unanswered,byPart}
 },[answers,mode,questions])

 if(!mode)return <main className="simulator-page"><header className="ecosystem-head"><button onClick={onExit}><ArrowLeft/> Trang chủ</button><div><span>PHÒNG THI THỬ</span><h1>TOEIC Full Test Simulator</h1><p>Điểm quy đổi chỉ là ước lượng luyện tập; ETS không công bố một công thức tuyến tính cố định cho mọi mã đề.</p></div></header><section className="test-modes"><button onClick={()=>start('mini')}><Clock3/><small>LÀM NHANH</small><h2>Mini Full Test 50 câu</h2><p>35 phút · 25 Listening + 25 Reading</p><strong>Bắt đầu thi <ArrowRight/></strong></button><button onClick={()=>start('full')}><Trophy/><small>ĐÚNG CẤU TRÚC SỐ CÂU</small><h2>Full Test 200 câu</h2><p>120 phút · Listening 45 phút + Reading 75 phút</p><strong>Bắt đầu thi <ArrowRight/></strong></button></section></main>
 if(finished&&!review)return <main className="simulator-page"><section className="test-result"><Trophy/><small>KẾT QUẢ ƯỚC LƯỢNG</small><h1>{result.total}<span>/990</span></h1><h2>{titleFor(result.total)}</h2><div className="answer-summary"><span>✓ Đúng <b>{result.correct}</b></span><span>✕ Sai <b>{result.wrong}</b></span><span>— Bỏ trống <b>{result.unanswered}</b></span></div><div className="score-pair"><article><b>{result.listeningScore}/495</b><span>Listening · {result.listeningCorrect}/{result.listeningTotal} đúng</span></article><article><b>{result.readingScore}/495</b><span>Reading · {result.readingCorrect}/{result.readingTotal} đúng</span></article></div><div className="part-stats">{result.byPart.map(row=><div key={row.part}><span>{row.part.replace('-',' ').toUpperCase()}</span><b>{row.correct}/{row.total}</b><small>{row.wrong} sai · {row.unanswered} trống</small><i><em style={{width:`${row.correct/row.total*100}%`}}/></i></div>)}</div><div className="result-actions"><button onClick={()=>setReview(true)}>Xem lại toàn bộ bài thi</button><button onClick={()=>start(mode)}><RotateCcw/> Tạo đề mới</button><button onClick={onExit}>Về trang chủ</button></div></section></main>
 if(review)return <main className="simulator-page"><header className="module-toolbar"><button onClick={()=>setReview(false)}><ArrowLeft/> Kết quả</button><span>REVIEW {questions.length} CÂU</span></header><section className="review-list">{result.rows.map((item,i)=><article key={item.instanceId} className={item.correct?'review-correct':'review-wrong'}><header>{item.correct?<CheckCircle2/>:<XCircle/>}<b>Câu {i+1} · {item.part.toUpperCase()}</b></header>{listeningParts.has(item.part)?<ListeningReview question={item} isCorrect={item.correct} selected={item.selected}/>:<>{item.passage&&<pre>{item.passage}</pre>}<h3>{item.question}</h3><p>Bạn chọn: <b>{item.selected===undefined?'Bỏ trống':item.options[item.selected]}</b></p><p>Đáp án đúng: <b>{item.options[item.correctAnswer]}</b></p><ExplanationCard isCorrect={item.correct} selectedAnswer={item.selected===undefined?'Bỏ trống':item.options[item.selected]} correctAnswer={item.options[item.correctAnswer]} translation={item.vietnameseTranslation} explanation={item.explanation} fastTip={item.fastTip} questionText={item.question} options={item.options} correctIndex={item.correctAnswer} optionsMeaning={item.optionsMeaning}/></>}</article>)}</section></main>
 if(!question)return null
 const selected=answers[index]
 const grouped=['part-3','part-4'].includes(question.part)
 const groupEntries=grouped?questions.map((item,questionIndex)=>({question:item,index:questionIndex})).filter(entry=>entry.question.groupId===question.groupId):[]
 const groupIndexes=groupEntries.map(entry=>entry.index)
 const previousIndex=grouped?Math.max(0,Math.min(...groupIndexes)-1):Math.max(0,index-1)
 const nextIndex=grouped?Math.max(...groupIndexes)+1:index+1
 const atEnd=nextIndex>=questions.length
 const answerListening=(option,targetIndex=index)=>setAnswers(old=>({...old,[targetIndex]:option}))
 return <main className="simulator-page"><header className="test-running"><button onClick={onExit}><ArrowLeft/> Thoát</button><div><span>{CONFIG[mode].name} · Câu {index+1}/{questions.length}</span><i><em style={{width:`${(index+1)/questions.length*100}%`}}/></i></div><strong className={remaining<300?'urgent':''}><Clock3/>{String(Math.floor(remaining/60)).padStart(2,'0')}:{String(remaining%60).padStart(2,'0')}</strong><button onClick={submit}><Flag/> Nộp bài</button></header><section className="exam-question">{listeningParts.has(question.part)?<ListeningQuestion question={question} groupEntries={groupEntries} answers={{...answers,current:selected,currentIndex:index}} onAnswer={answerListening}/>:<><span>{question.part.toUpperCase()}</span>{question.passage&&<pre>{question.passage}</pre>}<h1>{question.question}</h1><div className="exam-options">{question.options.map((option,i)=><button className={selected===i?'selected':''} onClick={()=>setAnswers(old=>({...old,[index]:i}))} key={i}><b>{String.fromCharCode(65+i)}</b><span>{option}</span></button>)}</div></>}<footer><button disabled={index===0} onClick={()=>setIndex(previousIndex)}><ArrowLeft/> Trước</button><button onClick={()=>atEnd?submit():setIndex(nextIndex)}>{atEnd?'Nộp bài':'Tiếp'} <ArrowRight/></button></footer></section></main>
}
