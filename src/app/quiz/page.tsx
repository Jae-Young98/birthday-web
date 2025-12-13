"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";

const ANSWER = "2018-04-03";
const TOTAL_QUIZ = 3;
const CURRENT_QUIZ = 1;
const quizzes = [
  {
    id: 1,
    question: ["우리가 처음 만난 날은", "언제일까요?"],
    type: "date",
    answer: "2018-04-03",
  },
  {
    id: 2,
    question: ["오늘 예약한 식당은", "어디일까요?"],
    type: "text",
    answer: ["내추럴하이", "내츄럴하이", "네추럴하이", "네츄럴하이"],
  },
  {
    id: 3,
    question: ["내가 제일 좋아하는", "음식은 뭘까요?", "(음료 포함)"],
    type: "text",
    answer: ["콜라", "코카콜라"],
  },
];

export default function QuizPage() {
  const getToday = () => {
    const today = new Date();
    const yyyy = today.getFullYear();
    const mm = String(today.getMonth() + 1).padStart(2, "0");
    const dd = String(today.getDate()).padStart(2, "0");
    return `${yyyy}-${mm}-${dd}`;
  };

  const [quizIndex, setQuizIndex] = useState(0); // 몇 번째 문제인지
  const [step, setStep] = useState<"quiz" | "correct">("quiz");
  const router = useRouter();
  const [value, setValue] = useState(getToday());
  const [message, setMessage] = useState("");

  const currentQuiz = quizzes[quizIndex];
  const handleSubmit = () => {
    let isCorrect = false;

    if (Array.isArray(currentQuiz.answer)) {
      isCorrect = currentQuiz.answer.includes(value);
    } else {
      isCorrect = value === currentQuiz.answer;
    }
    if (isCorrect) {
      setStep("correct");
    } else {
      setMessage("조금만 더 생각해볼까요?");
    }
  };

  useEffect(() => {
    if (step === "correct") {
      const timer = setTimeout(() => {
        if (quizIndex < quizzes.length - 1) {
          setQuizIndex((prev) => prev + 1);
          setValue("");
          setMessage("");
          setStep("quiz");
        } else {
          router.push("/letter");
        }
      }, 2500);

      return () => clearTimeout(timer);
    }
  }, [step, quizIndex, router]);

  return (
    <main className="px-6 pt-24">
      <AnimatePresence mode="wait">
        {step === "quiz" && (
          <motion.div
            key="quiz"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
          >
            {/* 진행도 */}
            <div className="mb-6 text-sm text-[#6b7684]">
              {quizIndex + 1} / {quizzes.length}
            </div>

            {/* 질문 */}
            <h1 className="text-2xl font-bold leading-snug">
              {currentQuiz.question.map((line, idx) => (
                <span key={idx}>
                  {line}
                  <br />
                </span>
              ))}
            </h1>

            {/* 입력 */}
            <div className="mt-12">
              <p className="mb-2 text-sm text-[#6b7684]">
                {currentQuiz.type === "date" ? "날짜를 선택해주세요" : "정답을 입력해주세요"}
              </p>

              <input
                type={currentQuiz.type}
                value={value}
                onChange={(e) => {
                  setValue(e.target.value);
                  setMessage("");
                }}
                className="
                w-full
                rounded-2xl
                bg-[#f2f4f6]
                px-4
                h-14
                text-base
                text-[#191f28]
                focus:outline-none
                focus:ring-2
                focus:ring-[#3182f6]
              "
              />

              {message && <p className="mt-4 text-sm text-[#6b7684]">{message}</p>}

              <button
                onClick={handleSubmit}
                className="
                mt-10
                w-full
                rounded-2xl
                bg-[#3182f6]
                py-4
                text-white
                text-base
                font-semibold
                active:scale-[0.98]
                transition
              "
              >
                확인
              </button>
            </div>
          </motion.div>
        )}

        {step === "correct" && (
          <motion.div
            key="correct"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
            className="flex h-[60vh] flex-col items-center justify-center text-center"
          >
            <p className="text-xl font-semibold">정답이에요 🎉</p>
            <p className="mt-2 text-sm text-[#6b7684]">{quizzes.length - quizIndex - 1}문제 남았어요</p>
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}
