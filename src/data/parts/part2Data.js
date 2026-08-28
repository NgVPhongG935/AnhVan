import {audioFrom,complete} from './helpers.js'

const patterns=[
 ['Where','is the orientation being held?','In conference room B.','Định hướng được tổ chức ở đâu?','Trong phòng họp B.','Where hỏi địa điểm.'],
 ['When','will the shipment arrive?','By Friday afternoon.','Khi nào lô hàng đến?','Trước chiều thứ Sáu.','When hỏi thời gian.'],
 ['Who','approved the revised budget?','Ms. Rivera did.','Ai duyệt ngân sách sửa đổi?','Cô Rivera.','Who hỏi người.'],
 ['Why','was the appointment postponed?','The manager is out of town.','Tại sao lịch hẹn bị hoãn?','Quản lý đi công tác.','Why hỏi lý do.'],
 ['How often','is the equipment inspected?','Every three months.','Thiết bị được kiểm tra bao lâu một lần?','Ba tháng một lần.','How often hỏi tần suất.'],
 ['Could','you send me the updated file?','Sure, I will do it now.','Bạn gửi tôi tệp mới được không?','Được, tôi làm ngay.','Could you là lời nhờ.'],
 ['Have','the candidates been interviewed?','Let me check with Human Resources.','Ứng viên đã được phỏng vấn chưa?','Để tôi kiểm tra với Nhân sự.','Câu Yes/No có thể nhận câu trả lời gián tiếp.'],
 ['Which','printer should we order?','The more energy-efficient one.','Ta nên đặt máy in nào?','Chiếc tiết kiệm điện hơn.','Which hỏi lựa chọn.'],
 ['Why don’t','we reserve a larger room?','That sounds like a good idea.','Sao ta không đặt phòng lớn hơn?','Ý hay đấy.','Why don’t we là đề nghị.'],
 ['Did','Mr. Han call the supplier?','He said he would this afternoon.','Ông Han đã gọi nhà cung cấp chưa?','Ông ấy nói chiều nay sẽ gọi.','Soi thì và chấp nhận phản hồi gián tiếp.'],
]
const wrong=[['Yes, the conference was useful.','Vâng, hội nghị hữu ích.'],['At a reasonable price.','Với mức giá hợp lý.'],['The printed form is blue.','Biểu mẫu in có màu xanh.'],['A supplier near the station.','Một nhà cung cấp gần nhà ga.'],['For about two hours.','Trong khoảng hai giờ.']]
export const part2Questions=Array.from({length:300},(_,index)=>{const p=patterns[index%patterns.length],set=Math.floor(index/patterns.length)+1,spokenQuestion=`${p[0]} ${p[1]}`,correctAnswer=index%3,distractors=[wrong[index%5],wrong[(index+2)%5]],options=distractors.map(item=>item[0]);options.splice(correctAnswer,0,p[2]);const optionTranslations=distractors.map(item=>item[1]);optionTranslations.splice(correctAnswer,0,p[4]);const audioText=`${spokenQuestion} ... ${audioFrom(options)}`;return complete({id:`p2_${index+1}`,part:2,partKey:'part-2',theme:['wh','yes-no','indirect','same-sound'][index%4],question:`${spokenQuestion} (Set ${set})`,audioText,speech:audioText,transcript:audioText,options,optionTranslations,correctAnswer,vietnameseTranslation:`${p[3]} — ${p[4]}`,explanation:`${p[5]} Đáp án đúng cung cấp đúng loại thông tin; các câu khác lặp âm/từ hoặc trả lời sai trọng tâm.`,fastTip:'💡 Nghe từ đầu câu hỏi, xác định loại thông tin rồi loại câu lặp âm máy móc.'})})