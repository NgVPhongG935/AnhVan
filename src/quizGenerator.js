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
/**
 * Fisher–Yates selection that also prevents duplicate images, topics and actions.
 * It is primarily used by Part 1 photograph tests.
 */
export function selectDiverseQuestions(pool,count=10,excludedIds=[]){
 const excluded=new Set(excludedIds),images=new Set(),topics=new Set(),actions=new Set(),selected=[]
 const candidates=shuffleArray(pool.filter(question=>!excluded.has(question.id)))
 for(const question of candidates){
  if(selected.length>=count)break
  if(question.imageUrl&&images.has(question.imageUrl))continue
  if(question.topicKey&&topics.has(question.topicKey))continue
  if(question.actionKey&&actions.has(question.actionKey))continue
  selected.push(question)
  if(question.imageUrl)images.add(question.imageUrl)
  if(question.topicKey)topics.add(question.topicKey)
  if(question.actionKey)actions.add(question.actionKey)
 }
 return selected
}
export function generateNewTest(partKey,count=10){
 const rawPool=getQuestionPool(partKey)
 if(!rawPool.length)return[]

 const selectedPool=partKey==='listening-1'?selectDiverseQuestions(rawPool,Math.min(count,rawPool.length)):shuffleArray(rawPool).slice(0,Math.min(count,rawPool.length))
 return selectedPool.map((question,order)=>{
  const originalCorrectIndex=question.correctAnswer??question.answer
  const correctText=question.correctText??question.options?.[originalCorrectIndex]
  const shuffledOptions=question.options?shuffleArray(question.options):[]
  const newCorrectIndex=shuffledOptions.indexOf(correctText)
  const originalIndexByText=new Map(question.options.map((text,index)=>[text,index]))

  if(newCorrectIndex<0)throw new Error(`Không xác định được đáp án đúng cho câu ${question.id}`)

  return {
   ...question,
   instanceId:`${partKey}-${Date.now()}-${order}-${Math.random().toString(36).slice(2)}`,
   question:question.question??question.prompt,
   options:shuffledOptions,
   optionsMeaning:shuffledOptions.map(text=>question.optionsMeaning?.[originalIndexByText.get(text)]),
   correctAnswer:newCorrectIndex,
   answer:newCorrectIndex,
   vietnameseTranslation:question.vietnameseTranslation??question.translation,
   fastTip:question.fastTip??question.tip,
  }
 })
}
