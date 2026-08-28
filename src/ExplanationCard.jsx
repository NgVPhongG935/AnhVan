import {Globe2,Languages,Lightbulb,Search} from 'lucide-react'

const fallbackMeta=word=>({word,type:'Từ/cụm từ',meaning:'xem nghĩa theo ngữ cảnh của câu'})
export default function ExplanationCard({translation,explanation,fastTip,isCorrect,selectedAnswer,correctAnswer,questionText='',options=[],correctIndex=-1,optionsMeaning=[]}){
 const normalized=options.map((word,index)=>({...(optionsMeaning[index]||fallbackMeta(word)),word}))
 const correctMeta=normalized[correctIndex]||fallbackMeta(correctAnswer)
 const completedSentence=questionText?questionText.replace(/_{2,}|\.{3,}/,correctAnswer||'_____'):''
 return <div className="explanation-card" role="status" aria-live="polite">
  <div className="explanation-status"><span className={isCorrect?'correct':'wrong'}>{isCorrect?'✓ Bạn chọn đúng':selectedAnswer?'✕ Bạn vừa chọn sai':'⌛ Hết giờ, hãy xem lại'}</span></div>
  <section className="word-breakdown-section"><span className="explanation-icon words"><Languages/></span><div><h4>1. Từ điền vào & nghĩa các đáp án</h4><p className="correct-word">👉 <strong>Từ cần điền: {correctMeta.word||correctAnswer}</strong> <em>({correctMeta.type})</em> = {correctMeta.meaning}</p><div className="meaning-grid">{normalized.map((meta,index)=><article className={index===correctIndex?'answer-word-correct':''} key={`${meta.word}-${index}`}><b>({String.fromCharCode(65+index)}) {meta.word}</b><span>{meta.type}: {meta.meaning}</span></article>)}</div></div></section>
  <section><span className="explanation-icon translation"><Globe2/></span><div><h4>2. Dịch nguyên câu tiếng Việt</h4>{completedSentence&&<p className="original-completed">“{completedSentence}”</p>}<p className="translation-text">“{translation||'Bản dịch đang được cập nhật.'}”</p></div></section>
  <section><span className="explanation-icon grammar"><Search/></span><div><h4>3. Tại sao chọn đáp án này?</h4><p>{explanation||'Hãy đối chiếu vị trí chỗ trống, loại từ và ngữ cảnh để chọn đáp án.'}</p></div></section>
  <div className="fast-tip"><Lightbulb/><span><strong>4. Mẹo 3 giây bỏ túi</strong>{fastTip||'Nhìn từ ngay trước và sau chỗ trống trước khi dịch toàn câu.'}</span></div>
 </div>
}