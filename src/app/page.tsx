"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";

export default function IntroPage() {
  const router = useRouter();
  const [step, setStep] = useState(0);

  useEffect(() => {
    const timers = [
      setTimeout(() => setStep(1), 3000),
      setTimeout(() => setStep(2), 9000),
      setTimeout(() => router.push("/quiz"), 12000),
    ];

    return () => timers.forEach(clearTimeout);
  }, [router]);

  return (
    <main className="flex h-screen items-center justify-center px-6">
      <div className="text-center">
        <AnimatePresence mode="wait">
          {step === 0 && (
            <motion.div
              key="first"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.7 }}
            >
              <motion.p
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7 }}
                className="text-xl font-semibold"
              >
                오늘은
              </motion.p>

              <motion.p
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: 0.9 }}
                className="mt-2 text-xl font-semibold"
              >
                조금 특별한 날이야 🎂
              </motion.p>
            </motion.div>
          )}

          {step === 1 && (
            <motion.div
              key="second"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.7 }}
            >
              <motion.p
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7 }}
                className="text-xl font-semibold"
              >
                {process.env.NEXT_PUBLIC_BIRTHDAY_NAME_KO}이의 생일을
              </motion.p>

              <motion.p
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: 0.9 }}
                className="mt-2 text-xl font-semibold"
              >
                조금 더 특별하게 해주고 싶어
              </motion.p>

              <motion.p
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: 2 }}
                className="mt-2 text-xl font-semibold"
              >
                준비해봤으니 가볍게 즐겨주면 좋겠어
              </motion.p>
            </motion.div>
          )}

          {step === 2 && (
            <motion.div
              key="third"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.7 }}
            >
              <p className="text-xl font-semibold">이제 시작! 🎉</p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </main>
  );
}
