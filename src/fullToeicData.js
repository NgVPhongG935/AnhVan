import {part1Questions as part1QuestionPool} from './data/parts/part1Data.js'
const OPTION_META={
 carefully:['Trạng từ - adv','một cách cẩn thận, kỹ lưỡng'],careful:['Tính từ - adj','cẩn thận'],care:['Động từ / Danh từ','quan tâm; sự chăm sóc'],caring:['Tính từ / V-ing','chu đáo, quan tâm'],
 apply:['Động từ','nộp đơn; áp dụng'],applicants:['Danh từ số nhiều','các ứng viên'],applicable:['Tính từ','có thể áp dụng'],application:['Danh từ','đơn đăng ký; sự áp dụng'],
 efficiency:['Danh từ','hiệu suất'],efficient:['Tính từ','hiệu quả'],efficiently:['Trạng từ','một cách hiệu quả'],efficiencies:['Danh từ số nhiều','các hiệu suất/lợi ích hiệu quả'],
 if:['Liên từ','nếu'],during:['Giới từ','trong suốt một sự kiện'],despite:['Giới từ','mặc dù, bất chấp'],because:['Liên từ','bởi vì'],because_of:['Giới từ','bởi vì'],although:['Liên từ','mặc dù'],while:['Liên từ','trong khi'],
 to:['Giới từ / dấu hiệu nguyên mẫu','đến; để'],for:['Giới từ','cho; trong khoảng'],with:['Giới từ','với'],at:['Giới từ','tại'],reviews:['Động từ số ít','xem xét'],reviewed:['Động từ V2/V3','đã được xem xét'],review:['Động từ nguyên mẫu / Danh từ','xem xét; bài đánh giá'],reviewing:['V-ing','đang xem xét'],
 ahead_of:['Cụm giới từ','sớm hơn, trước'],according:['Giới từ chưa đủ cụm','theo (cần to)'],between:['Giới từ','giữa'],until:['Giới từ / Liên từ','cho đến'],are:['Động từ to be số nhiều','là/đang'],were:['To be quá khứ','đã là'],is:['To be số ít','là/đang'],have:['Trợ động từ / Động từ','đã; có'],provided_that:['Liên từ','miễn là, với điều kiện là'],due_to:['Cụm giới từ','do, bởi vì'],in_spite_of:['Cụm giới từ','mặc dù, bất chấp'],
 however:['Trạng từ nối','tuy nhiên'],therefore:['Trạng từ nối','vì vậy'],furthermore:['Trạng từ nối','hơn nữa'],in_addition:['Cụm nối','ngoài ra'],within:['Giới từ','trong vòng'],arrive:['Động từ','đến nơi'],it:['Đại từ','nó']
}
const optionMeta=word=>{const key=String(word).toLowerCase().trim().replaceAll(' ','_');const found=OPTION_META[key];return found?{word,type:found[0],meaning:found[1]}:{word,type:'Từ/cụm từ',meaning:'nghĩa được xác định theo ngữ cảnh câu'}}
const makeQuestion = (part, id, row) => ({
  id: `${part}-${id}`,
  part,
  question: row[0],
  passage: row[1] || "",
  options: row[2],
  optionsMeaning: row[2].map(optionMeta),
  correctAnswer: row[3],
  vietnameseTranslation: row[4],
  explanation: row[5],
  fastTip: row[6],
  speech: row[7] || row[0],
  transcript: row[7] || row[0],
  transcriptTranslation: row[4],
  audioUrl: row[9] || '',
  tipTag: row[8] || part,
});

