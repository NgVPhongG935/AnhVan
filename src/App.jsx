import { useEffect, useRef, useState } from "react";
import {
  ArrowLeft,
  ArrowRight,
  BookOpen,
  Bookmark,
  CheckCircle2,
  ChevronRight,
  Clock3,
  Hash,
  Headphones,
  Home,
  Lightbulb,
  Mic,
  Pause,
  PenLine,
  RotateCcw,
  Search,
  Sparkles,
  Volume2,
  XCircle,
} from "lucide-react";
import {
  dictionary,
  parts,
  tipGroups,
  vocabulary,
  vocabularyGoal,
} from "./toeicData";
import { useTheme } from "./hooks";
import LessonGuideModal from "./LessonGuideModal";
import QuizPractice from "./QuizPractice";
import Navbar from "./Navbar";
import ZeroToHeroPage from "./ZeroToHeroPage";

const zeroToHeroStages = [
  { id: "vocabulary", number: 1, title: "50 từ công sở gặp là có điểm", icon: BookOpen },
  { id: "part5", number: 2, title: "Mẹo Part 5 trong 5 giây", icon: Sparkles },
  { id: "listening", number: 3, title: "Phản xạ nghe Part 1 & 2", icon: Headphones },
  { id: "templates", number: 4, title: "Mẫu Speaking & Writing", icon: PenLine },
];

const icons = {
  Listening: Headphones,
  Reading: BookOpen,
  Speaking: Mic,
  Writing: PenLine,
};
const speak = (text, rate = 0.9) => {
  if (!("speechSynthesis" in window)) return;
  speechSynthesis.cancel();
  const u = new SpeechSynthesisUtterance(text);
  u.lang = "en-US";
  u.rate = rate;
  const vs = speechSynthesis.getVoices();
  u.voice =
    vs.find((v) => v.lang === "en-US") ||
    vs.find((v) => v.lang.startsWith("en"));
  speechSynthesis.speak(u);
};
const getSaved = () => {
  try {
    return JSON.parse(localStorage.getItem("ets-mastery-results")) || {};
  } catch {
    return {};
  }
};

