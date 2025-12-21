"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";

const quizzes = [
  {
    id: 1,
    question: ["날짜 입력", "문제"],
    type: "date",
    answer: "2025-12-21",
  },
  {
    id: 2,
    question: ["텍스트 입력", "문제"],
    type: "text",
    answer: ["test"],
  },
  {
    id: 3,
    question: ["텍스트 입력", "문제", "(경우의 수 고려)"],
    type: "text",
    answer: ["test", "테스트", "태스트"],
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

  const [quizIndex, setQuizIndex] = useState(0);
  const [step, setStep] = useState<"quiz" | "correct">("quiz");
  const router = useRouter();
  const [value, setValue] = useState(getToday());
  const [message, setMessage] = useState("");

  const currentQuiz = quizzes[quizIndex];
  const isLastQuiz = quizIndex === quizzes.length - 1;
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
      const delay = isLastQuiz ? 3000 : 2000;

      const timer = setTimeout(() => {
        if (quizIndex < quizzes.length - 1) {
          setQuizIndex((prev) => prev + 1);
          setValue("");
          setMessage("");
          setStep("quiz");
        } else {
          router.push("/letter");
        }
      }, delay);

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
            {!isLastQuiz ? (
              <>
                <p className="text-xl font-semibold">정답이에요 🎉</p>
                <p className="mt-2 text-sm text-[#6b7684]">{quizzes.length - quizIndex - 1}문제 남았어요</p>
              </>
            ) : (
              <>
                <p className="text-xl font-semibold">다 풀었어요 💙 </p>
                <p className="mt-2 text-sm text-[#6b7684]">다음은 뭘까요?</p>
              </>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}