const p2 = [
  ["Where should I leave these invoices?", "", ["Yes, I sent an invoice.", "On Ms. Chen's desk.", "It cost thirty dollars."], 1, "Tôi nên để những hóa đơn này ở đâu? — Trên bàn cô Chen.", "Where hỏi địa điểm; đáp án B cho vị trí. Yes không thể trả lời Where.", "Wh-question: gạch ngay Yes/No."],
  ["When will the new schedule be announced?", "", ["It hasn't been decided yet.", "At the front desk.", "A printed schedule."], 0, "Khi nào lịch mới được công bố? — Việc đó vẫn chưa được quyết định.", "Câu trả lời gián tiếp hợp lý khi thời điểm chưa chốt.", "Nhóm né tránh như hasn't been decided thường đúng khi thiếu thông tin."],
  ["Who approved the travel budget?", "", ["The trip was enjoyable.", "Mr. Patel did.", "About five hundred dollars."], 1, "Ai đã duyệt ngân sách đi lại? — Ông Patel.", "Who hỏi người; 'Mr. Patel did' thay cho approved the budget.", "Who → tìm người/tên/phòng ban."],
  ["Didn't you reserve the conference room?", "", ["No, Maria said she would.", "The conference lasted two hours.", "Beside the elevator."], 0, "Bạn chưa đặt phòng họp sao? — Chưa, Maria nói cô ấy sẽ đặt.", "Câu hỏi phủ định vẫn trả lời theo sự thật; B và C sai loại thông tin.", "Đừng dịch máy móc Yes/No; nghe phần thông tin sau dấu phẩy."],
  ["Why was the shipment delayed?", "", ["At the loading dock.", "Because of the heavy snow.", "The delay was three hours."], 1, "Tại sao lô hàng bị trễ? — Vì tuyết lớn.", "Why cần nguyên nhân; because of + cụm danh từ cung cấp lý do.", "Why → because/because of/to V hoặc một lời giải thích."],
  ["Could you check the sales figures?", "", ["Sure, I'll do it now.", "A figure near the entrance.", "Sales begins at nine."], 0, "Bạn kiểm tra số liệu bán hàng được không? — Được, tôi sẽ làm ngay.", "Đây là lời yêu cầu nên cần nhận lời/từ chối hợp lý.", "Could you...? là yêu cầu, không phải hỏi khả năng."],
  ["How often is the equipment inspected?", "", ["By a technician.", "Twice a month.", "It is new equipment."], 1, "Thiết bị được kiểm tra bao lâu một lần? — Hai lần mỗi tháng.", "How often hỏi tần suất.", "How often → every/once/twice/daily."],
  ["Is the client meeting today or tomorrow?", "", ["Tomorrow afternoon.", "Yes, the client called.", "In the large meeting room."], 0, "Cuộc họp khách hàng hôm nay hay ngày mai? — Chiều mai.", "Câu hỏi lựa chọn or cần chọn một vế, không trả lời Yes/No.", "Nghe or → đáp án thường nhắc một lựa chọn."],
  ["Why don't we ask Leo to lead the tour?", "", ["That's a good idea.", "The tour lasted an hour.", "He asked a question."], 0, "Sao ta không nhờ Leo dẫn chuyến tham quan? — Ý hay đấy.", "Why don't we là đề nghị, nên phản hồi đánh giá/đồng ý.", "Why don't we...? → Sounds good/Good idea."],
  ["Have the applicants been interviewed yet?", "", ["Let me check with Human Resources.", "At the interview desk.", "The application form is blue."], 0, "Các ứng viên đã được phỏng vấn chưa? — Để tôi kiểm tra với phòng Nhân sự.", "Đáp án gián tiếp 'Let me check' phù hợp khi người nói chưa biết.", "Đừng sợ đáp án không Yes/No; câu né tránh thường là bẫy ngược đúng."],
];

