import {useMemo,useState} from 'react'
import {ArrowLeft,ArrowRight,BookOpen,CheckCircle2,Lightbulb,RefreshCw,Volume2,X,XCircle} from 'lucide-react'
import ExplanationCard from './ExplanationCard'
import Part1Image from './Part1Image'
import {studyModules} from './fullToeicData'
import {legacyQuestionBank as fullQuestionBank} from './data/toeicData'
import {shuffleArray} from './quizGenerator'

const LETTERS=['A','B','C','D']
const generate=(pool,count=10,excluded=[])=>{
 const excludedSet=new Set(excluded)
 let candidates=pool.filter(item=>!excludedSet.has(item.id))
 if(candidates.length<Math.min(count,pool.length))candidates=[...pool]
 return shuffleArray(candidates).slice(0,count).map((question,order)=>{
  const correctText=question.options[question.correctAnswer]
  const options=shuffleArray(question.options)
  return {...question,instanceId:`${question.id}-${Date.now()}-${order}`,options,correctAnswer:options.indexOf(correctText)}
 })
}
const speak=text=>{if(!('speechSynthesis' in window))return;window.speechSynthesis.cancel();const voice=new SpeechSynthesisUtterance(text);voice.lang='en-US';voice.rate=.86;window.speechSynthesis.speak(voice)}

export default function FullPartStudy({onExit}){
 const[moduleId,setModuleId]=useState(null),[phase,setPhase]=useState('map'),[questions,setQuestions]=useState([]),[index,setIndex]=useState(0),[selected,setSelected]=useState(null),[answered,setAnswered]=useState(false),[seen,setSeen]=useState([]),[score,setScore]=useState(0),[showTip,setShowTip]=useState(false)
 const module=useMemo(()=>studyModules.find(item=>item.id===moduleId),[moduleId]),question=questions[index]
 const openModule=id=>{setModuleId(id);setPhase('theory');setQuestions([]);setSeen([]);setScore(0)}
 const newTest=()=>{const next=generate(fullQuestionBank[moduleId]||[],10,seen);setQuestions(next);setSeen(old=>[...new Set([...old,...next.map(q=>q.id)])]);setIndex(0);setSelected(null);setAnswered(false);setScore(0);setShowTip(false);setPhase('practice')}
 const choose=option=>{if(answered)return;setSelected(option);setAnswered(true);if(option===question.correctAnswer)setScore(value=>value+1)}
 const next=()=>{if(index===questions.length-1){setPhase('result');return}setIndex(value=>value+1);setSelected(null);setAnswered(false);setShowTip(false)}

 if(phase==='map')return <main className="study-map-page"><header className="ecosystem-head"><button onClick={onExit}><ArrowLeft/> Trang chủ</button><div><span>BẢN ĐỒ CHIẾN THUẬT</span><h1>7 Part TOEIC: học mẹo trước, làm đề sau</h1><p>Mỗi module: lý thuyết bình dân → 10 câu xào đề → lời giải tiếng Việt tức thì.</p></div></header><section className="module-grid">{studyModules.map(item=><button key={item.id} className={`module-card ${item.skill.toLowerCase()}`} onClick={()=>openModule(item.id)}><small>{item.skill}</small><strong>{item.part}</strong><h2>{item.title}</h2><p>{item.subtitle}</p><span>{item.format}</span><em>Học module <ArrowRight/></em></button>)}</section></main>
 if(phase==='theory')return <main className="study-map-page"><header className="module-toolbar"><button onClick={()=>setPhase('map')}><ArrowLeft/> Bản đồ 7 Part</button><span>{module.format}</span></header><section className="module-theory"><span>{module.skill} · {module.part}</span><h1>{module.title}</h1><p>{module.subtitle}</p><div>{module.tips.map((tip,i)=><article key={tip}><b>{i+1}</b><p>{tip}</p></article>)}</div><button onClick={newTest}><BookOpen/> Tôi đã hiểu mẹo — Làm 10 câu 🎯</button></section></main>
 if(phase==='result')return <main className="study-map-page"><section className="module-result"><CheckCircle2/><small>HOÀN THÀNH {module.part}</small><h1>{score}/10 câu đúng</h1><p>Câu hỏi và phương án được xào bằng Fisher–Yates.</p><div><button onClick={newTest}><RefreshCw/> Đổi đề mới</button><button onClick={()=>setPhase('map')}>Part khác <ArrowRight/></button></div></section></main>
 if(!question)return null
 return <main className="study-map-page"><header className="module-toolbar"><button onClick={()=>setPhase('theory')}><BookOpen/> Xem lại mẹo</button><div className="mini-progress"><i style={{width:`${((index+1)/questions.length)*100}%`}}/></div><span>Câu {index+1}/10</span><button onClick={newTest}><RefreshCw/> Đổi đề mới</button></header><section className="full-question"><div className="question-actions"><span>{module.part} · THỰC CHIẾN</span><button onClick={()=>setShowTip(true)}><Lightbulb/> Mẹo 3 giây cho câu này</button></div>{question.part==='part-1'&&<Part1Image src={question.imageUrl}/>} {question.part!=='part-1'&&question.passage&&<pre>{question.passage}</pre>}{question.part!=='part-1'&&<h1>{question.question}</h1>}{module.skill==='Listening'&&<button className="listen-button" onClick={()=>speak(question.speech)}><Volume2/> Phát audio</button>}<div className="full-options">{question.options.map((option,optionIndex)=>{const correct=answered&&optionIndex===question.correctAnswer,wrong=answered&&optionIndex===selected&&optionIndex!==question.correctAnswer,neutral=answered&&!correct&&!wrong;return <button key={`${question.instanceId}-${optionIndex}`} disabled={answered} className={correct?'correct':wrong?'wrong':neutral?'dim':''} onClick={()=>choose(optionIndex)}><b>{LETTERS[optionIndex]}</b><span>{question.part==='part-1'?`Phương án ${LETTERS[optionIndex]}`:option}</span>{correct&&<CheckCircle2/>}{wrong&&<XCircle/>}</button>})}</div>{answered&&<><ExplanationCard isCorrect={selected===question.correctAnswer} selectedAnswer={question.options[selected]} correctAnswer={question.options[question.correctAnswer]} translation={question.vietnameseTranslation} explanation={question.explanation} fastTip={question.fastTip} questionText={question.question} options={question.options} correctIndex={question.correctAnswer} optionsMeaning={question.optionsMeaning}/><button className="full-next" onClick={next}>{index===9?'Xem kết quả':'Câu tiếp theo'} <ArrowRight/></button></>}</section>{showTip&&<div className="tip-modal" onClick={()=>setShowTip(false)}><article onClick={event=>event.stopPropagation()}><button onClick={()=>setShowTip(false)}><X/></button><Lightbulb/><small>MẸO PHẢN XẠ 3 GIÂY</small><p>{question.fastTip}</p></article></div>}</main>
}
