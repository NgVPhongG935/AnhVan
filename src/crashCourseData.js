const q=(id,question,options,correctAnswer,vietnameseTranslation,explanation,fastTip)=>({id,question,prompt:question,options,correctAnswer,answer:correctAnswer,vietnameseTranslation,translation:vietnameseTranslation,explanation,fastTip,tip:fastTip})

const wordTip='💡 Mẹo 3s: Xác định vị trí chỗ trống rồi mới nhìn đuôi từ.'
export const wordFormQuestions=[
 q('wf1','The report was _____ prepared.',['careful','carefully','care','caring'],1,'Báo cáo đã được chuẩn bị một cách cẩn thận.','Prepared là V3; từ bổ nghĩa cho động từ phải là trạng từ carefully.',wordTip),
 q('wf2','The manager gave an _____ presentation.',['inform','information','informative','informatively'],2,'Quản lý đã có một bài thuyết trình giàu thông tin.','Trước danh từ presentation cần tính từ informative.',wordTip),
 q('wf3','All _____ must register by Friday.',['participate','participants','participation','participatory'],1,'Tất cả người tham gia phải đăng ký trước thứ Sáu.','All cần danh từ số nhiều chỉ người: participants.',wordTip),
 q('wf4','The new system operates very _____.',['efficient','efficiency','efficiently','efficiencies'],2,'Hệ thống mới vận hành rất hiệu quả.','Bổ nghĩa cho operates cần trạng từ efficiently.',wordTip),
 q('wf5','Customer _____ is our highest priority.',['satisfy','satisfied','satisfaction','satisfactorily'],2,'Sự hài lòng của khách hàng là ưu tiên cao nhất.','Cần danh từ làm chủ ngữ: satisfaction.',wordTip),
 q('wf6','Please _____ the attached document.',['review','reviewer','reviewable','reviewing'],0,'Vui lòng xem tài liệu đính kèm.','Sau Please dùng động từ nguyên mẫu review.',wordTip),
 q('wf7','The hotel is conveniently _____.',['locate','location','located','locating'],2,'Khách sạn tọa lạc thuận tiện.','Sau is và trạng từ conveniently cần V3 located.',wordTip),
 q('wf8','Her _____ was approved yesterday.',['propose','proposal','proposed','proposing'],1,'Đề xuất của cô ấy đã được phê duyệt hôm qua.','Sau tính từ sở hữu Her cần danh từ proposal.',wordTip),
 q('wf9','The technician responded _____.',['prompt','promptly','promptness','prompting'],1,'Kỹ thuật viên đã phản hồi nhanh chóng.','Bổ nghĩa cho responded cần trạng từ promptly.',wordTip),
 q('wf10','We need a _____ delivery service.',['rely','reliable','reliably','reliability'],1,'Chúng tôi cần một dịch vụ giao hàng đáng tin cậy.','Trước danh từ service cần tính từ reliable.',wordTip),
 q('wf11','Online _____ is required.',['register','registration','registered','registering'],1,'Việc đăng ký trực tuyến là bắt buộc.','Cần danh từ làm chủ ngữ: registration.',wordTip),
 q('wf12','The campaign was highly _____.',['success','successful','successfully','succeed'],1,'Chiến dịch rất thành công.','Sau was highly cần tính từ successful.',wordTip),
 q('wf13','Sales increased _____.',['significant','significantly','significance','signify'],1,'Doanh số tăng đáng kể.','Bổ nghĩa cho increased cần trạng từ significantly.',wordTip),
 q('wf14','The company will _____ ten employees.',['hiring','hire','hired','hireable'],1,'Công ty sẽ tuyển mười nhân viên.','Sau will dùng động từ nguyên mẫu hire.',wordTip),
 q('wf15','The equipment is checked _____.',['regular','regularity','regularly','regulate'],2,'Thiết bị được kiểm tra thường xuyên.','Bổ nghĩa cho checked cần trạng từ regularly.',wordTip),
]