const readingSeeds = {
  "part-5": [
    ["The report was _____ prepared before the board meeting.", "", ["careful", "carefully", "care", "caring"], 1, "Báo cáo đã được chuẩn bị cẩn thận trước cuộc họp hội đồng.", "Giữa was và V3 prepared cần trạng từ bổ nghĩa cho động từ.", "be + ___ + V3 → ưu tiên trạng từ -ly."],
    ["All _____ must submit an identification document.", "", ["apply", "applicants", "applicable", "application"], 1, "Tất cả ứng viên phải nộp giấy tờ tùy thân.", "All + danh từ số nhiều chỉ người; applicants phù hợp cả nghĩa và cấu trúc.", "All + danh từ đếm được → số nhiều."],
    ["The new software is remarkably _____.", "", ["efficiency", "efficient", "efficiently", "efficiencies"], 1, "Phần mềm mới hiệu quả đáng kể.", "Sau linking verb is và trạng từ remarkably cần tính từ.", "be + adv + ___ → tính từ."],
    ["Please contact the manager _____ you need assistance.", "", ["if", "during", "despite", "because of"], 0, "Vui lòng liên hệ quản lý nếu bạn cần hỗ trợ.", "Sau chỗ trống là mệnh đề S+V và nghĩa điều kiện, nên chọn if.", "Sau blank có S+V → chọn liên từ."],
    ["The event was postponed _____ the severe weather.", "", ["because", "because of", "although", "while"], 1, "Sự kiện bị hoãn vì thời tiết khắc nghiệt.", "Sau blank là cụm danh từ nên dùng because of.", "Because + S+V; because of + noun/V-ing."],
    ["Ms. Rivera is responsible _____ training new employees.", "", ["to", "for", "with", "at"], 1, "Cô Rivera chịu trách nhiệm đào tạo nhân viên mới.", "Collocation: be responsible for + N/V-ing.", "Học nguyên cụm responsible for."],
    ["The director requested that every department _____ its budget.", "", ["reviews", "reviewed", "review", "reviewing"], 2, "Giám đốc yêu cầu mỗi phòng ban xem lại ngân sách.", "Request that + S + V nguyên mẫu là cấu trúc giả định.", "request/suggest/require that + V-bare."],
    ["Our supplier delivered the materials two days _____ schedule.", "", ["ahead of", "according", "between", "until"], 0, "Nhà cung cấp giao vật liệu sớm hơn lịch hai ngày.", "Collocation 'ahead of schedule' nghĩa là sớm hơn kế hoạch.", "Gặp schedule → nhớ ahead of/on/behind schedule."],
    ["Neither the assistants nor the manager _____ available.", "", ["are", "were", "is", "have"], 2, "Cả trợ lý lẫn quản lý đều không rảnh.", "Neither...nor chia động từ theo chủ ngữ gần nhất: manager số ít.", "Either/neither...or/nor → nhìn chủ ngữ gần động từ."],
    ["The warranty will remain valid _____ the product is used properly.", "", ["provided that", "due to", "during", "in spite of"], 0, "Bảo hành vẫn có hiệu lực miễn là sản phẩm được dùng đúng cách.", "Provided that nối một mệnh đề điều kiện đầy đủ.", "S+V phía sau → cần liên từ; xét nghĩa điều kiện."],
  ],
  "part-6": [
    ["Choose the best word for blank (1).", "To: All Staff\nThe west elevator will be unavailable Monday _____ scheduled maintenance. Please use the east elevator.", ["because", "because of", "although", "therefore"], 1, "Thang máy phía tây sẽ không hoạt động vào thứ Hai vì bảo trì định kỳ.", "Sau blank là cụm danh từ scheduled maintenance nên dùng because of.", "Sau chỗ trống không có S+V → chọn giới từ."],
    ["Choose the best transition.", "Sales increased in the first quarter. _____, operating costs also rose.", ["However", "For example", "Otherwise", "Similarly to"], 0, "Doanh số tăng trong quý một. Tuy nhiên, chi phí vận hành cũng tăng.", "Hai ý tương phản kết quả tốt và chi phí tăng, nên dùng However.", "Ý sau bẻ hướng → however/nevertheless."],
    ["Choose the best sentence for the blank.", "The workshop begins at 9 A.M. _____. Participants should arrive fifteen minutes early.", ["Lunch was delicious.", "Registration will open at 8:30 A.M.", "The building was sold last year.", "Our products are affordable."], 1, "Hội thảo bắt đầu lúc 9 giờ. Quầy đăng ký mở lúc 8:30. Người tham gia nên đến sớm 15 phút.", "Câu về đăng ký lúc 8:30 liên kết trực tiếp với yêu cầu đến sớm.", "Điền câu: soi từ lặp/chủ đề và mốc thời gian trước–sau."],
    ["Choose the best word for blank (2).", "We received your application last Friday and are currently _____ it.", ["review", "reviewed", "reviewing", "reviewer"], 2, "Chúng tôi nhận hồ sơ thứ Sáu và hiện đang xem xét nó.", "Currently + are cho dấu hiệu hiện tại tiếp diễn: are reviewing.", "be + currently + V-ing."],
    ["Choose the best connector.", "The printer is old; _____, it still produces clear documents.", ["therefore", "however", "as a result", "furthermore"], 1, "Máy in đã cũ; tuy nhiên, nó vẫn in tài liệu rõ.", "Old đối lập với still produces clear documents.", "Dấu ; ___, thường nhận trạng từ nối; bẻ hướng = however."],
    ["Choose the best word for blank (3).", "Customers may return unused items _____ thirty days of purchase.", ["within", "among", "toward", "beside"], 0, "Khách hàng có thể trả hàng chưa dùng trong vòng 30 ngày.", "Within + khoảng thời gian nghĩa là không quá thời hạn đó.", "Deadline: within + số ngày."],
    ["Choose the best sentence.", "The lobby is being renovated this week. _____. We apologize for the inconvenience.", ["Visitors should use the side entrance.", "The annual report shows a profit.", "Tickets sold out yesterday.", "The applicant has a degree."], 0, "Sảnh đang sửa trong tuần này. Khách nên dùng cửa bên.", "Câu chỉ dẫn dùng lối khác là hệ quả trực tiếp của việc sửa sảnh.", "Điền câu: chọn câu giải quyết vấn đề vừa nêu."],
    ["Choose the best word.", "The position requires excellent communication skills. _____, candidates must be available on weekends.", ["In addition", "Instead", "Nevertheless", "For instance"], 0, "Vị trí cần kỹ năng giao tiếp tốt. Ngoài ra, ứng viên phải làm được cuối tuần.", "Ý sau bổ sung thêm yêu cầu nên dùng In addition.", "Ý cùng chiều/bổ sung → furthermore/in addition."],
    ["Choose the best form.", "Your order has been shipped and should _____ by Thursday.", ["arrive", "arrived", "arrival", "arriving"], 0, "Đơn hàng đã được gửi và dự kiến đến trước thứ Năm.", "Modal should + động từ nguyên mẫu.", "Modal can/will/should + V-bare."],
    ["Choose the best pronoun.", "The new policy is posted online, where employees can read _____ in full.", ["it", "its", "itself", "them"], 0, "Chính sách mới được đăng trực tuyến, nơi nhân viên có thể đọc toàn bộ nó.", "Đại từ it thay cho danh từ số ít policy và làm tân ngữ.", "Soi danh từ thay thế: số ít vật → it."],
  ],
  "part-7": [
    ["Why was the email written?", "To: Staff\nThe parking lot will close Friday for resurfacing. Employees may use the garage on Pine Street at no charge.", ["To announce temporary parking arrangements", "To advertise a new vehicle", "To request a payment", "To cancel a staff meeting"], 0, "Email được viết để thông báo phương án đỗ xe tạm thời.", "Câu đầu nêu bãi xe đóng; câu sau cung cấp nơi thay thế.", "Câu mục đích thường nằm ở tiêu đề và 1–2 câu đầu."],
    ["What should employees do on Friday?", "The parking lot will close Friday. Employees may use the garage on Pine Street at no charge.", ["Work from home", "Pay a parking fee", "Use the Pine Street garage", "Contact the city"], 2, "Nhân viên nên dùng nhà để xe ở phố Pine.", "Thông tin được nêu trực tiếp ở câu thứ hai.", "Scanning: tìm đúng từ Friday rồi đọc quanh nó."],
    ["What is indicated about the order?", "Order 4812: Desk lamp — Shipped May 3 — Expected delivery May 6.", ["It has been canceled.", "It is on its way.", "It requires payment.", "It contains office chairs."], 1, "Đơn hàng đang trên đường giao.", "Trạng thái Shipped và ngày giao dự kiến cho thấy hàng đã gửi.", "Paraphrase: shipped = on its way."],
    ["What does the customer request?", "The printer arrived yesterday, but the power cable was missing. Please send the cable as soon as possible.", ["A refund for the printer", "A replacement cable", "A user manual", "A later delivery"], 1, "Khách hàng yêu cầu gửi dây nguồn thay thế.", "Câu cuối yêu cầu send the cable.", "Đọc câu chứa please/request/would like để tìm yêu cầu."],
    ["What can be inferred about Ms. Long?", "Ms. Long: I can join the 2 P.M. call, but I have a client visit at 3.", ["She is free all afternoon.", "She cannot attend the 2 P.M. call.", "She has another appointment afterward.", "She canceled a client visit."], 2, "Có thể suy ra cô Long có một cuộc hẹn khác sau cuộc gọi.", "Client visit lúc 3 giờ diễn ra sau call lúc 2 giờ.", "Inference vẫn phải có bằng chứng; nối hai mốc thời gian."],
    ["What does 'complimentary' most nearly mean?", "Guests receive complimentary breakfast during their stay.", ["free", "late", "healthy", "packaged"], 0, "Khách được bữa sáng miễn phí trong thời gian lưu trú.", "Trong ngữ cảnh khách sạn, complimentary đồng nghĩa free.", "Đoán từ: thay từng đáp án vào câu và xét ngữ cảnh dịch vụ."],
    ["Which product qualifies for the discount?", "SALE: Orders over $200 receive 15% off. Invoice: Monitor $180 + keyboard $35.", ["Only the monitor", "Only the keyboard", "The combined order", "Neither item nor the order"], 2, "Tổng đơn hàng đủ điều kiện giảm giá.", "180 + 35 = 215, cao hơn ngưỡng 200; phải đối chiếu quảng cáo và hóa đơn.", "Đoạn kép: nối điều kiện ở văn bản 1 với số liệu văn bản 2."],
    ["Why will the event start late?", "Notice: The keynote begins at 10:30 instead of 10:00 because the speaker's train was delayed.", ["The room is occupied", "The speaker's transportation was delayed", "Registration took longer", "The schedule was printed incorrectly"], 1, "Sự kiện bắt đầu muộn vì phương tiện của diễn giả bị trễ.", "Train was delayed được diễn đạt lại thành transportation was delayed.", "Tìm because để bắt nguyên nhân; chú ý paraphrase."],
    ["Who is the intended reader?", "Please submit your expense receipts to Accounting by June 5. Reimbursement will appear in the next payroll deposit.", ["Job applicants", "Company employees", "Hotel guests", "Store customers"], 1, "Người đọc mục tiêu là nhân viên công ty.", "Expense receipts, Accounting và payroll là ngữ cảnh nội bộ công ty.", "Soi vai trò qua từ công sở: payroll/accounting/employee portal."],
    ["Where should the attachment be added?", "[1] Thank you for your interest. [2] The brochure provides package prices. [3] Please review it before our call. [4]", ["Position 1", "Position 2", "Position 3", "Position 4"], 2, "Tệp đính kèm nên được nhắc trước câu 'Vui lòng xem nó'.", "Đại từ it trong câu sau cần quay lại brochure/attachment ngay trước đó.", "Điền câu Part 7: soi đại từ this/it/they để tìm câu tiền tố."],
  ],
};

