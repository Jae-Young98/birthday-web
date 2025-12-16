"use client";

import { motion, Variants } from "framer-motion";
import { useEffect, useState } from "react";
import confetti from "canvas-confetti";

export default function LetterPage() {
  const [showConfetti, setShowConfetti] = useState(false);
  const [clickConfetti, setClickConfetti] = useState(false);
  const [opened, setOpened] = useState(false);
  const [delivered, setDelivered] = useState(false);

  useEffect(() => {
    if (!showConfetti) return;

    confetti({
      particleCount: 140,
      spread: 80,
      origin: { x: 0.5, y: 0.55 },
    });
  }, [showConfetti]);

  useEffect(() => {
    if (!clickConfetti) return;

    confetti({
      particleCount: 220,
      spread: 100,
      startVelocity: 45,
      origin: { x: 0.5, y: 0.55 },
    });
  }, [clickConfetti]);

  const shakeVariant: Variants = {
    shake: {
      rotate: [-3, 3, -3],
      transition: {
        duration: 2.2,
        repeat: Infinity,
        ease: [0.4, 0, 0.6, 1],
      },
    },
  };

  useEffect(() => {
    if (!opened) return;

    const timer = setTimeout(() => {
      setDelivered(true);
    }, 20000);

    return () => clearTimeout(timer);
  }, [opened]);

  const [letters, setLetters] = useState<string[][]>([]);

  useEffect(() => {
    fetch("/api/letters")
      .then((res) => res.json())
      .then(setLetters);
  }, []);

  if (!letters.length) return null;

  return (
    <main className="h-screen overflow-y-scroll snap-y snap-mandatory bg-white">
      {letters.map((page, pageIndex) => (
        <motion.section
          key={pageIndex}
          className="h-screen snap-start flex items-center justify-center px-8 text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.6 }}
          transition={{ duration: 1 }}
        >
          <div>
            {page.map((line, lineIndex) => (
              <p key={lineIndex} className="mb-3 text-lg leading-relaxed text-[#191f28]">
                {line}
              </p>
            ))}

            <motion.p
              className="mt-8 text-sm text-[#6b7684]"
              animate={{ opacity: [0.4, 1, 0.4] }}
              transition={{ duration: 2.5, repeat: Infinity }}
            >
              아래로 내려 더 읽기 ↓
            </motion.p>
          </div>
        </motion.section>
      ))}
      <motion.section
        className="h-screen snap-start flex flex-col items-center justify-center px-8 text-center relative"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, amount: 0.8 }}
        transition={{ duration: 1 }}
        onViewportEnter={() => setShowConfetti(true)}
      >
        <motion.img
          src="/gift_box.png"
          alt="gift box"
          className="w-40 h-40 mb-4"
          initial={{ scale: 0.5, y: 40, opacity: 0 }}
          whileInView={{ scale: 1, y: 0, opacity: 1 }}
          viewport={{ once: true }}
          transition={{
            duration: 1,
            ease: "easeOut",
          }}
          variants={shakeVariant}
          animate="shake"
          style={{ transformOrigin: "50% 100%" }}
          onClick={() => {
            setClickConfetti(true);
            setTimeout(() => {
              setOpened(true);
            }, 600);
          }}
        />

        <motion.p
          className="mt-6 text-lg font-medium text-[#191f28] text-center"
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{
            duration: 1,
            ease: "easeOut",
          }}
        >
          선물이 도착했어요 <br /> 클릭하여 열기 🎁
        </motion.p>
      </motion.section>
      {opened && (
        <motion.div
          className="fixed inset-0 z-50 bg-white flex items-center justify-center px-8 text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
        >
          <div>
            {!delivered ? (
              <>
                <motion.p
                  className="text-xl font-semibold text-[#191f28]"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                >
                  오늘 하루
                </motion.p>

                <motion.p
                  className="mt-2 text-xl font-semibold text-[#191f28]"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.8 }}
                >
                  가장 행복해야 할 사람에게
                </motion.p>

                <motion.p
                  className="mt-8 text-base font-medium text-[#6b7684] flex items-center justify-center"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 1.6 }}
                >
                  배송중
                  <motion.span
                    className="inline-block ml-2"
                    animate={{ x: [0, 24, 0] }}
                    transition={{
                      duration: 1.4,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                  >
                    🚚
                  </motion.span>
                </motion.p>
              </>
            ) : (
              <>
                <motion.p
                  className="text-xl font-semibold text-[#191f28]"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 1 }}
                >
                  생일 축하해 🎂
                </motion.p>

                <motion.p
                  className="mt-3 text-xl font-semibold text-[#191f28]"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6 }}
                >
                  행복한 저녁 시간 보내자 💙
                </motion.p>
              </>
            )}
          </div>
        </motion.div>
      )}
    </main>
  );
}
