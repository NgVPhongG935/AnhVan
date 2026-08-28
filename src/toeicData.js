import {dictionary,parts as coreParts,tipGroups} from './data'
import {toeicStructure} from './toeicStructureData'
import {legacyQuestionBank as fullBank} from './data/toeicData'

export {dictionary,tipGroups}

const readingBase=coreParts.find(part=>part.id==='reading-5')
const readingTracks=[
 {id:'reading-word-form',part:'Part 5 · Nên học trước ⭐',title:'Từ loại 5 giây',description:'Noun · Verb · Adjective · Adverb',offset:0,recommended:true},
 {id:'reading-connectors',title:'Liên từ & Giới từ',description:'Although/Despite · Because/Due to',offset:3},
 {id:'reading-pronouns',title:'Đại từ & Hòa hợp',description:'Pronouns · Subject–Verb Agreement',offset:6},
].map(track=>({...readingBase,...track,questions:[...readingBase.questions.slice(track.offset),...readingBase.questions.slice(0,track.offset)]}))

const part6={...readingBase,id:'reading-6',part:'Part 6',title:'Điền đoạn văn ngắn',description:'Text Completion · Ngữ pháp trong ngữ cảnh',questions:[...readingBase.questions.slice(2),...readingBase.questions.slice(0,2)]}
const part7={...readingBase,id:'reading-7',part:'Part 7',title:'Đọc văn bản đơn',description:'Email · Thông báo · Bắt từ khóa',questions:[...readingBase.questions.slice(5),...readingBase.questions.slice(0,5)],time:35}
const listeningBase=coreParts.find(part=>part.id==='listening-2')
const listening34={...listeningBase,id:'listening-3-4',part:'Part 3 & 4',title:'Hội thoại & Bài nói ngắn',description:'Bắt từ khóa · Đọc câu hỏi trước',questions:[...listeningBase.questions].reverse(),time:20}

const legacyParts=[...coreParts.filter(part=>!['reading-5','listening-2'].includes(part.id)),...readingTracks,part6,part7,listeningBase,listening34]

const templateFor=id=>{
 if(id.startsWith('reading-7')) return legacyParts.find(p=>p.id==='reading-7')
 if(id.startsWith('reading-')) return legacyParts.find(p=>p.id===id)||readingBase
 if(id==='listening-3'||id==='listening-4') return legacyParts.find(p=>p.id==='listening-3-4')
 if(id.startsWith('listening-')) return legacyParts.find(p=>p.id===id)||listeningBase
 if(id==='speaking-3'||id==='speaking-4'||id==='speaking-5') return legacyParts.find(p=>p.id==='speaking-1')
 if(id==='writing-3') return legacyParts.find(p=>p.id==='writing-2')
 return legacyParts.find(p=>p.id===id)
}

const accentBySection={Reading:'green',Listening:'orange',Speaking:'blue',Writing:'purple'}

export const parts=toeicStructure.map(meta=>{
 const template=templateFor(meta.id)
 const source=template.questions
 const questions=Array.from({length:Math.max(10,meta.miniSize)},(_,index)=>{
  const original=source[index%source.length]
  const options=['listening-3','listening-4'].includes(meta.id)&&original.options?.length===3?[...original.options,'The information is not available.']:original.options
  return {...original,options,id:`${meta.id}-mini-${index+1}`,etsPosition:meta.positionNote,explanation:`${meta.positionNote} ${original.explanation||''}`.trim()}
 })
 return {...template,...meta,skill:meta.section,part:meta.recommended?`${meta.part} · Nên học trước ⭐`:meta.part,title:meta.viTitle,description:`${meta.title} · Đề thật ${meta.realQuestions} câu (${meta.range}) · ${meta.focus}`,time:meta.recommendedSeconds,accent:accentBySection[meta.section],questions}
})

export function getQuestionPool(partKey){
 const aliases={'listening-1':'part-1','listening-2':'part-2','listening-3':'part-3','listening-4':'part-4','listening-3-4':'part-3','reading-word-form':'part-5','reading-connectors':'part-5','reading-pronouns':'part-5','reading-5':'part-5','reading-6':'part-6','reading-7':'part-7','reading-7-single':'part-7','reading-7-multiple':'part-7'}
 if(aliases[partKey])return [...fullBank[aliases[partKey]]]
 const part=parts.find(item=>item.id===partKey)
 return part?.questions?[...part.questions]:[]
}

