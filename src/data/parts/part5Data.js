import {complete,placeCorrect} from './helpers.js'

const templates=[
 ['The quarterly report was _____ prepared.',['carefully','careful','care','caring'],0,'Báo cáo quý được chuẩn bị cẩn thận.','Giữa was và V3 prepared cần trạng từ.','be + ___ + V3 → trạng từ -ly.'],
 ['All _____ must submit identification.',['applicants','apply','applicable','application'],0,'Tất cả ứng viên phải nộp giấy tờ tùy thân.','All + danh từ đếm được số nhiều chỉ người.','All + người → danh từ số nhiều.'],
 ['The new system is highly _____.',['efficient','efficiency','efficiently','efficiencies'],0,'Hệ thống mới rất hiệu quả.','Sau linking verb is và highly cần tính từ.','be + adv + ___ → adjective.'],
 ['Please contact us _____ you need assistance.',['if','during','despite','because of'],0,'Hãy liên hệ nếu bạn cần hỗ trợ.','Sau blank là mệnh đề S+V mang nghĩa điều kiện.','S+V phía sau → liên từ.'],
 ['The event was canceled _____ the storm.',['because of','because','although','while'],0,'Sự kiện bị hủy vì cơn bão.','Sau blank là cụm danh từ nên dùng because of.','because of + noun; because + S+V.'],
 ['Ms. Cole is responsible _____ staff training.',['for','to','with','at'],0,'Cô Cole phụ trách đào tạo nhân viên.','Collocation be responsible for.','Học nguyên cụm responsible for.'],
 ['The director requested that each team _____ its plan.',['review','reviews','reviewed','reviewing'],0,'Giám đốc yêu cầu mỗi nhóm xem lại kế hoạch.','Request that + S + V-bare.','request that + V nguyên mẫu.'],
 ['The materials arrived _____ schedule.',['ahead of','according','between','until'],0,'Vật liệu đến sớm hơn lịch.','Collocation ahead of schedule.','schedule → ahead of/on/behind.'],
 ['Neither the clerks nor the manager _____ available.',['is','are','were','have'],0,'Cả nhân viên lẫn quản lý đều không rảnh.','Chia theo chủ ngữ gần nhất manager số ít.','neither...nor → nhìn chủ ngữ gần động từ.'],
 ['The warranty remains valid _____ the device is used properly.',['provided that','due to','during','in spite of'],0,'Bảo hành có hiệu lực miễn là thiết bị dùng đúng cách.','Provided that nối mệnh đề điều kiện.','S+V phía sau + điều kiện → provided that.'],
]
export const part5Questions=Array.from({length:300},(_,index)=>{const row=templates[index%templates.length],set=Math.floor(index/templates.length)+1,placed=placeCorrect(row[1][0],row[1].slice(1),index);return complete({id:`p5_${index+1}`,part:5,partKey:'part-5',theme:['word-form','conjunction','preposition','agreement','collocation'][index%5],question:`${row[0]} [Set ${set}]`,options:placed.options,correctAnswer:placed.correctAnswer,vietnameseTranslation:row[3],explanation:row[4],fastTip:`💡 ${row[5]}`})})
