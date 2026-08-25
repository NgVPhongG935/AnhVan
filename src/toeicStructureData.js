/**
 * TOEIC test map aligned with the current ETS test format.
 * Practice questions in this project are original ETS-style simulations.
 */
export const toeicSections=[
 {id:'reading',name:'Reading',totalQuestions:100,totalMinutes:75,order:1,description:'Đọc hiểu ngữ pháp và văn bản công sở'},
 {id:'listening',name:'Listening',totalQuestions:100,totalMinutes:45,order:2,description:'Nghe hiểu tình huống giao tiếp nơi làm việc'},
 {id:'speaking',name:'Speaking',totalQuestions:11,totalMinutes:20,order:3,description:'Nói rõ ràng và hoàn thành đúng nhiệm vụ'},
 {id:'writing',name:'Writing',totalQuestions:8,totalMinutes:60,order:4,description:'Viết câu, email và bài luận quan điểm'},
]

export const toeicStructure=[
 {id:'reading-word-form',section:'Reading',part:'Part 5',title:'Incomplete Sentences',viTitle:'Điền câu – Từ loại 5 giây',realQuestions:30,range:'Câu 101–130',recommendedSeconds:25,miniSize:10,recommended:true,focus:'Tỷ lệ luyện mô phỏng: 18–20 câu ngữ pháp + 10–12 câu từ vựng (ETS không công bố quota cố định)',positionNote:'Dạng từ loại/ngữ pháp thường gặp trong nhóm câu 101–120 Part 5.'},
 {id:'reading-connectors',section:'Reading',part:'Part 5',title:'Incomplete Sentences',viTitle:'Liên từ & Giới từ',realQuestions:30,range:'Câu 101–130',recommendedSeconds:25,miniSize:10,focus:'Although/Despite, Because/Due to và giới từ công sở',positionNote:'Dạng liên từ/giới từ thường xuất hiện trong Part 5, câu 101–130.'},
 {id:'reading-pronouns',section:'Reading',part:'Part 5',title:'Incomplete Sentences',viTitle:'Đại từ & Hòa hợp',realQuestions:30,range:'Câu 101–130',recommendedSeconds:25,miniSize:10,focus:'Đại từ sở hữu, phản thân và hòa hợp chủ–vị',positionNote:'Dạng đại từ/hòa hợp chủ–vị thường xuất hiện trong Part 5, câu 101–130.'},
 {id:'reading-6',section:'Reading',part:'Part 6',title:'Text Completion',viTitle:'Điền đoạn văn ngắn',realQuestions:16,range:'Câu 131–146',recommendedSeconds:35,miniSize:8,focus:'4 văn bản × 4 câu; điền từ và điền cả câu theo ngữ cảnh',positionNote:'Đây là dạng Text Completion thuộc câu 131–146 Part 6.'},
 {id:'reading-7-single',section:'Reading',part:'Part 7A',title:'Single Passages',viTitle:'Đọc hiểu đoạn đơn',realQuestions:29,range:'Câu 147–175',recommendedSeconds:55,miniSize:10,focus:'Email, chuỗi tin nhắn, biểu mẫu, hóa đơn và bài báo',positionNote:'Đây là dạng đoạn đơn thuộc 29 câu đầu của Part 7, khoảng câu 147–175.'},
 {id:'reading-7-multiple',section:'Reading',part:'Part 7B',title:'Multiple Passages',viTitle:'Đọc hiểu đoạn kép & ba',realQuestions:25,range:'Câu 176–200',recommendedSeconds:70,miniSize:10,focus:'Đối chiếu 2–3 văn bản: email, bảng giá, đơn hàng, khiếu nại',positionNote:'Đây là dạng đoạn kép/ba thuộc 25 câu cuối Part 7, khoảng câu 176–200.'},

 {id:'listening-1',section:'Listening',part:'Part 1',title:'Photographs',viTitle:'Mô tả tranh',realQuestions:6,range:'Câu 1–6',recommendedSeconds:12,miniSize:6,focus:'Bộ luyện mô phỏng: 4 tranh người + 2 tranh đồ vật; ETS cố định tổng 6 câu nhưng không cam kết tỷ lệ chủ thể',positionNote:'Đây là câu mô tả tranh thuộc câu 1–6 Part 1.'},
 {id:'listening-2',section:'Listening',part:'Part 2',title:'Question–Response',viTitle:'Hỏi – Đáp',realQuestions:25,range:'Câu 7–31',recommendedSeconds:10,miniSize:10,focus:'3 lựa chọn A/B/C; Wh-, Yes/No, câu hỏi đuôi và trả lời gián tiếp',positionNote:'Đây là dạng Question–Response thuộc câu 7–31 Part 2; chỉ có A, B, C.'},
 {id:'listening-3',section:'Listening',part:'Part 3',title:'Short Conversations',viTitle:'Hội thoại ngắn',realQuestions:39,range:'Câu 32–70',recommendedSeconds:20,miniSize:9,focus:'13 hội thoại × 3 câu; 2–3 người, graphic và câu hàm ý',positionNote:'Đây là dạng hội thoại thuộc câu 32–70 Part 3.'},
 {id:'listening-4',section:'Listening',part:'Part 4',title:'Short Talks',viTitle:'Bài nói ngắn',realQuestions:30,range:'Câu 71–100',recommendedSeconds:20,miniSize:9,focus:'10 bài nói × 3 câu; thông báo, tin nhắn thoại, bản tin',positionNote:'Đây là dạng bài nói một người thuộc câu 71–100 Part 4.'},

 {id:'speaking-1',section:'Speaking',part:'Q1–2',title:'Read a Text Aloud',viTitle:'Đọc to đoạn văn',realQuestions:2,range:'Câu 1–2',recommendedSeconds:45,miniSize:5,focus:'45 giây chuẩn bị + 45 giây đọc',positionNote:'Đây là nhiệm vụ Q1–2 của TOEIC Speaking.'},
 {id:'speaking-2',section:'Speaking',part:'Q3–4',title:'Describe a Picture',viTitle:'Miêu tả tranh',realQuestions:2,range:'Câu 3–4',recommendedSeconds:30,miniSize:5,focus:'45 giây chuẩn bị + 30 giây nói',positionNote:'Đây là nhiệm vụ Q3–4 của TOEIC Speaking.'},
 {id:'speaking-3',section:'Speaking',part:'Q5–7',title:'Respond to Questions',viTitle:'Trả lời phỏng vấn ngắn',realQuestions:3,range:'Câu 5–7',recommendedSeconds:30,miniSize:6,focus:'3 giây chuẩn bị; Q5–6 nói 15 giây, Q7 nói 30 giây',positionNote:'Đây là nhiệm vụ Q5–7 của TOEIC Speaking.'},
 {id:'speaking-4',section:'Speaking',part:'Q8–10',title:'Use Information Provided',viTitle:'Trả lời theo bảng biểu',realQuestions:3,range:'Câu 8–10',recommendedSeconds:30,miniSize:6,focus:'45 giây đọc bảng; Q8–9 nói 15 giây, Q10 nói 30 giây',positionNote:'Đây là nhiệm vụ Q8–10 của TOEIC Speaking.'},
 {id:'speaking-5',section:'Speaking',part:'Q11',title:'Express an Opinion',viTitle:'Bày tỏ quan điểm',realQuestions:1,range:'Câu 11',recommendedSeconds:60,miniSize:5,focus:'45 giây chuẩn bị + 60 giây nói có lý do và ví dụ',positionNote:'Đây là nhiệm vụ Q11 cuối bài TOEIC Speaking.'},

 {id:'writing-1',section:'Writing',part:'Q1–5',title:'Picture Sentence',viTitle:'Viết câu theo tranh',realQuestions:5,range:'Câu 1–5',recommendedSeconds:90,miniSize:5,focus:'Mỗi tranh có 2 từ/cụm từ bắt buộc; được phép đổi dạng từ',positionNote:'Đây là nhiệm vụ Q1–5 của TOEIC Writing.'},
 {id:'writing-2',section:'Writing',part:'Q6–7',title:'Respond to a Written Request',viTitle:'Phản hồi email',realQuestions:2,range:'Câu 6–7',recommendedSeconds:600,miniSize:5,focus:'10 phút để đọc và trả lời mỗi email',positionNote:'Đây là nhiệm vụ Q6–7 của TOEIC Writing.'},
 {id:'writing-3',section:'Writing',part:'Q8',title:'Opinion Essay',viTitle:'Viết bài luận quan điểm',realQuestions:1,range:'Câu 8',recommendedSeconds:1800,miniSize:3,focus:'Nêu, giải thích và bảo vệ quan điểm; bài hiệu quả thường tối thiểu 300 từ',positionNote:'Đây là nhiệm vụ Q8 cuối bài TOEIC Writing.'},
]

export const officialFormatSummary={
 listening:'100 câu · 45 phút · Part 1–4',
 reading:'100 câu · 75 phút · Part 5–7',
 speaking:'11 câu · khoảng 20 phút',
 writing:'8 câu · khoảng 60 phút',
 copyrightNotice:'Câu hỏi trong ứng dụng là dữ liệu mô phỏng tự biên soạn theo phong cách ETS, không sao chép đề thi ETS có bản quyền.',
}
