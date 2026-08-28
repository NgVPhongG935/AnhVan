import {useState} from 'react'
import {CheckCircle2,Moon,Rocket,ShieldCheck,Sun,Zap} from 'lucide-react'
import CrashCourseMode from './CrashCourseMode'
import FullTestSimulator from './FullTestSimulator'
import {useTheme} from './hooks'

const KEY='toeic-linear-450-v3'
const read=()=>{try{return{stage:0,item:0,phase:'theory',finished:false,...JSON.parse(localStorage.getItem(KEY))}}catch{return{stage:0,item:0,phase:'theory',finished:false}}}
export default function App(){
 const[dark,setDark]=useTheme(),[learning,setLearning]=useState(false),[testing,setTesting]=useState(false),[refresh,setRefresh]=useState(0)
 const progress=read(refresh),completed=progress.finished?50:progress.stage*10+progress.item,marker=Math.min(100,Math.floor(completed/50*100)+1),started=completed>0||progress.phase==='practice'||progress.finished
 if(learning)return <CrashCourseMode onExit={()=>{setLearning(false);setRefresh(value=>value+1)}}/>
 if(testing)return <FullTestSimulator onExit={()=>setTesting(false)}/>
 return <main className="one-click-home"><button className="one-click-theme" aria-label="Đổi giao diện" onClick={()=>setDark(!dark)}>{dark?<Sun/>:<Moon/>}</button><section className="one-click-hero"><div className="rescue-mark"><Zap/><span>ZERO-TO-HERO · L&R 450+ · S&W 150+</span></div><h1>Cứu Nguy Mất Gốc:<br/><em>Ôn TOEIC Theo Một Đường Duy Nhất</em></h1><p>Không menu phân mảnh, không phải chọn Part. Hệ thống tự dẫn bạn qua 5 chặng theo thứ tự dễ kéo điểm nhất.</p><button className="one-click-start" onClick={()=>setLearning(true)}><Rocket/><span>{started&&!progress.finished?<>Tiếp tục bài học <small>(Mốc {marker}/100)</small></>:progress.finished?<>Xem lại lộ trình đã hoàn thành</>:<>BẮT ĐẦU ÔN CẤP TỐC <small>(MỤC TIÊU 450+)</small></>}</span></button><div className="one-click-trust"><span><ShieldCheck/> Tự lưu đúng câu đang học</span><span><CheckCircle2/> 5 chặng · 50 câu trọng tâm</span><span><CheckCircle2/> Dịch và giải thích tức thì</span></div></section><section className="full-test-banner"><span>🎯</span><div><small>SAU KHI ÔN XONG 5 CHẶNG</small><h2>PHÒNG THI THỬ TOEIC — BIẾT ĐIỂM NGAY</h2><p>Mini Test 50 câu hoặc Full Test 200 câu · Đếm ngược · Thống kê Part · Xem lại lời giải</p></div><button onClick={()=>setTesting(true)}>Vào phòng thi thử</button></section><footer>TOEIC Mastery Hub · Một nút bắt đầu · Một lộ trình xuyên suốt</footer></main>
}