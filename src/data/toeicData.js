import {part1Questions} from './parts/part1Data.js'
import {part2Questions} from './parts/part2Data.js'
import {part3Questions,part3Conversations} from './parts/part3Data.js'
import {part4Questions,part4Talks} from './parts/part4Data.js'
import {part5Questions} from './parts/part5Data.js'
import {part6Questions,part6Passages} from './parts/part6Data.js'
import {part7Questions,part7Passages} from './parts/part7Data.js'
import {speakingWritingTopics} from './parts/speakingWritingData.js'

export const fullToeicQuestionBank={part1:part1Questions,part2:part2Questions,part3:part3Questions,part4:part4Questions,part5:part5Questions,part6:part6Questions,part7:part7Questions,speakingWriting:speakingWritingTopics}
const legacy=(key,questions)=>questions.map(question=>({...question,partNumber:question.part,part:key}))
export const legacyQuestionBank={'part-1':legacy('part-1',part1Questions),'part-2':legacy('part-2',part2Questions),'part-3':legacy('part-3',part3Questions),'part-4':legacy('part-4',part4Questions),'part-5':legacy('part-5',part5Questions),'part-6':legacy('part-6',part6Questions),'part-7':legacy('part-7',part7Questions)}
export const groupedListeningData={part3:part3Conversations,part4:part4Talks}
export const groupedReadingData={part6:part6Passages,part7:part7Passages}
export {part1Questions,part2Questions,part3Questions,part4Questions,part5Questions,part6Questions,part7Questions,speakingWritingTopics}