function Words({ text, onWord }) {
  return (
    <>
      {text.split(/(\s+)/).map((token, i) => {
        const clean = token.toLowerCase().replace(/[^a-z']/g, "");
        return clean && dictionary[clean] ? (
          <button className="word" onClick={() => onWord(clean)} key={i}>
            {token}
          </button>
        ) : (
          token
        );
      })}
    </>
  );
}
function Scene({ index }) {
  const col = index % 5,
    row = Math.floor(index / 5);
  return (
    <div
      className="scene"
      style={{ backgroundPosition: `${col * 25}% ${row * 100}%` }}
      role="img"
      aria-label="TOEIC workplace scene"
    />
  );
}
function Timer({ initial, running, onEnd }) {
  const [seconds, setSeconds] = useState(initial);
  useEffect(() => setSeconds(initial), [initial]);
  useEffect(() => {
    if (!running) return;
    const id = setInterval(
      () =>
        setSeconds((s) => {
          if (s <= 1) {
            clearInterval(id);
            onEnd?.();
            return 0;
          }
          return s - 1;
        }),
      1000,
    );
    return () => clearInterval(id);
  }, [running, onEnd]);
  return (
    <div className={`timer ${seconds < 6 ? "urgent" : ""}`}>
      <Clock3 />
      {Math.floor(seconds / 60)
        .toString()
        .padStart(2, "0")}
      :{(seconds % 60).toString().padStart(2, "0")}
    </div>
  );
}

function Dashboard({ results, onStart, onTips, onZeroToHero, bookmarkCount }) {
  const groups = ["Listening", "Reading", "Speaking", "Writing"];
  return (
    <div className="dashboard">
      <section className="hero">
        <div>
          <span className="kicker">TOEIC MASTERY LAB</span>
          <h1>
            Luyện đúng Part.
            <br />
            <em>Tiến bộ đúng điểm yếu.</em>
          </h1>
          <p>
            Chọn bất kỳ kỹ năng nào để bắt đầu mini-test chuẩn cấu trúc ETS.
            Không lịch ép buộc, không bài học rườm rà.
          </p>
        </div>
        <div className="goal">
          <span>MỤC TIÊU</span>
          <strong>L&R 450+</strong>
          <strong>S&W 150+</strong>
        </div>
      </section>
      <section className="zero-hero-banner">
        <div className="zero-hero-title">
          <span>ZERO-TO-HERO MODE · DÀNH CHO NGƯỜI MẤT GỐC</span>
          <h2>🌱 Lộ Trình Cứu Nguy Cho Người Mất Gốc</h2>
          <p>Mục tiêu 450 LR · 150 SW — học từ nền tảng, có người “cầm tay” trước khi luyện đề.</p>
        </div>
        <div className="zero-stage-strip">
          {zeroToHeroStages.map((stage) => {
            const Icon = stage.icon;
            return (
              <button key={stage.id} onClick={() => onZeroToHero(stage.id)}>
                <span><Icon /></span>
                <div><b>CHẶNG {stage.number}</b><strong>{stage.title}</strong></div>
                <ChevronRight />
              </button>
            );
          })}
        </div>
      </section>
      <button className="tips-banner" onClick={onTips}>
        <div>
          <span>
            <Lightbulb /> ĐẠI KHO MẸO TOEIC
          </span>
          <h2>Cheats & Hacks thực chiến</h2>
          <p>
            Tra nhanh mẹo Part 1–5, bảng liên từ–giới từ và chiến lược khoanh
            lụi.
          </p>
        </div>
        <div>
          <strong>{tipGroups.length}</strong>
          <small>chuyên đề</small>
          {bookmarkCount > 0 && (
            <em>
              <Bookmark /> {bookmarkCount} đã ghim
            </em>
          )}
        </div>
        <ChevronRight />
      </button>
      {groups.map((group) => (
        <section className="part-section" key={group}>
          <div className="section-head">
            <div>
              {(() => {
                const I = icons[group];
                return <I />;
              })()}
              <div>
                <h2>{group}</h2>
                <p>
                  {group === "Listening"
                    ? "Nghe một lần · Phản xạ nhanh"
                    : group === "Reading"
                      ? "Ngữ pháp · Từ vựng công sở"
                      : group === "Speaking"
                        ? "Nói rõ · Đúng nhịp · Đủ ý"
                        : "Viết đúng yêu cầu · Rõ ràng"}
                </p>
              </div>
            </div>
            <span>{parts.filter((p) => p.skill === group).length} PARTS</span>
          </div>
          <div className="part-grid">
            {parts
              .filter((p) => p.skill === group)
              .map((part) => {
                const done = results[part.id];
                return (
                  <button
                    className={`part-card ${part.accent}`}
                    onClick={() => onStart(part)}
                    key={part.id}
                  >
                    <div className="part-top">
                      <span>{part.part}</span>
                      {done && (
                        <small>
                          <CheckCircle2 /> Tốt nhất {done.best}%
                        </small>
                      )}
                    </div>
                    <h3>{part.title}</h3>
                    <p>{part.description}</p>
                    <div className="meta">
                      <span>
                        <BookOpen />
                        {part.questions.length} câu
                      </span>
                      <span>
                        <Clock3 />
                        {part.time < 60
                          ? part.time + " giây/câu"
                          : Math.round(part.time / 60) + " phút/câu"}
                      </span>
                    </div>
                    <b>
                      Bắt đầu mini-test <ChevronRight />
                    </b>
                  </button>
                );
              })}
          </div>
        </section>
      ))}
    </div>
  );
}

function LegacyQuiz({ part, onExit, onFinish, onLookup }) {
  const [index, setIndex] = useState(0),
    [answers, setAnswers] = useState(Array(part.questions.length).fill(null)),
    [running, setRunning] = useState(true);
  const q = part.questions[index],
    choice = answers[index];
  const choose = (i) => {
    if (choice !== null) return;
    const next = [...answers];
    next[index] = i;
    setAnswers(next);
    setRunning(false);
  };
  const next = () => {
    if (index === part.questions.length - 1) onFinish(answers);
    else {
      setIndex((i) => i + 1);
      setRunning(true);
    }
  };
  const timeout = () => {
    if (choice === null) {
      const next = [...answers];
      next[index] = -1;
      setAnswers(next);
    }
  };
  useEffect(() => {
    if (answers[index] === -1) setRunning(false);
  }, [answers, index]);
  return (
    <TestShell part={part} index={index} onExit={onExit}>
      <div className="test-status">
        <span>
          Câu {index + 1}/{part.questions.length}
        </span>
        <div className="progress">
          <i
            style={{ width: `${((index + 1) / part.questions.length) * 100}%` }}
          />
        </div>
        <Timer
          key={index}
          initial={part.time}
          running={running}
          onEnd={timeout}
        />
      </div>
      {q.image !== undefined && <Scene index={q.image} />}
      <div className="question">
        <span>{part.part.toUpperCase()}</span>
        <h2>
          <Words text={q.prompt} onWord={onLookup} />
        </h2>
        {part.skill === "Listening" && (
          <button
            className="audio"
            onClick={() => {
              speak(q.speech || q.prompt, 0.85);
            }}
          >
            <Volume2 /> Phát audio
          </button>
        )}
        <div className="options">
          {q.options.map((o, i) => (
            <button
              disabled={choice !== null}
              onClick={() => choose(i)}
              className={`${choice === i ? "chosen" : ""} ${choice !== null && i === q.answer ? "correct" : ""} ${choice === i && i !== q.answer ? "wrong" : ""}`}
              key={o}
            >
              <b>{String.fromCharCode(65 + i)}</b>
              <Words text={o} onWord={onLookup} />
              {choice !== null && i === q.answer && <CheckCircle2 />}
              {choice === i && i !== q.answer && <XCircle />}
            </button>
          ))}
        </div>
        {choice !== null && (
          <div className={`instant ${choice === q.answer ? "ok" : "no"}`}>
            <div>
              <strong>{choice === q.answer ? "Chính xác" : "Chưa đúng"}</strong>
              <span>{q.translation}</span>
            </div>
            <p>{q.explanation}</p>
            <small>
              <Lightbulb />
              {q.tip}
            </small>
            <button onClick={next}>
              {index === part.questions.length - 1
                ? "Xem kết quả"
                : "Câu tiếp theo"}
              <ArrowRight />
            </button>
          </div>
        )}
      </div>
    </TestShell>
  );
}

function SpeakingTest({ part, onExit, onFinish, onLookup }) {
  const [index, setIndex] = useState(0),
    [running, setRunning] = useState(false),
    [transcript, setTranscript] = useState(""),
    rec = useRef();
  const q = part.questions[index];
  const start = () => {
    setRunning(true);
    setTranscript("");
    const SR = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SR) {
      setTranscript(
        "Trình duyệt chưa hỗ trợ nhận diện giọng nói. Bạn vẫn có thể tự luyện với timer.",
      );
      return;
    }
    rec.current = new SR();
    rec.current.lang = "en-US";
    rec.current.interimResults = true;
    rec.current.onresult = (e) =>
      setTranscript(
        Array.from(e.results)
          .map((r) => r[0].transcript)
          .join(""),
      );
    rec.current.onend = () => setRunning(false);
    rec.current.start();
  };
  const stop = () => {
    rec.current?.stop();
    setRunning(false);
  };
  const next = () => {
    if (index === part.questions.length - 1) onFinish(Array(10).fill(1));
    else {
      setIndex((i) => i + 1);
      setTranscript("");
      setRunning(false);
    }
  };
  return (
    <TestShell part={part} index={index} onExit={onExit}>
      <div className="test-status">
        <span>
          Bài {index + 1}/{part.questions.length}
        </span>
        <div className="progress">
          <i style={{ width: `${(index + 1) * 10}%` }} />
        </div>
        <Timer key={index} initial={part.time} running={running} onEnd={stop} />
      </div>
      {q.image !== undefined && <Scene index={q.image} />}
      <div className="speaking-panel">
        <span>{q.title || "DESCRIBE A PICTURE"}</span>
        {q.prompt && (
          <p className="read-text">
            <Words text={q.prompt} onWord={onLookup} />
          </p>
        )}
        {q.outline && (
          <ol>
            {q.outline.map((x) => (
              <li key={x}>{x}</li>
            ))}
          </ol>
        )}
        <div className="speak-actions">
          {part.part === "Part 1" && (
            <button
              className="sample-audio"
              onClick={() => speak(q.prompt, 0.82)}
            >
              <Volume2 /> Nghe mẫu
            </button>
          )}
          <button
            className={`record ${running ? "active" : ""}`}
            onClick={running ? stop : start}
          >
            {running ? <Pause /> : <Mic />}
            {running ? "Dừng ghi" : "Bắt đầu nói"}
          </button>
        </div>
        {transcript && (
          <div className="transcript">
            <span>MÁY NGHE ĐƯỢC</span>
            <p>{transcript}</p>
          </div>
        )}
        {q.sample && (
          <details>
            <summary>Xem bài nói mẫu sau khi luyện</summary>
            <p>{q.sample}</p>
          </details>
        )}
        <button className="next-practice" onClick={next}>
          {index === 9 ? "Hoàn thành" : "Bài tiếp theo"}
          <ArrowRight />
        </button>
      </div>
    </TestShell>
  );
}

function WritingTest({ part, onExit, onFinish }) {
  const [index, setIndex] = useState(0),
    [text, setText] = useState(""),
    [shown, setShown] = useState(false),
    [running, setRunning] = useState(true);
  const q = part.questions[index];
  const next = () => {
    if (index === 9) onFinish(Array(10).fill(1));
    else {
      setIndex((i) => i + 1);
      setText("");
      setShown(false);
      setRunning(true);
    }
  };
  return (
    <TestShell part={part} index={index} onExit={onExit}>
      <div className="test-status">
        <span>Bài {index + 1}/10</span>
        <div className="progress">
          <i style={{ width: `${(index + 1) * 10}%` }} />
        </div>
        <Timer
          key={index}
          initial={part.time}
          running={running}
          onEnd={() => setRunning(false)}
        />
      </div>
      <div className="writing-layout">
        <div>
          {q.image !== undefined && <Scene index={q.image} />}
          <div className="email-prompt">
            <span>ĐỀ BÀI · {q.title}</span>
            <h2>{q.prompt}</h2>
            {q.keywords && (
              <div className="keywords">
                {q.keywords.map((k) => (
                  <b key={k}>{k}</b>
                ))}
              </div>
            )}
          </div>
        </div>
        <div className="editor">
          <div>
            <span>CÂU TRẢ LỜI</span>
            <small>
              {text.trim() ? text.trim().split(/\s+/).length : 0} từ
            </small>
          </div>
          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder={
              part.part === "Part 2"
                ? "Dear ...,\n\nThank you for your email..."
                : "Write your sentence here..."
            }
          />
          {q.framework && (
            <div className="framework">
              {q.framework.map((x, i) => (
                <p key={x}>
                  <b>{i + 1}</b>
                  {x}
                </p>
              ))}
            </div>
          )}
          <button
            className="reveal"
            disabled={!text.trim()}
            onClick={() => {
              setShown(true);
              setRunning(false);
            }}
          >
            Nộp & xem bài mẫu
          </button>
          {shown && (
            <div className="model">
              <span>BÀI MẪU 150+</span>
              <p>{q.sample}</p>
              <small>
                <Lightbulb />
                {q.tip || "Đối chiếu: đủ ý, câu rõ ràng và kết thúc lịch sự."}
              </small>
              <button onClick={next}>
                {index === 9 ? "Hoàn thành" : "Bài tiếp theo"}
                <ArrowRight />
              </button>
            </div>
          )}
        </div>
      </div>
    </TestShell>
  );
}

function TestShell({ part, index, onExit, children }) {
  return (
    <div className="test-page">
      <header>
        <button onClick={onExit}>
          <ArrowLeft /> Thoát
        </button>
        <div>
          <span>
            {part.skill} · {part.part}
          </span>
          <strong>Mini-test {Math.floor(index / 10) + 1}</strong>
        </div>
        <span className="ets">ETS FORMAT</span>
      </header>
      {children}
    </div>
  );
}

function Results({ part, answers, onRetry, onHome }) {
  const score =
      part.type === "quiz"
        ? answers.filter((a, i) => a === part.questions[i].answer).length
        : 10,
    pct = score * 10;
  const [hard, setHard] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem("toeic-hard-questions")) || [];
    } catch {
      return [];
    }
  });
  const toggle = (q) => {
    const key = `${part.id}:${q.id}`,
      exists = hard.some((x) => x.key === key),
      next = exists
        ? hard.filter((x) => x.key !== key)
        : [
            ...hard,
            {
              key,
              part: part.title,
              prompt: q.prompt,
              translation: q.translation,
              explanation: q.explanation,
            },
          ];
    setHard(next);
    localStorage.setItem("toeic-hard-questions", JSON.stringify(next));
  };
  return (
    <div className="results">
      <div className="score-ring" style={{ "--score": `${pct * 3.6}deg` }}>
        <span>
          <strong>{pct}</strong>/100
        </span>
      </div>
      <span className="kicker">MINI-TEST HOÀN THÀNH</span>
      <h1>
        {pct >= 80
          ? "Làm rất tốt!"
          : pct >= 50
            ? "Đang tiến bộ!"
            : "Cùng ôn lại nhé!"}
      </h1>
      <p>
        Bạn hoàn thành {part.part} · {part.title}. Kết quả đã được lưu trên
        thiết bị này.
      </p>
      <div className="summary">
        <div>
          <span>Đúng</span>
          <strong>{score}</strong>
        </div>
        <div>
          <span>Cần ôn</span>
          <strong>{10 - score}</strong>
        </div>
        <div>
          <span>Độ chính xác</span>
          <strong>{pct}%</strong>
        </div>
      </div>
      {part.type === "quiz" && (
        <div className="review">
          <h2>Đáp án & lời giải chi tiết</h2>
          {part.questions.map((q, i) => {
            const isHard = hard.some((x) => x.key === `${part.id}:${q.id}`);
            return (
              <details key={q.id} open={answers[i] !== q.answer}>
                <summary>
                  <span className={answers[i] === q.answer ? "pass" : "fail"}>
                    {answers[i] === q.answer ? <CheckCircle2 /> : <XCircle />}
                  </span>
                  <b>Câu {i + 1}</b>
                  <em>Đáp án {String.fromCharCode(65 + q.answer)}</em>
                </summary>
                <p>
                  <strong>Dịch:</strong> {q.translation}
                </p>
                <p>{q.explanation}</p>
                <small>
                  <Lightbulb />
                  {q.tip}
                </small>
                <button
                  className={`save-hard ${isHard ? "saved" : ""}`}
                  onClick={() => toggle(q)}
                >
                  <Bookmark fill={isHard ? "currentColor" : "none"} />
                  {isHard ? "Đã lưu vào sổ tay" : "Lưu câu khó vào sổ tay"}
                </button>
              </details>
            );
          })}
        </div>
      )}
      <div className="result-actions">
        <button onClick={onHome}>
          <Home /> Về Dashboard
        </button>
        <button className="primary" onClick={onRetry}>
          <RotateCcw /> Thử lại câu sai
        </button>
      </div>
    </div>
  );
}

