import AudioPlayer from './AudioPlayer'
import Part1Image from './Part1Image'
import Part3Group from './Part3Group'

const letter=index=>String.fromCharCode(65+index)
const isP=(question,number)=>question.part===number||question.part===`part-${number}`||question.partKey===`part-${number}`

function LetterOptions({question,selected,onAnswer,hideText=false}){
 return <div className={`exam-options ${hideText?'letters-only':''}`}>{question.options.map((option,index)=><button type="button" aria-label={`Đáp án ${letter(index)}`} className={selected===index?'selected':''} onClick={()=>onAnswer(index)} key={`${question.instanceId||question.id}-${index}`}><b>{letter(index)}</b>{!hideText&&<span>{option}</span>}</button>)}</div>
}

export default function ListeningQuestion({question,groupEntries=[],answers={},onAnswer}){
 if(isP(question,1))return <section className="listening-format part1-format"><Part1Image src={question.imageUrl} image={question.image}/><AudioPlayer audioUrl={question.audioUrl} text={question.audioText||question.speech} canShowTranscript={false}/><LetterOptions question={question} selected={answers.current} onAnswer={onAnswer} hideText/></section>
 if(isP(question,2))return <section className="listening-format part2-format"><h1>🎧 Lắng nghe câu hỏi và chọn câu phản hồi phù hợp nhất</h1><AudioPlayer audioUrl={question.audioUrl} text={question.audioText||question.speech} canShowTranscript={false}/><LetterOptions question={question} selected={answers.current} onAnswer={onAnswer} hideText/></section>
 const entries=groupEntries.length?groupEntries:[{question,index:answers.currentIndex||0}]
 return <Part3Group part={isP(question,3)?'part-3':'part-4'} entries={entries} answers={answers} onAnswer={onAnswer}/>
}

export function ListeningReview({question,isCorrect,selected}){
 const optionsTranslations=question.optionsTranslations||question.options.map(()=>"Xem nghĩa theo ngữ cảnh và phần phân tích.")
 const evidence=question.evidenceSentence||''
 const transcript=question.transcript||question.audioText||question.speech||''
 const highlighted=evidence&&transcript.includes(evidence)?<>{transcript.split(evidence)[0]}<mark>{evidence}</mark>{transcript.split(evidence).slice(1).join(evidence)}</>:transcript
 return <section className="listening-review-detail"><header><b>{isCorrect?'✓ Trả lời đúng':'✕ Cần xem lại'}</b></header>{isP(question,2)&&<div className="review-original-question"><strong>🎧 Câu hỏi gốc</strong><p>{question.question.replace(/\s*\(Set \d+\)$/,'')}</p></div>}{isP(question,1)&&<Part1Image src={question.imageUrl} image={question.image}/>}<AudioPlayer audioUrl={question.audioUrl} text={question.audioText||question.speech} transcript={transcript} translation={question.transcriptTranslation||question.vietnameseTranslation} canShowTranscript/><div className="review-listening-options">{question.options.map((option,index)=><article className={index===question.correctAnswer?'correct':index===selected?'wrong':''} key={option}><b>{letter(index)}. {option}</b><span>{optionsTranslations[index]}</span></article>)}</div>{question.vocabularyBreakdown?.length>0&&<div className="review-vocabulary"><strong>🔤 Từ vựng trong audio</strong>{question.vocabularyBreakdown.map(item=><span key={item.word}><b>{item.word}</b> ({item.type}) = {item.meaning}</span>)}</div>}{(isP(question,3)||isP(question,4))&&<><div className="parallel-transcript"><article><strong>Transcript tiếng Anh</strong><p>{highlighted}</p></article><article><strong>Dịch nghĩa tiếng Việt</strong><p>{question.transcriptTranslation||question.vietnameseTranslation}</p></article></div><div className="paraphrase-table"><strong>🔁 Cặp từ đồng nghĩa</strong>{(question.paraphrases||[['schedule change','event moved'],['contact','notify']]).map(pair=><span key={pair[0]}>{pair[0]} = <b>{pair[1]}</b></span>)}</div></>}</section>
}