const vocabRows=[
 ['appointment','noun','/əˈpɔɪntmənt/','cuộc hẹn','I scheduled an appointment with the manager.','Tôi đã đặt lịch hẹn với quản lý.'],
 ['applicant','noun','/ˈæplɪkənt/','ứng viên','Every applicant must submit a résumé.','Mỗi ứng viên phải nộp sơ yếu lý lịch.'],
 ['approve','verb','/əˈpruːv/','phê duyệt','The director approved the new budget.','Giám đốc đã phê duyệt ngân sách mới.'],
 ['available','adjective','/əˈveɪləbl/','có sẵn, rảnh','The meeting room is available after lunch.','Phòng họp còn trống sau bữa trưa.'],
 ['benefit','noun','/ˈbenɪfɪt/','phúc lợi, lợi ích','Employees receive several health benefits.','Nhân viên nhận được nhiều phúc lợi sức khỏe.'],
 ['budget','noun','/ˈbʌdʒɪt/','ngân sách','We must stay within the project budget.','Chúng ta phải chi tiêu trong ngân sách dự án.'],
 ['candidate','noun','/ˈkændɪdət/','ứng viên','The candidate has five years of experience.','Ứng viên có năm năm kinh nghiệm.'],
 ['complaint','noun','/kəmˈpleɪnt/','lời phàn nàn','The hotel received a customer complaint.','Khách sạn nhận được một lời phàn nàn.'],
 ['conference','noun','/ˈkɒnfərəns/','hội nghị','The annual conference begins on Monday.','Hội nghị thường niên bắt đầu thứ Hai.'],
 ['confirm','verb','/kənˈfɜːrm/','xác nhận','Please confirm your reservation by Friday.','Vui lòng xác nhận đặt chỗ trước thứ Sáu.'],
 ['convenient','adjective','/kənˈviːniənt/','thuận tiện','The hotel is in a convenient location.','Khách sạn nằm ở vị trí thuận tiện.'],
 ['customer','noun','/ˈkʌstəmər/','khách hàng','Customer satisfaction is our priority.','Sự hài lòng của khách hàng là ưu tiên.'],
 ['deadline','noun','/ˈdedlaɪn/','hạn chót','The deadline for applications is May 10.','Hạn chót nộp đơn là ngày 10 tháng 5.'],
 ['deliver','verb','/dɪˈlɪvər/','giao hàng','We will deliver the package tomorrow.','Chúng tôi sẽ giao kiện hàng ngày mai.'],
 ['department','noun','/dɪˈpɑːrtmənt/','phòng ban','She works in the marketing department.','Cô ấy làm tại phòng tiếp thị.'],
 ['discount','noun','/ˈdɪskaʊnt/','giảm giá','Members receive a ten-percent discount.','Thành viên được giảm giá mười phần trăm.'],
 ['efficient','adjective','/ɪˈfɪʃənt/','hiệu quả','The new system is more efficient.','Hệ thống mới hiệu quả hơn.'],
 ['employee','noun','/ɪmˈplɔɪiː/','nhân viên','Every employee needs an identification card.','Mỗi nhân viên cần thẻ nhận dạng.'],
 ['equipment','noun','/ɪˈkwɪpmənt/','thiết bị','Safety equipment is provided at the entrance.','Thiết bị an toàn được cung cấp tại lối vào.'],
 ['expense','noun','/ɪkˈspens/','chi phí','Please submit your travel expenses.','Vui lòng nộp các chi phí đi lại.'],
 ['experience','noun','/ɪkˈspɪəriəns/','kinh nghiệm','The position requires sales experience.','Vị trí yêu cầu kinh nghiệm bán hàng.'],
 ['facility','noun','/fəˈsɪləti/','cơ sở, tiện nghi','The fitness facility is open all day.','Cơ sở thể hình mở cửa cả ngày.'],
 ['improve','verb','/ɪmˈpruːv/','cải thiện','Training can improve job performance.','Đào tạo có thể cải thiện hiệu suất.'],
 ['increase','verb','/ɪnˈkriːs/','tăng','Sales increased by fifteen percent.','Doanh số tăng mười lăm phần trăm.'],
 ['inspect','verb','/ɪnˈspekt/','kiểm tra','A technician inspected the equipment.','Kỹ thuật viên đã kiểm tra thiết bị.'],
 ['invoice','noun','/ˈɪnvɔɪs/','hóa đơn','The invoice is attached to the email.','Hóa đơn được đính kèm email.'],
 ['launch','verb','/lɔːntʃ/','ra mắt','The company will launch a new product.','Công ty sẽ ra mắt sản phẩm mới.'],
 ['maintenance','noun','/ˈmeɪntənəns/','bảo trì','The elevator is closed for maintenance.','Thang máy đóng cửa để bảo trì.'],
 ['manager','noun','/ˈmænɪdʒər/','quản lý','The manager reviewed the report.','Quản lý đã xem báo cáo.'],
 ['negotiate','verb','/nɪˈɡəʊʃieɪt/','đàm phán','They negotiated a lower price.','Họ đã đàm phán mức giá thấp hơn.'],
 ['participant','noun','/pɑːrˈtɪsɪpənt/','người tham gia','Each participant received a badge.','Mỗi người tham gia nhận một huy hiệu.'],
 ['payment','noun','/ˈpeɪmənt/','thanh toán','Payment is due within thirty days.','Thanh toán đến hạn trong ba mươi ngày.'],
 ['postpone','verb','/pəʊstˈpəʊn/','hoãn','We postponed the meeting until Tuesday.','Chúng tôi hoãn cuộc họp đến thứ Ba.'],
 ['productive','adjective','/prəˈdʌktɪv/','năng suất','It was a productive meeting.','Đó là một cuộc họp hiệu quả.'],
 ['profit','noun','/ˈprɒfɪt/','lợi nhuận','The company reported a higher profit.','Công ty báo cáo lợi nhuận cao hơn.'],
 ['purchase','verb','/ˈpɜːrtʃəs/','mua','Tickets can be purchased online.','Vé có thể được mua trực tuyến.'],
 ['qualified','adjective','/ˈkwɒlɪfaɪd/','đủ năng lực','We need a qualified technician.','Chúng tôi cần kỹ thuật viên đủ năng lực.'],
 ['receipt','noun','/rɪˈsiːt/','biên lai','Keep the receipt for your records.','Hãy giữ biên lai để lưu hồ sơ.'],
 ['recommend','verb','/ˌrekəˈmend/','đề xuất','I recommend the morning flight.','Tôi đề xuất chuyến bay buổi sáng.'],
 ['refund','noun','/ˈriːfʌnd/','tiền hoàn lại','The customer requested a full refund.','Khách hàng yêu cầu hoàn tiền đầy đủ.'],
 ['register','verb','/ˈredʒɪstər/','đăng ký','Please register before the conference.','Vui lòng đăng ký trước hội nghị.'],
 ['reliable','adjective','/rɪˈlaɪəbl/','đáng tin cậy','We need a reliable delivery service.','Chúng tôi cần dịch vụ giao hàng đáng tin cậy.'],
 ['replace','verb','/rɪˈpleɪs/','thay thế','The store will replace the damaged item.','Cửa hàng sẽ thay sản phẩm bị hỏng.'],
 ['reservation','noun','/ˌrezərˈveɪʃən/','đặt chỗ','I made a hotel reservation.','Tôi đã đặt phòng khách sạn.'],
 ['respond','verb','/rɪˈspɒnd/','phản hồi','We will respond within one business day.','Chúng tôi sẽ phản hồi trong một ngày làm việc.'],
 ['schedule','noun','/ˈskedʒuːl/','lịch trình','The training schedule has changed.','Lịch đào tạo đã thay đổi.'],
 ['shipment','noun','/ˈʃɪpmənt/','lô hàng','The shipment arrived at the warehouse.','Lô hàng đã đến nhà kho.'],
 ['submit','verb','/səbˈmɪt/','nộp','Submit the application before noon.','Nộp đơn trước buổi trưa.'],
 ['supplier','noun','/səˈplaɪər/','nhà cung cấp','The supplier offered a lower price.','Nhà cung cấp đưa ra mức giá thấp hơn.'],
 ['warehouse','noun','/ˈweərhaʊs/','nhà kho','The products are stored in a warehouse.','Sản phẩm được lưu trong nhà kho.']
]

export const vocabulary=vocabRows.map((row,index)=>({id:index+1,word:row[0],type:row[1],phonetic:row[2],meaning:row[3],example:row[4],translation:row[5]}))
export const vocabularyGoal=600

export {fullQuestionBank,studyModules,speakingWritingModule,cheatSheetSections} from './fullToeicData'

export {linearStages,synonymPairs,speakingWritingQuestions,totalLinearQuestions} from './linearCourseData'

export {part1Questions as part1QuestionPool} from './data/parts/part1Data.js'