function TipsLibrary({ bookmarks, setBookmarks, onBack }) {
  const [query, setQuery] = useState(""),
    [tag, setTag] = useState("Tất cả"),
    [onlySaved, setOnlySaved] = useState(false);
  const tags = ["Tất cả", ...new Set(tipGroups.flatMap((t) => t.tags))];
  const filtered = tipGroups.filter((t) => {
    const haystack =
      `${t.title} ${t.summary} ${t.category} ${t.tags.join(" ")} ${t.sections.flatMap((s) => [s.title, ...s.items]).join(" ")}`.toLowerCase();
    return (
      (!onlySaved || bookmarks.includes(t.id)) &&
      (tag === "Tất cả" || t.tags.includes(tag)) &&
      haystack.includes(query.toLowerCase())
    );
  });
  const toggle = (id) =>
    setBookmarks((old) =>
      old.includes(id) ? old.filter((x) => x !== id) : [...old, id],
    );
  return (
    <div className="tips-page">
      <header className="tips-hero">
        <button onClick={onBack}>
          <ArrowLeft /> Dashboard
        </button>
        <span className="kicker">COMPREHENSIVE TOEIC CHEATS & HACKS</span>
        <h1>Đại kho mẹo làm bài</h1>
        <p>
          Quy tắc nhận diện nhanh, bảng loại trừ và chiến thuật thực chiến dành
          cho người cần xây nền.
        </p>
        <div className="rule-note">
          <Lightbulb />
          <span>
            <strong>Quy tắc nhanh, không phải phép màu.</strong> Hãy ưu tiên cấu
            trúc và ngữ cảnh khi một câu rơi vào ngoại lệ.
          </span>
        </div>
      </header>
      <div className="tips-tools">
        <label>
          <Search />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Tìm: trạng từ, despite, câu gián tiếp..."
          />
        </label>
        <button
          className={onlySaved ? "active" : ""}
          onClick={() => setOnlySaved(!onlySaved)}
        >
          <Bookmark fill={onlySaved ? "currentColor" : "none"} /> Đã ghim{" "}
          <b>{bookmarks.length}</b>
        </button>
      </div>
      <div className="tag-filter">
        {tags.map((t) => (
          <button
            className={tag === t ? "active" : ""}
            onClick={() => setTag(t)}
            key={t}
          >
            <Hash />
            {t}
          </button>
        ))}
      </div>
      <div className="tips-count">
        Hiển thị <strong>{filtered.length}</strong> chuyên đề
      </div>
      <div className="tips-grid">
        {filtered.map((t) => (
          <article className={`tip-card ${t.color}`} key={t.id}>
            <header>
              <div>
                <span>{t.category}</span>
                <h2>{t.title}</h2>
                <p>{t.summary}</p>
              </div>
              <button
                className={bookmarks.includes(t.id) ? "saved" : ""}
                title="Ghim mẹo"
                onClick={() => toggle(t.id)}
              >
                <Bookmark
                  fill={bookmarks.includes(t.id) ? "currentColor" : "none"}
                />
              </button>
            </header>
            {t.sections.map((s) => (
              <section key={s.title}>
                <h3>{s.title}</h3>
                <ul>
                  {s.items.map((x) => (
                    <li key={x}>{x}</li>
                  ))}
                </ul>
              </section>
            ))}
            <footer>
              {t.tags.map((x) => (
                <button key={x} onClick={() => setTag(x)}>
                  #{x}
                </button>
              ))}
            </footer>
          </article>
        ))}
      </div>
      {!filtered.length && (
        <div className="empty-tips">
          <Search />
          <h2>Không tìm thấy mẹo phù hợp</h2>
          <p>Thử từ khóa khác hoặc bỏ bớt bộ lọc.</p>
          <button
            onClick={() => {
              setQuery("");
              setTag("Tất cả");
              setOnlySaved(false);
            }}
          >
            Xóa bộ lọc
          </button>
        </div>
      )}
    </div>
  );
}

