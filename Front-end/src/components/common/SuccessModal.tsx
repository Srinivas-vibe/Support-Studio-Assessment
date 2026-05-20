import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import { Check } from "lucide-react";

interface DetailItem {
  label: string;
  value: string;
}

interface SuccessModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  subtitle?: string;
  details?: DetailItem[];
}

export function SuccessModal({
  isOpen,
  onClose,
  title = "Submission Successful",
  subtitle = "We have received your information.",
  details = [],
}: SuccessModalProps) {
  const [particles, setParticles] = useState<any[]>([]);

  useEffect(() => {
    if (isOpen) {
      // 1. Play Google Pay style success chime
      try {
        const audioCtx = new (window.AudioContext || (window as any).webkitAudioContext)();
        
        const playTone = (freq: number, start: number, duration: number) => {
          const osc = audioCtx.createOscillator();
          const gain = audioCtx.createGain();
          
          osc.type = "sine";
          osc.frequency.setValueAtTime(freq, start);
          
          gain.gain.setValueAtTime(0, start);
          gain.gain.linearRampToValueAtTime(0.2, start + 0.05);
          gain.gain.exponentialRampToValueAtTime(0.0001, start + duration);
          
          osc.connect(gain);
          gain.connect(audioCtx.destination);
          
          osc.start(start);
          osc.stop(start + duration);
        };
        
        const now = audioCtx.currentTime;
        // G-major pentatonic chime: G5, B5, D6
        playTone(783.99, now, 0.45); // G5
        playTone(987.77, now + 0.08, 0.45); // B5
        playTone(1174.66, now + 0.16, 0.65); // D6
      } catch (e) {
        console.warn("AudioContext chime not allowed/supported:", e);
      }

      // 2. Generate Google Pay style confetti particles
      const newParticles = Array.from({ length: 50 }).map((_, i) => {
        const angle = Math.random() * Math.PI * 2;
        const velocity = Math.random() * 200 + 100;
        return {
          id: i,
          x: Math.cos(angle) * velocity,
          y: Math.sin(angle) * velocity - 100, // burst upwards slightly
          scale: Math.random() * 0.8 + 0.4,
          color: ["#10b981", "#3b82f6", "#f59e0b", "#ec4899", "#30cdb0", "#8b5cf6"][
            Math.floor(Math.random() * 6)
          ],
          rotate: Math.random() * 720,
          delay: Math.random() * 0.1,
        };
      });
      setParticles(newParticles);
    } else {
      setParticles([]);
    }
  }, [isOpen]);

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-background/85 backdrop-blur-md"
          />

          {/* Modal Container (without overflow-hidden so particles can fly out) */}
          <motion.div
            initial={{ scale: 0.9, y: 20, opacity: 0 }}
            animate={{
              scale: 1,
              y: 0,
              opacity: 1,
              transition: { type: "spring", damping: 25, stiffness: 350 },
            }}
            exit={{ scale: 0.95, y: 10, opacity: 0, transition: { duration: 0.2 } }}
            className="relative w-full max-w-md rounded-3xl border border-white/8 bg-surface p-8 shadow-2xl flex flex-col items-center text-center"
          >
            {/* Google Pay animated success checkmark */}
            <div className="relative flex justify-center items-center my-6">
              {/* Outer pulsing ring */}
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: [1, 1.25, 1], opacity: [0.15, 0.35, 0.15] }}
                transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
                className="absolute w-28 h-28 rounded-full bg-emerald-500/10 border border-emerald-500/20"
              />

              {/* Inner animated SVG checkmark */}
              <svg className="w-24 h-24 text-emerald-500 relative z-10" viewBox="0 0 50 50">
                {/* Circle drawing outline */}
                <motion.circle
                  cx="25"
                  cy="25"
                  r="21"
                  stroke="currentColor"
                  strokeWidth="3.5"
                  fill="none"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                />
                {/* Solid green inner circle scale in */}
                <motion.circle
                  cx="25"
                  cy="25"
                  r="19"
                  fill="currentColor"
                  className="opacity-[0.08]"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.3, duration: 0.4, type: "spring" }}
                />
                {/* Checkmark drawing */}
                <motion.path
                  d="M16 25L22 31L34 19"
                  stroke="currentColor"
                  strokeWidth="4"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  fill="none"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 0.4, delay: 0.45, ease: "easeOut" }}
                />
              </svg>

              {/* Confetti container (positioned exactly at center of checkmark, rendering above all elements) */}
              <div className="absolute inset-0 pointer-events-none flex items-center justify-center z-20">
                {particles.map((p) => (
                  <motion.div
                    key={p.id}
                    className="absolute w-2.5 h-2.5 rounded-sm"
                    style={{ backgroundColor: p.color }}
                    animate={{
                      x: [0, p.x, p.x * 1.2, p.x * 1.3],
                      y: [0, p.y, p.y + 200, p.y + 600],
                      scale: [0, p.scale, p.scale * 0.6, 0],
                      opacity: [1, 1, 0.8, 0],
                      rotate: [0, p.rotate, p.rotate * 1.5, p.rotate * 2],
                    }}
                    transition={{
                      duration: 2.2,
                      times: [0, 0.3, 0.7, 1],
                      ease: "easeOut",
                      delay: p.delay,
                }}
                  />
                ))}
              </div>
            </div>

            {/* Typography */}
            <motion.h3
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0, transition: { delay: 0.5 } }}
              className="text-2xl font-display font-semibold tracking-tight uppercase"
            >
              {title}
            </motion.h3>

            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0, transition: { delay: 0.6 } }}
              className="text-sm text-muted-foreground mt-2 font-light max-w-xs"
            >
              {subtitle}
            </motion.p>

            {/* Transaction Receipt Card */}
            {details.length > 0 && (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1, transition: { delay: 0.7 } }}
                className="mt-6 w-full bg-white/4 border border-white/6 rounded-2xl p-5 space-y-3 text-left relative overflow-hidden"
              >
                {/* Visual texture for receipt */}
                <div className="absolute inset-x-0 bottom-0 h-1 bg-grid opacity-10" />

                {details.map((item, idx) => (
                  <div
                    key={idx}
                    className="flex justify-between items-start gap-4 border-b border-white/4 last:border-0 pb-2.5 last:pb-0"
                  >
                    <span className="text-[11px] font-mono uppercase tracking-wider text-muted-foreground shrink-0 mt-0.5">
                      {item.label}
                    </span>
                    <span className="text-sm font-medium text-foreground break-all text-right">
                      {item.value}
                    </span>
                  </div>
                ))}
              </motion.div>
            )}

            {/* Done button */}
            <motion.button
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0, transition: { delay: 0.85 } }}
              onClick={onClose}
              className="mt-8 w-full py-3.5 rounded-full bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-400 border border-emerald-500/20 hover:border-emerald-500/30 text-sm font-semibold tracking-wider uppercase transition cursor-pointer shadow-lg shadow-emerald-500/2"
            >
              Done
            </motion.button>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
