import AudioPlayer from './AudioPlayer'

const letter=index=>String.fromCharCode(65+index)

export default function Part3Group({part,entries,answers,onAnswer}){
 const shared=entries[0]?.question
 if(!shared)return null
 const firstNumber=entries[0].index+1,lastNumber=entries.at(-1).index+1
 const kind=part==='part-3'?'conversation':'talk'
 return <section className="listening-set-quiz">
  <header className="sticky-set-audio"><div><strong>Questions {firstNumber}–{lastNumber}</strong><span>refer to the following {kind}</span></div><AudioPlayer key={shared.groupId||shared.id} audioUrl={shared.audioUrl} text={shared.audioText||shared.speech||shared.transcript} canShowTranscript={false}/></header>
  {shared.graphicUrl&&<img className="listening-graphic" src={shared.graphicUrl} alt="Bảng biểu dùng cho câu hỏi Listening"/>}
  <div className="compact-question-set">{entries.map((entry,setIndex)=><article key={entry.question.instanceId||entry.question.id}><div className="compact-question-title"><small>Câu {setIndex+1}/3</small><h2>{entry.question.question}</h2></div><div className="compact-options">{entry.question.options.map((option,optionIndex)=><button type="button" className={answers[entry.index]===optionIndex?'selected':''} onClick={()=>onAnswer(optionIndex,entry.index)} key={`${entry.question.id}-${optionIndex}`}><b>{letter(optionIndex)}</b><span>{option}</span></button>)}</div></article>)}</div>
 </section>
}
