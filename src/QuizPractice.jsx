import { useEffect, useState } from "react";
import {
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  Clock3,
  Lightbulb,
  Volume2,
  XCircle,
} from "lucide-react";
import { generateNewTest } from "./quizGenerator";
import ExplanationCard from "./ExplanationCard";
import Part1Image from "./Part1Image";

const speak = (text) => {
  if (!("speechSynthesis" in window)) return;
  window.speechSynthesis.cancel();
  const utterance = new SpeechSynthesisUtterance(text);
  utterance.lang = "en-US";
  utterance.rate = 0.85;
  window.speechSynthesis.speak(utterance);
};

function QuestionTimer({ initial, running, onExpire }) {
  const [seconds, setSeconds] = useState(initial);
  useEffect(() => setSeconds(initial), [initial]);
  useEffect(() => {
    if (!running) return undefined;
    const timer = window.setInterval(
      () =>
        setSeconds((value) => {
          if (value <= 1) {
            window.clearInterval(timer);
            onExpire();
            return 0;
          }
          return value - 1;
        }),
      1000,
    );
    return () => window.clearInterval(timer);
  }, [running, onExpire]);
  return (
    <div className={`timer ${seconds < 6 ? "urgent" : ""}`}>
      <Clock3 />
      {String(Math.floor(seconds / 60)).padStart(2, "0")}:
      {String(seconds % 60).padStart(2, "0")}
    </div>
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
      aria-label="TOEIC practice scene"
    />
  );
}

export default function QuizPractice({ part, onExit, onFinish, resetKey = 0 }) {
  const [questions, setQuestions] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [answers, setAnswers] = useState([]);

  useEffect(() => {
    const freshQuestions = generateNewTest(part.id, 10);
    setQuestions(freshQuestions);
    setAnswers(Array(freshQuestions.length).fill(null));
    setCurrentIndex(0);
    setSelectedOption(null);
    setIsAnswered(false);
  }, [part.id, resetKey]);

  const currentQuestion = questions[currentIndex];
  const correctAnswer = currentQuestion?.options[currentQuestion.correctAnswer];

  const handleSelectOption = (option) => {
    if (isAnswered) return;
    setSelectedOption(option);
    setIsAnswered(true);
    setAnswers((previous) => {
      const next = [...previous];
      next[currentIndex] = currentQuestion.options.indexOf(option);
      return next;
    });
  };

  const handleTimeExpired = () => {
    if (isAnswered) return;
    setSelectedOption(null);
    setIsAnswered(true);
    setAnswers((previous) => {
      const next = [...previous];
      next[currentIndex] = -1;
      return next;
    });
  };

  const handleNextQuestion = () => {
    if (currentIndex === questions.length - 1) {
      onFinish(answers, questions);
      return;
    }
    setCurrentIndex((index) => index + 1);
    setSelectedOption(null);
    setIsAnswered(false);
  };

  const selectedIsCorrect = isAnswered && selectedOption === correctAnswer;

  if (!currentQuestion)
    return (
      <div className="quiz-loading">
        <span></span>
        <p>Đang bốc đề mới...</p>
      </div>
    );

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
          <strong>Mini-test thực chiến</strong>
        </div>
        <span className="ets">ETS FORMAT</span>
      </header>
      <div className="test-status">
        <span>
          Câu {currentIndex + 1}/{questions.length}
        </span>
        <div className="progress">
          <i
            style={{
              width: `${((currentIndex + 1) / questions.length) * 100}%`,
            }}
          />
        </div>
        <QuestionTimer
          key={currentQuestion.instanceId}
          initial={part.time}
          running={!isAnswered}
          onExpire={handleTimeExpired}
        />
      </div>
      {currentQuestion.image !== undefined && (
        <Scene index={currentQuestion.image} />
      )}
      <div className="question">
        <span>{part.part.toUpperCase()}</span>
        {part.id !== "listening-1" && <h2>{currentQuestion.prompt}</h2>}
        {part.skill === "Listening" && (
          <button
            className="audio"
            onClick={() =>
              speak(currentQuestion.speech || currentQuestion.prompt)
            }
          >
            <Volume2 /> Phát audio
          </button>
        )}
        <div className="options">
          {currentQuestion.options.map((option, index) => {
            const isCorrect = isAnswered && option === correctAnswer;
            const isSelectedWrong =
              isAnswered &&
              option === selectedOption &&
              option !== correctAnswer;
            const stateClass = !isAnswered
              ? "answer-default border-slate-200 bg-transparent hover:border-purple-400 dark:border-slate-700"
              : isCorrect
                ? "correct border-emerald-500 bg-emerald-500/10 text-emerald-600"
                : isSelectedWrong
                  ? "wrong border-rose-500 bg-rose-500/10 text-rose-600"
                  : "answer-neutral opacity-50 border-slate-200 dark:border-slate-700";
            return (
              <button
                type="button"
                disabled={isAnswered}
                className={stateClass}
                onClick={() => handleSelectOption(option)}
                key={`${currentQuestion.instanceId}-${index}`}
              >
                <b>{String.fromCharCode(65 + index)}</b>
                {option}
                {isCorrect && <CheckCircle2 />}
                {isSelectedWrong && <XCircle />}
              </button>
            );
          })}
        </div>
        <aside className="inline-fast-tip open">
          <button type="button" aria-expanded="true"><span>💡 Mẹo phản xạ nhanh cho câu này:</span></button>
          <p>{currentQuestion.fastTip || currentQuestion.tip || "Nhìn từ khóa và cấu trúc ngay quanh chỗ trống trước khi dịch toàn câu."}</p>
        </aside>
        {isAnswered && (
          <>
            <ExplanationCard
              isCorrect={selectedIsCorrect}
              selectedAnswer={selectedOption}
              correctAnswer={correctAnswer}
              translation={
                currentQuestion.vietnameseTranslation ||
                currentQuestion.translation
              }
              explanation={currentQuestion.explanation}
              fastTip={currentQuestion.fastTip || currentQuestion.tip}
            />
            <div
              className={`instant explanation-next ${selectedIsCorrect ? "ok" : "no"}`}
            >
              <button onClick={handleNextQuestion}>
                {currentIndex === questions.length - 1
                  ? "Xem kết quả"
                  : "Câu tiếp theo"}
                <ArrowRight />
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
