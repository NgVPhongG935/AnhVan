import {BookOpenCheck,Leaf,Lightbulb,Moon,Sun} from 'lucide-react'

export default function Navbar({dark,onToggleTheme,onHome,onTips,onFlash,onZeroToHero}){
 return <nav className="nav"><button className="logo" onClick={onHome}>TM</button><div className="brand-copy"><span>TOEIC Mastery</span><small>ETS Practice Lab</small></div><div className="quick-nav"><button onClick={onHome}><BookOpenCheck/> Luyện Part</button><button className="zero-nav" onClick={onZeroToHero}><Leaf/> Ôn Cấp Tốc <em>(Mất Gốc)</em></button><button onClick={onTips}><Lightbulb/> Kho mẹo</button><button onClick={onFlash}>Flashcard 600</button></div><button className="theme" aria-label="Đổi giao diện" onClick={onToggleTheme}>{dark?<Sun/>:<Moon/>}</button></nav>
}