function WelcomeTour({ onClose, onChoose, onTips, onFlash }) {
  return (
    <div className="welcome-overlay">
      <div className="welcome-modal">
        <button className="welcome-close" onClick={onClose}>
          <XCircle />
        </button>
        <span className="kicker">CHÀO MỪNG BẠN ĐẾN TOEIC MASTERY</span>
        <h1>
          Mất gốc không sao.
          <br />
          Mình bắt đầu thật dễ nhé!
        </h1>
        <p>
          Mỗi Part đều có cẩm nang 5 phút và 3 câu làm mẫu trước khi vào đề. Bạn
          không bao giờ bị “ném” thẳng vào bài thi.
        </p>
        <div className="starter-path">
          <button onClick={onFlash}>
            <b>1</b>
            <span>
              <strong>50 từ công sở cốt lõi</strong>
              <small>Flashcard · Xây vốn từ nền</small>
            </span>
            <ArrowRight />
          </button>
          <button
            onClick={() => onChoose(parts.find((p) => p.id === "listening-1"))}
          >
            <b>2</b>
            <span>
              <strong>Mẹo Listening Part 1 & 2</strong>
              <small>Loại “being” · Né bẫy Yes/No</small>
            </span>
            <ArrowRight />
          </button>
          <button
            onClick={() =>
              onChoose(parts.find((p) => p.id === "reading-word-form"))
            }
          >
            <b>3</b>
            <span>
              <strong>Mẹo từ loại Part 5</strong>
              <small>Nhìn đuôi · Khoanh trong 3 giây</small>
            </span>
            <ArrowRight />
          </button>
        </div>
        <div className="welcome-actions">
          <button onClick={onTips}>
            <Lightbulb /> Khám phá kho mẹo
          </button>
          <button className="primary" onClick={onClose}>
            Tự chọn trên Dashboard <ArrowRight />
          </button>
        </div>
      </div>
    </div>
  );
}