const linkTip='💡 Mẹo 3s: Sau đáp án có S + V chọn liên từ; sau là danh từ chọn giới từ.'
export const connectorQuestions=[
 q('cn1','_____ the heavy rain, the event continued.',['Although','Despite','Because','While'],1,'Mặc dù mưa lớn, sự kiện vẫn tiếp tục.','Sau chỗ trống là cụm danh từ the heavy rain nên chọn Despite.',linkTip),
 q('cn2','_____ it was raining, the event continued.',['Despite','Although','Because of','During'],1,'Mặc dù trời đang mưa, sự kiện vẫn tiếp tục.','Sau chỗ trống là mệnh đề it was raining nên chọn Although.',linkTip),
 q('cn3','The flight was delayed _____ bad weather.',['because','because of','although','while'],1,'Chuyến bay bị hoãn vì thời tiết xấu.','Bad weather là cụm danh từ nên dùng because of.',linkTip),
 q('cn4','We left early _____ the office was closing.',['because','because of','despite','during'],0,'Chúng tôi rời đi sớm vì văn phòng sắp đóng cửa.','The office was closing là mệnh đề nên dùng because.',linkTip),
 q('cn5','Please remain seated _____ the presentation.',['while','during','for','because'],1,'Vui lòng tiếp tục ngồi trong suốt bài thuyết trình.','The presentation là sự kiện nên dùng during.',linkTip),
 q('cn6','She worked here _____ three years.',['during','while','for','since'],2,'Cô ấy đã làm việc ở đây trong ba năm.','Three years là khoảng thời gian nên dùng for.',linkTip),
 q('cn7','_____ the meeting ended, we returned to work.',['After','Despite','During','Because of'],0,'Sau khi cuộc họp kết thúc, chúng tôi trở lại làm việc.','Sau chỗ trống là mệnh đề nên chọn liên từ After.',linkTip),
 q('cn8','The store is closed _____ renovations.',['due to','because','although','while'],0,'Cửa hàng đóng cửa do việc cải tạo.','Renovations là danh từ nên dùng due to.',linkTip),
 q('cn9','_____ being new, the software is easy to use.',['Although','Despite','Because','While'],1,'Mặc dù mới, phần mềm rất dễ sử dụng.','Sau chỗ trống là V-ing nên dùng Despite.',linkTip),
 q('cn10','I will call you _____ I arrive.',['during','when','because of','despite'],1,'Tôi sẽ gọi cho bạn khi tôi đến nơi.','I arrive là mệnh đề chỉ thời gian nên dùng when.',linkTip),
 q('cn11','The price increased _____ demand was high.',['because','because of','despite','during'],0,'Giá tăng vì nhu cầu cao.','Demand was high là mệnh đề nên chọn because.',linkTip),
 q('cn12','_____ the delay, all passengers remained calm.',['Although','In spite of','Because','While'],1,'Mặc dù chậm trễ, mọi hành khách vẫn bình tĩnh.','The delay là cụm danh từ nên dùng In spite of.',linkTip),
 q('cn13','We discussed the issue _____ lunch.',['while','during','for','although'],1,'Chúng tôi thảo luận vấn đề trong bữa trưa.','Lunch là danh từ chỉ sự kiện/thời điểm nên dùng during.',linkTip),
 q('cn14','_____ the product is expensive, it is reliable.',['Despite','Although','Because of','During'],1,'Mặc dù sản phẩm đắt, nó đáng tin cậy.','The product is expensive là mệnh đề nên dùng Although.',linkTip),
 q('cn15','The road closed _____ an accident.',['because','due to','although','while'],1,'Con đường đóng cửa do một tai nạn.','An accident là cụm danh từ nên dùng due to.',linkTip),
]

const listenTip='💡 Mẹo 3s: Nghe từ hỏi đầu tiên và loại đáp án sai loại thông tin.'
export const extraPart2Questions=[
 q('p2x1','How often is the machine inspected?',['Every three months.','For two hours.','By the door.'],0,'Máy được kiểm tra thường xuyên thế nào?','How often hỏi tần suất; Every three months trả lời đúng.',listenTip),
 q('p2x2','Why don’t we order lunch now?',['That sounds good.','At the café.','About ten dollars.'],0,'Chúng ta gọi bữa trưa ngay nhé?','Why don’t we là lời đề nghị; That sounds good là phản hồi tự nhiên.',listenTip),
 q('p2x3','Has the client signed the contract?',["Not yet.",'At the front desk.','For one year.'],0,'Khách hàng đã ký hợp đồng chưa?','Not yet trả lời trực tiếp trạng thái chưa hoàn thành.',listenTip),
 q('p2x4','Which report should I print?',['The sales report.','On the printer.','Yes, I did.'],0,'Tôi nên in báo cáo nào?','Which hỏi lựa chọn; The sales report là lựa chọn cụ thể.',listenTip),
 q('p2x5','Could you reserve a room for me?',['Certainly.','Room 205.','Yesterday morning.'],0,'Bạn có thể đặt phòng giúp tôi không?','Could you là lời nhờ; Certainly là câu nhận lời.',listenTip),
]

export const crashCourseSteps=[
 {id:'word-form',title:'Từ loại Part 5',short:'Mẹo 5 giây dễ ăn điểm nhất',type:'quiz',count:15,questions:wordFormQuestions,theory:['Danh từ: -tion, -ment, -ness, -ity.','Tính từ: -ful, -ive, -able, -al. Trạng từ: Adj + -ly.','a/an/the + (Adj) + N · Verb + Adv · modal + V nguyên mẫu.']},
 {id:'connectors',title:'Liên từ & Giới từ Part 5',short:'Because/Because of · Although/Despite',type:'quiz',count:15,questions:connectorQuestions,theory:['Because/Although + S + V (một mệnh đề).','Because of/Despite + N hoặc V-ing.','While + S + V · During + sự kiện · For + khoảng thời gian.']},
 {id:'part1',title:'Phản xạ Listening Part 1',short:'Tranh ảnh · Hành động và trạng thái',type:'part1',count:10,theory:['Có người: tập trung tay và mắt đang làm gì.','Không thấy hành động: ưu tiên trạng thái is/are + V3.','Loại “being + V3” khi không thấy ai đang thực hiện hành động.']},
 {id:'part2',title:'Bẫy Listening Part 2',short:'Wh- · Yes/No · Trả lời gián tiếp',type:'part2',count:15,theory:['Wh- thường loại ngay câu chỉ trả lời Yes/No.','Đáp án lặp đúng từ trong câu hỏi thường là bẫy.','Câu trả lời gián tiếp vẫn đúng nếu hợp logic hội thoại.']},
 {id:'vocabulary',title:'60 từ công sở tần suất cao',short:'Flashcard kèm ví dụ thực tế',type:'flashcard',count:60,theory:['Đọc từ và đoán nghĩa trước khi lật thẻ.','Nghe phát âm rồi nhắc lại một lần.','Nhớ cả cụm trong câu ví dụ, không học từ đứng riêng.']},
]
