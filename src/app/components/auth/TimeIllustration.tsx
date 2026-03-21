import { motion, AnimatePresence } from "motion/react";
import { useEffect, useState } from "react";
import { Sun, Moon } from "lucide-react";

type TimeState = "day" | "evening" | "night";

export const TimeIllustration = () => {
  const [timeState, setTimeState] = useState<TimeState>("day");

  useEffect(() => {
    const checkTime = () => {
      // Bangladesh is UTC+6
      const now = new Date();
      const utc = now.getTime() + now.getTimezoneOffset() * 60000;
      const bdTime = new Date(utc + 3600000 * 6);
      const hour = bdTime.getHours();

      if (hour >= 6 && hour < 17) {
        setTimeState("day"); // 6am - 5pm
      } else if (hour >= 17 && hour < 24) {
        setTimeState("evening"); // 5pm - 12am
      } else {
        setTimeState("night"); // 12am - 6am
      }
    };

    checkTime();
    const interval = setInterval(checkTime, 60000); // Check every minute
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative size-72 flex items-center justify-center overflow-visible">
      <AnimatePresence mode="wait">
        {timeState === "day" && (
          <motion.div
            key="sun"
            initial={{ scale: 0.5, opacity: 0, rotate: -20 }}
            animate={{ scale: 1, opacity: 1, rotate: 0 }}
            exit={{ scale: 1.5, opacity: 0, rotate: 20 }}
            transition={{ type: "spring", damping: 15, stiffness: 100 }}
            className="relative flex items-center justify-center"
          >
            {/* Ultra Premium Sun Glow */}
            <motion.div
              animate={{ 
                scale: [1, 1.2, 1],
                opacity: [0.3, 0.5, 0.3] 
              }}
              transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
              className="absolute size-64 bg-orange-500 rounded-full blur-[80px]"
            />
            <motion.div
              animate={{ 
                scale: [1, 1.1, 1],
                opacity: [0.5, 0.8, 0.5] 
              }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
              className="absolute size-48 bg-yellow-400 rounded-full blur-[40px]"
            />
            
            {/* Spinning Sun Rays */}
            <motion.div 
              animate={{ rotate: 360 }}
              transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
              className="absolute size-80"
            >
              {[...Array(12)].map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute top-1/2 left-1/2 w-1.5 h-16 bg-gradient-to-t from-yellow-300 via-orange-400 to-transparent origin-bottom rounded-full"
                  style={{ 
                    rotate: `${i * 30}deg`, 
                    translateY: "-100%",
                    translateX: "-50%",
                    marginTop: "-40px"
                  }}
                  animate={{ opacity: [0.4, 0.7, 0.4], height: [50, 70, 50] }}
                  transition={{ duration: 2, repeat: Infinity, delay: i * 0.15 }}
                />
              ))}
            </motion.div>

            {/* Sun Core */}
            <div className="relative size-40 bg-gradient-to-tr from-yellow-400 via-orange-500 to-yellow-600 rounded-full shadow-[0_0_80px_rgba(251,191,36,0.8)] border-4 border-white/30 flex items-center justify-center overflow-hidden z-10">
               <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_30%,rgba(255,255,255,0.6),transparent)]" />
               <Sun className="size-20 text-white drop-shadow-[0_0_15px_rgba(255,255,255,0.8)]" strokeWidth={1.5} />
            </div>
          </motion.div>
        )}

        {timeState === "evening" && (
          <motion.div
            key="moon"
            initial={{ y: 50, opacity: 0, rotate: 10 }}
            animate={{ y: 0, opacity: 1, rotate: 0 }}
            exit={{ y: -50, opacity: 0, rotate: -10 }}
            transition={{ type: "spring", damping: 20, stiffness: 80 }}
            className="relative flex items-center justify-center"
          >
            {/* Luminous Night Glow */}
            <motion.div
              animate={{ opacity: [0.2, 0.4, 0.2] }}
              transition={{ duration: 8, repeat: Infinity }}
              className="absolute size-64 bg-indigo-700 rounded-full blur-[90px]"
            />
            <motion.div
              animate={{ opacity: [0.4, 0.6, 0.4], scale: [1, 1.05, 1] }}
              transition={{ duration: 5, repeat: Infinity, delay: 1 }}
              className="absolute size-48 bg-purple-500/30 rounded-full blur-[60px]"
            />

            {/* Enhanced Star Field */}
            <div className="absolute size-80 pointer-events-none">
              {[...Array(25)].map((_, i) => (
                <motion.div
                  key={i}
                  animate={{ 
                    opacity: [0, 1, 0],
                    scale: [0.3, 1.2, 0.3],
                    y: [0, -10, 0]
                  }}
                  transition={{ 
                    duration: 3 + Math.random() * 4, 
                    repeat: Infinity, 
                    delay: Math.random() * 5 
                  }}
                  className="absolute size-1.5 bg-white rounded-full shadow-[0_0_8px_white]"
                  style={{ top: `${Math.random() * 100}%`, left: `${Math.random() * 100}%` }}
                />
              ))}
            </div>

            {/* Moon Core */}
            <div className="relative size-40 bg-gradient-to-br from-slate-100 via-indigo-100 to-slate-400 rounded-full shadow-[0_0_60px_rgba(199,210,254,0.5)] flex items-center justify-center border-4 border-white/20 overflow-hidden z-10 transition-transform duration-700">
               <div className="absolute inset-x-0 bottom-0 top-1/4 bg-black/5 rounded-full" />
               <motion.div
                 animate={{ rotate: [0, 5, -5, 0] }}
                 transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
               >
                 <Moon className="size-20 text-slate-700 drop-shadow-[0_0_10px_rgba(255,255,255,0.5)]" strokeWidth={1} fill="#33415515" />
               </motion.div>
            </div>
          </motion.div>
        )}

        {timeState === "night" && (
          <motion.div
            key="lamp"
            initial={{ opacity: 0, scale: 0.8, y: 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 1.1, y: -30 }}
            transition={{ type: "spring", damping: 18, stiffness: 90 }}
            className="relative flex flex-col items-center"
          >
             {/* Realistic Volumetric Light */}
             <motion.div 
               animate={{ 
                 opacity: [0.7, 0.85, 0.75, 0.9, 0.7],
                 scaleX: [1, 1.05, 0.95, 1.02, 1]
               }}
               transition={{ duration: 0.2, repeat: Infinity, repeatDelay: Math.random() * 5 }}
               className="absolute top-[80px] w-80 h-96 bg-gradient-to-b from-yellow-300/50 via-yellow-200/10 to-transparent blur-3xl origin-top z-0"
               style={{ clipPath: "polygon(15% 0%, 85% 0%, 100% 100%, 0% 100%)" }}
             />

             {/* Premium Lamp Body */}
             <div className="relative size-48 bg-zinc-900 rounded-full shadow-2xl flex items-center justify-center border-4 border-white/10 z-20">
                <div className="absolute size-36 bg-zinc-950 rounded-full shadow-inner border border-white/5" />
                
                <div className="relative flex flex-col items-center z-10">
                   {/* Lamp Shade */}
                   <motion.div 
                     animate={{ y: [0, -2, 0] }}
                     transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                     className="w-24 h-16 bg-gradient-to-b from-zinc-700 to-zinc-800 rounded-t-full relative border-t border-white/10"
                   >
                     <div className="absolute -bottom-1 left-0 w-full h-2 bg-yellow-500/20 blur-md" />
                   </motion.div>
                   {/* Lamp Base */}
                   <div className="w-2 h-12 bg-zinc-800" />
                   <div className="w-16 h-3 bg-zinc-800 rounded-full shadow-[0_4px_10px_rgba(0,0,0,0.5)]" />
                </div>

                {/* The "Intense" Glow */}
                <motion.div 
                  animate={{ 
                    scale: [1, 1.3, 1], 
                    opacity: [0.6, 1, 0.6],
                    filter: ["blur(20px)", "blur(30px)", "blur(20px)"]
                  }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="absolute top-[35%] size-12 bg-yellow-400 rounded-full z-15"
                />
             </div>

             <motion.div 
               initial={{ opacity: 0, y: 10 }}
               animate={{ opacity: 1, y: 0 }}
               transition={{ delay: 0.5 }}
               className="mt-6 px-4 py-1.5 bg-black/40 backdrop-blur-md rounded-full border border-white/10 shadow-xl"
             >
                <span className="text-[11px] text-yellow-500 font-bold tracking-[0.2em] uppercase">Premium Night Ambience</span>
             </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