function Flashcards({ onBack }) {
  const [known, setKnown] = useState(() => {
      try {
        return JSON.parse(localStorage.getItem("toeic-known-words")) || [];
      } catch {
        return [];
      }
    }),
    [index, setIndex] = useState(0),
    [flipped, setFlipped] = useState(false),
    [filter, setFilter] = useState("all");
  const words =
    filter === "review"
      ? vocabulary.filter((v) => !known.includes(v.id))
      : vocabulary;
  const word = words[index % Math.max(words.length, 1)];
  const rate = (isKnown) => {
    const next = isKnown
      ? [...new Set([...known, word.id])]
      : known.filter((id) => id !== word.id);
    setKnown(next);
    localStorage.setItem("toeic-known-words", JSON.stringify(next));
    setFlipped(false);
    setIndex((i) => i + 1);
  };
  return (
    <div className="flash-page">
      <header>
        <button onClick={onBack}>
          <ArrowLeft /> Dashboard
        </button>
        <span className="kicker">600 CORE TOEIC WORDS</span>
        <h1>Flashcard từ vựng cốt lõi</h1>
        <p>
          Bộ khởi động có {vocabulary.length} từ công sở chất lượng cao, nằm
          trong mục tiêu {vocabularyGoal} từ.
        </p>
      </header>
      <div className="flash-toolbar">
        <div>
          <button
            className={filter === "all" ? "active" : ""}
            onClick={() => {
              setFilter("all");
              setIndex(0);
            }}
          >
            Tất cả
          </button>
          <button
            className={filter === "review" ? "active" : ""}
            onClick={() => {
              setFilter("review");
              setIndex(0);
            }}
          >
            Cần ôn
          </button>
        </div>
        <span>
          <strong>{known.length}</strong>/{vocabularyGoal} đã thuộc
        </span>
      </div>
      {word ? (
        <>
          <button
            className={`study-card ${flipped ? "flipped" : ""}`}
            onClick={() => setFlipped(!flipped)}
          >
            <div className="study-card-inner">
              <section className="study-front">
                <span>{word.type}</span>
                <h2>{word.word}</h2>
                <p>{word.phonetic}</p>
                <i
                  onClick={(e) => {
                    e.stopPropagation();
                    speak(word.word);
                  }}
                >
                  <Volume2 /> Nghe phát âm
                </i>
                <small>Bấm vào thẻ để xem nghĩa</small>
              </section>
              <section className="study-back">
                <span>NGHĨA TIẾNG VIỆT</span>
                <h2>{word.meaning}</h2>
                <div>
                  <strong>VÍ DỤ TOEIC</strong>
                  <p>{word.example}</p>
                  <small>{word.translation}</small>
                </div>
                <i>Bấm để xem lại từ</i>
              </section>
            </div>
          </button>
          <div className="flash-actions">
            <button onClick={() => rate(false)}>
              <XCircle /> Chưa thuộc
            </button>
            <button onClick={() => rate(true)}>
              <CheckCircle2 /> Đã thuộc
            </button>
          </div>
        </>
      ) : (
        <div className="flash-empty">
          <CheckCircle2 />
          <h2>Bạn đã thuộc toàn bộ từ trong bộ này!</h2>
          <button onClick={() => setFilter("all")}>Ôn lại tất cả</button>
        </div>
      )}
    </div>
  );
}