const p3 = readingSeeds["part-7"].map((row) => [
  row[0],
  `Woman: We planned to use Room A, but it is being repaired. Man: Actually, Room C is available after two. ${row[1]}`,
  row[2], row[3], row[4],
  `Đọc câu hỏi trước, xác định người nói và nghe từ bẻ hướng 'but/actually'. ${row[5]}`,
  `Part 3: đáp án thường chạy theo thứ tự đầu–giữa–cuối. ${row[6]}`,
  "We planned to use Room A, but it is being repaired. Actually, Room C is available after two."
]);

const p4 = readingSeeds["part-7"].map((row) => [
  row[0],
  `Announcement: Attention passengers. The departure information has changed. ${row[1]}`,
  row[2], row[3], row[4],
  `Đây là bài nói một người; xác định loại thông báo và từ chuyển ý. ${row[5]}`,
  `Part 4: đọc trước 3 câu hỏi và khoanh từ khóa khác nhau. ${row[6]}`,
  "Attention passengers. Please note that the departure information has changed."
]);

export const fullQuestionBank = {
  "part-1": [...part1QuestionPool],
  "part-2": p2.map((row, i) => makeQuestion("part-2", i + 1, row)),
  "part-3": p3.map((row, i) => ({...makeQuestion("part-3", i + 1, row), groupId:`part-3-${Math.floor(i/3)+1}`})),
  "part-4": p4.map((row, i) => ({...makeQuestion("part-4", i + 1, row), groupId:`part-4-${Math.floor(i/3)+1}`})),
  "part-5": readingSeeds["part-5"].map((row, i) => makeQuestion("part-5", i + 1, row)),
  "part-6": readingSeeds["part-6"].map((row, i) => makeQuestion("part-6", i + 1, row)),
  "part-7": readingSeeds["part-7"].map((row, i) => makeQuestion("part-7", i + 1, row)),
};

