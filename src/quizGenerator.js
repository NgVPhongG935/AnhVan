import {getQuestionPool} from './toeicData'

/** Fisher–Yates shuffle: returns a new array and never mutates source data. */
export function shuffleArray(items){
 const shuffled=[...items]
 for(let index=shuffled.length-1;index>0;index-=1){
  const randomIndex=Math.floor(Math.random()*(index+1))
  ;[shuffled[index],shuffled[randomIndex]]=[shuffled[randomIndex],shuffled[index]]
 }
 return shuffled
}

/**
 * Builds a fresh mini-test from the immutable question bank.
 * Both question order and answer order are randomized.
 */
export function generateNewTest(partKey,count=10){
 const rawPool=getQuestionPool(partKey)
 if(!rawPool.length)return[]

 return shuffleArray(rawPool).slice(0,Math.min(count,rawPool.length)).map((question,order)=>{
  const originalCorrectIndex=question.correctAnswer??question.answer
  const correctText=question.correctText??question.options?.[originalCorrectIndex]
  const shuffledOptions=question.options?shuffleArray(question.options):[]
  const newCorrectIndex=shuffledOptions.indexOf(correctText)

  if(newCorrectIndex<0)throw new Error(`Không xác định được đáp án đúng cho câu ${question.id}`)

  return {
   ...question,
   instanceId:`${partKey}-${Date.now()}-${order}-${Math.random().toString(36).slice(2)}`,
   options:shuffledOptions,
   correctAnswer:newCorrectIndex,
   answer:newCorrectIndex,
  }
 })
}