function DictionaryPop({ word, onClose }) {
  if (!word) return null;
  return (
    <div className="dict">
      <button onClick={onClose}>×</button>
      <span>MINI DICTIONARY</span>
      <h3>{word}</h3>
      <p>{dictionary[word]}</p>
      <button className="pronounce" onClick={() => speak(word)}>
        <Volume2 /> Nghe phát âm
      </button>
    </div>
  );
}

export default function App() {
  const [dark, setDark] = useTheme(),
    [active, setActive] = useState(null),
    [guidePart, setGuidePart] = useState(null),
    [quickGuide, setQuickGuide] = useState(false),
    [result, setResult] = useState(null),
    [saved, setSaved] = useState(getSaved),
    [word, setWord] = useState(null),
    [showTips, setShowTips] = useState(false),
    [showFlash, setShowFlash] = useState(false),
    [showZero, setShowZero] = useState(false),
    [zeroInitialStage, setZeroInitialStage] = useState(null),
    [welcome, setWelcome] = useState(
      () => !localStorage.getItem("toeic-welcome-seen"),
    ),
    [unlocked, setUnlocked] = useState(() => {
      try {
        return JSON.parse(localStorage.getItem("toeic-unlocked-parts")) || [];
      } catch {
        return [];
      }
    }),
    [bookmarks, setBookmarksState] = useState(() => {
      try {
        return JSON.parse(localStorage.getItem("toeic-tip-bookmarks")) || [];
      } catch {
        return [];
      }
    });
  const setBookmarks = (value) =>
    setBookmarksState((old) => {
      const next = typeof value === "function" ? value(old) : value;
      localStorage.setItem("toeic-tip-bookmarks", JSON.stringify(next));
      return next;
    });
  const closeWelcome = () => {
    setWelcome(false);
    localStorage.setItem("toeic-welcome-seen", "true");
  };
  const openFlash = () => {
    closeWelcome();
    setShowFlash(true);
    setShowTips(false);
    setShowZero(false);
  };
  const openZeroToHero = (stageId = null) => {
    closeWelcome();
    setActive(null);
    setResult(null);
    setShowTips(false);
    setShowFlash(false);
    setZeroInitialStage(stageId);
    setShowZero(true);
  };
  const chooseFromWelcome = (part) => {
    closeWelcome();
    setGuidePart(part);
  };
  const unlockPart = (part) => {
    if (!unlocked.includes(part.id)) {
      const next = [...unlocked, part.id];
      setUnlocked(next);
      localStorage.setItem("toeic-unlocked-parts", JSON.stringify(next));
    }
    setGuidePart(null);
    setQuickGuide(false);
    setActive(part);
  };
  const finish = (answers, generatedQuestions = null) => {
    const completedPart = generatedQuestions
      ? { ...active, questions: generatedQuestions }
      : active;
    const score =
      active.type === "quiz"
        ? Math.round(
            (answers.filter(
              (answer, index) =>
                answer === completedPart.questions[index].correctAnswer,
            ).length /
              completedPart.questions.length) *
              100,
          )
        : 100;
    const next = {
      ...saved,
      [active.id]: {
        best: Math.max(score, saved[active.id]?.best || 0),
        last: new Date().toISOString(),
      },
    };
    setSaved(next);
    localStorage.setItem("ets-mastery-results", JSON.stringify(next));
    setResult({ part: completedPart, answers });
  };
  const home = () => {
    setActive(null);
    setResult(null);
    setShowTips(false);
    setShowFlash(false);
    setShowZero(false);
    setZeroInitialStage(null);
    setGuidePart(null);
    setQuickGuide(false);
  };
  let content = showZero ? (
    <ZeroToHeroPage
      initialStage={zeroInitialStage}
      onBack={home}
      onOpenFlash={openFlash}
    />
  ) : showFlash ? (
    <Flashcards onBack={home} />
  ) : showTips ? (
    <TipsLibrary
      bookmarks={bookmarks}
      setBookmarks={setBookmarks}
      onBack={home}
    />
  ) : result ? (
    <Results
      part={result.part}
      answers={result.answers}
      onHome={home}
      onRetry={() => setResult(null)}
    />
  ) : active ? (
    active.type === "quiz" ? (
      <QuizPractice
        part={active}
        onExit={home}
        onFinish={finish}
        onLookup={setWord}
      />
    ) : active.type === "speaking" ? (
      <SpeakingTest
        part={active}
        onExit={home}
        onFinish={finish}
        onLookup={setWord}
      />
    ) : (
      <WritingTest part={active} onExit={home} onFinish={finish} />
    )
  ) : (
    <Dashboard
      results={saved}
      onStart={setGuidePart}
      onTips={() => setShowTips(true)}
      onZeroToHero={openZeroToHero}
      bookmarkCount={bookmarks.length}
    />
  );
  return (
    <div className="app-shell">
      <Navbar
        dark={dark}
        onToggleTheme={() => setDark(!dark)}
        onHome={home}
        onTips={() => { home(); setShowTips(true); }}
        onFlash={openFlash}
        onZeroToHero={() => openZeroToHero()}
      />
      <main>{content}</main>
      {active && !result && (
        <button
          className="study-fab"
          onClick={() => {
            setGuidePart(active);
            setQuickGuide(true);
          }}
        >
          <BookOpen /> Mẹo nhanh 💡
        </button>
      )}
      {guidePart && (
        <LessonGuideModal
          part={guidePart}
          quick={quickGuide}
          unlocked={unlocked.includes(guidePart.id)}
          onClose={() => {
            setGuidePart(null);
            setQuickGuide(false);
          }}
          onUnlock={() => unlockPart(guidePart)}
        />
      )}{" "}
      {welcome && (
        <WelcomeTour
          onClose={closeWelcome}
          onChoose={chooseFromWelcome}
          onTips={() => {
            closeWelcome();
            setShowTips(true);
          }}
          onFlash={openFlash}
        />
      )}
      <DictionaryPop word={word} onClose={() => setWord(null)} />
    </div>
  );
}