export const studyModules = [
  {id:"part-5",part:"Part 5",title:"Incomplete Sentences",subtitle:"Từ loại · Liên từ · Collocations",skill:"Reading",format:"30 câu thật · 4 lựa chọn",tips:["Nhận diện đuôi: noun -tion/-ment; adjective -ive/-al; adverb -ly.","7 vị trí vàng: mạo từ + (adj) + noun; be + adj; modal + V-bare; preposition + N/V-ing.","Sau blank là S+V chọn liên từ; sau blank là noun/V-ing chọn giới từ.","Học nguyên cụm: responsible for, comply with, ahead of schedule."]},
  {id:"part-6",part:"Part 6",title:"Text Completion",subtitle:"Từ nối · Đại từ · Điền cả câu",skill:"Reading",format:"16 câu thật · 4 đoạn",tips:["Đọc một câu trước và sau chỗ trống, không chỉ nhìn riêng blank.","Therefore/kết quả; However/tương phản; Furthermore/bổ sung.","Điền cả câu: soi đại từ it/this/they và từ khóa lặp.","Xác định văn bản là email, notice hay article để chọn giọng phù hợp."]},
  {id:"part-7",part:"Part 7",title:"Reading Comprehension",subtitle:"Skimming · Scanning · Đối chiếu",skill:"Reading",format:"54 câu thật · đoạn đơn/kép/ba",tips:["Ưu tiên nhóm 155–200 khi đầu óc còn tỉnh; quay lại 147–154 sau.","Skim mục đích/người gửi; scan tên, ngày, số tiền theo câu hỏi.","Đoạn kép/ba: ghi văn bản chứa điều kiện và văn bản chứa dữ liệu.","Câu từ vựng: thay đáp án vào đúng ngữ cảnh, không chọn nghĩa quen nhất."]},
  {id:"part-1",part:"Part 1",title:"Photographs",subtitle:"Hành động · Trạng thái · Vị trí",skill:"Listening",format:"6 câu thật · 4 lựa chọn",tips:["Nhìn tay, mắt và vật thể chính trước khi nghe.","Không có người: cảnh giác is/are being V3 vì thường bịa hành động.","Wearing = đã mặc; putting on = đang mặc vào.","Chỉ chọn điều nhìn thấy, không suy đoán cảm xúc hay mục đích."]},
  {id:"part-2",part:"Part 2",title:"Question–Response",subtitle:"Wh- · Lặp âm · Trả lời gián tiếp",skill:"Listening",format:"25 câu thật · chỉ A/B/C",tips:["Wh-question loại ngay Yes/No/Sure.","Đáp án lặp nguyên từ/âm câu hỏi thường là bẫy.","Soi thì: did/yesterday không đi với will/tomorrow.","I don't know/Let me check/It hasn't been decided có thể là đáp án gián tiếp đúng — không phải quy tắc 99% tuyệt đối."]},
  {id:"part-3",part:"Part 3",title:"Short Conversations",subtitle:"2–3 người · Hàm ý · Bảng biểu",skill:"Listening",format:"39 câu thật · 13 đoạn × 3",tips:["Đọc 3 câu hỏi trước audio, gạch tên/ngày/địa điểm.","Theo dõi giọng nam/nữ và vai trò từng người.","But/however/actually thường báo hiệu đáp án sau đó.","Ba câu hỏi thường đi theo trật tự đầu–giữa–cuối audio."]},
  {id:"part-4",part:"Part 4",title:"Short Talks",subtitle:"Thông báo · Tin nhắn · Bản tin",skill:"Listening",format:"30 câu thật · 10 bài × 3",tips:["Nhận diện loại bài nói ngay câu mở đầu.","Đọc trước bảng biểu và xác định dòng/cột cần đối chiếu.","Nghe paraphrase: purchase=buy, delay=postpone, complimentary=free.","Câu hàm ý: nghe một câu trước và sau câu trích dẫn."]},
];

export const speakingWritingModule = {
  id:"speaking-writing",
  title:"Speaking & Writing 150+",
  tips:[
    "Tả tranh 3 câu: This is a picture of... → In the center... → In the background...",
    "Email: Thank you for contacting us regarding... → I am pleased to inform you... → Please feel free to contact me...",
    "Nói rõ, đủ nhiệm vụ và đúng thì quan trọng hơn dùng từ quá khó.",
  ],
};

export const cheatSheetSections = studyModules.map(module => ({
  id: module.id,
  label: module.part,
  title: module.title,
  skill: module.skill,
  tips: module.tips,
  tags: module.id === "part-5" ? ["#TuLoai", "#7ViTriVang", "#LienTuGioiTu"] : module.id === "part-2" ? ["#WhQuestion", "#SameSound", "#TraLoiGianTiep"] : [`#${module.part.replace(" ", "")}`, "#Meo3Giay"],
}));
